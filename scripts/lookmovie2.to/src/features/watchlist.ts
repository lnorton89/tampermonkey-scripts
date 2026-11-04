import { SCRIPT_ID, UPCOMING_EPISODE_LIMIT, WATCHLIST_REFRESH_MS } from '../config/constants';
import { errorMessage } from '@userscripts/core';
import { appState, type WatchlistMessageTone } from '../core/state';
import {
  normalizeEpisodeRecord,
  formatEpisodeLabel,
  compareEpisodes,
  isLatestWatched,
  type EpisodeRecord,
} from '../domain/episodes';
import {
  normalizeWatchlistEntry,
  persistWatchlist,
  type UpcomingEpisodes,
  type WatchlistEntry,
} from '../core/storage';
import {
  decodeInlineJsString,
  entriesOf,
  fetchJson,
  fetchText,
  readProp,
  readWindowValue,
  toPositiveInteger,
} from '../core/utils';
import { syncEpisodeCardButtons, syncShowViewWatchButton } from './pages';
import { renderWatchlist, syncLauncherState } from '../ui';

export interface ShowDetails {
  slug: string;
  title?: string;
  year?: string;
  poster?: string;
  episode?: EpisodeRecord | null;
}

export interface ShowRecord {
  slug: string;
  idShow: number;
  title: string;
  year: string;
  poster: string;
}

export interface PlayPageEpisodeContext {
  idShow: number;
  season: number;
  episode: number;
  idEpisode: number;
}

export function getWatchlistEntries(): WatchlistEntry[] {
  return Object.values(appState.watchlistStore.shows);
}

export function getWatchlistEntry(slug: string | null | undefined): WatchlistEntry | null {
  return slug ? appState.watchlistStore.shows[slug] || null : null;
}

export function findWatchlistEntryByIdShow(idShow: number): WatchlistEntry | null {
  if (!idShow) {
    return null;
  }

  return getWatchlistEntries().find((entry) => entry.idShow === idShow) || null;
}

export function countUnwatchedLatestEpisodes(): number {
  return getWatchlistEntries().filter((entry) => entry.latestEpisode && !isLatestWatched(entry))
    .length;
}

export function sortWatchlistEntries(entries: WatchlistEntry[]): WatchlistEntry[] {
  return [...entries].sort((left, right) => {
    const leftWeight = left.latestEpisode ? (isLatestWatched(left) ? 1 : 0) : 2;
    const rightWeight = right.latestEpisode ? (isLatestWatched(right) ? 1 : 0) : 2;

    if (leftWeight !== rightWeight) {
      return leftWeight - rightWeight;
    }

    return left.title.localeCompare(right.title);
  });
}

export function shouldRefreshEntry(entry: WatchlistEntry | null, now: number): boolean {
  if (!entry) {
    return false;
  }

  if (!entry.idShow || !entry.latestEpisode || !entry.upcoming) {
    return true;
  }

  return !entry.lastSyncedAt || now - entry.lastSyncedAt >= WATCHLIST_REFRESH_MS;
}

export function saveWatchlist(): void {
  persistWatchlist(appState.watchlistStore);
  renderWatchlist();
  syncLauncherState();
  syncEpisodeCardButtons();
  syncShowViewWatchButton();
}

export function setWatchlistMessage(message: string, tone?: WatchlistMessageTone): void {
  appState.watchlistMessage = message || '';
  appState.watchlistMessageTone = tone || 'muted';
  renderWatchlist();
}

