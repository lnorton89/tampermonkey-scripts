// ==UserScript==
// @name         Example Site Tweaks (loader)
// @namespace    https://github.com/lnorton89/tampermonkey-scripts
// @version      1.0.0
// @description  Loader — fetches the latest build from GitHub
// @author       lnorton89
// @match        https://example.com/*
// @match        https://www.example.com/*
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function () {
  'use strict';

  // Change YOUR_USERNAME and the branch if needed.
  // Point at the compiled dist file, not the source.
  const SCRIPT_URL =
    'https://raw.githubusercontent.com/lnorton89/tampermonkey-scripts/main/scripts/example-site/dist/example-site.user.js';

  GM_xmlhttpRequest({
    method: 'GET',
    url: SCRIPT_URL + '?_=' + Date.now(), // bust CDN cache during dev
    onload(res) {
      if (res.status === 200) {
        // eslint-disable-next-line no-eval
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
