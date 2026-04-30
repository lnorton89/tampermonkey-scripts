/* eslint-disable */
// @ts-nocheck
import { SCRIPT_ID } from '../config/constants';
import { normalizeEpisodeRecord, compareEpisodes, sameEpisode } from '../domain/episodes';
import { appState } from '../core/state';
import { normalizeShowsListProgress, persistShowsListProgress } from '../core/storage';
import { escapeHtml, toPositiveInteger } from '../core/utils';
import { addShowToWatchlist, getWatchlistEntry, removeShowFromWatchlist } from './watchlist';
import { addMovieToWatchlist, getMovieWatchlistEntry, removeMovieFromWatchlist } from './movies';

export function extractShowSlugFromViewHref(href) {
  try {
    const url = new URL(href, location.origin);
    const pathMatch = url.pathname.match(/\/shows\/view\/([^/?#]+)/i);
    return pathMatch ? pathMatch[1] : '';
  } catch (error) {
    return '';
  }
}

export function extractEpisodeContextFromHref(href) {
  try {
    const url = new URL(href, location.origin);
    const season = toPositiveInteger(url.searchParams.get('season'));
    const episode = toPositiveInteger(url.searchParams.get('episode'));
    const idEpisode = toPositiveInteger(url.searchParams.get('id_episode'));

    if (!season || !episode || !idEpisode) {
      return null;
    }

    return { season, episode, idEpisode };
  } catch (error) {
    return null;
  }
}

export function extractYearFromSlug(slug) {
  const yearMatch = typeof slug === 'string' ? slug.match(/-(\d{4})$/) : null;
  return yearMatch ? yearMatch[1] : '';
}

export function extractMovieSlugFromViewHref(href) {
  try {
    const url = new URL(href, location.origin);
    const pathMatch = url.pathname.match(/\/movies\/view\/([^/?#]+)/i);
    return pathMatch ? pathMatch[1] : '';
  } catch (error) {
    return '';
  }
}

export function getElementImageUrl(element) {
  if (!element) {
    return '';
  }

  const style = element.getAttribute('style') || '';
  const styleMatch = style.match(/background-image:\s*url\((['"]?)(.*?)\1\)/i);
  const candidates = [
    element.getAttribute('data-lazy-background'),
    element.getAttribute('data-src-portrait'),
    element.getAttribute('data-background-image'),
    element.getAttribute('data-src'),
    styleMatch?.[2],
    element.getAttribute('src'),
  ];

  return (
    candidates.find(
      (candidate) =>
        typeof candidate === 'string' &&
        candidate.trim() &&
        !candidate.trim().startsWith('data:image/')
    ) || ''
  );
}

export function parseEpisodeCard(cardElement) {
  if (!cardElement) {
    return null;
  }

  const link = cardElement.querySelector('a[href*="/shows/view/"]');
  if (!link) {
    return null;
  }

  const slug = extractShowSlugFromViewHref(link.getAttribute('href'));
  if (!slug) {
    return null;
  }

  const titleNode = cardElement.querySelector('.mv-item-infor h6');
  const imageNode = cardElement.querySelector('img[data-src], img[src]');
  const episodeContext = extractEpisodeContextFromHref(link.getAttribute('href'));

  return {
    slug,
    title: titleNode ? titleNode.textContent.trim() : slug,
    year: extractYearFromSlug(slug),
    poster: getElementImageUrl(imageNode),
    href: new URL(link.getAttribute('href'), location.origin).href,
    episode: episodeContext,
  };
}

export function buildShowViewUrl(slug, episodeRecord) {
  if (!slug) {
    return '/shows';
  }

  if (!episodeRecord) {
    return `/shows/view/${slug}`;
  }

  return `/shows/view/${slug}?season=${episodeRecord.season}&episode=${episodeRecord.episode}&id_episode=${episodeRecord.idEpisode}`;
}

export function buildMovieViewUrl(slug) {
  return slug ? `/movies/view/${slug}` : '/movies';
}

export function isLatestShowsPage() {
  return location.pathname === '/shows';
}

export function isShowViewPage() {
  return location.pathname.startsWith('/shows/view/');
}

export function isMoviesPage() {
  return location.pathname === '/movies';
}

export function isMoviePlayPage() {
  return location.pathname.startsWith('/movies/play/');
}

export function isMovieViewPage() {
  return location.pathname.startsWith('/movies/view/');
}

export function getCurrentShowViewData() {
  if (!isShowViewPage()) {
    return null;
  }

  const showStorage = window.show_storage || {};
  const slug =
    typeof showStorage.slug === 'string' && showStorage.slug
      ? showStorage.slug
      : extractShowSlugFromViewHref(location.href);
  if (!slug) {
    return null;
  }

  const titleNode =
    document.querySelector('.movie-single-ct h1') ||
    document.querySelector('.movie-single-ct h2') ||
    document.querySelector('.internal-page-container h1') ||
    document.querySelector('.internal-page-container h2');
  const posterNode =
    document.querySelector('.movie__poster[style*="background-image"]') ||
    document.querySelector('.movie__poster[data-background-image]') ||
    document.querySelector('.movie-single-ct img[data-src], .movie-single-ct img[src]') ||
    document.querySelector(
      '.internal-page-container img[data-src], .internal-page-container img[src]'
    );
  const ogImageNode = document.querySelector('meta[property="og:image"]');
  const params = new URLSearchParams(location.search);
  const episode = normalizeEpisodeRecord({
    season: params.get('season'),
    episode: params.get('episode'),
    idEpisode: params.get('id_episode'),
  });

  return {
    slug,
    title:
      typeof showStorage.title === 'string' && showStorage.title.trim()
        ? showStorage.title.trim()
        : titleNode
          ? titleNode.textContent.replace(/\s*\d{4}\s*$/, '').trim()
          : slug,
    year:
      typeof showStorage.year === 'string' || typeof showStorage.year === 'number'
        ? String(showStorage.year)
        : extractYearFromSlug(slug),
    poster:
      typeof showStorage.poster_medium === 'string' && showStorage.poster_medium
        ? showStorage.poster_medium
        : getElementImageUrl(posterNode) || ogImageNode?.getAttribute('content') || '',
    idShow: toPositiveInteger(showStorage.id_show),
    episode,
  };
}

export function parseMovieCard(cardElement) {
  if (!cardElement) {
    return null;
  }

  const link = cardElement.querySelector('a[href*="/movies/view/"]');
  if (!link) {
    return null;
  }

  const slug = extractMovieSlugFromViewHref(link.getAttribute('href'));
  if (!slug) {
    return null;
  }

  const titleNode = cardElement.querySelector(
    '.slide-item__title, .mv-item-infor h6, h6, h5, .title'
  );
  const imageNode = cardElement.querySelector('img[data-src-portrait], img[data-src], img[src]');
  const backgroundNode = cardElement.querySelector(
    '[data-background-image], [style*="background-image"], [data-src-portrait], [data-src]'
  );
  const yearNode = cardElement.querySelector('.year');
  const titleText = titleNode ? titleNode.textContent.trim() : '';
  const yearFromTitle = titleText.match(/\((\d{4})\)/);
  const poster = getElementImageUrl(imageNode) || getElementImageUrl(backgroundNode);

  return {
    slug,
    title: titleText ? titleText.replace(/\s*\(\d{4}\)\s*$/, '').trim() : slug,
    year: yearNode ? yearNode.textContent.trim() : yearFromTitle?.[1] || extractYearFromSlug(slug),
    poster,
    href: new URL(link.getAttribute('href'), location.origin).href,
  };
}

export function getCurrentMovieViewData() {
  if (!isMovieViewPage()) {
    return null;
  }

  const slug = extractMovieSlugFromViewHref(location.href);
  if (!slug) {
    return null;
  }

  const movieStorage = window.movie_storage || window.movie || {};
  const titleNode =
    document.querySelector('.movie-single-ct h1') ||
    document.querySelector('.movie-single-ct h2') ||
    document.querySelector('.internal-page-container h1') ||
    document.querySelector('.internal-page-container h2');
  const imageNode = document.querySelector(
    '.movie__poster[data-background-image], .movie__poster[style*="background-image"], .movie-single-ct img[data-src], .movie-single-ct img[src], .internal-page-container img[data-src], .internal-page-container img[src]'
  );
  const ogImageNode = document.querySelector('meta[property="og:image"]');

  return {
    slug,
    title:
      typeof movieStorage.title === 'string' && movieStorage.title.trim()
        ? movieStorage.title.trim()
        : titleNode
          ? titleNode.textContent.trim()
          : slug,
    year:
      typeof movieStorage.year === 'string' || typeof movieStorage.year === 'number'
        ? String(movieStorage.year)
        : extractYearFromSlug(slug),
    poster:
      typeof movieStorage.movie_poster === 'string' && movieStorage.movie_poster
        ? movieStorage.movie_poster
        : typeof movieStorage.poster_medium === 'string' && movieStorage.poster_medium
          ? movieStorage.poster_medium
          : getElementImageUrl(imageNode) || ogImageNode?.getAttribute('content') || '',
    href: location.href,
  };
}

export function updateEpisodeCardButton(button) {
  const slug = button.dataset.watchlistSlug || '';
  const entry = getWatchlistEntry(slug);
  const cardEpisode = normalizeEpisodeRecord({
    season: button.dataset.season,
    episode: button.dataset.episode,
    idEpisode: button.dataset.idEpisode,
  });

  if (!entry) {
    button.dataset.state = 'add';
    button.textContent = '+ Watch';
    button.title = 'Add this show to your watchlist';
    button.disabled = false;
    return;
  }

  const hasNewEpisode =
    cardEpisode && (!entry.lastWatched || compareEpisodes(cardEpisode, entry.lastWatched) > 0);
  button.dataset.state = hasNewEpisode ? 'watching-new' : 'watching';
  button.textContent = 'Watching';
  button.title = hasNewEpisode
    ? 'This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.'
    : 'This show is already in your watchlist. Click to remove it.';
  button.disabled = false;
}

export function syncEpisodeCardButtons() {
  document.querySelectorAll(`.${SCRIPT_ID}-episode-watch-button`).forEach(updateEpisodeCardButton);
}

export function updateShowViewWatchButton(button) {
  const slug = button.dataset.watchlistSlug || '';
  const entry = getWatchlistEntry(slug);
  const pageEpisode = normalizeEpisodeRecord({
    season: button.dataset.season,
    episode: button.dataset.episode,
    idEpisode: button.dataset.idEpisode,
  });

  if (!entry) {
    button.dataset.state = 'add';
    button.textContent = '+ Add To Watchlist';
    button.title = 'Add this show to your watchlist';
    button.disabled = false;
    return;
  }

  const hasNewEpisode =
    pageEpisode && (!entry.lastWatched || compareEpisodes(pageEpisode, entry.lastWatched) > 0);
  button.dataset.state = hasNewEpisode ? 'watching-new' : 'watching';
  button.textContent = hasNewEpisode ? 'Watching: New Episode' : 'Watching';
  button.title = hasNewEpisode
    ? 'This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.'
    : 'This show is already in your watchlist. Click to remove it.';
  button.disabled = false;
}

export function syncShowViewWatchButton() {
  document
    .querySelectorAll(`.${SCRIPT_ID}-show-view-watch-button`)
    .forEach(updateShowViewWatchButton);
}

export function updateMovieCardButton(button) {
  const slug = button.dataset.watchlistSlug || '';
  const entry = getMovieWatchlistEntry(slug);

  if (!entry) {
    button.dataset.state = 'add';
    button.textContent = '+ Movie';
    button.title = 'Add this movie to your watchlist';
    button.disabled = false;
    return;
  }

  button.dataset.state = entry.watched ? 'watching' : 'watching-new';
  button.textContent = entry.watched ? 'Watched' : 'Movie List';
  button.title = entry.watched
    ? 'This movie is marked watched. Click to remove it from your movie watchlist.'
    : 'This movie is in your movie watchlist. Click to remove it.';
  button.disabled = false;
}

export function syncMovieCardButtons() {
  document.querySelectorAll(`.${SCRIPT_ID}-movie-watch-button`).forEach(updateMovieCardButton);
}

export function updateMovieViewWatchButton(button) {
  const slug = button.dataset.watchlistSlug || '';
  const entry = getMovieWatchlistEntry(slug);

  if (!entry) {
    button.dataset.state = 'add';
    button.textContent = '+ Add Movie To Watchlist';
    button.title = 'Add this movie to your watchlist';
    button.disabled = false;
    return;
  }

  button.dataset.state = entry.watched ? 'watching' : 'watching-new';
  button.textContent = entry.watched ? 'Movie Watched' : 'In Movie Watchlist';
  button.title = entry.watched
    ? 'This movie is marked watched. Click to remove it from your movie watchlist.'
    : 'This movie is in your movie watchlist. Click to remove it.';
  button.disabled = false;
}

export function syncMovieViewWatchButton() {
  document
    .querySelectorAll(`.${SCRIPT_ID}-movie-view-watch-button`)
    .forEach(updateMovieViewWatchButton);
}

export function buildShowsListProgress(card) {
  if (!card || !card.slug || !card.episode) {
    return null;
  }

  return {
    slug: card.slug,
    title: card.title || card.slug,
    href: card.href || '',
    episode: card.episode,
    seenAt: Date.now(),
  };
}

export function isShowsListProgressMatch(card, progress) {
  return (
    !!card &&
    !!progress &&
    card.slug === progress.slug &&
    sameEpisode(card.episode, progress.episode)
  );
}

export function getEpisodeCardOrder(cardElement) {
  return Array.from(document.querySelectorAll('.episode-item')).indexOf(cardElement);
}

export function applyShowsListProgressMarker() {
  if (!document.body || !isLatestShowsPage()) {
    return;
  }

  document
    .querySelectorAll(`.episode-item.${SCRIPT_ID}-shows-list-marker`)
    .forEach((cardElement) => {
      cardElement.classList.remove(`${SCRIPT_ID}-shows-list-marker`);
      cardElement.removeAttribute('data-lookmovie-list-marker');
    });
  appState.showsListProgressOrder = -1;

  const progress = appState.showsListProgress;
  if (!progress) {
    return;
  }

  document.querySelectorAll('.episode-item').forEach((cardElement) => {
    const card = parseEpisodeCard(cardElement);
    if (!isShowsListProgressMatch(card, progress)) {
      return;
    }

    cardElement.classList.add(`${SCRIPT_ID}-shows-list-marker`);
    cardElement.dataset.lookmovieListMarker = 'true';
    appState.showsListProgressOrder = getEpisodeCardOrder(cardElement);
  });
}

export function updateShowsListMarkerButton(button) {
  const card = parseEpisodeCard(button.closest('.episode-item'));
  const isCurrent = isShowsListProgressMatch(card, appState.showsListProgress);
  const state = isCurrent ? 'current' : 'set';
  const text = isCurrent ? 'Bookmarked' : 'Set bookmark';
  const title = isCurrent
    ? 'This is the current shows-page bookmark.'
    : 'Set the yellow shows-page bookmark here.';

  if (button.dataset.state !== state) {
    button.dataset.state = state;
  }
  if (button.textContent !== text) {
    button.textContent = text;
  }
  if (button.title !== title) {
    button.title = title;
  }
}

export function syncShowsListMarkerButtons() {
  document
    .querySelectorAll(`.${SCRIPT_ID}-shows-list-marker-button`)
    .forEach(updateShowsListMarkerButton);
}

export function setShowsListProgressMarker(cardElement) {
  const progress = buildShowsListProgress(parseEpisodeCard(cardElement));
  if (!progress) {
    return;
  }

  appState.showsListProgress = progress;
  appState.showsListProgressOrder = getEpisodeCardOrder(cardElement);
  appState.showsListSeenCandidate = null;
  appState.showsListSeenCandidateOrder = -1;
  appState.showsListManualMarkerSet = true;
  persistShowsListProgress(progress);
  applyShowsListProgressMarker();
  syncShowsListMarkerButtons();
}

export function persistShowsListSeenCandidate() {
  if (appState.showsListManualMarkerSet) {
    return;
  }

  const progress = normalizeShowsListProgress(appState.showsListSeenCandidate);
  if (!progress) {
    return;
  }

  if (
    appState.showsListProgress &&
    !appState.showsListSessionTouched &&
    (appState.showsListProgressOrder < 0 ||
      appState.showsListSeenCandidateOrder < appState.showsListProgressOrder)
  ) {
    return;
  }

  appState.showsListProgress = progress;
  persistShowsListProgress(progress);
  applyShowsListProgressMarker();
}

export function stopShowsListProgressTracking(options) {
  if (options && options.persist) {
    persistShowsListSeenCandidate();
  }

  if (appState.showsListObserver) {
    appState.showsListObserver.disconnect();
  }

  if (appState.showsListMutationObserver) {
    appState.showsListMutationObserver.disconnect();
  }

  appState.showsListObserver = null;
  appState.showsListMutationObserver = null;
  appState.showsListObservedCards = new WeakSet();
  appState.showsListSeenCandidate = null;
  appState.showsListSeenCandidateOrder = -1;
  appState.showsListSessionTouched = false;
  appState.showsListManualMarkerSet = false;
}

export function updateShowsListSeenCandidate(cardElement) {
  const card = parseEpisodeCard(cardElement);
  const progress = buildShowsListProgress(card);
  if (!progress) {
    return;
  }

  const order = getEpisodeCardOrder(cardElement);
  if (order < appState.showsListSeenCandidateOrder) {
    return;
  }

  appState.showsListSeenCandidate = progress;
  appState.showsListSeenCandidateOrder = order;
}

export function ensureShowsListProgressTracking() {
  if (!document.body || !isLatestShowsPage() || typeof IntersectionObserver !== 'function') {
    return;
  }

  applyShowsListProgressMarker();

  if (!appState.showsListObserver) {
    appState.showsListObserver = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry) => updateShowsListSeenCandidate(entry.target));
      },
      { threshold: 0.55 }
    );
  }

  if (!appState.showsListMutationObserver) {
    appState.showsListMutationObserver = new MutationObserver(() => {
      ensureShowsListProgressTracking();
    });
    appState.showsListMutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  document.querySelectorAll('.episode-item').forEach((cardElement) => {
    if (appState.showsListObservedCards.has(cardElement)) {
      return;
    }

    appState.showsListObservedCards.add(cardElement);
    appState.showsListObserver.observe(cardElement);
  });
}

export function markShowsListSessionTouched() {
  if (isLatestShowsPage()) {
    appState.showsListSessionTouched = true;
  }
}

export function ensureEpisodeCardButtons() {
  if (!document.body || !isLatestShowsPage()) {
    return;
  }

  document.querySelectorAll('.episode-item').forEach((cardElement) => {
    const card = parseEpisodeCard(cardElement);
    if (!card) {
      return;
    }

    let button = cardElement.querySelector(`.${SCRIPT_ID}-episode-watch-button`);
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = `${SCRIPT_ID}-episode-watch-button`;
      cardElement.appendChild(button);

      button.addEventListener('click', async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const slug = button.dataset.watchlistSlug;
        if (!slug) {
          return;
        }

        if (getWatchlistEntry(slug)) {
          removeShowFromWatchlist(slug);
          return;
        }

        button.dataset.state = 'adding';
        button.textContent = 'Adding...';
        button.disabled = true;

        await addShowToWatchlist({
          slug,
          title: button.dataset.title || slug,
          year: button.dataset.year || '',
          poster: button.dataset.poster || '',
          episode: normalizeEpisodeRecord({
            season: button.dataset.season,
            episode: button.dataset.episode,
            idEpisode: button.dataset.idEpisode,
          }),
        });

        updateEpisodeCardButton(button);
      });
    }

    button.dataset.watchlistSlug = card.slug;
    button.dataset.title = card.title;
    button.dataset.year = card.year;
    button.dataset.poster = card.poster;
    if (card.episode) {
      button.dataset.season = String(card.episode.season);
      button.dataset.episode = String(card.episode.episode);
      button.dataset.idEpisode = String(card.episode.idEpisode);
    }

    updateEpisodeCardButton(button);

    let markerButton = cardElement.querySelector(`.${SCRIPT_ID}-shows-list-marker-button`);
    if (!markerButton) {
      markerButton = document.createElement('button');
      markerButton.type = 'button';
      markerButton.className = `${SCRIPT_ID}-shows-list-marker-button`;
      cardElement.appendChild(markerButton);

      markerButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        setShowsListProgressMarker(cardElement);
      });
    }

    updateShowsListMarkerButton(markerButton);
  });
}

export function ensureShowViewWatchButton() {
  if (!document.body || !isShowViewPage()) {
    return;
  }

  const show = getCurrentShowViewData();
  if (!show) {
    return;
  }

  const actionHost =
    document.querySelector('.watch-heading') ||
    document.querySelector('.movie-single-ct.main-content') ||
    document.querySelector('.internal-page-container');
  if (!actionHost) {
    return;
  }

  let wrap = document.querySelector(`.${SCRIPT_ID}-show-view-watch-wrap`);
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = `${SCRIPT_ID}-show-view-watch-wrap`;
    actionHost.appendChild(wrap);
  }

  let button = wrap.querySelector(`.${SCRIPT_ID}-show-view-watch-button`);
  if (!button) {
    button = document.createElement('button');
    button.type = 'button';
    button.className = `${SCRIPT_ID}-show-view-watch-button`;
    wrap.appendChild(button);

    button.addEventListener('click', async () => {
      const slug = button.dataset.watchlistSlug;
      if (!slug) {
        return;
      }

      if (getWatchlistEntry(slug)) {
        removeShowFromWatchlist(slug);
        return;
      }

      button.dataset.state = 'adding';
      button.textContent = 'Adding...';
      button.disabled = true;

      await addShowToWatchlist({
        slug,
        title: button.dataset.title || slug,
        year: button.dataset.year || '',
        poster: button.dataset.poster || '',
        episode: normalizeEpisodeRecord({
          season: button.dataset.season,
          episode: button.dataset.episode,
          idEpisode: button.dataset.idEpisode,
        }),
      });

      updateShowViewWatchButton(button);
    });
  }

  button.dataset.watchlistSlug = show.slug;
  button.dataset.title = show.title;
  button.dataset.year = show.year;
  button.dataset.poster = show.poster;
  if (show.episode) {
    button.dataset.season = String(show.episode.season);
    button.dataset.episode = String(show.episode.episode);
    button.dataset.idEpisode = String(show.episode.idEpisode);
  } else {
    delete button.dataset.season;
    delete button.dataset.episode;
    delete button.dataset.idEpisode;
  }

  updateShowViewWatchButton(button);
}

export function ensureMovieCardButtons() {
  if (!document.body || isMoviePlayPage()) {
    return;
  }

  document.querySelectorAll('a[href*="/movies/view/"]').forEach((linkElement) => {
    const cardElement =
      linkElement.closest('.slide-item') ||
      linkElement.closest('.movie-item') ||
      linkElement.closest('.mv-item') ||
      linkElement.closest('.movie-item-style-2') ||
      linkElement.closest('.slide-item__backdrop--wrapper') ||
      linkElement.closest('.item') ||
      linkElement.parentElement;
    const card = parseMovieCard(cardElement);
    if (!card || !cardElement) {
      return;
    }

    const buttonHost =
      cardElement.querySelector('.slide-item__buttons') ||
      cardElement.querySelector('.image__placeholder') ||
      cardElement;
    let button = buttonHost.querySelector(`.${SCRIPT_ID}-movie-watch-button`);
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = `${SCRIPT_ID}-movie-watch-button ${SCRIPT_ID}-episode-watch-button`;
      buttonHost.appendChild(button);

      if (getComputedStyle(buttonHost).position === 'static') {
        buttonHost.style.position = 'relative';
      }

      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const slug = button.dataset.watchlistSlug;
        if (!slug) {
          return;
        }

        if (getMovieWatchlistEntry(slug)) {
          removeMovieFromWatchlist(slug);
          return;
        }

        addMovieToWatchlist({
          slug,
          title: button.dataset.title || slug,
          year: button.dataset.year || '',
          poster: button.dataset.poster || '',
          href: button.dataset.href || buildMovieViewUrl(slug),
        });

        updateMovieCardButton(button);
      });
    }

    button.dataset.watchlistSlug = card.slug;
    button.dataset.title = card.title;
    button.dataset.year = card.year;
    button.dataset.poster = card.poster;
    button.dataset.href = card.href;

    updateMovieCardButton(button);
  });
}

