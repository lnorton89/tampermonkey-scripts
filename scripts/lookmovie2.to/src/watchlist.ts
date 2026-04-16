import type {
  WatchlistStore,
  WatchlistEntry,
  EpisodeRecord,
  ShowDetails,
  PlayPageEpisodeContext,
} from './types';
import {
  SCRIPT_ID,
  normalizeEpisodeRecord,
  toPositiveInteger,
  formatEpisodeLabel,
  sameEpisode,
  compareEpisodes,
  decodeInlineJsString,
  log,
} from './utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const WATCHLIST_KEY = `${SCRIPT_ID}:watchlist`;
const WATCHLIST_REFRESH_MS = 30 * 60 * 1000;

// ---------------------------------------------------------------------------
// Module state
// ---------------------------------------------------------------------------

const watchlistStore: WatchlistStore = loadWatchlist();
let watchlistMessage = '';
let watchlistMessageTone: 'success' | 'danger' | 'muted' = 'muted';
let watchlistRefreshPromise: Promise<void> | null = null;
let watchlistBusy = false;

// Callback hooks (set by UI module)
type ChangeCallback = () => void;
const onChangeCallbacks: ChangeCallback[] = [];

export function onChange(cb: ChangeCallback): void {
  onChangeCallbacks.push(cb);
}

function emitChange(): void {
  onChangeCallbacks.forEach((cb) => {
    cb();
  });
}

// ---------------------------------------------------------------------------
// Persistence
// ---------------------------------------------------------------------------

function normalizeWatchlistEntry(
  slug: string,
  entry: Partial<Record<string, unknown>> | null
): WatchlistEntry | null {
  if (!entry || typeof entry !== 'object') return null;

  const normalizedSlug = typeof slug === 'string' && slug.trim() ? slug.trim() : '';
  if (!normalizedSlug) return null;

  return {
    slug: normalizedSlug,
    idShow: toPositiveInteger(entry.idShow ?? entry.id_show),
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
    latestEpisode: normalizeEpisodeRecord(entry.latestEpisode as Partial<Record<string, unknown>>),
    lastWatched: normalizeEpisodeRecord(entry.lastWatched as Partial<Record<string, unknown>>),
  };
}

export function loadWatchlist(): WatchlistStore {
  try {
    const stored = localStorage.getItem(WATCHLIST_KEY);
    const parsed = stored ? (JSON.parse(stored) as { shows?: Record<string, unknown> }) : {};
    const sourceShows = parsed.shows ?? {};
    const shows: Record<string, WatchlistEntry> = {};

    Object.entries(sourceShows).forEach(([slug, entry]) => {
      const normalized = normalizeWatchlistEntry(slug, entry as Partial<Record<string, unknown>>);
      if (normalized) {
        shows[slug] = normalized;
      }
    });

    return { shows };
  } catch (error) {
    log.warn('Failed to load watchlist.', error);
    return { shows: {} };
  }
}

function persistWatchlist(): void {
  try {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlistStore));
  } catch (error) {
    log.warn('Failed to save watchlist.', error);
  }
}

function saveWatchlist(): void {
  persistWatchlist();
  emitChange();
}

// ---------------------------------------------------------------------------
// Public getters
// ---------------------------------------------------------------------------

export function getWatchlistStore(): WatchlistStore {
  return watchlistStore;
}

export function getWatchlistEntries(): WatchlistEntry[] {
  return Object.values(watchlistStore.shows);
}

export function getWatchlistEntry(slug: string): WatchlistEntry | null {
  return slug ? (watchlistStore.shows[slug] ?? null) : null;
}

export function findWatchlistEntryByIdShow(idShow: number): WatchlistEntry | null {
  if (!idShow) return null;
  return getWatchlistEntries().find((entry) => entry.idShow === idShow) ?? null;
}

export function isLatestWatched(entry: WatchlistEntry): boolean {
  return sameEpisode(entry.latestEpisode, entry.lastWatched);
}

export function countUnwatchedLatestEpisodes(): number {
  return getWatchlistEntries().filter((entry) => entry.latestEpisode && !isLatestWatched(entry))
    .length;
}

export function sortWatchlistEntries(entries: WatchlistEntry[]): WatchlistEntry[] {
  return [...entries].sort((left, right) => {
    const leftWeight = left.latestEpisode ? (isLatestWatched(left) ? 1 : 0) : 2;
    const rightWeight = right.latestEpisode ? (isLatestWatched(right) ? 1 : 0) : 2;
    if (leftWeight !== rightWeight) return leftWeight - rightWeight;
    return left.title.localeCompare(right.title);
  });
}

