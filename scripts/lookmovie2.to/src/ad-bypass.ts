import { SCRIPT_ID, log } from './utils';

// ---------------------------------------------------------------------------
// Module state
// ---------------------------------------------------------------------------

let originalInitPrePlaybackCounter: ((...args: unknown[]) => unknown) | null = null;
let adBypassPoller: ReturnType<typeof setInterval> | null = null;

// ---------------------------------------------------------------------------
// UI helpers (scoped to this module to avoid circular deps with ui.ts)
// ---------------------------------------------------------------------------

function hidePrePlaybackAdUi(): void {
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
    (button as HTMLElement).classList.remove('tw-hidden');
  });
  document.querySelectorAll('.pre-init-ads--back-button').forEach((button) => {
    (button as HTMLElement).classList.remove('tw-hidden');
  });

  if (typeof window._counterTimeout !== 'undefined') {
    clearInterval(window._counterTimeout);
    delete window._counterTimeout;
  }

  if (typeof window.enableWindowScroll === 'function') {
    window.enableWindowScroll();
  }
}

function bypassPrePlaybackCounter(): Promise<void> {
  log.info('initPrePlaybackCounter bypassed.');

  return new Promise<void>((resolve) => {
    hidePrePlaybackAdUi();
    resolve();
  }).finally(() => {
    if (typeof window.enableWindowScroll === 'function') {
      window.enableWindowScroll();
    }
  });
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function tryInstallAdTimerBypass(enabled: boolean): boolean {
  if (!enabled) return false;

  if (typeof window.initPrePlaybackCounter === 'function' && window.initPrePlaybackCounter !== bypassPrePlaybackCounter) {
    if (!originalInitPrePlaybackCounter) {
      originalInitPrePlaybackCounter = window.initPrePlaybackCounter;
    }
    window.initPrePlaybackCounter = bypassPrePlaybackCounter;
    log.info('Installed ad timer bypass override.');
    return true;
  }

  return window.initPrePlaybackCounter === bypassPrePlaybackCounter;
}

export function restoreOriginalPrePlaybackCounter(): void {
  if (originalInitPrePlaybackCounter) {
    window.initPrePlaybackCounter = originalInitPrePlaybackCounter;
  }
}

export function startAdTimerPolling(enabled: boolean): void {
  if (adBypassPoller) return;

  adBypassPoller = window.setInterval(() => {
    if (enabled) {
      tryInstallAdTimerBypass(enabled);
      hidePrePlaybackAdUi();
    }
  }, 250);
}

export function hideAdUi(): void {
  hidePrePlaybackAdUi();
}
