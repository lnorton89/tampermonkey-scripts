/* eslint-disable */
// @ts-nocheck
import { SCRIPT_ID, WATCHLIST_REFRESH_MS } from '../config/constants';
import { appState } from '../core/state';
import {
  normalizeEpisodeRecord,
  formatEpisodeLabel,
  compareEpisodes,
  sameEpisode,
} from '../domain/episodes';
import { normalizeWatchlistEntry, persistWatchlist } from '../core/storage';
import { decodeInlineJsString, fetchJson, fetchText, toPositiveInteger } from '../core/utils';
import { buildShowViewUrl, syncEpisodeCardButtons, syncShowViewWatchButton } from './pages';
import { renderWatchlist, syncLauncherState } from '../ui';

export function isLatestWatched(entry) {
  return !!entry && sameEpisode(entry.latestEpisode, entry.lastWatched);
}

export function getWatchlistEntries() {
  return Object.values(appState.watchlistStore.shows);
}

export function getWatchlistEntry(slug) {
  return slug ? appState.watchlistStore.shows[slug] || null : null;
}

export function findWatchlistEntryByIdShow(idShow) {
  if (!idShow) {
    return null;
  }

  return getWatchlistEntries().find((entry) => entry.idShow === idShow) || null;
}

export function countUnwatchedLatestEpisodes() {
  return getWatchlistEntries().filter((entry) => entry.latestEpisode && !isLatestWatched(entry))
    .length;
}

export function sortWatchlistEntries(entries) {
  return [...entries].sort((left, right) => {
    const leftWeight = left.latestEpisode ? (isLatestWatched(left) ? 1 : 0) : 2;
    const rightWeight = right.latestEpisode ? (isLatestWatched(right) ? 1 : 0) : 2;

    if (leftWeight !== rightWeight) {
      return leftWeight - rightWeight;
    }

    return left.title.localeCompare(right.title);
  });
}

export function shouldRefreshEntry(entry, now) {
  if (!entry) {
    return false;
  }

  if (!entry.idShow || !entry.latestEpisode) {
    return true;
  }

  return !entry.lastSyncedAt || now - entry.lastSyncedAt >= WATCHLIST_REFRESH_MS;
}

export function saveWatchlist() {
  persistWatchlist(appState.watchlistStore);
  renderWatchlist();
  syncLauncherState();
  syncEpisodeCardButtons();
  syncShowViewWatchButton();
}

export function setWatchlistMessage(message, tone) {
  appState.watchlistMessage = message || '';
  appState.watchlistMessageTone = tone || 'muted';
  renderWatchlist();
}

export async function fetchText(url) {
  const response = await fetch(url, { credentials: 'same-origin' });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return response.text();
}

export async function fetchJson(url) {
  const response = await fetch(url, { credentials: 'same-origin' });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return response.json();
}

export function decodeInlineJsString(value) {
  return value.replaceAll("\\'", "'").replaceAll('\\\\', '\\');
}