export async function resolveShowRecordBySlug(
  slug: string,
  fallback?: Partial<ShowRecord> | null
): Promise<ShowRecord> {
  const html = await fetchText(`/shows/view/${slug}`);
  const idMatch = /id_show:\s*(\d+)/.exec(html);
  const titleMatch = /title:\s*'((?:\\'|[^'])*)'/.exec(html);
  const yearMatch = /year:\s*'((?:\\'|[^'])*)'/.exec(html);
  const posterMatch = /poster_medium:\s*'((?:\\'|[^'])*)'/.exec(html);

  return {
    slug,
    idShow: idMatch ? toPositiveInteger(idMatch[1]) : 0,
    title: titleMatch
      ? decodeInlineJsString(titleMatch[1]).trim()
      : fallback?.title
        ? fallback.title
        : slug,
    year: yearMatch
      ? decodeInlineJsString(yearMatch[1]).trim()
      : fallback?.year
        ? fallback.year
        : '',
    poster: posterMatch
      ? decodeInlineJsString(posterMatch[1]).trim()
      : fallback?.poster
        ? fallback.poster
        : '',
  };
}

// Every regular-season episode in airing order, plus the site's latest episode.
export async function fetchEpisodeListByIdShow(
  idShow: number
): Promise<{ latestEpisode: EpisodeRecord | null; episodes: EpisodeRecord[] }> {
  const payload = await fetchJson(`/api/v2/download/episode/list?id=${idShow}`);
  const episodes: EpisodeRecord[] = [];

  // Seasons and episodes can arrive as objects or arrays, keyed by number either way.
  entriesOf(readProp(payload, 'list')).forEach(([season, seasonEpisodes]) => {
    entriesOf(seasonEpisodes).forEach(([episode, record]) => {
      const normalized = normalizeEpisodeRecord({
        season,
        episode,
        idEpisode: readProp(record, 'id_episode'),
      });
      if (normalized) {
        episodes.push(normalized);
      }
    });
  });

  episodes.sort(compareEpisodes);
  const latest = readProp(payload, 'latest') || null;
  const latestEpisode = normalizeEpisodeRecord({
    season: readProp(latest, 'season'),
    episode: readProp(latest, 'episode'),
    idEpisode: readProp(latest, 'id_episode'),
  });

  if (latestEpisode) {
    latestEpisode.updatedAt = Date.now();
  }

  return { latestEpisode, episodes };
}

export function buildUpcomingEpisodes(
  episodes: EpisodeRecord[],
  lastWatched: EpisodeRecord | null
): UpcomingEpisodes {
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
export function getUpcomingEpisodes(entry: WatchlistEntry | null): UpcomingEpisodes | null {
  const upcoming = entry?.upcoming;
  if (!entry || !upcoming) {
    return null;
  }

  const { lastWatched } = entry;
  const watchedId = lastWatched ? lastWatched.idEpisode : 0;
  if (upcoming.afterIdEpisode === watchedId) {
    return upcoming;
  }

  if (!lastWatched) {
    return null;
  }

  const index = upcoming.episodes.findIndex((episode) => compareEpisodes(episode, lastWatched) > 0);
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

function refreshIfUpcomingUnknown(entry: WatchlistEntry): void {
  if (entry.upcoming && !getUpcomingEpisodes(entry)) {
    void refreshWatchlistEntries({ force: true, slugs: [entry.slug] });
  }
}

export async function addShowToWatchlist(showDetails: ShowDetails | null): Promise<void> {
  if (!showDetails?.slug) {
    return;
  }

  const existingEntry = getWatchlistEntry(showDetails.slug);
  if (existingEntry) {
    setWatchlistMessage(`${existingEntry.title} is already in your watchlist.`, 'muted');
    syncEpisodeCardButtons();
    return;
  }

  setWatchlistMessage(`Adding ${showDetails.title || showDetails.slug}...`, 'muted');

  let resolved: ShowRecord = {
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

  const entry = normalizeWatchlistEntry(showDetails.slug, {
    slug: showDetails.slug,
    idShow: resolved.idShow,
    title: resolved.title || showDetails.title || showDetails.slug,
    year: resolved.year || showDetails.year || '',
    poster: resolved.poster || showDetails.poster || '',
    addedAt: Date.now(),
    latestEpisode: showDetails.episode || null,
    lastSyncedAt: 0,
  });
  // Only a whitespace-only slug fails to normalize; storing null would break every reader.
  if (entry) {
    appState.watchlistStore.shows[showDetails.slug] = entry;
  }

  saveWatchlist();
  setWatchlistMessage(
    `${resolved.title || showDetails.title || showDetails.slug} added to your watchlist.`,
    'success'
  );

  await refreshWatchlistEntries({ force: true, slugs: [showDetails.slug] });
}

export function removeShowFromWatchlist(slug: string): void {
  const entry = getWatchlistEntry(slug);
  if (!entry) {
    return;
  }

  delete appState.watchlistStore.shows[slug];
  saveWatchlist();
  setWatchlistMessage(`${entry.title} removed from your watchlist.`, 'muted');
}

export function toggleLatestEpisodeWatched(slug: string): void {
  const entry = getWatchlistEntry(slug);
  if (!entry?.latestEpisode) {
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

export async function refreshWatchlistEntries(options?: {
  force?: boolean;
  slugs?: string[];
}): Promise<void> {
  const force = !!options?.force;
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
    return;
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
        entry.lastSyncError = errorMessage(error);
        entry.lastSyncedAt = Date.now();
        console.warn(`[${SCRIPT_ID}] Failed to refresh ${entry.slug}.`, error);
      }
    }

    saveWatchlist();
    setWatchlistMessage('Watchlist refreshed.', 'success');
  })()
    .catch((error: unknown) => {
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
export function getPlayPageIdShow(): number {
  const fromGlobal = toPositiveInteger(readWindowValue('id_show'));
  if (fromGlobal) {
    return fromGlobal;
  }

  const script = Array.from(document.scripts).find((element) =>
    /id_show:\s*\d+/.test(element.textContent || '')
  );
  const match = script ? /id_show:\s*(\d+)/.exec(script.textContent) : null;
  return match ? toPositiveInteger(match[1]) : 0;
}

export function readPlayPageEpisodeContext(): PlayPageEpisodeContext | null {
  if (!location.pathname.startsWith('/shows/play/')) {
    return null;
  }

  const hashMatch = /^#S(\d+)-E(\d+)-(\d+)$/i.exec(location.hash);
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

export function maybeTrackWatchedEpisodeFromPlayer(): void {
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

function readCurrentEpisodeFromHash(): EpisodeRecord | null {
  const match = /^#S(\d+)-E(\d+)-(\d+)$/i.exec(location.hash);
  return match
    ? { season: Number(match[1]), episode: Number(match[2]), idEpisode: Number(match[3]) }
    : null;
}

// The episode after the one in the play page URL, from the site's episode list.
export async function findNextShowEpisode(): Promise<EpisodeRecord | null> {
  const idShow = getPlayPageIdShow();
  const current = readCurrentEpisodeFromHash();
  if (!idShow || !current) {
    return null;
  }

  const { episodes } = await fetchEpisodeListByIdShow(idShow);
  return episodes.find((episode) => compareEpisodes(episode, current) > 0) || null;
}
