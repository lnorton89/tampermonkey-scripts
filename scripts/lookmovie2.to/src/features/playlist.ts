import { appState } from '../core/state';
import {
  normalizePlaylistEntry,
  persistPlaylist,
  persistPlaylistSession,
  type PlaylistEntry,
  type WatchlistEntry,
} from '../core/storage';
import { formatEpisodeLabel, type EpisodeRecord } from '../domain/episodes';
import { renderWatchlist, syncLauncherState } from '../ui';
import { buildShowPlayUrl } from './pages';

export function buildPlaylistKey(slug: string, episode: EpisodeRecord | null | undefined): string {
  if (!slug || !episode) {
    return '';
  }

  return `${slug}:${episode.season}:${episode.episode}:${episode.idEpisode}`;
}

export function getPlaylistEntries(): PlaylistEntry[] {
  return Object.values(appState.playlistStore.entries);
}

export function getPlaylistEntry(key: string): PlaylistEntry | null {
  return key ? appState.playlistStore.entries[key] || null : null;
}

export function isEpisodeInPlaylist(
  slug: string,
  episode: EpisodeRecord | null | undefined
): boolean {
  return !!getPlaylistEntry(buildPlaylistKey(slug, episode));
}

export function sortPlaylistEntries(entries: PlaylistEntry[]): PlaylistEntry[] {
  return [...entries].sort((left, right) => left.addedAt - right.addedAt);
}

export function savePlaylist(): void {
  persistPlaylist(appState.playlistStore);
  renderWatchlist();
  syncLauncherState();
}

export function savePlaylistSession(): void {
  persistPlaylistSession(appState.playlistSession);
  renderWatchlist();
}

export function addLatestEpisodeToPlaylist(entry: WatchlistEntry | null): void {
  if (!entry?.slug || !entry.latestEpisode) {
    return;
  }

  const key = buildPlaylistKey(entry.slug, entry.latestEpisode);
  if (!key || getPlaylistEntry(key)) {
    renderWatchlist();
    return;
  }

  const playlistEntry = normalizePlaylistEntry(key, {
    slug: entry.slug,
    idShow: entry.idShow,
    title: entry.title,
    year: entry.year,
    poster: entry.poster,
    episode: entry.latestEpisode,
    addedAt: Date.now(),
  });
  // Always normalizes: the key is non-empty and the episode is already a valid record.
  if (playlistEntry) {
    appState.playlistStore.entries[key] = playlistEntry;
  }

  savePlaylist();
}

export function removeFromPlaylist(key: string): void {
  if (!getPlaylistEntry(key)) {
    return;
  }

  delete appState.playlistStore.entries[key];

  if (appState.playlistSession.active && appState.playlistSession.currentKey === key) {
    stopPlaylistPlayback();
  }

  savePlaylist();
}

export function removeEpisodeFromPlaylist(
  slug: string,
  episode: EpisodeRecord | null | undefined
): void {
  removeFromPlaylist(buildPlaylistKey(slug, episode));
}

export function getPlaylistSummary(entries: PlaylistEntry[]): string {
  const first = entries[0];
  if (!first) {
    return 'Add latest show episodes from the watchlist poster or list view.';
  }

  return `${entries.length} queued ${entries.length === 1 ? 'episode' : 'episodes'} | Next: ${
    first.title
  } ${formatEpisodeLabel(first.episode)}`;
}

export function getCurrentPlaylistEntry(): PlaylistEntry | null {
  return getPlaylistEntry(appState.playlistSession.currentKey);
}

export function getNextPlaylistEntry(afterKey: string): PlaylistEntry | null {
  const entries = sortPlaylistEntries(getPlaylistEntries());
  const first = entries[0];
  if (!first) {
    return null;
  }

  if (!afterKey) {
    return first;
  }

  const currentIndex = entries.findIndex((entry) => entry.key === afterKey);
  return currentIndex >= 0 ? entries[currentIndex + 1] || null : first;
}

export function navigateToPlaylistEntry(entry: PlaylistEntry | null): boolean {
  if (!entry) {
    return false;
  }

  location.href = buildShowPlayUrl(entry.slug, entry.episode);
  return true;
}

export function startPlaylistPlayback(key?: string): boolean {
  const entry = key ? getPlaylistEntry(key) : getNextPlaylistEntry('');
  if (!entry) {
    stopPlaylistPlayback();
    return false;
  }

  appState.playlistSession = {
    active: true,
    currentKey: entry.key,
    startedAt: Date.now(),
  };
  savePlaylistSession();
  return navigateToPlaylistEntry(entry);
}

export function stopPlaylistPlayback(): void {
  appState.playlistSession = {
    active: false,
    currentKey: '',
    startedAt: 0,
  };
  savePlaylistSession();
}

export function completeCurrentPlaylistEntryAndAdvance(): boolean {
  if (!appState.playlistSession.active) {
    return false;
  }

  const currentKey = appState.playlistSession.currentKey;
  const currentEntry = getPlaylistEntry(currentKey);
  if (!currentEntry) {
    stopPlaylistPlayback();
    return false;
  }

  const nextEntry = getNextPlaylistEntry(currentKey);
  delete appState.playlistStore.entries[currentKey];
  persistPlaylist(appState.playlistStore);

  if (!nextEntry) {
    stopPlaylistPlayback();
    savePlaylist();
    return true;
  }

  appState.playlistSession.currentKey = nextEntry.key;
  savePlaylistSession();
  savePlaylist();
  return navigateToPlaylistEntry(nextEntry);
}
