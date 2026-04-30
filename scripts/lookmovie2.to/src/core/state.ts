/* eslint-disable */
// @ts-nocheck
import { loadMovieWatchlist, loadSettings, loadShowsListProgress, loadWatchlist } from './storage';

export const appState = {
  settings: loadSettings(),
  watchlistStore: loadWatchlist(),
  movieWatchlistStore: loadMovieWatchlist(),
  showsListProgress: loadShowsListProgress(),
  showsListProgressOrder: -1,
  showsListSeenCandidate: null,
  showsListSeenCandidateOrder: -1,
  showsListSessionTouched: false,
  showsListManualMarkerSet: false,
  showsListObserver: null,
  showsListMutationObserver: null,
  showsListRefreshScheduled: false,
  showsListObservedCards: new WeakSet(),
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
