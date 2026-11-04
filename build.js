#!/usr/bin/env node
// Builds every script under scripts/*/src/index.ts.
//
//   node build.js                    build all scripts into scripts/<name>/dist/
//   node build.js --script <name>    build one script
//   node build.js --watch            rebuild on save
//   node build.js --debug            unminified build with source maps into dist-debug/, plus a
//                                    dev loader that @requires it from disk
//   node build.js --check            fail if any committed dist/ or loader file is out of date
//
// A dist file is only rewritten when its code or header changed. When it is, its @version gets a
// build stamp (`<meta version>.<YYYYMMDDHHmm>`) so Tampermonkey sees a newer version and updates
// scripts installed straight from dist/.

import * as esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const args = process.argv.slice(2);
const isWatch = args.includes('--watch');
const isDebug = args.includes('--debug');
const isCheck = args.includes('--check');
const scriptFilter = args.includes('--script') ? args[args.indexOf('--script') + 1] : '';

const repoRoot = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const repoUrl = (pkg.repository?.url ?? '').replace(/^git\+/, '').replace(/\.git$/, '');
const rawUrl = repoUrl.replace('github.com', 'raw.githubusercontent.com');
const branch = 'main';

// Bump when the loader template changes so Tampermonkey offers the update via @updateURL.
const LOADER_VERSION = '1.2.0';
// How long a loader reuses the latest commit SHA before asking GitHub again. Unauthenticated
// API calls are limited to 60 an hour per IP, shared by every loader.
const LOADER_SHA_CACHE_MS = 60 * 1000;

const staleFiles = [];

// --- Metadata --------------------------------------------------------------------------------

function readMeta(scriptDir) {
  const metaPath = path.join(scriptDir, 'src', 'meta.ts');
  const content = fs.existsSync(metaPath) ? fs.readFileSync(metaPath, 'utf8') : '';
  const block = content.match(/\/\*\s*(==UserScript==[\s\S]*?==\/UserScript==)\s*\*\//);
  if (!block) {
    throw new Error(`${metaPath} needs a /* ==UserScript== ... ==/UserScript== */ block`);
  }

  // Normalize every line to `// @key value` so the header is a valid userscript block.
  const lines = block[1]
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/^\/\/\s?/, ''))
    .filter(Boolean)
    .map((line) => `// ${line}`);

  const values = (key) =>
    lines
      .map((line) => line.match(new RegExp(`^// @${key}\\s+(.+)$`))?.[1].trim())
      .filter((value) => value && value !== 'none');

  return {
    lines,
    version: values('version')[0] ?? '0.0.0',
    matches: values('match'),
    runAt: values('run-at')[0] ?? 'document-start',
    grants: values('grant'),
    connects: values('connect'),
  };
}

function distHeader(meta, scriptName, version) {
  const distUrl = `${rawUrl}/${branch}/scripts/${scriptName}/dist/${scriptName}.user.js`;
  const lines = meta.lines
    .filter((line) => !/^\/\/ @(version|updateURL|downloadURL)\s/.test(line))
    .filter((line) => line !== '// ==/UserScript==');
  const nameIndex = lines.findIndex((line) => line.startsWith('// @name '));
  lines.splice(nameIndex + 1, 0, `// @version      ${version}`);
  lines.push(`// @updateURL    ${distUrl}`, `// @downloadURL  ${distUrl}`, '// ==/UserScript==');
  return lines.join('\n') + '\n\n';
}

function buildStamp(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return (
    String(date.getUTCFullYear()) +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes())
  );
}

// --- Output ----------------------------------------------------------------------------------

const normalizeEol = (text) => text.replace(/\r\n/g, '\n');
const withoutVersion = (text) => normalizeEol(text).replace(/^\/\/ @version .*$/m, '');

function readIfExists(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
}

/** Writes `content` unless the file already has it (ignoring line endings). */
function emit(file, content) {
  const existing = readIfExists(file);
  if (existing !== null && normalizeEol(existing) === normalizeEol(content)) {
    return false;
  }

  if (isCheck) {
    staleFiles.push(path.relative(repoRoot, file));
    return false;
  }

  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  return true;
}

