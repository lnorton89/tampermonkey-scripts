// ==UserScript==
// @name         example-site (loader)
// @namespace    https://github.com/lnorton89/tampermonkey-scripts
// @version      1.0.0
// @description  Loader — fetches the latest build from GitHub
// @match        https://example.com/*
// @match        https://www.example.com/*
// @run-at       document-idle
// @grant        GM_xmlhttpRequest
// @connect      github.com
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function () {
  'use strict';

  const SCRIPT_URL = 'https://raw.githubusercontent.com/lnorton89/tampermonkey-scripts/main/scripts/example-site/dist/example-site.user.js';

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
