import { ensureStyle } from '@userscripts/core';
import { AD_BYPASS_STYLE_ID, SCRIPT_ID } from '../config/constants';

const PRE_INIT_ADS_SELECTOR = '.player-pre-init-ads';
const PRE_INIT_ADS_CLOSE_SELECTOR = '.pre-init-ads--close, .pre-init-ads--back-button';

// Runs in the page, not the Tampermonkey sandbox, so it must not reference anything outside itself.
// The site's initPrePlaybackCounter resolves at once when _preInitAdsTimestamp is less than 50s old
// (it is set when the ad overlay is closed), so a timestamp that is always "now" skips the countdown.
// Type annotations are erased by the build, so the source still only references `window`.
function installPageAdTimerBypass(): void {
  const pageWindow = window as Window & { __lookmovie2EnhancerAdBypass?: boolean };
  if (pageWindow.__lookmovie2EnhancerAdBypass) {
    return;
  }

  pageWindow.__lookmovie2EnhancerAdBypass = true;
  Object.defineProperty(window, '_preInitAdsTimestamp', {
    configurable: true,
    get: () => Date.now(),
    set: () => undefined,
  });
}

function injectPageScript(source: string): void {
  const script = document.createElement('script');
  script.textContent = source;
  // `document.head` is typed non-null but is null at document-start.
  ((document.head as HTMLHeadElement | null) ?? document.documentElement).appendChild(script);
  script.remove();
}

function ensureAdBypassStyle(): void {
  ensureStyle(AD_BYPASS_STYLE_ID, '.ad-container { display: none !important; }');
}

// Fallback for a countdown that started before the enhancer loaded: the overlay's close button
// resolves the counter promise directly, even while it is still hidden.
function dismissRunningAdCountdown(): boolean {
  const overlay = document.querySelector(PRE_INIT_ADS_SELECTOR);
  if (!overlay || overlay.classList.contains('tw-hidden')) {
    return false;
  }

  const closeButton = overlay.querySelector<HTMLElement>(PRE_INIT_ADS_CLOSE_SELECTOR);
  if (!closeButton) {
    return false;
  }

  closeButton.click();
  console.info(`[${SCRIPT_ID}] Skipped ad countdown.`);
  return true;
}

export function installAdTimerBypass(): void {
  try {
    injectPageScript(`(${installPageAdTimerBypass.toString()})();`);
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to install ad timer bypass.`, error);
  }

  ensureAdBypassStyle();
}

export function watchAdCountdown(): void {
  const overlay = document.querySelector(PRE_INIT_ADS_SELECTOR);
  if (!overlay) {
    return;
  }

  dismissRunningAdCountdown();
  new MutationObserver(() => {
    dismissRunningAdCountdown();
  }).observe(overlay, {
    attributes: true,
    attributeFilter: ['class'],
  });
}
