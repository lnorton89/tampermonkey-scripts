import {
  asBoolean,
  asTrimmedString,
  createSettingsStore,
  readStore,
  writeStore,
  type UnknownRecord,
} from '@userscripts/core';
import {
  BACKUP_SNAPSHOT_LIMIT,
  BACKUP_SNAPSHOTS_KEY,
  DEFAULT_SETTINGS,
  INTRO_TIMES_KEY,
  PLAYBACK_RATES,
  RESUME_POINTS_KEY,
  MOVIE_WATCHLIST_KEY,
  PLAYLIST_KEY,
  PLAYLIST_SESSION_KEY,
  SCRIPT_ID,
  SHOWS_LIST_PROGRESS_KEY,
  STORAGE_KEY,
  WATCHLIST_KEY,
  type Settings,
} from '../config/constants';
import { normalizeEpisodeRecord, type EpisodeRecord } from '../domain/episodes';
import { isObjectLike, toPositiveInteger } from './utils';

export interface UpcomingEpisodes {
  afterIdEpisode: number;
  total: number;
  episodes: EpisodeRecord[];
}

export interface WatchlistEntry {
  slug: string;
  idShow: number;
  title: string;
  year: string;
  poster: string;
  addedAt: number;
  lastSyncedAt: number;
  lastSyncError: string;
  latestEpisode: EpisodeRecord | null;
  lastWatched: EpisodeRecord | null;
  upcoming: UpcomingEpisodes | null;
}

export interface WatchlistStore {
  shows: Record<string, WatchlistEntry>;
}

export interface MovieWatchlistEntry {
  slug: string;
  title: string;
  year: string;
  poster: string;
  idMovie: number;
  href: string;
  addedAt: number;
  watched: boolean;
  watchedAt?: number;
}

export interface MovieWatchlistStore {
  movies: Record<string, MovieWatchlistEntry>;
}

export interface PlaylistEntry {
  key: string;
  slug: string;
  idShow: number;
  title: string;
  year: string;
  poster: string;
  episode: EpisodeRecord;
  addedAt: number;
}

export interface PlaylistStore {
  entries: Record<string, PlaylistEntry>;
}

export interface PlaylistSession {
  active: boolean;
  currentKey: string;
  startedAt: number;
}

export interface ShowsListProgress {
  slug: string;
  title: string;
  href: string;
  episode: EpisodeRecord;
  seenAt: number;
  source: 'manual' | 'auto';
}

/** Times in milliseconds, as the site stores them. */
export interface ResumePoint {
  progress: number;
  duration: number;
  savedAt: number;
}

export type ResumePoints = Record<string, ResumePoint>;

export interface IntroTime {
  start?: number;
  end?: number;
  creditsFromEnd?: number;
  updatedAt: number;
}

export type IntroTimes = Record<string, IntroTime>;

/** A daily copy of both watchlists. Its contents are kept as stored, without normalizing. */
export type BackupSnapshot = UnknownRecord & { date: string };

const settingsStore = createSettingsStore<Settings>({
  scriptId: SCRIPT_ID,
  storageKey: STORAGE_KEY,
  defaults: DEFAULT_SETTINGS,
  normalize: (settings) => ({
    autoPlay: asBoolean(settings.autoPlay, DEFAULT_SETTINGS.autoPlay),
    autoFullscreen: asBoolean(settings.autoFullscreen, DEFAULT_SETTINGS.autoFullscreen),
    windowedFullscreen: asBoolean(settings.windowedFullscreen, DEFAULT_SETTINGS.windowedFullscreen),
    autoNextEpisode: asBoolean(settings.autoNextEpisode, DEFAULT_SETTINGS.autoNextEpisode),
    autoSkipIntro: asBoolean(settings.autoSkipIntro, DEFAULT_SETTINGS.autoSkipIntro),
    autoSkipCredits: asBoolean(settings.autoSkipCredits, DEFAULT_SETTINGS.autoSkipCredits),
    playbackRate: PLAYBACK_RATES.includes(Number(settings.playbackRate))
      ? Number(settings.playbackRate)
      : DEFAULT_SETTINGS.playbackRate,
    siteTheme: asBoolean(settings.siteTheme, DEFAULT_SETTINGS.siteTheme),
    ntfyRemoteEnabled: asBoolean(settings.ntfyRemoteEnabled, DEFAULT_SETTINGS.ntfyRemoteEnabled),
    // The default has no trailing slash, so stripping is only meaningful for a saved value.
    ntfyServer: asTrimmedString(settings.ntfyServer, DEFAULT_SETTINGS.ntfyServer).replace(
      /\/+$/,
      ''
    ),
    ntfyTopic: asTrimmedString(settings.ntfyTopic, DEFAULT_SETTINGS.ntfyTopic),
    ntfyControlTopic: asTrimmedString(settings.ntfyControlTopic, DEFAULT_SETTINGS.ntfyControlTopic),
    ntfyCommandSecret: asTrimmedString(
      settings.ntfyCommandSecret,
      DEFAULT_SETTINGS.ntfyCommandSecret
    ),
  }),
});

