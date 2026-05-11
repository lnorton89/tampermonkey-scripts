/* eslint-disable */
// @ts-nocheck
import { appState } from '../core/state';
import { normalizePlaylistEntry, persistPlaylist, persistPlaylistSession } from '../core/storage';
import { formatEpisodeLabel } from '../domain/episodes';
import { renderWatchlist, syncLauncherState } from '../ui';
import { buildShowPlayUrl } from './pages';

export function buildPlaylistKey(slug, episode) {
  if (!slug || !episode) {
    return '';
  }

  return `${slug}:${episode.season}:${episode.episode}:${episode.idEpisode}`;
}

export function getPlaylistEntries() {
  return Object.values(appState.playlistStore.entries);
}

export function getPlaylistEntry(key) {
  return key ? appState.playlistStore.entries[key] || null : null;
}

export function isEpisodeInPlaylist(slug, episode) {
  return !!getPlaylistEntry(buildPlaylistKey(slug, episode));
}

export function sortPlaylistEntries(entries) {
  return [...entries].sort((left, right) => left.addedAt - right.addedAt);
}

export function savePlaylist() {
  persistPlaylist(appState.playlistStore);
  renderWatchlist();
  syncLauncherState();
}

export function savePlaylistSession() {
  persistPlaylistSession(appState.playlistSession);
  renderWatchlist();
}

export function addLatestEpisodeToPlaylist(entry) {
  if (!entry || !entry.slug || !entry.latestEpisode) {
    return;
  }

  const key = buildPlaylistKey(entry.slug, entry.latestEpisode);
  if (!key || getPlaylistEntry(key)) {
    renderWatchlist();
    return;
  }

  appState.playlistStore.entries[key] = normalizePlaylistEntry(key, {
    slug: entry.slug,
    idShow: entry.idShow,
    title: entry.title,
    year: entry.year,
    poster: entry.poster,
    episode: entry.latestEpisode,
    addedAt: Date.now(),
  });

  savePlaylist();
}

export function removeFromPlaylist(key) {
  if (!getPlaylistEntry(key)) {
    return;
  }

  delete appState.playlistStore.entries[key];

  if (appState.playlistSession.active && appState.playlistSession.currentKey === key) {
    stopPlaylistPlayback();
  }

  savePlaylist();
}

export function removeEpisodeFromPlaylist(slug, episode) {
  removeFromPlaylist(buildPlaylistKey(slug, episode));
}

export function getPlaylistSummary(entries) {
  if (!entries.length) {
    return 'Add latest show episodes from the watchlist poster or list view.';
  }

  const first = entries[0];
  return `${entries.length} queued ${entries.length === 1 ? 'episode' : 'episodes'} | Next: ${
    first.title
  } ${formatEpisodeLabel(first.episode)}`;
}

export function getCurrentPlaylistEntry() {
  return getPlaylistEntry(appState.playlistSession.currentKey);
}

export function getNextPlaylistEntry(afterKey) {
  const entries = sortPlaylistEntries(getPlaylistEntries());
  if (!entries.length) {
    return null;
  }

  if (!afterKey) {
    return entries[0];
  }

  const currentIndex = entries.findIndex((entry) => entry.key === afterKey);
  return currentIndex >= 0 ? entries[currentIndex + 1] || null : entries[0];
}

export function navigateToPlaylistEntry(entry) {
  if (!entry) {
    return false;
  }

  location.href = buildShowPlayUrl(entry.slug, entry.episode);
  return true;
}

export function startPlaylistPlayback(key) {
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

export function stopPlaylistPlayback() {
  appState.playlistSession = {
    active: false,
    currentKey: '',
    startedAt: 0,
  };
  savePlaylistSession();
}

export function completeCurrentPlaylistEntryAndAdvance() {
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
