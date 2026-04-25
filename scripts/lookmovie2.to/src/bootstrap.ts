/* eslint-disable */
// @ts-nocheck
import { ROUTE_POLL_MS, UI_ROOT_ID } from './constants';
import { appState } from './state';
import { findAndAttachToVideos, removeWindowedFullscreenFallback, watchVideos } from './player';
import {
  ensureEpisodeCardButtons,
  ensureShowViewWatchButton,
  syncEpisodeCardButtons,
  syncShowViewWatchButton,
} from './pages';
import { refreshWatchlistEntries } from './watchlist';
import { ensureUi, renderWatchlist, syncLauncherState } from './ui';

export function watchNavigation() {
  window.setInterval(() => {
    if (location.href === appState.lastKnownUrl) {
      return;
    }

    appState.lastKnownUrl = location.href;
    appState.fullscreenTriggered = false;
    appState.lastTrackedEpisodeSignature = '';
    removeWindowedFullscreenFallback();
    findAndAttachToVideos();
    ensureUi();
    renderWatchlist();
    syncEpisodeCardButtons();
    ensureEpisodeCardButtons();
    syncShowViewWatchButton();
    ensureShowViewWatchButton();
    refreshWatchlistEntries();
  }, ROUTE_POLL_MS);
}

export function bootstrapDomFeatures() {
  if (appState.domBootstrapped) {
    return;
  }

  appState.domBootstrapped = true;
  watchVideos();
  watchNavigation();

  const uiBootstrapper = window.setInterval(() => {
    appState.uiBootAttempts += 1;
    ensureUi();
    ensureEpisodeCardButtons();
    ensureShowViewWatchButton();

    if (document.getElementById(UI_ROOT_ID) || appState.uiBootAttempts > 100) {
      window.clearInterval(uiBootstrapper);
    }
  }, 100);

  renderWatchlist();
  syncLauncherState();
  syncEpisodeCardButtons();
  syncShowViewWatchButton();
  refreshWatchlistEntries();
}
