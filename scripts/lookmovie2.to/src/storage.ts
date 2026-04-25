/* eslint-disable */
// @ts-nocheck
import { DEFAULT_SETTINGS, SCRIPT_ID, STORAGE_KEY, WATCHLIST_KEY } from './constants';
import { normalizeEpisodeRecord } from './episodes';
import { toPositiveInteger } from './utils';

export function loadSettings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      autoPlay: typeof parsed.autoPlay === 'boolean' ? parsed.autoPlay : DEFAULT_SETTINGS.autoPlay,
      autoFullscreen:
        typeof parsed.autoFullscreen === 'boolean'
          ? parsed.autoFullscreen
          : DEFAULT_SETTINGS.autoFullscreen,
    };
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

export function persistSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
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
