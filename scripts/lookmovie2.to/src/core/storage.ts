/* eslint-disable */
// @ts-nocheck
import {
  BACKUP_SNAPSHOT_LIMIT,
  BACKUP_SNAPSHOTS_KEY,
  DEFAULT_SETTINGS,
  MOVIE_WATCHLIST_KEY,
  PLAYLIST_KEY,
  PLAYLIST_SESSION_KEY,
  SCRIPT_ID,
  SHOWS_LIST_PROGRESS_KEY,
  STORAGE_KEY,
  WATCHLIST_KEY,
} from '../config/constants';
import { normalizeEpisodeRecord } from '../domain/episodes';
import { toPositiveInteger } from './utils';

function hasGmStorage() {
  return typeof GM_getValue === 'function' && typeof GM_setValue === 'function';
}

// Tampermonkey storage is the source of truth because it survives the site's localStorage
// being cleared (Chrome wipes the whole localStorage database when it detects corruption).
// localStorage is kept as a mirror and as the migration source for data saved before this.
function readStoreSource(key) {
  if (hasGmStorage()) {
    const saved = GM_getValue(key, null);
    if (typeof saved === 'string') {
      return saved;
    }
  }

  const legacy = localStorage.getItem(key);
  if (legacy !== null && hasGmStorage()) {
    GM_setValue(key, legacy);
  }

  return legacy;
}

function writeStoreSource(key, value) {
  if (hasGmStorage()) {
    GM_setValue(key, value);
  }

  try {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  } catch (error) {
    if (!hasGmStorage()) {
      throw error;
    }
  }
}

export function normalizeSettings(settings) {
  return {
    autoPlay:
      typeof settings.autoPlay === 'boolean' ? settings.autoPlay : DEFAULT_SETTINGS.autoPlay,
    autoFullscreen:
      typeof settings.autoFullscreen === 'boolean'
        ? settings.autoFullscreen
        : DEFAULT_SETTINGS.autoFullscreen,
    windowedFullscreen:
      typeof settings.windowedFullscreen === 'boolean'
        ? settings.windowedFullscreen
        : DEFAULT_SETTINGS.windowedFullscreen,
    ntfyRemoteEnabled:
      typeof settings.ntfyRemoteEnabled === 'boolean'
        ? settings.ntfyRemoteEnabled
        : DEFAULT_SETTINGS.ntfyRemoteEnabled,
    ntfyServer:
      typeof settings.ntfyServer === 'string' && settings.ntfyServer.trim()
        ? settings.ntfyServer.trim().replace(/\/+$/, '')
        : DEFAULT_SETTINGS.ntfyServer,
    ntfyTopic:
      typeof settings.ntfyTopic === 'string' && settings.ntfyTopic.trim()
        ? settings.ntfyTopic.trim()
        : DEFAULT_SETTINGS.ntfyTopic,
    ntfyControlTopic:
      typeof settings.ntfyControlTopic === 'string' && settings.ntfyControlTopic.trim()
        ? settings.ntfyControlTopic.trim()
        : DEFAULT_SETTINGS.ntfyControlTopic,
    ntfyCommandSecret:
      typeof settings.ntfyCommandSecret === 'string' && settings.ntfyCommandSecret.trim()
        ? settings.ntfyCommandSecret.trim()
        : DEFAULT_SETTINGS.ntfyCommandSecret,
  };
}

export function loadSettings() {
  try {
    const saved = readStoreSource(STORAGE_KEY);
    const parsed = JSON.parse(saved || '{}');
    return normalizeSettings(parsed);
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to load saved settings.`, error);
    return { ...DEFAULT_SETTINGS };
  }
}

export function normalizeWatchlistEntry(slug, entry) {
  if (!entry || typeof entry !== 'object') {
    return null;
  }

  const normalizedSlug = typeof slug === 'string' && slug.trim() ? slug.trim() : '';
  if (!normalizedSlug) {
    return null;
  }

  return {
    slug: normalizedSlug,
    idShow: toPositiveInteger(entry.idShow || entry.id_show),
    title:
      typeof entry.title === 'string' && entry.title.trim() ? entry.title.trim() : normalizedSlug,
    year:
      typeof entry.year === 'string' || typeof entry.year === 'number'
        ? String(entry.year).trim()
        : '',
    poster: typeof entry.poster === 'string' ? entry.poster : '',
    addedAt: typeof entry.addedAt === 'number' ? entry.addedAt : Date.now(),
    lastSyncedAt: typeof entry.lastSyncedAt === 'number' ? entry.lastSyncedAt : 0,
    lastSyncError: typeof entry.lastSyncError === 'string' ? entry.lastSyncError : '',
    latestEpisode: normalizeEpisodeRecord(entry.latestEpisode),
    lastWatched: normalizeEpisodeRecord(entry.lastWatched),
  };
}

export function loadWatchlist() {
  try {
    const parsed = JSON.parse(readStoreSource(WATCHLIST_KEY) || '{}');
    const sourceShows =
      parsed && typeof parsed === 'object' && parsed.shows && typeof parsed.shows === 'object'
        ? parsed.shows
        : {};
    const shows = {};

    Object.entries(sourceShows).forEach(([slug, entry]) => {
      const normalized = normalizeWatchlistEntry(slug, entry);
      if (normalized) {
        shows[slug] = normalized;
      }
    });

    return { shows };
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to load watchlist.`, error);
    return { shows: {} };
  }
}