export function getWatchlistMessage(): string {
  return watchlistMessage;
}

export function getWatchlistMessageTone(): string {
  return watchlistMessageTone;
}

export function isWatchlistBusy(): boolean {
  return watchlistBusy;
}

// ---------------------------------------------------------------------------
// Watchlist mutations
// ---------------------------------------------------------------------------

export function setWatchlistMessage(message: string, tone: 'success' | 'danger' | 'muted'): void {
  watchlistMessage = message;
  watchlistMessageTone = tone;
  emitChange();
}

export async function addShowToWatchlist(showDetails: ShowDetails): Promise<void> {
  if (!showDetails.slug) return;

  const existingEntry = getWatchlistEntry(showDetails.slug);
  if (existingEntry) {
    setWatchlistMessage(`${existingEntry.title} is already in your watchlist.`, 'muted');
    emitChange();
    return;
  }

  setWatchlistMessage(`Adding ${showDetails.title ?? showDetails.slug}...`, 'muted');

  let resolved: {
    slug: string;
    idShow: number;
    title: string;
    year: string;
    poster: string;
  } = {
    slug: showDetails.slug,
    idShow: 0,
    title: showDetails.title ?? showDetails.slug,
    year: showDetails.year ?? '',
    poster: showDetails.poster ?? '',
  };

  try {
    const fetched = await resolveShowRecordBySlug(showDetails.slug, showDetails);
    resolved = {
      slug: showDetails.slug,
      idShow: fetched.idShow ?? 0,
      title: fetched.title ?? showDetails.title ?? showDetails.slug,
      year: fetched.year ?? showDetails.year ?? '',
      poster: fetched.poster ?? showDetails.poster ?? '',
    };
  } catch (error) {
    log.warn(`Failed to resolve show metadata for ${showDetails.slug}.`, error);
  }

  const normalized = normalizeWatchlistEntry(showDetails.slug, {
    slug: showDetails.slug,
    idShow: resolved.idShow,
    title: resolved.title,
    year: resolved.year,
    poster: resolved.poster,
    addedAt: Date.now(),
    latestEpisode: showDetails.episode ?? null,
    lastSyncedAt: 0,
  });
  if (normalized) {
    watchlistStore.shows[showDetails.slug] = normalized;
  }

  saveWatchlist();
  setWatchlistMessage(`${resolved.title} added to your watchlist.`, 'success');

  await refreshWatchlistEntries({ force: true, slugs: [showDetails.slug] });
}

export function removeShowFromWatchlist(slug: string): void {
  const entry = getWatchlistEntry(slug);
  if (!entry) return;

  watchlistStore.shows[slug] = undefined as unknown as WatchlistEntry;
  saveWatchlist();
  setWatchlistMessage(`${entry.title} removed from your watchlist.`, 'muted');
}

export function toggleLatestEpisodeWatched(slug: string): void {
  const entry = getWatchlistEntry(slug);
  if (!entry?.latestEpisode) return;

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

// ---------------------------------------------------------------------------
// Refresh logic
// ---------------------------------------------------------------------------

function shouldRefreshEntry(entry: WatchlistEntry, now: number): boolean {
  if (!entry.idShow || !entry.latestEpisode) return true;
  return !entry.lastSyncedAt || now - entry.lastSyncedAt >= WATCHLIST_REFRESH_MS;
}

export async function refreshWatchlistEntries(options?: {
  force?: boolean;
  slugs?: string[];
}): Promise<void> {
  const force = !!options?.force;
  const slugSet = options && Array.isArray(options.slugs) ? new Set(options.slugs) : null;

  if (watchlistRefreshPromise) return watchlistRefreshPromise;

  const now = Date.now();
  const entries = getWatchlistEntries().filter((entry) => {
    if (slugSet && !slugSet.has(entry.slug)) return false;
    return force || shouldRefreshEntry(entry, now);
  });

  if (!entries.length) {
    emitChange();
    return Promise.resolve();
  }

  watchlistBusy = true;
  setWatchlistMessage(
    `Refreshing ${String(entries.length)} watchlist ${entries.length === 1 ? 'show' : 'shows'}...`,
    'muted'
  );

  watchlistRefreshPromise = (async (): Promise<void> => {
    for (const entry of entries) {
      try {
        if (!entry.idShow) {
          const resolved = await resolveShowRecordBySlug(entry.slug, entry);
          entry.idShow = resolved.idShow ?? 0;
          entry.title = resolved.title ?? entry.title;
          entry.year = resolved.year ?? entry.year;
          entry.poster = resolved.poster ?? entry.poster;
        }

        if (!entry.idShow) {
          throw new Error('Unable to resolve show id.');
        }

        const latestEpisode = await fetchLatestEpisodeByIdShow(entry.idShow);
        entry.latestEpisode = latestEpisode;
        entry.lastSyncError = '';
        entry.lastSyncedAt = Date.now();
      } catch (error: unknown) {
        entry.lastSyncError = error instanceof Error ? error.message : String(error);
        entry.lastSyncedAt = Date.now();
        log.warn(`Failed to refresh ${entry.slug}.`, error);
      }
    }

    saveWatchlist();
    setWatchlistMessage('Watchlist refreshed.', 'success');
  })()
    .catch((error: unknown) => {
      log.warn('Watchlist refresh failed.', error);
      setWatchlistMessage('Watchlist refresh failed.', 'danger');
    })
    .finally(() => {
      watchlistBusy = false;
      emitChange();
      watchlistRefreshPromise = null;
    });

  return watchlistRefreshPromise;
}

// ---------------------------------------------------------------------------
// API helpers
// ---------------------------------------------------------------------------

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, { credentials: 'same-origin' });
  if (!response.ok) throw new Error(`Request failed (${String(response.status)})`);
  return response.text();
}