function writeDist(scriptDir, scriptName, meta, code) {
  const outFile = path.join(scriptDir, 'dist', `${scriptName}.user.js`);
  const candidate = (version) => distHeader(meta, scriptName, version) + code;

  // Keep the committed build stamp when nothing but the stamp would change.
  const existing = readIfExists(outFile);
  const existingVersion = existing?.match(/^\/\/ @version\s+(\S+)/m)?.[1] ?? '';
  const upToDate =
    existing !== null &&
    existingVersion.startsWith(`${meta.version}.`) &&
    withoutVersion(existing) === withoutVersion(candidate(existingVersion));

  if (upToDate) {
    return false;
  }

  if (isCheck) {
    staleFiles.push(path.relative(repoRoot, outFile));
    return false;
  }

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, candidate(`${meta.version}.${buildStamp()}`));
  return true;
}

function writeDebug(scriptDir, scriptName, meta, code) {
  const outFile = path.join(scriptDir, 'dist-debug', `${scriptName}.debug.user.js`);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, code);

  // Install this once; Tampermonkey re-reads file:// @requires on every page load. Needs
  // "Allow access to file URLs" enabled for the Tampermonkey extension.
  const devLoader = [
    ...meta.lines
      .filter((line) => !/^\/\/ @(version|updateURL|downloadURL|name)\s/.test(line))
      .filter((line) => line !== '// ==/UserScript=='),
    `// @name         ${scriptName} (dev)`,
    `// @version      0.0.0-dev`,
    `// @require      ${pathToFileURL(outFile).href}`,
    '// ==/UserScript==',
    '',
  ].join('\n');
  fs.writeFileSync(path.join(scriptDir, 'dist-debug', `${scriptName}.dev.user.js`), devLoader);
}

// --- Loader ----------------------------------------------------------------------------------

function loaderSource(scriptName, meta) {
  const distPath = `scripts/${scriptName}/dist/${scriptName}.user.js`;
  const scriptUrl = `${rawUrl}/${branch}/${distPath}`;
  const loaderUrl = `${rawUrl}/${branch}/scripts/${scriptName}/tampermonkey-loader.user.js`;
  const latestCommitUrl = `${repoUrl.replace('github.com', 'api.github.com/repos')}/commits/${branch}`;
  const matchLines = meta.matches.map((match) => `// @match        ${match}`).join('\n');
  const grants = [...new Set(['GM_xmlhttpRequest', ...meta.grants])];
  // The loader itself also needs storage to cache the latest commit SHA.
  const grantLines = [...new Set([...grants, 'GM_getValue', 'GM_setValue'])]
    .map((grant) => `// @grant        ${grant}`)
    .join('\n');
  // Code eval'd from inside Tampermonkey's sandbox can't see the granted APIs, so the loader
  // passes them to the build as named parameters instead.
  const apiNames = grants.filter((grant) => /^GM_\w+$|^unsafeWindow$/.test(grant));
  const apiParams = apiNames.join(', ');
  const apiArgs = apiNames
    .map((name) => `typeof ${name} === 'undefined' ? undefined : ${name}`)
    .join(',\n          ');
  const connectLines = [
    ...new Set(['github.com', 'api.github.com', 'raw.githubusercontent.com', ...meta.connects]),
  ]
    .map((connect) => `// @connect      ${connect}`)
    .join('\n');

  return `// ==UserScript==
// @name         ${scriptName} (loader)
// @namespace    ${repoUrl || 'http://tampermonkey.net/'}
// @version      ${LOADER_VERSION}
// @description  Loader — fetches the latest build from GitHub
// @updateURL    ${loaderUrl}
// @downloadURL  ${loaderUrl}
${matchLines}
// @run-at       ${meta.runAt}
${grantLines}
${connectLines}
// ==/UserScript==

(function () {
  'use strict';

  const BRANCH_SCRIPT_URL = '${scriptUrl}';
  const COMMIT_SCRIPT_URL = '${rawUrl}/{sha}/${distPath}';
  const LATEST_COMMIT_URL = '${latestCommitUrl}';
  const SHA_CACHE_KEY = '__loader:latest-commit';
  const SHA_CACHE_MS = ${LOADER_SHA_CACHE_MS};

  function get(url, headers) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: 'GET',
        url,
        headers,
        nocache: true,
        timeout: 8000,
        onload: resolve,
        onerror: reject,
        ontimeout: reject,
      });
    });
  }

  // raw.githubusercontent.com caches branch URLs for 5 minutes and ignores query strings, so a
  // push can take that long to show up. Loading by commit SHA always gets the latest build; the
  // branch URL is the fallback when the GitHub API is unreachable or rate limited.
  async function resolveScriptUrl() {
    const cached = GM_getValue(SHA_CACHE_KEY, null);
    if (cached && cached.sha && Date.now() - cached.at < SHA_CACHE_MS) {
      return COMMIT_SCRIPT_URL.replace('{sha}', cached.sha);
    }

    try {
      const res = await get(LATEST_COMMIT_URL, { Accept: 'application/vnd.github.sha' });
      const sha = res.status === 200 ? String(res.responseText).trim() : '';
      if (/^[0-9a-f]{40}$/.test(sha)) {
        GM_setValue(SHA_CACHE_KEY, { sha, at: Date.now() });
        return COMMIT_SCRIPT_URL.replace('{sha}', sha);
      }

      console.warn('[loader] Latest commit lookup failed:', res.status);
    } catch (err) {
      console.warn('[loader] Latest commit lookup failed:', err);
    }

    return BRANCH_SCRIPT_URL + '?_=' + Date.now();
  }

  resolveScriptUrl()
    .then((scriptUrl) =>
      get(scriptUrl).then((res) => {
        if (res.status !== 200) {
          console.error('[loader] Failed to fetch script:', res.status, scriptUrl);
          return;
        }

        // eval keeps the evaluation context the build has always had; the wrapper function only
        // adds the granted APIs as parameters.
        const run = eval(
          '(function (${apiParams}) {\\n' +
            res.responseText +
            '\\n})\\n//# sourceURL=${scriptName}.user.js'
        );
        run(
          ${apiArgs}
        );
        console.log('[loader] Successfully loaded script from:', scriptUrl);
      })
    )
    .catch((err) => {
      console.error('[loader] Failed to load script:', err);
    });
})();
`;
}

