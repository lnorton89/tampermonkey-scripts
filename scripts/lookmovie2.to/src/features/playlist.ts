/* eslint-disable */
// @ts-nocheck
import { appState } from '../core/state';
import { normalizePlaylistEntry, persistPlaylist } from '../core/storage';
import { formatEpisodeLabel } from '../domain/episodes';
import { renderWatchlist, syncLauncherState } from '../ui';

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