export function normalizeSettings(settings: unknown): Settings {
  return settingsStore.normalize(settings);
}

export function loadSettings(): Settings {
  return settingsStore.load();
}

function readYear(value: unknown): string {
  return typeof value === 'string' || typeof value === 'number' ? String(value).trim() : '';
}

export function normalizeWatchlistEntry(slug: unknown, entry: unknown): WatchlistEntry | null {
  if (!isObjectLike(entry)) {
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
    year: readYear(entry.year),
    poster: typeof entry.poster === 'string' ? entry.poster : '',
    addedAt: typeof entry.addedAt === 'number' ? entry.addedAt : Date.now(),
    lastSyncedAt: typeof entry.lastSyncedAt === 'number' ? entry.lastSyncedAt : 0,
    lastSyncError: typeof entry.lastSyncError === 'string' ? entry.lastSyncError : '',
    latestEpisode: normalizeEpisodeRecord(entry.latestEpisode),
    lastWatched: normalizeEpisodeRecord(entry.lastWatched),
    upcoming: normalizeUpcomingEpisodes(entry.upcoming),
  };
}

// Episodes after the one watched through, as of the last refresh. Only the first few are kept so
// long-running shows stay small in storage and snapshots.
export function normalizeUpcomingEpisodes(upcoming: unknown): UpcomingEpisodes | null {
  if (!isObjectLike(upcoming) || !Array.isArray(upcoming.episodes)) {
    return null;
  }

  const episodes = (upcoming.episodes as unknown[])
    .map(normalizeEpisodeRecord)
    .filter((episode): episode is EpisodeRecord => !!episode);
  const total = toPositiveInteger(upcoming.total);
  return {
    afterIdEpisode: toPositiveInteger(upcoming.afterIdEpisode),
    total: Math.max(total, episodes.length),
    episodes,
  };
}

/** The `field` object of a parsed store, e.g. `{ shows: {...} }`, or `{}`. */
function readStoreSection(parsed: unknown, field: string): UnknownRecord {
  const section = isObjectLike(parsed) ? parsed[field] : undefined;
  return isObjectLike(section) ? section : {};
}

