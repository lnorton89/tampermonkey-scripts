/* eslint-disable */
// @ts-nocheck
import { SCRIPT_ID, UPCOMING_EPISODE_LIMIT, WATCHLIST_REFRESH_MS } from '../config/constants';
import { appState } from '../core/state';
import {
  normalizeEpisodeRecord,
  formatEpisodeLabel,
  compareEpisodes,
  sameEpisode,
  isLatestWatched,
} from '../domain/episodes';
import { normalizeWatchlistEntry, persistWatchlist } from '../core/storage';
import { decodeInlineJsString, fetchJson, fetchText, toPositiveInteger } from '../core/utils';
import { buildShowViewUrl, syncEpisodeCardButtons, syncShowViewWatchButton } from './pages';
import { renderWatchlist, syncLauncherState } from '../ui';

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

  if (!entry.idShow || !entry.latestEpisode || !entry.upcoming) {
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

// Every regular-season episode in airing order, plus the site's latest episode.
export async function fetchEpisodeListByIdShow(idShow) {
  const payload = await fetchJson(`/api/v2/download/episode/list?id=${idShow}`);
  const episodes = [];

  Object.entries((payload && payload.list) || {}).forEach(([season, seasonEpisodes]) => {
    Object.entries(seasonEpisodes || {}).forEach(([episode, record]) => {
      const normalized = normalizeEpisodeRecord({
        season,
        episode,
        idEpisode: record && record.id_episode,
      });
      if (normalized) {
        episodes.push(normalized);
      }
    });
  });

  episodes.sort(compareEpisodes);
  const latest = payload && payload.latest ? payload.latest : null;
  const latestEpisode = normalizeEpisodeRecord({
    season: latest && latest.season,
    episode: latest && latest.episode,
    idEpisode: latest && latest.id_episode,
  });

  if (latestEpisode) {
    latestEpisode.updatedAt = Date.now();
  }

  return { latestEpisode, episodes };
}

export function buildUpcomingEpisodes(episodes, lastWatched) {
  const startIndex = lastWatched
    ? episodes.findIndex((episode) => compareEpisodes(episode, lastWatched) > 0)
    : 0;
  const remaining = startIndex < 0 ? [] : episodes.slice(startIndex);

  return {
    afterIdEpisode: lastWatched ? lastWatched.idEpisode : 0,
    total: remaining.length,
    episodes: remaining
      .slice(0, UPCOMING_EPISODE_LIMIT)
      .map(({ season, episode, idEpisode }) => ({ season, episode, idEpisode })),
  };
}

// Unwatched episodes for the current "watched through" position, or null when the stored list
// can't answer that (e.g. watched-through moved backwards) and a refresh is needed.
export function getUpcomingEpisodes(entry) {
  const upcoming = entry && entry.upcoming;
  if (!upcoming) {
    return null;
  }

  const watchedId = entry.lastWatched ? entry.lastWatched.idEpisode : 0;
  if (upcoming.afterIdEpisode === watchedId) {
    return upcoming;
  }

  if (!entry.lastWatched) {
    return null;
  }

  const index = upcoming.episodes.findIndex(
    (episode) => compareEpisodes(episode, entry.lastWatched) > 0
  );
  if (index < 0) {
    return upcoming.episodes.length === upcoming.total
      ? { afterIdEpisode: watchedId, total: 0, episodes: [] }
      : null;
  }

  // Index 0 means watched-through moved before the stored list, so episodes may be missing.
  if (index === 0) {
    return null;
  }

  return {
    afterIdEpisode: watchedId,
    total: upcoming.total - index,
    episodes: upcoming.episodes.slice(index),
  };
}

function refreshIfUpcomingUnknown(entry) {
  if (entry.upcoming && !getUpcomingEpisodes(entry)) {
    refreshWatchlistEntries({ force: true, slugs: [entry.slug] });
  }
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
  refreshIfUpcomingUnknown(entry);
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

        const { latestEpisode, episodes } = await fetchEpisodeListByIdShow(entry.idShow);
        entry.latestEpisode = latestEpisode;
        entry.upcoming = buildUpcomingEpisodes(episodes, entry.lastWatched);
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

// window.id_show is a page global; the inline page data is the fallback when it isn't visible
// from the userscript sandbox.
export function getPlayPageIdShow() {
  const fromGlobal = toPositiveInteger(window.id_show);
  if (fromGlobal) {
    return fromGlobal;
  }

  const script = Array.from(document.scripts).find((element) =>
    /id_show:\s*\d+/.test(element.textContent || '')
  );
  const match = script ? script.textContent.match(/id_show:\s*(\d+)/) : null;
  return match ? toPositiveInteger(match[1]) : 0;
}

export function readPlayPageEpisodeContext() {
  if (!location.pathname.startsWith('/shows/play/')) {
    return null;
  }

  const hashMatch = location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);
  if (!hashMatch) {
    return null;
  }

  const idShow = getPlayPageIdShow();
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
  refreshIfUpcomingUnknown(entry);
  setWatchlistMessage(
    `${entry.title} updated to watched through ${formatEpisodeLabel(entry.lastWatched)}.`,
    'success'
  );
}

function readCurrentEpisodeFromHash() {
  const match = location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);
  return match
    ? { season: Number(match[1]), episode: Number(match[2]), idEpisode: Number(match[3]) }
    : null;
}

// The episode after the one in the play page URL, from the site's episode list.
export async function findNextShowEpisode() {
  const idShow = getPlayPageIdShow();
  const current = readCurrentEpisodeFromHash();
  if (!idShow || !current) {
    return null;
  }

  const { episodes } = await fetchEpisodeListByIdShow(idShow);
  return episodes.find((episode) => compareEpisodes(episode, current) > 0) || null;
}
