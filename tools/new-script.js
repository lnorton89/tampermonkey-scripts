#!/usr/bin/env node
// Scaffolds scripts/<site>/ from templates/script and builds it.
//
//   npm run new -- example.com

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const site = (process.argv[2] ?? '').trim().toLowerCase();

if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(site)) {
  console.error('Usage: npm run new -- <domain>   e.g. npm run new -- example.com');
  process.exit(1);
}

const target = path.join(repoRoot, 'scripts', site);
if (fs.existsSync(target)) {
  console.error(`scripts/${site} already exists`);
  process.exit(1);
}

const id = `${site.replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/g, '-')}-enhancer`;
const name = `${site} Enhancer`;
const templateDir = path.join(repoRoot, 'templates', 'script');

function copy(from, to) {
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const source = path.join(from, entry.name);
    const destination = path.join(to, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(destination, { recursive: true });
      copy(source, destination);
    } else {
      const text = fs
        .readFileSync(source, 'utf8')
        .replaceAll('__SITE__', site)
        .replaceAll('__NAME__', name)
        .replaceAll('__ID__', id);
      fs.writeFileSync(destination, text);
    }
  }
}

fs.mkdirSync(target, { recursive: true });
copy(templateDir, target);
execFileSync(process.execPath, [path.join(repoRoot, 'build.js'), '--script', site], {
  stdio: 'inherit',
});

console.log(`\nCreated scripts/${site}. Next:
  1. Edit scripts/${site}/src/meta.ts (@match, @grant, @run-at).
  2. Write the script in scripts/${site}/src/.
  3. Commit and push, then install scripts/${site}/dist/${site}.user.js from GitHub.`);