export function ensureMovieViewWatchButton() {
  if (!document.body || !isMovieViewPage()) {
    return;
  }

  const movie = getCurrentMovieViewData();
  if (!movie) {
    return;
  }

  const actionHost =
    document.querySelector('.watch-heading') ||
    document.querySelector('.movie-single-ct.main-content') ||
    document.querySelector('.internal-page-container');
  if (!actionHost) {
    return;
  }

  let wrap = document.querySelector(`.${SCRIPT_ID}-movie-view-watch-wrap`);
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = `${SCRIPT_ID}-show-view-watch-wrap ${SCRIPT_ID}-movie-view-watch-wrap`;
    actionHost.appendChild(wrap);
  }

  let button = wrap.querySelector(`.${SCRIPT_ID}-movie-view-watch-button`);
  if (!button) {
    button = document.createElement('button');
    button.type = 'button';
    button.className = `${SCRIPT_ID}-show-view-watch-button ${SCRIPT_ID}-movie-view-watch-button`;
    wrap.appendChild(button);

    button.addEventListener('click', () => {
      const slug = button.dataset.watchlistSlug;
      if (!slug) {
        return;
      }

      if (getMovieWatchlistEntry(slug)) {
        removeMovieFromWatchlist(slug);
        return;
      }

      addMovieToWatchlist({
        slug,
        title: button.dataset.title || slug,
        year: button.dataset.year || '',
        poster: button.dataset.poster || '',
        href: button.dataset.href || buildMovieViewUrl(slug),
      });

      updateMovieViewWatchButton(button);
    });
  }

  button.dataset.watchlistSlug = movie.slug;
  button.dataset.title = movie.title;
  button.dataset.year = movie.year;
  button.dataset.poster = movie.poster;
  button.dataset.href = movie.href;

  updateMovieViewWatchButton(button);
}
