// ==UserScript==
// @name         lookmovie2.to (loader)
// @namespace    https://github.com/lnorton89/tampermonkey-scripts
// @version      1.0.1
// @description  Loader — fetches the latest build from GitHub
// @match        *://*.lookmovie2.to/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      github.com
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function () {
  'use strict';

  const SCRIPT_URL = 'https://raw.githubusercontent.com/lnorton89/tampermonkey-scripts/main/scripts/lookmovie2.to/dist/lookmovie2.to.user.js';

  const SCRIPT_ID = 'lookmovie2-enhancer';
  const STORAGE_KEY = SCRIPT_ID + ':settings';
  const TRAP_KEY = '__lookmovie2EnhancerAdBypassTrap';
  const pageWindow = typeof unsafeWindow === 'undefined' ? window : unsafeWindow;
  const pageDocument = pageWindow.document;

  function isAdBypassEnabled() {
    try {
      const parsed = JSON.parse(pageWindow.localStorage.getItem(STORAGE_KEY) || '{}');
      return typeof parsed.adTimerBypass === 'boolean' ? parsed.adTimerBypass : true;
    } catch (_) {
      return true;
    }
  }

  function hidePrePlaybackAdUi() {
    const playerPreInitAds = pageDocument.querySelector('.player-pre-init-ads');
    if (playerPreInitAds) {
      playerPreInitAds.classList.add('tw-hidden');
      playerPreInitAds.classList.add('finished');
    }

    const loadingPleaseWait = pageDocument.querySelector('.pre-init-ads--loading-please-wait');
    if (loadingPleaseWait) {
      loadingPleaseWait.classList.add('tw-hidden');
      loadingPleaseWait.classList.add('!tw-hidden');
    }

    const adTimer = pageDocument.querySelector('.player-pre-init-ads_timer');
    if (adTimer) {
      adTimer.classList.add('tw-hidden');
      adTimer.classList.add('tw-opacity-0');
    }

    pageDocument.querySelectorAll('.player-pre-init-ads_timer__value').forEach((timerValue) => {
      timerValue.textContent = '0';
    });

    pageDocument.querySelectorAll('.pre-init-ads--close').forEach((button) => {
      button.classList.remove('tw-hidden');
    });
    pageDocument.querySelectorAll('.pre-init-ads--back-button').forEach((button) => {
      button.classList.remove('tw-hidden');
    });

    if (typeof pageWindow._counterTimeout !== 'undefined') {
      pageWindow.clearInterval(pageWindow._counterTimeout);
      pageWindow._counterTimeout = undefined;
    }

    if (typeof pageWindow.enableWindowScroll === 'function') {
      pageWindow.enableWindowScroll();
    }
  }

  function bypassPrePlaybackCounter() {
    console.log('[' + SCRIPT_ID + '] initPrePlaybackCounter bypassed by loader.');
    pageWindow._preInitAdsTimestamp = Date.now();

    const bypassPromise = Promise.resolve()
      .then(hidePrePlaybackAdUi)
      .finally(() => {
        if (typeof pageWindow.enableWindowScroll === 'function') {
          pageWindow.enableWindowScroll();
        }
      });

    bypassPromise.cancel = () => {
      if (typeof pageWindow._counterTimeout !== 'undefined') {
        pageWindow.clearInterval(pageWindow._counterTimeout);
        pageWindow._counterTimeout = undefined;
      }
      hidePrePlaybackAdUi();
    };

    return bypassPromise;
  }

  function installAdBypassTrap() {
    const existingTrapState = pageWindow[TRAP_KEY];
    const trapState =
      existingTrapState && typeof existingTrapState === 'object' ? existingTrapState : {};
    pageWindow[TRAP_KEY] = trapState;

    const descriptor = Object.getOwnPropertyDescriptor(pageWindow, 'initPrePlaybackCounter');
    if (descriptor && descriptor.configurable === false) {
      return;
    }

    const descriptorHasGetter = !!descriptor && typeof descriptor.get === 'function';
    const descriptorValue = descriptorHasGetter
      ? descriptor.get.call(pageWindow)
      : descriptor
        ? descriptor.value
        : undefined;
    let currentValue =
      trapState.installed && descriptorHasGetter && 'currentValue' in trapState
        ? trapState.currentValue
        : descriptorValue;
    trapState.installed = true;
    trapState.currentValue = currentValue;

    Object.defineProperty(pageWindow, 'initPrePlaybackCounter', {
      configurable: true,
      enumerable: descriptor ? descriptor.enumerable : true,
      get() {
        return isAdBypassEnabled() ? bypassPrePlaybackCounter : currentValue;
      },
      set(nextValue) {
        currentValue = nextValue;
        trapState.currentValue = nextValue;
      },
    });
  }

  installAdBypassTrap();
  hidePrePlaybackAdUi();
  pageWindow.setInterval(() => {
    if (isAdBypassEnabled()) {
      installAdBypassTrap();
      hidePrePlaybackAdUi();
    }
  }, 250);



  GM_xmlhttpRequest({
    method: 'GET',
    url: SCRIPT_URL + '?_=' + Date.now(),
    onload(res) {
      if (res.status === 200) {
        eval(res.responseText);
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
