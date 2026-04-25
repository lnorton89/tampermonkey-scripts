/* eslint-disable */
// @ts-nocheck
import { loadSettings, loadWatchlist } from './storage';

export const appState = {
  settings: loadSettings(),
  watchlistStore: loadWatchlist(),
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