// --- Build -----------------------------------------------------------------------------------

function finish(scriptDir, scriptName, outputFiles) {
  const meta = readMeta(scriptDir);
  const code = outputFiles.find((file) => file.path.endsWith('.js'))?.text ?? '';

  if (isDebug) {
    writeDebug(scriptDir, scriptName, meta, code);
    console.log(`[debug] ${scriptName} → dist-debug/`);
    return;
  }

  const distChanged = writeDist(scriptDir, scriptName, meta, code);
  const loaderPath = path.join(scriptDir, 'tampermonkey-loader.user.js');
  const loaderChanged = emit(loaderPath, loaderSource(scriptName, meta));

  if (!isCheck) {
    const status = distChanged || loaderChanged ? 'updated' : 'unchanged';
    console.log(`[built] ${scriptName} (${status})`);
  }
}

async function buildScript(scriptDir) {
  const scriptName = path.basename(scriptDir);
  const options = {
    entryPoints: [path.join(scriptDir, 'src', 'index.ts')],
    outfile: path.join(scriptDir, 'dist', `${scriptName}.user.js`),
    bundle: true,
    write: false,
    format: 'iife',
    platform: 'browser',
    target: 'es2020',
    minify: !isDebug,
    sourcemap: isDebug ? 'inline' : false,
    define: { 'process.env.NODE_ENV': isDebug ? '"development"' : '"production"' },
    logLevel: 'warning',
  };

  if (isWatch) {
    const ctx = await esbuild.context({
      ...options,
      plugins: [
        {
          name: 'finish',
          setup(build) {
            build.onEnd((result) => {
              if (result.errors.length === 0) {
                finish(scriptDir, scriptName, result.outputFiles ?? []);
              }
            });
          },
        },
      ],
    });
    await ctx.watch();
    return;
  }

  const result = await esbuild.build(options);
  finish(scriptDir, scriptName, result.outputFiles);
}

async function main() {
  const scriptsDir = path.join(repoRoot, 'scripts');
  const scriptDirs = fs
    .readdirSync(scriptsDir)
    .filter((name) => !scriptFilter || name === scriptFilter)
    .map((name) => path.join(scriptsDir, name))
    .filter((dir) => fs.existsSync(path.join(dir, 'src', 'index.ts')));

  if (scriptDirs.length === 0) {
    console.error(scriptFilter ? `No script named "${scriptFilter}"` : 'No scripts found');
    process.exit(1);
  }

  await Promise.all(scriptDirs.map(buildScript));

  if (isWatch) {
    console.log(`Watching ${scriptDirs.length} script(s)…`);
  } else if (isCheck && staleFiles.length) {
    console.error('These built files are out of date. Run `npm run build` and commit them:');
    staleFiles.forEach((file) => console.error(`  ${file}`));
    process.exit(1);
  } else if (isCheck) {
    console.log(`All ${scriptDirs.length} build(s) are up to date.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
