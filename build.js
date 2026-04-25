#!/usr/bin/env node
// build.js — discovers every script under scripts/*/src/index.ts and builds it

import * as esbuild from 'esbuild';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';

const isWatch = process.argv.includes('--watch');
const isDebug = process.argv.includes('--debug');

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

// Default feature flags (can be overridden per-script via .build-flags.json)
const DEFAULT_FLAGS = {
  __ENABLE_AD_BYPASS__: 'true',
  __ENABLE_AUTO_FULLSCREEN__: 'true',
  __ENABLE_AUTO_PLAY__: 'true',
  __ENABLE_WATCHLIST__: 'true',
  __ENABLE_UI_OVERLAY__: 'true',
  __ENABLE_PAGE_HELPERS__: 'true',
  __ENABLE_VIDEO_OBSERVER__: 'true',
};

function readScriptFlags(scriptDir) {
  const flagsFile = isDebug ? '.build-flags-debug.json' : '.build-flags.json';
  const flagsPath = path.join(scriptDir, flagsFile);
  if (!fs.existsSync(flagsPath)) return { ...DEFAULT_FLAGS };

  try {
    const customFlags = JSON.parse(fs.readFileSync(flagsPath, 'utf8'));
    const flags = {
      __ENABLE_AD_BYPASS__: customFlags.adBypass ? 'true' : 'false',
      __ENABLE_AUTO_FULLSCREEN__: customFlags.autoFullscreen ? 'true' : 'false',
      __ENABLE_AUTO_PLAY__: customFlags.autoPlay ? 'true' : 'false',
      __ENABLE_WATCHLIST__: customFlags.watchlist ? 'true' : 'false',
      __ENABLE_UI_OVERLAY__: customFlags.uiOverlay ? 'true' : 'false',
      __ENABLE_PAGE_HELPERS__: customFlags.pageHelpers ? 'true' : 'false',
      __ENABLE_VIDEO_OBSERVER__: customFlags.videoObserver ? 'true' : 'false',
    };
    console.log(`[build] Loaded flags from ${flagsPath}:`, flags);
    return flags;
  } catch (e) {
    console.warn(`[build] Failed to read flags from ${flagsPath}, using defaults`);
    return { ...DEFAULT_FLAGS };
  }
}
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

function readMetaMatches(scriptDir) {
  const metaPath = path.join(scriptDir, 'src', 'meta.ts');
  if (!fs.existsSync(metaPath)) return ['*://*.example.com/*'];

  const content = fs.readFileSync(metaPath, 'utf8');
  const matches = [...content.matchAll(/@match\s+(.+)/g)].map((match) => match[1].trim());
  return matches.length ? matches : ['*://*.example.com/*'];
}

function readMetaRunAt(scriptDir) {
  const metaPath = path.join(scriptDir, 'src', 'meta.ts');
  if (!fs.existsSync(metaPath)) return 'document-start';

  const content = fs.readFileSync(metaPath, 'utf8');
  const match = content.match(/@run-at\s+(\S+)/);
  return match ? match[1].trim() : 'document-start';
}

