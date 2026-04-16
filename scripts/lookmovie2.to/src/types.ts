// ---------------------------------------------------------------------------
// Shared TypeScript interfaces and type declarations
// ---------------------------------------------------------------------------

export interface Settings {
  adTimerBypass: boolean;
  autoPlay: boolean;
  autoFullscreen: boolean;
}

export interface EpisodeRecord {
  season: number;
  episode: number;
  idEpisode: number;
  watchedAt?: number;
  updatedAt?: number;
}

export interface WatchlistEntry {
  slug: string;
  idShow: number;
  title: string;
  year: string;
  poster: string;
  addedAt: number;
  lastSyncedAt: number;
  lastSyncError: string;
  latestEpisode: EpisodeRecord | null;
  lastWatched: EpisodeRecord | null;
}

export interface WatchlistStore {
  shows: Record<string, WatchlistEntry>;
}

export interface ShowViewData {
  slug: string;
  title: string;
  year: string;
  poster: string;
  idShow: number;
  episode: EpisodeRecord | null;
}

export interface ParsedEpisodeCard {
  slug: string;
  title: string;
  year: string;
  poster: string;
  href: string;
  episode: EpisodeRecord | null;
}

export interface ShowDetails {
  slug: string;
  idShow?: number;
  title?: string;
  year?: string;
  poster?: string;
  episode?: EpisodeRecord | null;
}

export interface EpisodeContext {
  season: number;
  episode: number;
  idEpisode: number;
}

export interface PlayPageEpisodeContext extends EpisodeContext {
  idShow: number;
}

// Extend global window properties provided by the site
declare global {
  interface Window {
    id_show?: number;
    show_storage?: {
      id_show?: number;
      slug?: string;
      title?: string;
      year?: string | number;
      poster_medium?: string;
    };
    initPrePlaybackCounter?: (...args: unknown[]) => unknown;
    enableWindowScroll?: () => void;
    _counterTimeout?: ReturnType<typeof setInterval>;
  }

  interface HTMLVideoElement {
    _lookmovieEnhancerAttached?: boolean;
  }
}

export {};
