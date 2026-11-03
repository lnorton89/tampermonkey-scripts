// ==UserScript==
// @name         fmovies.nz (loader)
// @namespace    https://github.com/lnorton89/tampermonkey-scripts
// @version      1.1.0
// @description  Loader — fetches the latest build from GitHub
// @updateURL    https://raw.githubusercontent.com/lnorton89/tampermonkey-scripts/main/scripts/fmovies.nz/tampermonkey-loader.user.js
// @downloadURL  https://raw.githubusercontent.com/lnorton89/tampermonkey-scripts/main/scripts/fmovies.nz/tampermonkey-loader.user.js
// @match        https://fmovies.nz/*
// @match        https://www.fmovies.nz/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      github.com
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function () {
  'use strict';

  const SCRIPT_URL = 'https://raw.githubusercontent.com/lnorton89/tampermonkey-scripts/main/scripts/fmovies.nz/dist/fmovies.nz.user.js';

  GM_xmlhttpRequest({
    method: 'GET',
    url: SCRIPT_URL + '?_=' + Date.now(),
    onload(res) {
      if (res.status === 200) {
        // eval keeps the evaluation context the build has always had; the wrapper function only
        // adds the granted APIs as parameters.
        const run = eval(
          '(function (GM_xmlhttpRequest) {\n' +
            res.responseText +
            '\n})\n//# sourceURL=fmovies.nz.user.js'
        );
        run(
          typeof GM_xmlhttpRequest === 'undefined' ? undefined : GM_xmlhttpRequest
        );
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