export function loadWatchlist(): WatchlistStore {
  try {
    const parsed: unknown = JSON.parse(readStore(WATCHLIST_KEY) || '{}');
    const shows: Record<string, WatchlistEntry> = {};

    Object.entries(readStoreSection(parsed, 'shows')).forEach(([slug, entry]) => {
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

export function normalizeMovieWatchlistEntry(
  slug: unknown,
  entry: unknown
): MovieWatchlistEntry | null {
  if (!isObjectLike(entry)) {
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
    year: readYear(entry.year),
    poster: typeof entry.poster === 'string' ? entry.poster : '',
    idMovie: toPositiveInteger(entry.idMovie || entry.id_movie),
    href: typeof entry.href === 'string' ? entry.href : `/movies/view/${normalizedSlug}`,
    addedAt: typeof entry.addedAt === 'number' ? entry.addedAt : Date.now(),
    watched: !!entry.watched,
    watchedAt: typeof entry.watchedAt === 'number' ? entry.watchedAt : undefined,
  };
}

export function loadMovieWatchlist(): MovieWatchlistStore {
  try {
    const parsed: unknown = JSON.parse(readStore(MOVIE_WATCHLIST_KEY) || '{}');
    const movies: Record<string, MovieWatchlistEntry> = {};

    Object.entries(readStoreSection(parsed, 'movies')).forEach(([slug, entry]) => {
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

export function normalizePlaylistEntry(key: unknown, entry: unknown): PlaylistEntry | null {
  if (!isObjectLike(entry)) {
    return null;
  }

  const slug =
    typeof entry.slug === 'string' && entry.slug.trim()
      ? entry.slug.trim()
      : typeof key === 'string' && key.trim()
        ? (key.split(':')[0] ?? '').trim()
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
    year: readYear(entry.year),
    poster: typeof entry.poster === 'string' ? entry.poster : '',
    episode,
    addedAt: typeof entry.addedAt === 'number' ? entry.addedAt : Date.now(),
  };
}

export function loadPlaylist(): PlaylistStore {
  try {
    const parsed: unknown = JSON.parse(readStore(PLAYLIST_KEY) || '{}');
    const entries: Record<string, PlaylistEntry> = {};

    Object.entries(readStoreSection(parsed, 'entries')).forEach(([key, entry]) => {
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

export function normalizePlaylistSession(session: unknown): PlaylistSession {
  if (!isObjectLike(session)) {
    return { active: false, currentKey: '', startedAt: 0 };
  }

  return {
    active: !!session.active,
    currentKey: typeof session.currentKey === 'string' ? session.currentKey : '',
    startedAt: typeof session.startedAt === 'number' ? session.startedAt : 0,
  };
}

export function loadPlaylistSession(): PlaylistSession {
  try {
    return normalizePlaylistSession(JSON.parse(readStore(PLAYLIST_SESSION_KEY) || '{}'));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to load playlist session.`, error);
    return { active: false, currentKey: '', startedAt: 0 };
  }
}

export function normalizeShowsListProgress(progress: unknown): ShowsListProgress | null {
  if (!isObjectLike(progress)) {
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

export function loadShowsListProgress(): ShowsListProgress | null {
  try {
    return normalizeShowsListProgress(JSON.parse(readStore(SHOWS_LIST_PROGRESS_KEY) || 'null'));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to load shows list progress.`, error);
    return null;
  }
}

export function persistSettings(settings: Settings): void {
  settingsStore.persist(settings);
}

export function persistWatchlist(watchlistStore: WatchlistStore): void {
  try {
    writeStore(WATCHLIST_KEY, JSON.stringify(watchlistStore));
    recordBackupSnapshot({ watchlist: watchlistStore });
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save watchlist.`, error);
  }
}

export function persistMovieWatchlist(movieWatchlistStore: MovieWatchlistStore): void {
  try {
    writeStore(MOVIE_WATCHLIST_KEY, JSON.stringify(movieWatchlistStore));
    recordBackupSnapshot({ movieWatchlist: movieWatchlistStore });
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save movie watchlist.`, error);
  }
}

export function persistPlaylist(playlistStore: PlaylistStore): void {
  try {
    writeStore(PLAYLIST_KEY, JSON.stringify(playlistStore));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save playlist.`, error);
  }
}

export function persistPlaylistSession(session: PlaylistSession): void {
  try {
    const normalized = normalizePlaylistSession(session);
    if (!normalized.active) {
      writeStore(PLAYLIST_SESSION_KEY, null);
      return;
    }

    writeStore(PLAYLIST_SESSION_KEY, JSON.stringify(normalized));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save playlist session.`, error);
  }
}

export function persistShowsListProgress(progress: ShowsListProgress | null): void {
  try {
    const normalized = normalizeShowsListProgress(progress);
    if (!normalized) {
      writeStore(SHOWS_LIST_PROGRESS_KEY, null);
      return;
    }

    writeStore(SHOWS_LIST_PROGRESS_KEY, JSON.stringify(normalized));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save shows list progress.`, error);
  }
}

function countStoreEntries(store: object | undefined, field: string): number {
  const section = store ? (store as UnknownRecord)[field] : undefined;
  return section && typeof section === 'object' ? Object.keys(section).length : 0;
}

function getLocalDateKey(date = new Date()): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function hasGmStorage(): boolean {
  return typeof GM_getValue === 'function' && typeof GM_setValue === 'function';
}

export function loadBackupSnapshots(): BackupSnapshot[] {
  if (!hasGmStorage()) {
    return [];
  }

  try {
    const saved = GM_getValue<unknown>(BACKUP_SNAPSHOTS_KEY, null);
    const parsed: unknown = JSON.parse(typeof saved === 'string' && saved ? saved : '[]');
    return Array.isArray(parsed)
      ? (parsed as unknown[]).filter(
          (snapshot): snapshot is BackupSnapshot =>
            isObjectLike(snapshot) && typeof snapshot.date === 'string'
        )
      : [];
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to load backup snapshots.`, error);
    return [];
  }
}

// Keeps one snapshot per day of both watchlists. An empty store never replaces a snapshot,
// so a wipe can't overwrite the last good copy.
function recordBackupSnapshot(partial: {
  watchlist?: WatchlistStore;
  movieWatchlist?: MovieWatchlistStore;
}): void {
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
    const base: UnknownRecord =
      snapshots.find((snapshot) => snapshot.date === date) || snapshots[0] || {};
    const nextSnapshot: BackupSnapshot = {
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

function readJsonStore(key: string, fallback: UnknownRecord): UnknownRecord {
  try {
    const parsed: unknown = JSON.parse(readStore(key) || 'null');
    return isObjectLike(parsed) ? parsed : fallback;
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to load ${key}.`, error);
    return fallback;
  }
}

function writeJsonStore(key: string, value: unknown): void {
  try {
    writeStore(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save ${key}.`, error);
  }
}

export function normalizeResumePoint(point: unknown): ResumePoint | null {
  if (!isObjectLike(point)) {
    return null;
  }

  const progress = Number(point.progress ?? point.currentTime);
  const duration = Number(point.duration);
  if (!Number.isFinite(progress) || !Number.isFinite(duration) || progress < 0 || duration <= 0) {
    return null;
  }

  return {
    progress,
    duration,
    savedAt: typeof point.savedAt === 'number' ? point.savedAt : Date.now(),
  };
}

export function loadResumePoints(): ResumePoints {
  const points: ResumePoints = {};
  Object.entries(readJsonStore(RESUME_POINTS_KEY, {})).forEach(([key, point]) => {
    const normalized = normalizeResumePoint(point);
    if (normalized) {
      points[key] = normalized;
    }
  });
  return points;
}

export function persistResumePoints(points: ResumePoints): void {
  writeJsonStore(RESUME_POINTS_KEY, points);
}

export function normalizeIntroTime(introTime: unknown): IntroTime | null {
  if (!isObjectLike(introTime)) {
    return null;
  }

  // Intro is a start/end range; credits are stored as seconds before the end because episode
  // lengths vary. A show can have either or both.
  const start = Number(introTime.start);
  const end = Number(introTime.end);
  const hasIntro = Number.isFinite(start) && Number.isFinite(end) && start >= 0 && end > start;
  const creditsFromEnd = Number(introTime.creditsFromEnd);
  const hasCredits = Number.isFinite(creditsFromEnd) && creditsFromEnd > 0;
  if (!hasIntro && !hasCredits) {
    return null;
  }

  return {
    ...(hasIntro ? { start, end } : {}),
    ...(hasCredits ? { creditsFromEnd } : {}),
    updatedAt: typeof introTime.updatedAt === 'number' ? introTime.updatedAt : Date.now(),
  };
}

export function loadIntroTimes(): IntroTimes {
  const introTimes: IntroTimes = {};
  Object.entries(readJsonStore(INTRO_TIMES_KEY, {})).forEach(([showKey, introTime]) => {
    const normalized = normalizeIntroTime(introTime);
    if (normalized) {
      introTimes[showKey] = normalized;
    }
  });
  return introTimes;
}

export function persistIntroTimes(introTimes: IntroTimes): void {
  writeJsonStore(INTRO_TIMES_KEY, introTimes);
}