function generateLoader(scriptDir, scriptName) {
  const loaderPath = path.join(scriptDir, 'tampermonkey-loader.user.js');
  const scriptUrl = `${rawUrl}/${branch}/scripts/${scriptName}/dist/${scriptName}.user.js`;
  const matchLines = readMetaMatches(scriptDir)
    .map((match) => `// @match        ${match}`)
    .join('\n');
  const runAt = readMetaRunAt(scriptDir);
  const adBypassBootstrap =
    scriptName === 'lookmovie2.to'
      ? `  const AD_BYPASS_BOOTSTRAP = \`
    (function () {
      'use strict';

      const SCRIPT_ID = 'lookmovie2-enhancer';
      const STORAGE_KEY = SCRIPT_ID + ':settings';
      const TRAP_KEY = '__lookmovie2EnhancerAdBypassTrap';

      const existingTrapState = window[TRAP_KEY];
      if (existingTrapState && existingTrapState.installed) {
        return;
      }
      const trapState =
        existingTrapState && typeof existingTrapState === 'object' ? existingTrapState : {};
      trapState.installed = true;
      window[TRAP_KEY] = trapState;

      function isEnabled() {
        try {
          const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
          return typeof parsed.adTimerBypass === 'boolean' ? parsed.adTimerBypass : true;
        } catch (_) {
          return true;
        }
      }

      function hidePrePlaybackAdUi() {
        const playerPreInitAds = document.querySelector('.player-pre-init-ads');
        if (playerPreInitAds) {
          playerPreInitAds.classList.add('tw-hidden');
          playerPreInitAds.classList.add('finished');
        }

        const loadingPleaseWait = document.querySelector('.pre-init-ads--loading-please-wait');
        if (loadingPleaseWait) {
          loadingPleaseWait.classList.add('tw-hidden');
        }

        const adTimer = document.querySelector('.player-pre-init-ads_timer');
        if (adTimer) {
          adTimer.classList.add('tw-opacity-0');
        }

        document.querySelectorAll('.pre-init-ads--close').forEach((button) => {
          button.classList.remove('tw-hidden');
        });
        document.querySelectorAll('.pre-init-ads--back-button').forEach((button) => {
          button.classList.remove('tw-hidden');
        });

        if (typeof window._counterTimeout !== 'undefined') {
          clearInterval(window._counterTimeout);
          window._counterTimeout = undefined;
        }

        if (typeof window.enableWindowScroll === 'function') {
          window.enableWindowScroll();
        }
      }

      function bypassPrePlaybackCounter() {
        console.log('[' + SCRIPT_ID + '] initPrePlaybackCounter bypassed by loader.');
        return Promise.resolve()
          .then(hidePrePlaybackAdUi)
          .finally(() => {
            if (typeof window.enableWindowScroll === 'function') {
              window.enableWindowScroll();
            }
          });
      }

      const descriptor = Object.getOwnPropertyDescriptor(window, 'initPrePlaybackCounter');
      if (descriptor && descriptor.configurable === false) {
        return;
      }

      let currentValue =
        descriptor && typeof descriptor.get === 'function'
          ? descriptor.get.call(window)
          : descriptor
            ? descriptor.value
            : undefined;
      trapState.currentValue = currentValue;

      Object.defineProperty(window, 'initPrePlaybackCounter', {
        configurable: true,
        enumerable: descriptor ? descriptor.enumerable : true,
        get() {
          return isEnabled() ? bypassPrePlaybackCounter : currentValue;
        },
        set(nextValue) {
          currentValue = nextValue;
          trapState.currentValue = nextValue;
        },
      });

      hidePrePlaybackAdUi();
      window.setInterval(() => {
        if (isEnabled()) {
          hidePrePlaybackAdUi();
        }
      }, 250);
    })();
  \`;

`
      : '';
  const installAdBypassBootstrap =
    scriptName === 'lookmovie2.to' ? '  injectIntoPage(AD_BYPASS_BOOTSTRAP);\n\n' : '';
  const pageInjectionHelper =
    scriptName === 'lookmovie2.to'
      ? `  function injectIntoPage(source) {
    const target = document.documentElement || document.head || document.body;
    if (!target) {
      document.addEventListener(
        'DOMContentLoaded',
        () => {
          injectIntoPage(source);
        },
        { once: true },
      );
      return;
    }

    const script = document.createElement('script');
    script.textContent = source;
    target.appendChild(script);
    script.remove();
  }

`
      : '';
  const loadResponse =
    scriptName === 'lookmovie2.to' ? 'injectIntoPage(res.responseText);' : 'eval(res.responseText);';
  const loaderBootstrap = [adBypassBootstrap, pageInjectionHelper, installAdBypassBootstrap]
    .filter(Boolean)
    .join('\n');

  const template = `// ==UserScript==
// @name         ${scriptName} (loader)
// @namespace    ${pkg.repository?.url?.replace('git+', '').replace('.git', '') || 'http://tampermonkey.net/'}
// @version      1.0.0
// @description  Loader — fetches the latest build from GitHub
${matchLines}
// @run-at       ${runAt}
// @grant        GM_xmlhttpRequest
// @connect      github.com
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function () {
  'use strict';

  const SCRIPT_URL = '${scriptUrl}';${loaderBootstrap ? `\n\n${loaderBootstrap}` : ''}

  GM_xmlhttpRequest({
    method: 'GET',
    url: SCRIPT_URL + '?_=' + Date.now(),
    onload(res) {
      if (res.status === 200) {
        ${loadResponse}
        console.log('[loader] Successfully loaded script from:', SCRIPT_URL);
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
  const outDir = path.join(scriptDir, isDebug ? 'dist-debug' : 'dist');
  const outFile = path.join(outDir, `${scriptName}${isDebug ? '.debug' : ''}.user.js`);

  fs.mkdirSync(outDir, { recursive: true });

  const banner = readMetaBanner(scriptDir);
  const version = readVersion(scriptDir);
  const buildDate = new Date().toISOString();
  const scriptFlags = readScriptFlags(scriptDir);

  const buildOptions = {
    entryPoints: [entryPoint],
    bundle: true,
    outfile: outFile,
    format: 'iife',
    platform: 'browser',
    target: 'es2020',
    sourcemap: false,
    minify: true,
    banner: {
      js: banner,
    },
    define: {
      'process.env.NODE_ENV': '"production"',
      __VERSION__: JSON.stringify(version),
      __BUILD_DATE__: JSON.stringify(buildDate),
      __SCRIPT_NAME__: JSON.stringify(scriptName),
      ...scriptFlags,
    },
    logLevel: 'info',
  };

  if (isWatch) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    console.log(`[watch${isDebug ? ' DEBUG' : ''}] ${scriptName}`);
  } else {
    await esbuild.build(buildOptions);
    console.log(`[built${isDebug ? ' DEBUG' : ''}] ${scriptName} → ${outFile}`);
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
