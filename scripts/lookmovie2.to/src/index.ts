import { loadSettings, UI_ROOT_ID, ROUTE_POLL_MS, log } from './utils';
import {
  refreshWatchlistEntries,
  resetTrackedEpisode,
  countUnwatchedLatestEpisodes,
  onChange,
} from './watchlist';
import {
  tryInstallAdTimerBypass,
  restoreOriginalPrePlaybackCounter,
  startAdTimerPolling,
  hideAdUi,
} from './ad-bypass';
import {
  setAutoPlay,
  setAutoFullscreen,
  resetFullscreenState,
  watchVideos,
  refreshVideoAttachments,
  onVideoPlayCallback,
} from './auto-play';
import { maybeTrackWatchedEpisodeFromPlayer } from './watchlist';
import type { getSettings } from './ui';
import {
  initUI,
  ensureUi,
  syncLauncherState,
  renderWatchlist,
  onSettingsChangeCallback,
} from './ui';
import {
  ensureEpisodeCardButtons,
  ensureShowViewWatchButton,
  syncEpisodeCardButtons,
  syncShowViewWatchButton,
  ensureEpisodeButtonStyles,
} from './page-helpers';

// ---------------------------------------------------------------------------
// Module state
// ---------------------------------------------------------------------------

let settings = loadSettings();
let domBootstrapped = false;
let uiBootAttempts = 0;
let lastKnownUrl = location.href;

// ---------------------------------------------------------------------------
// Settings sync
// ---------------------------------------------------------------------------

function handleSettingsChange(nextSettings: ReturnType<typeof getSettings>): void {
  settings = nextSettings;

  if (settings.adTimerBypass) {
    tryInstallAdTimerBypass(settings.adTimerBypass);
    hideAdUi();
  } else {
    restoreOriginalPrePlaybackCounter();
  }

  setAutoPlay(settings.autoPlay);
  setAutoFullscreen(settings.autoFullscreen);
}

// ---------------------------------------------------------------------------
// Navigation watcher
// ---------------------------------------------------------------------------

function watchNavigation(): void {
  window.setInterval(() => {
    if (location.href === lastKnownUrl) return;

    lastKnownUrl = location.href;
    resetFullscreenState();
    resetTrackedEpisode();
    refreshVideoAttachments();
    ensureUi();
    renderWatchlist();
    syncEpisodeCardButtons();
    ensureEpisodeCardButtons();
    syncShowViewWatchButton();
    ensureShowViewWatchButton();
    void refreshWatchlistEntries();
  }, ROUTE_POLL_MS);
}

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------

function bootstrapDomFeatures(): void {
  if (domBootstrapped) return;

  domBootstrapped = true;

  ensureEpisodeButtonStyles();
  watchVideos();
  watchNavigation();

  const uiBootstrapper = window.setInterval(() => {
    uiBootAttempts += 1;
    ensureUi();
    ensureEpisodeCardButtons();
    ensureShowViewWatchButton();

    if (document.getElementById(UI_ROOT_ID) || uiBootAttempts > 100) {
      window.clearInterval(uiBootstrapper);
    }
  }, 100);

  renderWatchlist();
  syncLauncherState(countUnwatchedLatestEpisodes());
  syncEpisodeCardButtons();
  syncShowViewWatchButton();
  void refreshWatchlistEntries();
}

// ---------------------------------------------------------------------------
// Build info (injected at build time)
// ---------------------------------------------------------------------------

declare const __VERSION__: string;
declare const __BUILD_DATE__: string;
declare const __SCRIPT_NAME__: string;

const buildInfo = {
  name: __SCRIPT_NAME__,
  version: __VERSION__,
  built: __BUILD_DATE__,
};

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

function init(): void {
  log.info(
    `%c${buildInfo.name} v${buildInfo.version}%c loaded @ ${buildInfo.built}`,
    'font-weight: bold; color: #22c55e;',
    'color: #64748b;'
  );

  // Wire up video play -> watchlist tracking
  onVideoPlayCallback(() => {
    maybeTrackWatchedEpisodeFromPlayer();
  });

  // Initialize UI with current settings
  initUI(settings);

  // Wire up settings changes
  onSettingsChangeCallback(handleSettingsChange);

  // Wire up watchlist changes
  onChange(() => {
    renderWatchlist();
    syncLauncherState(countUnwatchedLatestEpisodes());
    syncEpisodeCardButtons();
    syncShowViewWatchButton();
  });

  // Apply initial settings to sub-modules
  setAutoPlay(settings.autoPlay);
  setAutoFullscreen(settings.autoFullscreen);

  // Install ad bypass
  tryInstallAdTimerBypass(settings.adTimerBypass);
  startAdTimerPolling(settings.adTimerBypass);

  // Bootstrap DOM features
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapDomFeatures, { once: true });
  } else {
    bootstrapDomFeatures();
  }
}

// Run at document-start as specified in the userscript header, but wait for DOM
init();
