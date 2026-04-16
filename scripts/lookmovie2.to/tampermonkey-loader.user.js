// ==UserScript==
// @name         LookMovie2 Enhancer (loader)
// @namespace    http://tampermonkey.net/
// @version      1.2.0
// @description  Loader — fetches the latest build from GitHub
// @match        *://*.lookmovie2.to/*
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function () {
  'use strict';

  // Change YOUR_USERNAME and the branch if needed.
  // Point at the compiled dist file, not the source.
  const SCRIPT_URL =
    'https://raw.githubusercontent.com/lnorton89/tampermonkey-scripts/main/scripts/lookmovie2.to/dist/lookmovie2-enhancer.user.js';

  GM_xmlhttpRequest({
    method: 'GET',
    url: SCRIPT_URL + '?_=' + Date.now(), // bust CDN cache during dev
    onload(res) {
      if (res.status === 200) {
        // eslint-disable-next-line no-eval
        eval(res.responseText);
      } else {
        console.error('[lm2-loader] Failed to fetch script:', res.status, SCRIPT_URL);
      }
    },
    onerror(err) {
      console.error('[lm2-loader] Network error fetching script:', err);
    },
  });
})();
