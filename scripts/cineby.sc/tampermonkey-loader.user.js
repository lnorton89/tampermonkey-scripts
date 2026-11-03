// ==UserScript==
// @name         cineby.sc (loader)
// @namespace    https://github.com/lnorton89/tampermonkey-scripts
// @version      1.2.0
// @description  Loader — fetches the latest build from GitHub
// @updateURL    https://raw.githubusercontent.com/lnorton89/tampermonkey-scripts/main/scripts/cineby.sc/tampermonkey-loader.user.js
// @downloadURL  https://raw.githubusercontent.com/lnorton89/tampermonkey-scripts/main/scripts/cineby.sc/tampermonkey-loader.user.js
// @match        *://*.cineby.sc/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @connect      github.com
// @connect      api.github.com
// @connect      raw.githubusercontent.com
// @connect      ntfy.sh
// @connect      *
// ==/UserScript==

(function () {
  'use strict';

  const BRANCH_SCRIPT_URL = 'https://raw.githubusercontent.com/lnorton89/tampermonkey-scripts/main/scripts/cineby.sc/dist/cineby.sc.user.js';
  const COMMIT_SCRIPT_URL = 'https://raw.githubusercontent.com/lnorton89/tampermonkey-scripts/{sha}/scripts/cineby.sc/dist/cineby.sc.user.js';
  const LATEST_COMMIT_URL = 'https://api.github.com/repos/lnorton89/tampermonkey-scripts/commits/main';
  const SHA_CACHE_KEY = '__loader:latest-commit';
  const SHA_CACHE_MS = 60000;

  function get(url, headers) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: 'GET',
        url,
        headers,
        nocache: true,
        timeout: 8000,
        onload: resolve,
        onerror: reject,
        ontimeout: reject,
      });
    });
  }

  // raw.githubusercontent.com caches branch URLs for 5 minutes and ignores query strings, so a
  // push can take that long to show up. Loading by commit SHA always gets the latest build; the
  // branch URL is the fallback when the GitHub API is unreachable or rate limited.
  async function resolveScriptUrl() {
    const cached = GM_getValue(SHA_CACHE_KEY, null);
    if (cached && cached.sha && Date.now() - cached.at < SHA_CACHE_MS) {
      return COMMIT_SCRIPT_URL.replace('{sha}', cached.sha);
    }

    try {
      const res = await get(LATEST_COMMIT_URL, { Accept: 'application/vnd.github.sha' });
      const sha = res.status === 200 ? String(res.responseText).trim() : '';
      if (/^[0-9a-f]{40}$/.test(sha)) {
        GM_setValue(SHA_CACHE_KEY, { sha, at: Date.now() });
        return COMMIT_SCRIPT_URL.replace('{sha}', sha);
      }

      console.warn('[loader] Latest commit lookup failed:', res.status);
    } catch (err) {
      console.warn('[loader] Latest commit lookup failed:', err);
    }

    return BRANCH_SCRIPT_URL + '?_=' + Date.now();
  }

  resolveScriptUrl()
    .then((scriptUrl) =>
      get(scriptUrl).then((res) => {
        if (res.status !== 200) {
          console.error('[loader] Failed to fetch script:', res.status, scriptUrl);
          return;
        }

        // eval keeps the evaluation context the build has always had; the wrapper function only
        // adds the granted APIs as parameters.
        const run = eval(
          '(function (GM_xmlhttpRequest, GM_getValue, GM_setValue) {\n' +
            res.responseText +
            '\n})\n//# sourceURL=cineby.sc.user.js'
        );
        run(
          typeof GM_xmlhttpRequest === 'undefined' ? undefined : GM_xmlhttpRequest,
          typeof GM_getValue === 'undefined' ? undefined : GM_getValue,
          typeof GM_setValue === 'undefined' ? undefined : GM_setValue
        );
        console.log('[loader] Successfully loaded script from:', scriptUrl);
      })
    )
    .catch((err) => {
      console.error('[loader] Failed to load script:', err);
    });
})();
