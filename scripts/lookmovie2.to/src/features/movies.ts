import { SCRIPT_ID } from '../config/constants';
import { appState } from '../core/state';
import { asRecord, type UnknownRecord } from '@userscripts/core';
import {
  normalizeMovieWatchlistEntry,
  persistMovieWatchlist,
  type MovieWatchlistEntry,
} from '../core/storage';
import { decodeInlineJsString, fetchText, normalizeImageUrl } from '../core/utils';
import { renderWatchlist, syncLauncherState } from '../ui';
import { syncMovieCardButtons, syncMovieViewWatchButton } from './pages';

export interface MovieDetails {
  slug: string;
  title?: string;
  year?: string;
  poster?: string;
  idMovie?: number;
  href?: string;
}

export interface MovieRecord {
  slug: string;
  idMovie: number;
  title: string;
  year: string;
  poster: string;
}

let movieWatchlistRefreshPromise: Promise<void> | null = null;

export function getMovieWatchlistEntries(): MovieWatchlistEntry[] {
  return Object.values(appState.movieWatchlistStore.movies);
}

export function getMovieWatchlistEntry(
  slug: string | null | undefined
): MovieWatchlistEntry | null {
  return slug ? appState.movieWatchlistStore.movies[slug] || null : null;
}

export function countUnwatchedMovies(): number {
  return getMovieWatchlistEntries().filter((entry) => !entry.watched).length;
}

export function sortMovieWatchlistEntries(entries: MovieWatchlistEntry[]): MovieWatchlistEntry[] {
  return [...entries].sort((left, right) => {
    if (left.watched !== right.watched) {
      return left.watched ? 1 : -1;
    }

    return left.title.localeCompare(right.title);
  });
}

export function saveMovieWatchlist(): void {
  persistMovieWatchlist(appState.movieWatchlistStore);
  renderWatchlist();
  syncLauncherState();
  syncMovieCardButtons();
  syncMovieViewWatchButton();
}

export function hasUsableMoviePoster(entry: { poster?: unknown } | null): boolean {
  if (!entry || typeof entry.poster !== 'string' || !entry.poster.trim()) {
    return false;
  }

  const poster = entry.poster.trim();
  if (poster.startsWith('data:image/')) {
    return false;
  }

  return true;
}

export function decodeInlineJsonString(value: string): unknown {
  try {
    return JSON.parse(`"${value}"`) as unknown;
  } catch {
    return decodeInlineJsString(value);
  }
}

