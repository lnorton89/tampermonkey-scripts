#!/usr/bin/env node
// build.js — discovers every script under scripts/*/src/index.ts and builds it

import * as esbuild from 'esbuild';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';

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

async function buildScript(entryPoint) {
  const scriptDir = path.dirname(path.dirname(entryPoint)); // scripts/<name>
  const scriptName = path.basename(scriptDir);
  const outDir = path.join(scriptDir, 'dist');
  const outFile = path.join(outDir, `${scriptName}.user.js`);

  fs.mkdirSync(outDir, { recursive: true });

  const banner = readMetaBanner(scriptDir);

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
