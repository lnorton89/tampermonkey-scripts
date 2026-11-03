/* eslint-disable */
// @ts-nocheck
import {
  AD_RELOAD_SESSION_KEY,
  SCRIPT_ID,
  SITE_AD_SCRIPT_ID,
  SITE_AD_SCRIPT_SRC_PATTERN,
  SITE_PREFERENCES_KEY,
} from '../config/constants';

// Aether injects a popunder ad script from an effect whenever its hidden `enableAds` preference
// is on (the default; its /noads page is the only switch). That script hijacks the first click
// on the page to open ad tabs.
function isSiteAdScript(node) {
  return (
    node?.tagName === 'SCRIPT' &&
    (node.id === SITE_AD_SCRIPT_ID || SITE_AD_SCRIPT_SRC_PATTERN.test(node.src || ''))
  );
}

// Turns the site's own preference off so it stops trying to inject the script. The site only
// saves its preferences store once a setting changes, so a missing store is created in the same
// persisted shape (version 0); the app merges it over its defaults.
function disableSiteAdsPreference() {
  try {
    const saved = JSON.parse(localStorage.getItem(SITE_PREFERENCES_KEY) || 'null') || {
      state: {},
      version: 0,
    };
    if (!saved.state || saved.state.enableAds === false) {
      return;
    }

    saved.state.enableAds = false;
    localStorage.setItem(SITE_PREFERENCES_KEY, JSON.stringify(saved));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to update site ad preference.`, error);
  }
}

// The preference only applies before the app reads it, and an account sync can turn it back on,
// so the script is also refused at insertion.
function blockSiteAdScriptInsertion() {
  const pageWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
  const nodePrototype = pageWindow.Node.prototype;
  const originalAppendChild = nodePrototype.appendChild;
  const originalInsertBefore = nodePrototype.insertBefore;

  nodePrototype.appendChild = function (node) {
    return isSiteAdScript(node) ? node : originalAppendChild.call(this, node);
  };
  nodePrototype.insertBefore = function (node, referenceNode) {
    return isSiteAdScript(node) ? node : originalInsertBefore.call(this, node, referenceNode);
  };
}

export function installAdBlock() {
  disableSiteAdsPreference();
  blockSiteAdScriptInsertion();
}

// This build is fetched asynchronously by the loader, so on a slow fetch the app may have loaded
// the ad script first. Its click hijack can't be undone in place, so the page reloads once per
// tab session; the preference and insertion block keep it out after that.
export function removeLoadedSiteAdScript() {
  const adScript = document.getElementById(SITE_AD_SCRIPT_ID);
  if (!adScript) {
    return;
  }

  adScript.remove();

  try {
    if (sessionStorage.getItem(AD_RELOAD_SESSION_KEY)) {
      return;
    }

    sessionStorage.setItem(AD_RELOAD_SESSION_KEY, '1');
  } catch (error) {
    return;
  }

  // The app saves its in-memory preferences back over ours, so write the flag again right before
  // the reload hydrates them.
  disableSiteAdsPreference();
  console.log(`[${SCRIPT_ID}] Reloading once to drop the site's popup ad script.`);
  location.reload();
}