export async function resolveShowRecordBySlug(slug, fallback) {
  const html = await fetchText(`/shows/view/${slug}`);
  const idMatch = html.match(/id_show:\s*(\d+)/);
  const titleMatch = html.match(/title:\s*'((?:\\'|[^'])*)'/);
  const yearMatch = html.match(/year:\s*'((?:\\'|[^'])*)'/);
  const posterMatch = html.match(/poster_medium:\s*'((?:\\'|[^'])*)'/);

  return {
    slug,
    idShow: idMatch ? toPositiveInteger(idMatch[1]) : 0,
    title: titleMatch
      ? decodeInlineJsString(titleMatch[1]).trim()
      : fallback && fallback.title
        ? fallback.title
        : slug,
    year: yearMatch
      ? decodeInlineJsString(yearMatch[1]).trim()
      : fallback && fallback.year
        ? fallback.year
        : '',
    poster: posterMatch
      ? decodeInlineJsString(posterMatch[1]).trim()
      : fallback && fallback.poster
        ? fallback.poster
        : '',
  };
}

export async function fetchLatestEpisodeByIdShow(idShow) {
  const payload = await fetchJson(`/api/v2/download/episode/list?id=${idShow}`);
  const latest = payload && payload.latest ? payload.latest : null;
  const episodeRecord = normalizeEpisodeRecord({
    season: latest && latest.season,
    episode: latest && latest.episode,
    idEpisode: latest && latest.id_episode,
  });

  if (!episodeRecord) {
    return null;
  }

  episodeRecord.updatedAt = Date.now();
  return episodeRecord;
}

export async function addShowToWatchlist(showDetails) {
  if (!showDetails || !showDetails.slug) {
    return;
  }

  const existingEntry = getWatchlistEntry(showDetails.slug);
  if (existingEntry) {
    setWatchlistMessage(`${existingEntry.title} is already in your watchlist.`, 'muted');
    syncEpisodeCardButtons();
    return;
  }

  setWatchlistMessage(`Adding ${showDetails.title || showDetails.slug}...`, 'muted');

  let resolved = {
    slug: showDetails.slug,
    idShow: 0,
    title: showDetails.title || showDetails.slug,
    year: showDetails.year || '',
    poster: showDetails.poster || '',
  };

  try {
    resolved = await resolveShowRecordBySlug(showDetails.slug, showDetails);
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to resolve show metadata for ${showDetails.slug}.`, error);
  }

  appState.watchlistStore.shows[showDetails.slug] = normalizeWatchlistEntry(showDetails.slug, {
    slug: showDetails.slug,
    idShow: resolved.idShow,
    title: resolved.title || showDetails.title || showDetails.slug,
    year: resolved.year || showDetails.year || '',
    poster: resolved.poster || showDetails.poster || '',
    addedAt: Date.now(),
    latestEpisode: showDetails.episode || null,
    lastSyncedAt: 0,
  });

  saveWatchlist();
  setWatchlistMessage(
    `${resolved.title || showDetails.title || showDetails.slug} added to your watchlist.`,
    'success'
  );

  await refreshWatchlistEntries({ force: true, slugs: [showDetails.slug] });
}

export function removeShowFromWatchlist(slug) {
  const entry = getWatchlistEntry(slug);
  if (!entry) {
    return;
  }

  delete appState.watchlistStore.shows[slug];
  saveWatchlist();
  setWatchlistMessage(`${entry.title} removed from your watchlist.`, 'muted');
}

export function toggleLatestEpisodeWatched(slug) {
  const entry = getWatchlistEntry(slug);
  if (!entry || !entry.latestEpisode) {
    return;
  }

  if (isLatestWatched(entry)) {
    entry.lastWatched = null;
    setWatchlistMessage(`${entry.title} marked as having an unwatched latest episode.`, 'muted');
  } else {
    entry.lastWatched = {
      ...entry.latestEpisode,
      watchedAt: Date.now(),
    };
    setWatchlistMessage(
      `${entry.title} marked watched through ${formatEpisodeLabel(entry.latestEpisode)}.`,
      'success'
    );
  }

  saveWatchlist();
}

export async function refreshWatchlistEntries(options) {
  const force = !!(options && options.force);
  const slugSet = options && Array.isArray(options.slugs) ? new Set(options.slugs) : null;

  if (appState.watchlistRefreshPromise) {
    return appState.watchlistRefreshPromise;
  }

  const now = Date.now();
  const entries = getWatchlistEntries().filter((entry) => {
    if (slugSet && !slugSet.has(entry.slug)) {
      return false;
    }

    return force || shouldRefreshEntry(entry, now);
  });

  if (!entries.length) {
    renderWatchlist();
    syncEpisodeCardButtons();
    return Promise.resolve();
  }

  appState.watchlistBusy = true;
  setWatchlistMessage(
    `Refreshing ${entries.length} watchlist ${entries.length === 1 ? 'show' : 'shows'}...`,
    'muted'
  );

  appState.watchlistRefreshPromise = (async () => {
    for (const entry of entries) {
      try {
        if (!entry.idShow) {
          const resolved = await resolveShowRecordBySlug(entry.slug, entry);
          entry.idShow = resolved.idShow;
          entry.title = resolved.title || entry.title;
          entry.year = resolved.year || entry.year;
          entry.poster = resolved.poster || entry.poster;
        }

        if (!entry.idShow) {
          throw new Error('Unable to resolve show id.');
        }

        const latestEpisode = await fetchLatestEpisodeByIdShow(entry.idShow);
        entry.latestEpisode = latestEpisode;
        entry.lastSyncError = '';
        entry.lastSyncedAt = Date.now();
      } catch (error) {
        entry.lastSyncError = error instanceof Error ? error.message : String(error);
        entry.lastSyncedAt = Date.now();
        console.warn(`[${SCRIPT_ID}] Failed to refresh ${entry.slug}.`, error);
      }
    }

    saveWatchlist();
    setWatchlistMessage('Watchlist refreshed.', 'success');
  })()
    .catch((error) => {
      console.warn(`[${SCRIPT_ID}] Watchlist refresh failed.`, error);
      setWatchlistMessage('Watchlist refresh failed.', 'danger');
    })
    .finally(() => {
      appState.watchlistBusy = false;
      renderWatchlist();
      syncEpisodeCardButtons();
      appState.watchlistRefreshPromise = null;
    });

  return appState.watchlistRefreshPromise;
}

export function readPlayPageEpisodeContext() {
  if (!location.pathname.startsWith('/shows/play/')) {
    return null;
  }

  const hashMatch = location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);
  if (!hashMatch) {
    return null;
  }

  const idShow = toPositiveInteger(window.id_show);
  const season = toPositiveInteger(hashMatch[1]);
  const episode = toPositiveInteger(hashMatch[2]);
  const idEpisode = toPositiveInteger(hashMatch[3]);

  if (!idShow || !season || !episode || !idEpisode) {
    return null;
  }

  return {
    idShow,
    season,
    episode,
    idEpisode,
  };
}

export function maybeTrackWatchedEpisodeFromPlayer() {
  const context = readPlayPageEpisodeContext();
  if (!context) {
    return;
  }

  const signature = `${context.idShow}:${context.idEpisode}`;
  if (signature === appState.lastTrackedEpisodeSignature) {
    return;
  }

  const entry = findWatchlistEntryByIdShow(context.idShow);
  if (!entry) {
    return;
  }

  entry.lastWatched = {
    season: context.season,
    episode: context.episode,
    idEpisode: context.idEpisode,
    watchedAt: Date.now(),
  };

  if (!entry.latestEpisode || compareEpisodes(entry.lastWatched, entry.latestEpisode) > 0) {
    entry.latestEpisode = {
      season: context.season,
      episode: context.episode,
      idEpisode: context.idEpisode,
      updatedAt: Date.now(),
    };
  }

  appState.lastTrackedEpisodeSignature = signature;
  saveWatchlist();
  setWatchlistMessage(
    `${entry.title} updated to watched through ${formatEpisodeLabel(entry.lastWatched)}.`,
    'success'
  );
}
