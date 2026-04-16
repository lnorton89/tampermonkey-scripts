#!/usr/bin/env node
// build.js — discovers every script under scripts/*/src/index.ts and builds it

import * as esbuild from 'esbuild';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const isWatch = process.argv.includes('--watch');

/**
 * Reads the meta.ts banner comment from a script's src directory and returns
 * it as a string to prepend to the bundle. The meta block MUST be the first
 * thing in meta.ts as a block comment: /* ==UserScript== ... ==\/UserScript== *\/
 */
function readMetaBanner(scriptDir) {
  const metaPath = path.join(scriptDir, 'src', 'meta.ts');
  if (!fs.existsSync(metaPath)) return '';
  const content = fs.readFileSync(metaPath, 'utf8');
  const match = content.match(/\/\*[\s\S]*?\*\//);
  return match ? match[0] + '\n\n' : '';
}

/**
 * Extracts version from meta.ts @version tag.
 */
function readVersion(scriptDir) {
  const metaPath = path.join(scriptDir, 'src', 'meta.ts');
  if (!fs.existsSync(metaPath)) return '0.0.0';
  const content = fs.readFileSync(metaPath, 'utf8');
  const match = content.match(/@version\s+(\S+)/);
  return match ? match[1] : '0.0.0';
}

/**
 * Gets current git commit info.
 */
function getGitInfo() {
  try {
    const commitHash = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    const commitHashShort = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    const authorName = execSync('git log -1 --format="%an"', { encoding: 'utf8' }).trim();
    const authorEmail = execSync('git log -1 --format="%ae"', { encoding: 'utf8' }).trim();
    const commitDate = execSync('git log -1 --format="%ai"', { encoding: 'utf8' }).trim();
    const commitMessage = execSync('git log -1 --format="%s"', { encoding: 'utf8' }).trim();
    const isDirty = execSync('git status --porcelain', { encoding: 'utf8' }).trim().length > 0;

    return {
      commitHash,
      commitHashShort,
      branch,
      authorName,
      authorEmail,
      commitDate,
      commitMessage,
      isDirty,
    };
  } catch {
    return {
      commitHash: 'unknown',
      commitHashShort: 'unknown',
      branch: 'unknown',
      authorName: 'unknown',
      authorEmail: 'unknown',
      commitDate: 'unknown',
      commitMessage: 'unknown',
      isDirty: false,
    };
  }
}

async function buildScript(entryPoint) {
  const scriptDir = path.dirname(path.dirname(entryPoint)); // scripts/<name>
  const scriptName = path.basename(scriptDir);
  const outDir = path.join(scriptDir, 'dist');
  const outFile = path.join(outDir, `${scriptName}.user.js`);

  fs.mkdirSync(outDir, { recursive: true });

  const banner = readMetaBanner(scriptDir);
  const version = readVersion(scriptDir);
  const buildDate = new Date().toISOString();
  const git = getGitInfo();

  const buildOptions = {
    entryPoints: [entryPoint],
    bundle: true,
    outfile: outFile,
    format: 'iife',
    platform: 'browser',
    target: 'es2020',
    sourcemap: false,
    minify: false, // Keep readable — userscripts benefit from being human-inspectable
    banner: {
      js: banner,
    },
    define: {
      'process.env.NODE_ENV': '"production"',
      __VERSION__: JSON.stringify(version),
      __BUILD_DATE__: JSON.stringify(buildDate),
      __SCRIPT_NAME__: JSON.stringify(scriptName),
      __GIT_COMMIT_HASH__: JSON.stringify(git.commitHash),
      __GIT_COMMIT_HASH_SHORT__: JSON.stringify(git.commitHashShort),
      __GIT_BRANCH__: JSON.stringify(git.branch),
      __GIT_AUTHOR_NAME__: JSON.stringify(git.authorName),
      __GIT_AUTHOR_EMAIL__: JSON.stringify(git.authorEmail),
      __GIT_COMMIT_DATE__: JSON.stringify(git.commitDate),
      __GIT_COMMIT_MESSAGE__: JSON.stringify(git.commitMessage),
      __GIT_IS_DIRTY__: JSON.stringify(git.isDirty),
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