export function normalizeMovieWatchlistEntry(slug, entry) {
  if (!entry || typeof entry !== 'object') {
    return null;
  }

  const normalizedSlug = typeof slug === 'string' && slug.trim() ? slug.trim() : '';
  if (!normalizedSlug) {
    return null;
  }

  return {
    slug: normalizedSlug,
    title:
      typeof entry.title === 'string' && entry.title.trim() ? entry.title.trim() : normalizedSlug,
    year:
      typeof entry.year === 'string' || typeof entry.year === 'number'
        ? String(entry.year).trim()
        : '',
    poster: typeof entry.poster === 'string' ? entry.poster : '',
    href: typeof entry.href === 'string' ? entry.href : `/movies/view/${normalizedSlug}`,
    addedAt: typeof entry.addedAt === 'number' ? entry.addedAt : Date.now(),
    watched: !!entry.watched,
    watchedAt: typeof entry.watchedAt === 'number' ? entry.watchedAt : undefined,
  };
}

export function loadMovieWatchlist() {
  try {
    const parsed = JSON.parse(readStoreSource(MOVIE_WATCHLIST_KEY) || '{}');
    const sourceMovies =
      parsed && typeof parsed === 'object' && parsed.movies && typeof parsed.movies === 'object'
        ? parsed.movies
        : {};
    const movies = {};

    Object.entries(sourceMovies).forEach(([slug, entry]) => {
      const normalized = normalizeMovieWatchlistEntry(slug, entry);
      if (normalized) {
        movies[slug] = normalized;
      }
    });

    return { movies };
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to load movie watchlist.`, error);
    return { movies: {} };
  }
}

export function normalizePlaylistEntry(key, entry) {
  if (!entry || typeof entry !== 'object') {
    return null;
  }

  const slug =
    typeof entry.slug === 'string' && entry.slug.trim()
      ? entry.slug.trim()
      : typeof key === 'string' && key.trim()
        ? key.split(':')[0].trim()
        : '';
  const episode = normalizeEpisodeRecord(entry.episode || entry.latestEpisode);
  if (!slug || !episode) {
    return null;
  }

  return {
    key:
      typeof key === 'string' && key.trim()
        ? key.trim()
        : `${slug}:${episode.season}:${episode.episode}:${episode.idEpisode}`,
    slug,
    idShow: toPositiveInteger(entry.idShow || entry.id_show),
    title: typeof entry.title === 'string' && entry.title.trim() ? entry.title.trim() : slug,
    year:
      typeof entry.year === 'string' || typeof entry.year === 'number'
        ? String(entry.year).trim()
        : '',
    poster: typeof entry.poster === 'string' ? entry.poster : '',
    episode,
    addedAt: typeof entry.addedAt === 'number' ? entry.addedAt : Date.now(),
  };
}

export function loadPlaylist() {
  try {
    const parsed = JSON.parse(readStoreSource(PLAYLIST_KEY) || '{}');
    const sourceEntries =
      parsed && typeof parsed === 'object' && parsed.entries && typeof parsed.entries === 'object'
        ? parsed.entries
        : {};
    const entries = {};

    Object.entries(sourceEntries).forEach(([key, entry]) => {
      const normalized = normalizePlaylistEntry(key, entry);
      if (normalized) {
        entries[normalized.key] = normalized;
      }
    });

    return { entries };
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to load playlist.`, error);
    return { entries: {} };
  }
}

export function normalizePlaylistSession(session) {
  if (!session || typeof session !== 'object') {
    return { active: false, currentKey: '', startedAt: 0 };
  }

  return {
    active: !!session.active,
    currentKey: typeof session.currentKey === 'string' ? session.currentKey : '',
    startedAt: typeof session.startedAt === 'number' ? session.startedAt : 0,
  };
}

