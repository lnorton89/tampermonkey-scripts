/* eslint-disable */
// @ts-nocheck
import { loadMovieWatchlist, loadSettings, loadWatchlist } from './storage';

export const appState = {
  settings: loadSettings(),
  watchlistStore: loadWatchlist(),
  movieWatchlistStore: loadMovieWatchlist(),
  domBootstrapped: false,
  uiBootAttempts: 0,
  fullscreenTriggered: false,
  lastKnownUrl: location.href,
  watchlistRefreshPromise: null,
  watchlistBusy: false,
  watchlistMessage: '',
  watchlistMessageTone: 'muted',
  lastTrackedEpisodeSignature: '',
};