async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url, { credentials: 'same-origin' });
  if (!response.ok) throw new Error(`Request failed (${String(response.status)})`);
  return response.json();
}

async function resolveShowRecordBySlug(
  slug: string,
  fallback?: Partial<ShowDetails>
): Promise<ShowDetails> {
  const html = await fetchText(`/shows/view/${slug}`);
  const idMatch = /id_show:\s*(\d+)/.exec(html);
  const titleMatch = /title:\s*'((?:\\'|[^'])*)'/.exec(html);
  const yearMatch = /year:\s*'((?:\\'|[^'])*)'/.exec(html);
  const posterMatch = /poster_medium:\s*'((?:\\'|[^'])*)'/.exec(html);

  return {
    slug,
    idShow: idMatch ? toPositiveInteger(idMatch[1]) : 0,
    title: titleMatch?.[1] ? decodeInlineJsString(titleMatch[1]).trim() : (fallback?.title ?? slug),
    year: yearMatch?.[1] ? decodeInlineJsString(yearMatch[1]).trim() : (fallback?.year ?? ''),
    poster: posterMatch?.[1]
      ? decodeInlineJsString(posterMatch[1]).trim()
      : (fallback?.poster ?? ''),
  };
}

async function fetchLatestEpisodeByIdShow(idShow: number): Promise<EpisodeRecord | null> {
  const payload = (await fetchJson(`/api/v2/download/episode/list?id=${String(idShow)}`)) as {
    latest?: Partial<Record<string, unknown>> | null;
  };
  const latest = payload.latest ?? null;
  const episodeRecord = normalizeEpisodeRecord(latest);

  if (!episodeRecord) return null;
  episodeRecord.updatedAt = Date.now();
  return episodeRecord;
}

// ---------------------------------------------------------------------------
// Play page tracking
// ---------------------------------------------------------------------------

export function readPlayPageEpisodeContext(): PlayPageEpisodeContext | null {
  if (!location.pathname.startsWith('/shows/play/')) return null;

  const hashMatch = /^#S(\d+)-E(\d+)-(\d+)$/i.exec(location.hash);
  if (!hashMatch) return null;

  const idShow = toPositiveInteger(window.id_show);
  const season = toPositiveInteger(hashMatch[1]);
  const episode = toPositiveInteger(hashMatch[2]);
  const idEpisode = toPositiveInteger(hashMatch[3]);

  if (!idShow || !season || !episode || !idEpisode) return null;

  return { idShow, season, episode, idEpisode };
}

let lastTrackedEpisodeSignature = '';

export function maybeTrackWatchedEpisodeFromPlayer(): void {
  const context = readPlayPageEpisodeContext();
  if (!context) return;

  const signature = `${String(context.idShow)}:${String(context.idEpisode)}`;
  if (signature === lastTrackedEpisodeSignature) return;

  const entry = findWatchlistEntryByIdShow(context.idShow);
  if (!entry) return;

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

  lastTrackedEpisodeSignature = signature;
  saveWatchlist();
  setWatchlistMessage(
    `${entry.title} updated to watched through ${formatEpisodeLabel(entry.lastWatched)}.`,
    'success'
  );
}

export function resetTrackedEpisode(): void {
  lastTrackedEpisodeSignature = '';
}