export function loadPlaylistSession() {
  try {
    return normalizePlaylistSession(JSON.parse(readStoreSource(PLAYLIST_SESSION_KEY) || '{}'));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to load playlist session.`, error);
    return { active: false, currentKey: '', startedAt: 0 };
  }
}

export function normalizeShowsListProgress(progress) {
  if (!progress || typeof progress !== 'object') {
    return null;
  }

  const slug =
    typeof progress.slug === 'string' && progress.slug.trim() ? progress.slug.trim() : '';
  const episode = normalizeEpisodeRecord(progress.episode);
  if (!slug || !episode) {
    return null;
  }

  return {
    slug,
    title: typeof progress.title === 'string' ? progress.title : slug,
    href: typeof progress.href === 'string' ? progress.href : '',
    episode,
    seenAt: typeof progress.seenAt === 'number' ? progress.seenAt : Date.now(),
    source: progress.source === 'manual' ? 'manual' : 'auto',
  };
}

export function loadShowsListProgress() {
  try {
    return normalizeShowsListProgress(
      JSON.parse(readStoreSource(SHOWS_LIST_PROGRESS_KEY) || 'null')
    );
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to load shows list progress.`, error);
    return null;
  }
}

export function persistSettings(settings) {
  try {
    writeStoreSource(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save settings.`, error);
  }
}

export function persistWatchlist(watchlistStore) {
  try {
    writeStoreSource(WATCHLIST_KEY, JSON.stringify(watchlistStore));
    recordBackupSnapshot({ watchlist: watchlistStore });
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save watchlist.`, error);
  }
}

export function persistMovieWatchlist(movieWatchlistStore) {
  try {
    writeStoreSource(MOVIE_WATCHLIST_KEY, JSON.stringify(movieWatchlistStore));
    recordBackupSnapshot({ movieWatchlist: movieWatchlistStore });
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save movie watchlist.`, error);
  }
}

export function persistPlaylist(playlistStore) {
  try {
    writeStoreSource(PLAYLIST_KEY, JSON.stringify(playlistStore));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save playlist.`, error);
  }
}

export function persistPlaylistSession(session) {
  try {
    const normalized = normalizePlaylistSession(session);
    if (!normalized.active) {
      writeStoreSource(PLAYLIST_SESSION_KEY, null);
      return;
    }

    writeStoreSource(PLAYLIST_SESSION_KEY, JSON.stringify(normalized));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save playlist session.`, error);
  }
}

export function persistShowsListProgress(progress) {
  try {
    const normalized = normalizeShowsListProgress(progress);
    if (!normalized) {
      writeStoreSource(SHOWS_LIST_PROGRESS_KEY, null);
      return;
    }

    writeStoreSource(SHOWS_LIST_PROGRESS_KEY, JSON.stringify(normalized));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save shows list progress.`, error);
  }
}

function countStoreEntries(store, field) {
  return store && store[field] && typeof store[field] === 'object'
    ? Object.keys(store[field]).length
    : 0;
}

function getLocalDateKey(date = new Date()) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function loadBackupSnapshots() {
  if (!hasGmStorage()) {
    return [];
  }

  try {
    const parsed = JSON.parse(GM_getValue(BACKUP_SNAPSHOTS_KEY, null) || '[]');
    return Array.isArray(parsed)
      ? parsed.filter((snapshot) => snapshot && typeof snapshot.date === 'string')
      : [];
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to load backup snapshots.`, error);
    return [];
  }
}

// Keeps one snapshot per day of both watchlists. An empty store never replaces a snapshot,
// so a wipe can't overwrite the last good copy.
function recordBackupSnapshot(partial) {
  if (!hasGmStorage()) {
    return;
  }

  try {
    if (
      (partial.watchlist && !countStoreEntries(partial.watchlist, 'shows')) ||
      (partial.movieWatchlist && !countStoreEntries(partial.movieWatchlist, 'movies'))
    ) {
      return;
    }

    const date = getLocalDateKey();
    const snapshots = loadBackupSnapshots();
    const base = snapshots.find((snapshot) => snapshot.date === date) || snapshots[0] || {};
    const nextSnapshot = {
      watchlist: base.watchlist || { shows: {} },
      movieWatchlist: base.movieWatchlist || { movies: {} },
      ...partial,
      date,
      savedAt: Date.now(),
    };
    const nextSnapshots = [nextSnapshot, ...snapshots.filter((snapshot) => snapshot.date !== date)]
      .sort((left, right) => right.date.localeCompare(left.date))
      .slice(0, BACKUP_SNAPSHOT_LIMIT);

    GM_setValue(BACKUP_SNAPSHOTS_KEY, JSON.stringify(nextSnapshots));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save backup snapshot.`, error);
  }
}
