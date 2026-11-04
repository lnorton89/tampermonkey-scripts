import type { NtfyStatus } from '@userscripts/core';
import type { Settings } from '../config/constants';
import {
  loadMovieWatchlist,
  loadPlaylist,
  loadPlaylistSession,
  loadSettings,
  loadShowsListProgress,
  loadWatchlist,
  type MovieWatchlistStore,
  type PlaylistSession,
  type PlaylistStore,
  type ShowsListProgress,
  type WatchlistStore,
} from './storage';

export type WatchlistMessageTone = 'muted' | 'success' | 'danger';

export interface AppState {
  settings: Settings;
  watchlistStore: WatchlistStore;
  movieWatchlistStore: MovieWatchlistStore;
  playlistStore: PlaylistStore;
  playlistSession: PlaylistSession;
  showsListProgress: ShowsListProgress | null;
  showsListProgressOrder: number;
  showsListSeenCandidate: ShowsListProgress | null;
  showsListSeenCandidateOrder: number;
  showsListSessionTouched: boolean;
  showsListManualMarkerSet: boolean;
  showsListObserver: IntersectionObserver | null;
  showsListMutationObserver: MutationObserver | null;
  showsListRefreshScheduled: boolean;
  showsListObservedCards: WeakSet<Element>;
  domBootstrapped: boolean;
  uiBootAttempts: number;
  fullscreenTriggered: boolean;
  lastKnownUrl: string;
  watchlistRefreshPromise: Promise<void> | null;
  watchlistBusy: boolean;
  watchlistMessage: string;
  watchlistMessageTone: WatchlistMessageTone;
  lastTrackedEpisodeSignature: string;
  ntfyRemoteStatus: NtfyStatus;
  ntfyRemoteMessage: string;
  ntfyLastNotificationAt: number;
}

export const appState: AppState = {
  settings: loadSettings(),
  watchlistStore: loadWatchlist(),
  movieWatchlistStore: loadMovieWatchlist(),
  playlistStore: loadPlaylist(),
  playlistSession: loadPlaylistSession(),
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
  ntfyRemoteStatus: 'disabled',
  ntfyRemoteMessage: '',
  ntfyLastNotificationAt: 0,
};
