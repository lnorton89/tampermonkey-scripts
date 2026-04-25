// ==UserScript==
// @name         lookmovie2.to (loader)
// @namespace    https://github.com/lnorton89/tampermonkey-scripts
// @version      1.0.0
// @description  Loader — fetches the latest build from GitHub
// @match        *://*.lookmovie2.to/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      github.com
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function () {
  'use strict';

  const SCRIPT_URL = 'https://raw.githubusercontent.com/lnorton89/tampermonkey-scripts/main/scripts/lookmovie2.to/dist/lookmovie2.to.user.js';

  const AD_BYPASS_BOOTSTRAP = `
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
  `;


  function injectIntoPage(source) {
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


  injectIntoPage(AD_BYPASS_BOOTSTRAP);



  GM_xmlhttpRequest({
    method: 'GET',
    url: SCRIPT_URL + '?_=' + Date.now(),
    onload(res) {
      if (res.status === 200) {
        injectIntoPage(res.responseText);
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