export function parseMovieStorageFromHtml(html: string): UnknownRecord {
  const storageMatch = /(?:var\s+|window\.)movie_storage\s*=\s*(\{[\s\S]*?\})\s*;/.exec(html);
  if (!storageMatch) {
    return {};
  }

  try {
    // The match starts with `{`, so a successful parse is always an object.
    return asRecord(JSON.parse(storageMatch[1] ?? ''));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to parse movie_storage metadata.`, error);
    return {};
  }
}

export async function resolveMovieRecordBySlug(
  slug: string,
  fallback?: Partial<MovieRecord> | null
): Promise<MovieRecord> {
  const html = await fetchText(`/movies/view/${slug}`);
  const movieStorage = parseMovieStorageFromHtml(html);
  const idMatch = /id_movie:\s*(\d+)/.exec(html);
  const titleMatch = /title:\s*'((?:\\'|[^'])*)'/.exec(html);
  const yearMatch = /year:\s*'((?:\\'|[^'])*)'/.exec(html);
  const posterMatch = /poster_medium:\s*'((?:\\'|[^'])*)'/.exec(html);
  const storagePoster =
    typeof movieStorage.movie_poster === 'string' && movieStorage.movie_poster
      ? movieStorage.movie_poster
      : typeof movieStorage.poster_medium === 'string' && movieStorage.poster_medium
        ? movieStorage.poster_medium
        : typeof movieStorage.poster === 'string'
          ? movieStorage.poster
          : '';

  return {
    slug,
    idMovie:
      typeof movieStorage.id_movie === 'number'
        ? movieStorage.id_movie
        : idMatch
          ? parseInt(idMatch[1] ?? '', 10)
          : 0,
    title:
      typeof movieStorage.title === 'string' && movieStorage.title.trim()
        ? movieStorage.title.trim()
        : titleMatch
          ? decodeInlineJsString(titleMatch[1]).trim()
          : fallback?.title
            ? fallback.title
            : slug,
    year:
      typeof movieStorage.year === 'string' || typeof movieStorage.year === 'number'
        ? String(movieStorage.year)
        : yearMatch
          ? decodeInlineJsString(yearMatch[1]).trim()
          : fallback?.year
            ? fallback.year
            : '',
    poster:
      normalizeImageUrl(storagePoster) ||
      (posterMatch ? normalizeImageUrl(decodeInlineJsString(posterMatch[1])) : '') ||
      (fallback?.poster ? normalizeImageUrl(fallback.poster) : ''),
  };
}

export async function refreshMovieWatchlistMetadata(): Promise<void> {
  if (movieWatchlistRefreshPromise) {
    return movieWatchlistRefreshPromise;
  }

  const entries = getMovieWatchlistEntries().filter(
    (entry) => !hasUsableMoviePoster(entry) || !entry.idMovie
  );
  if (!entries.length) {
    return;
  }

  movieWatchlistRefreshPromise = (async () => {
    let didUpdate = false;

    for (const entry of entries) {
      try {
        const resolved = await resolveMovieRecordBySlug(entry.slug, entry);
        if (resolved.idMovie && resolved.idMovie !== entry.idMovie) {
          entry.idMovie = resolved.idMovie;
          didUpdate = true;
        }
        if (resolved.title && resolved.title !== entry.title) {
          entry.title = resolved.title;
          didUpdate = true;
        }
        if (resolved.year && resolved.year !== entry.year) {
          entry.year = resolved.year;
          didUpdate = true;
        }
        if (resolved.poster && resolved.poster !== entry.poster) {
          entry.poster = resolved.poster;
          didUpdate = true;
        }
      } catch (error) {
        console.warn(`[${SCRIPT_ID}] Failed to refresh movie metadata for ${entry.slug}.`, error);
      }
    }

    if (didUpdate) {
      saveMovieWatchlist();
    }
  })().finally(() => {
    movieWatchlistRefreshPromise = null;
  });

  return movieWatchlistRefreshPromise;
}

export function addMovieToWatchlist(movieDetails: MovieDetails | null): void {
  if (!movieDetails?.slug) {
    return;
  }

  const { slug } = movieDetails;
  const resolved = {
    slug: movieDetails.slug,
    title: movieDetails.title || movieDetails.slug,
    year: movieDetails.year || '',
    poster: movieDetails.poster || '',
    idMovie: movieDetails.idMovie || 0,
  };

  void resolveMovieRecordBySlug(slug, movieDetails).then((result) => {
    if (result.title) resolved.title = result.title;
    if (result.year) resolved.year = result.year;
    if (result.poster) resolved.poster = result.poster;
    if (result.idMovie) resolved.idMovie = result.idMovie;

    const entry = normalizeMovieWatchlistEntry(slug, {
      slug,
      title: resolved.title,
      year: resolved.year,
      poster: resolved.poster,
      idMovie: resolved.idMovie,
      href: movieDetails.href || `/movies/view/${slug}`,
      addedAt: Date.now(),
      watched: false,
    });
    // Only a whitespace-only slug fails to normalize; storing null would break every reader.
    if (entry) {
      appState.movieWatchlistStore.movies[slug] = entry;
    }

    saveMovieWatchlist();
    renderWatchlist();
  });
}

export function removeMovieFromWatchlist(slug: string): void {
  if (!getMovieWatchlistEntry(slug)) {
    return;
  }

  delete appState.movieWatchlistStore.movies[slug];
  saveMovieWatchlist();
}

export function toggleMovieWatched(slug: string): void {
  const entry = getMovieWatchlistEntry(slug);
  if (!entry) {
    return;
  }

  entry.watched = !entry.watched;
  entry.watchedAt = entry.watched ? Date.now() : undefined;
  saveMovieWatchlist();
}
