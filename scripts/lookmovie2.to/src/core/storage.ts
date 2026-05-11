/* eslint-disable */
// @ts-nocheck
import {
  DEFAULT_SETTINGS,
  MOVIE_WATCHLIST_KEY,
  PLAYLIST_KEY,
  SCRIPT_ID,
  SHOWS_LIST_PROGRESS_KEY,
  STORAGE_KEY,
  WATCHLIST_KEY,
} from '../config/constants';
import { normalizeEpisodeRecord } from '../domain/episodes';
import { toPositiveInteger } from './utils';

function readSettingsSource() {
  if (typeof GM_getValue === 'function') {
    return GM_getValue(STORAGE_KEY, null);
  }

  return localStorage.getItem(STORAGE_KEY);
}

function writeSettingsSource(settings) {
  if (typeof GM_setValue === 'function') {
    GM_setValue(STORAGE_KEY, JSON.stringify(settings));
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function normalizeSettings(settings) {
  return {
    autoPlay:
      typeof settings.autoPlay === 'boolean' ? settings.autoPlay : DEFAULT_SETTINGS.autoPlay,
    autoFullscreen:
      typeof settings.autoFullscreen === 'boolean'
        ? settings.autoFullscreen
        : DEFAULT_SETTINGS.autoFullscreen,
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
    const saved = readSettingsSource();
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
    const parsed = JSON.parse(localStorage.getItem(WATCHLIST_KEY) || '{}');
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
    const parsed = JSON.parse(localStorage.getItem(MOVIE_WATCHLIST_KEY) || '{}');
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
    const parsed = JSON.parse(localStorage.getItem(PLAYLIST_KEY) || '{}');
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
      JSON.parse(localStorage.getItem(SHOWS_LIST_PROGRESS_KEY) || 'null')
    );
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to load shows list progress.`, error);
    return null;
  }
}

export function persistSettings(settings) {
  try {
    writeSettingsSource(settings);
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save settings.`, error);
  }
}

export function persistWatchlist(watchlistStore) {
  try {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlistStore));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save watchlist.`, error);
  }
}

export function persistMovieWatchlist(movieWatchlistStore) {
  try {
    localStorage.setItem(MOVIE_WATCHLIST_KEY, JSON.stringify(movieWatchlistStore));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save movie watchlist.`, error);
  }
}

export function persistPlaylist(playlistStore) {
  try {
    localStorage.setItem(PLAYLIST_KEY, JSON.stringify(playlistStore));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save playlist.`, error);
  }
}

export function persistShowsListProgress(progress) {
  try {
    const normalized = normalizeShowsListProgress(progress);
    if (!normalized) {
      localStorage.removeItem(SHOWS_LIST_PROGRESS_KEY);
      return;
    }

    localStorage.setItem(SHOWS_LIST_PROGRESS_KEY, JSON.stringify(normalized));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save shows list progress.`, error);
  }
}
