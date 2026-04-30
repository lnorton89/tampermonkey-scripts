/* eslint-disable */
// @ts-nocheck
import { ROUTE_POLL_MS, UI_ROOT_ID } from '../config/constants';
import { appState } from '../core/state';
import {
  findAndAttachToVideos,
  removeWindowedFullscreenFallback,
  watchVideos,
} from '../features/player';
import {
  ensureEpisodeCardButtons,
  ensureMovieCardButtons,
  ensureMovieViewWatchButton,
  ensureShowsListProgressTracking,
  ensureShowViewWatchButton,
  markShowsListSessionTouched,
  syncEpisodeCardButtons,
  syncMovieCardButtons,
  syncMovieViewWatchButton,
  syncShowViewWatchButton,
  stopShowsListProgressTracking,
} from '../features/pages';
import { refreshMovieWatchlistMetadata } from '../features/movies';
import { refreshWatchlistEntries } from '../features/watchlist';
import { ensureUi, renderWatchlist, syncLauncherState } from '../ui';

export function watchNavigation() {
  window.setInterval(() => {
    if (location.href === appState.lastKnownUrl) {
      return;
    }

    const previousUrl = new URL(appState.lastKnownUrl, location.origin);
    if (previousUrl.pathname === '/shows') {
      stopShowsListProgressTracking({ persist: true });
    } else {
      stopShowsListProgressTracking();
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
    ensureShowsListProgressTracking();
    syncShowViewWatchButton();
    ensureShowViewWatchButton();
    syncMovieCardButtons();
    ensureMovieCardButtons();
    syncMovieViewWatchButton();
    ensureMovieViewWatchButton();
    refreshMovieWatchlistMetadata();
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
  window.addEventListener('scroll', markShowsListSessionTouched, { passive: true });
  window.addEventListener('pagehide', () => stopShowsListProgressTracking({ persist: true }));

  const uiBootstrapper = window.setInterval(() => {
    appState.uiBootAttempts += 1;
    ensureUi();
    ensureEpisodeCardButtons();
    ensureShowsListProgressTracking();
    ensureShowViewWatchButton();
    ensureMovieCardButtons();
    ensureMovieViewWatchButton();

    if (document.getElementById(UI_ROOT_ID) || appState.uiBootAttempts > 100) {
      window.clearInterval(uiBootstrapper);
    }
  }, 100);

  renderWatchlist();
  syncLauncherState();
  syncEpisodeCardButtons();
  ensureShowsListProgressTracking();
  syncShowViewWatchButton();
  syncMovieCardButtons();
  syncMovieViewWatchButton();
  refreshMovieWatchlistMetadata();
  refreshWatchlistEntries();
}
