/* eslint-disable */
// @ts-nocheck
import { appState } from '../core/state';
import { normalizeMovieWatchlistEntry, persistMovieWatchlist } from '../core/storage';
import { renderWatchlist, syncLauncherState } from '../ui';
import { syncMovieCardButtons, syncMovieViewWatchButton } from './pages';

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
