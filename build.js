#!/usr/bin/env node
// build.js — discovers every script under scripts/*/src/index.ts and builds it

import * as esbuild from 'esbuild';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';

const isWatch = process.argv.includes('--watch');

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const repoUrl =
  pkg.repository?.url?.replace('git+', '').replace('.git', '') ||
  'https://github.com/unknown/tampermonkey-scripts';
const rawUrl = repoUrl.replace('github.com', 'raw.githubusercontent.com');
const branch = 'main';

function readMetaBanner(scriptDir) {
  const metaPath = path.join(scriptDir, 'src', 'meta.ts');
  if (!fs.existsSync(metaPath)) return '';
  const content = fs.readFileSync(metaPath, 'utf8');
  const match = content.match(/\/\*[\s\S]*?\*\//);
  return match ? match[0] + '\n\n' : '';
}

function readVersion(scriptDir) {
  const metaPath = path.join(scriptDir, 'src', 'meta.ts');
  if (!fs.existsSync(metaPath)) return '0.0.0';
  const content = fs.readFileSync(metaPath, 'utf8');
  const match = content.match(/@version\s+(\S+)/);
  return match ? match[1] : '0.0.0';
}

function generateLoader(scriptDir, scriptName) {
  const loaderPath = path.join(scriptDir, 'tampermonkey-loader.user.js');
  const scriptUrl = `${rawUrl}/${branch}/${scriptName}/dist/${scriptName}.user.js`;

  const template = `// ==UserScript==
// @name         ${scriptName} (loader)
// @namespace    ${pkg.repository?.url?.replace('git+', '').replace('.git', '') || 'http://tampermonkey.net/'}
// @version      1.0.0
// @description  Loader — fetches the latest build from GitHub
// @match        *://*.example.com/*
// @grant        GM_xmlhttpRequest
// @connect      github.com
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function () {
  'use strict';

  const SCRIPT_URL = '${scriptUrl}';

  GM_xmlhttpRequest({
    method: 'GET',
    url: SCRIPT_URL + '?_=' + Date.now(),
    onload(res) {
      if (res.status === 200) {
        eval(res.responseText);
      } else {
        console.error('[loader] Failed to fetch script:', res.status, SCRIPT_URL);
      }
    },
    onerror(err) {
      console.error('[loader] Network error fetching script:', err);
    },
  });
})();
`;

  fs.writeFileSync(loaderPath, template);
  console.log(`[loader] ${scriptName} → ${loaderPath}`);
}

async function buildScript(entryPoint) {
  const scriptDir = path.dirname(path.dirname(entryPoint));
  const scriptName = path.basename(scriptDir);
  const outDir = path.join(scriptDir, 'dist');
  const outFile = path.join(outDir, `${scriptName}.user.js`);

  fs.mkdirSync(outDir, { recursive: true });

  const banner = readMetaBanner(scriptDir);
  const version = readVersion(scriptDir);
  const buildDate = new Date().toISOString();

  const buildOptions = {
    entryPoints: [entryPoint],
    bundle: true,
    outfile: outFile,
    format: 'iife',
    platform: 'browser',
    target: 'es2020',
    sourcemap: false,
    minify: false,
    banner: {
      js: banner,
    },
    define: {
      'process.env.NODE_ENV': '"production"',
      __VERSION__: JSON.stringify(version),
      __BUILD_DATE__: JSON.stringify(buildDate),
      __SCRIPT_NAME__: JSON.stringify(scriptName),
    },
    logLevel: 'info',
  };

  if (isWatch) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    console.log(`[watch] ${scriptName}`);
  } else {
    await esbuild.build(buildOptions);
    console.log(`[built] ${scriptName} → ${outFile}`);
  }

  generateLoader(scriptDir, scriptName);
}

async function main() {
  const entries = await glob('scripts/*/src/index.ts');

  if (entries.length === 0) {
    console.warn('No scripts found. Expected scripts/*/src/index.ts');
    process.exit(0);
  }

  await Promise.all(entries.map(buildScript));

  if (!isWatch) {
    console.log(`\nBuilt ${entries.length} script(s).`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
