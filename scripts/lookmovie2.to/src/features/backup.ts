/* eslint-disable */
// @ts-nocheck
import { SCRIPT_ID } from '../config/constants';
import { appState } from '../core/state';
import {
  loadBackupSnapshots,
  normalizeMovieWatchlistEntry,
  normalizePlaylistEntry,
  normalizeWatchlistEntry,
} from '../core/storage';
import { refreshMovieWatchlistMetadata, saveMovieWatchlist } from './movies';
import { savePlaylist } from './playlist';
import { refreshWatchlistEntries, saveWatchlist, setWatchlistMessage } from './watchlist';

export const BACKUP_FORMAT_VERSION = 1;

export function buildBackupPayload() {
  return {
    app: SCRIPT_ID,
    version: BACKUP_FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    watchlist: appState.watchlistStore,
    movieWatchlist: appState.movieWatchlistStore,
    playlist: appState.playlistStore,
  };
}

export function exportBackup() {
  const payload = JSON.stringify(buildBackupPayload(), null, 2);
  const url = URL.createObjectURL(new Blob([payload], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `lookmovie2-watchlist-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function pickSection(payload, wrapperKey, field) {
  if (!payload || typeof payload !== 'object') {
    return {};
  }

  const wrapped = payload[wrapperKey];
  if (
    wrapped &&
    typeof wrapped === 'object' &&
    wrapped[field] &&
    typeof wrapped[field] === 'object'
  ) {
    return wrapped[field];
  }

  // Also accept a raw store, e.g. a copy of the old localStorage value.
  return payload[field] && typeof payload[field] === 'object' ? payload[field] : {};
}

// Adds entries that are missing locally; entries already present are kept as they are.
export function mergeBackupPayload(payload) {
  const addedShows = [];
  let addedMovies = 0;
  let addedPlaylist = 0;

  Object.entries(pickSection(payload, 'watchlist', 'shows')).forEach(([slug, entry]) => {
    if (appState.watchlistStore.shows[slug]) {
      return;
    }

    const normalized = normalizeWatchlistEntry(slug, entry);
    if (normalized) {
      appState.watchlistStore.shows[slug] = normalized;
      addedShows.push(slug);
    }
  });

  Object.entries(pickSection(payload, 'movieWatchlist', 'movies')).forEach(([slug, entry]) => {
    if (appState.movieWatchlistStore.movies[slug]) {
      return;
    }

    const normalized = normalizeMovieWatchlistEntry(slug, entry);
    if (normalized) {
      appState.movieWatchlistStore.movies[slug] = normalized;
      addedMovies += 1;
    }
  });

  Object.entries(pickSection(payload, 'playlist', 'entries')).forEach(([key, entry]) => {
    const normalized = normalizePlaylistEntry(key, entry);
    if (normalized && !appState.playlistStore.entries[normalized.key]) {
      appState.playlistStore.entries[normalized.key] = normalized;
      addedPlaylist += 1;
    }
  });

  if (addedShows.length) {
    saveWatchlist();
    refreshWatchlistEntries({ force: true, slugs: addedShows });
  }

  if (addedMovies) {
    saveMovieWatchlist();
    refreshMovieWatchlistMetadata();
  }

  if (addedPlaylist) {
    savePlaylist();
  }

  const summary = `Restored ${addedShows.length} ${addedShows.length === 1 ? 'show' : 'shows'}, ${addedMovies} ${addedMovies === 1 ? 'movie' : 'movies'}, ${addedPlaylist} playlist ${addedPlaylist === 1 ? 'episode' : 'episodes'}.`;
  setWatchlistMessage(
    summary,
    addedShows.length || addedMovies || addedPlaylist ? 'success' : 'muted'
  );
  return summary;
}

export async function importBackupFile(file) {
  try {
    return mergeBackupPayload(JSON.parse(await file.text()));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to import backup.`, error);
    setWatchlistMessage('That file is not a valid watchlist backup.', 'danger');
    return '';
  }
}

export function getBackupSnapshots() {
  return loadBackupSnapshots().map((snapshot) => ({
    date: snapshot.date,
    showCount: Object.keys((snapshot.watchlist && snapshot.watchlist.shows) || {}).length,
    movieCount: Object.keys((snapshot.movieWatchlist && snapshot.movieWatchlist.movies) || {})
      .length,
  }));
}

export function restoreBackupSnapshot(date) {
  const snapshot = loadBackupSnapshots().find((candidate) => candidate.date === date);
  return snapshot ? mergeBackupPayload(snapshot) : '';
}
