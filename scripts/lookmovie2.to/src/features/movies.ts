/* eslint-disable */
// @ts-nocheck
import { SCRIPT_ID } from '../config/constants';
import { appState } from '../core/state';
import { normalizeMovieWatchlistEntry, persistMovieWatchlist } from '../core/storage';
import { decodeInlineJsString, fetchText } from '../core/utils';
import { renderWatchlist, syncLauncherState } from '../ui';
import { syncMovieCardButtons, syncMovieViewWatchButton } from './pages';

let movieWatchlistRefreshPromise = null;

export function getMovieWatchlistEntries() {
  return Object.values(appState.movieWatchlistStore.movies);
}

export function getMovieWatchlistEntry(slug) {
  return slug ? appState.movieWatchlistStore.movies[slug] || null : null;
}

export function countUnwatchedMovies() {
  return getMovieWatchlistEntries().filter((entry) => !entry.watched).length;
}

export function sortMovieWatchlistEntries(entries) {
  return [...entries].sort((left, right) => {
    if (left.watched !== right.watched) {
      return left.watched ? 1 : -1;
    }

    return left.title.localeCompare(right.title);
  });
}

export function saveMovieWatchlist() {
  persistMovieWatchlist(appState.movieWatchlistStore);
  renderWatchlist();
  syncLauncherState();
  syncMovieCardButtons();
  syncMovieViewWatchButton();
}

export function hasUsableMoviePoster(entry) {
  if (!entry || typeof entry.poster !== 'string' || !entry.poster.trim()) {
    return false;
  }

  const poster = entry.poster.trim();
  if (poster.startsWith('data:image/')) {
    return false;
  }

  return true;
}

export function decodeInlineJsonString(value) {
  try {
    return JSON.parse(`"${value}"`);
  } catch (error) {
    return decodeInlineJsString(value);
  }
}

export async function resolveMovieRecordBySlug(slug, fallback) {
  const html = await fetchText(`/movies/view/${slug}`);
  const titleMatch = html.match(/"title"\s*:\s*"((?:\\"|[^"])*)"/);
  const yearMatch = html.match(/"year"\s*:\s*"?(\d{4})"?/);

  const posterPatterns = [
    /"movie_poster"\s*:\s*"((?:\\"|[^"])*)"/,
    /"poster_medium"\s*:\s*"((?:\\"|[^"])*)"/,
    /<p[^>]*class="[^"]*movie__poster[^"]*"[^>]*data-background-image="([^"]+)"/,
    /<img[^>]*class="[^"]*movie__poster[^"]*"[^>]*data-src="([^"]+)"/,
    /<meta[^>]*property="og:image"[^>]*content="([^"]+)"/,
    /data-lazy-background="([^"]+)"/,
    /data-src-portrait="([^"]+)"/,
    /"image"\s*:\s*"((?:\\"|[^"])*)"/,
  ];

  let poster = '';
  for (const pattern of posterPatterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      poster = decodeInlineJsonString(match[1]).trim() || decodeInlineJsString(match[1]).trim();
      if (
        poster &&
        !poster.startsWith('data:image/') &&
        (poster.startsWith('http') || poster.startsWith('//') || poster.startsWith('/'))
      ) {
        break;
      }
    }
  }

  return {
    slug,
    title: titleMatch
      ? decodeInlineJsonString(titleMatch[1]).trim()
      : fallback && fallback.title
        ? fallback.title
        : slug,
    year: yearMatch ? yearMatch[1] : fallback && fallback.year ? fallback.year : '',
    poster: poster || (fallback && fallback.poster) || '',
  };
}

export async function refreshMovieWatchlistMetadata() {
  if (movieWatchlistRefreshPromise) {
    return movieWatchlistRefreshPromise;
  }

  const entries = getMovieWatchlistEntries().filter((entry) => !hasUsableMoviePoster(entry));
  if (!entries.length) {
    return Promise.resolve();
  }

  movieWatchlistRefreshPromise = (async () => {
    let didUpdate = false;

    for (const entry of entries) {
      try {
        const resolved = await resolveMovieRecordBySlug(entry.slug, entry);
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

export function addMovieToWatchlist(movieDetails) {
  if (!movieDetails || !movieDetails.slug) {
    return;
  }

  appState.movieWatchlistStore.movies[movieDetails.slug] = normalizeMovieWatchlistEntry(
    movieDetails.slug,
    {
      slug: movieDetails.slug,
      title: movieDetails.title || movieDetails.slug,
      year: movieDetails.year || '',
      poster: movieDetails.poster || '',
      href: movieDetails.href || `/movies/view/${movieDetails.slug}`,
      addedAt: Date.now(),
      watched: false,
    }
  );

  saveMovieWatchlist();

  if (!hasUsableMoviePoster(appState.movieWatchlistStore.movies[movieDetails.slug])) {
    refreshMovieWatchlistMetadata();
  }
}

export function removeMovieFromWatchlist(slug) {
  if (!getMovieWatchlistEntry(slug)) {
    return;
  }

  delete appState.movieWatchlistStore.movies[slug];
  saveMovieWatchlist();
}

export function toggleMovieWatched(slug) {
  const entry = getMovieWatchlistEntry(slug);
  if (!entry) {
    return;
  }

  entry.watched = !entry.watched;
  entry.watchedAt = entry.watched ? Date.now() : undefined;
  saveMovieWatchlist();
}
