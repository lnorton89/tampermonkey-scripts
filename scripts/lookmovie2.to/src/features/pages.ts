import { SCRIPT_ID } from '../config/constants';
import {
  normalizeEpisodeRecord,
  compareEpisodes,
  sameEpisode,
  type EpisodeRecord,
} from '../domain/episodes';
import { appState } from '../core/state';
import {
  normalizeShowsListProgress,
  persistShowsListProgress,
  type ShowsListProgress,
} from '../core/storage';
import {
  getElementImageUrl,
  normalizeImageUrl,
  readWindowRecord,
  toPositiveInteger,
} from '../core/utils';
import { addShowToWatchlist, getWatchlistEntry, removeShowFromWatchlist } from './watchlist';
import { addMovieToWatchlist, getMovieWatchlistEntry, removeMovieFromWatchlist } from './movies';

export interface ShowCard {
  slug: string;
  title: string;
  year: string;
  poster: string;
  href: string;
  episode: EpisodeRecord | null;
}

export interface ShowViewData {
  slug: string;
  title: string;
  year: string;
  poster: string;
  idShow: number;
  episode: EpisodeRecord | null;
}

export interface MovieCard {
  slug: string;
  title: string;
  year: string;
  poster: string;
  href: string;
}

// `document.body` is typed non-null but is null before the parser reaches <body>.
function hasBody(): boolean {
  return !!(document.body as HTMLElement | null);
}

/** Copies a card's episode into button data attributes, as normalizeEpisodeRecord input. */
function readButtonEpisode(button: HTMLElement): EpisodeRecord | null {
  return normalizeEpisodeRecord({
    season: button.dataset.season,
    episode: button.dataset.episode,
    idEpisode: button.dataset.idEpisode,
  });
}

export function extractShowSlugFromViewHref(href: string): string {
  try {
    const url = new URL(href, location.origin);
    const pathMatch = /\/shows\/view\/([^/?#]+)/i.exec(url.pathname);
    return pathMatch?.[1] ?? '';
  } catch {
    return '';
  }
}

export function extractEpisodeContextFromHref(href: string): EpisodeRecord | null {
  try {
    const url = new URL(href, location.origin);
    const season = toPositiveInteger(url.searchParams.get('season'));
    const episode = toPositiveInteger(url.searchParams.get('episode'));
    const idEpisode = toPositiveInteger(url.searchParams.get('id_episode'));

    if (!season || !episode || !idEpisode) {
      return null;
    }

    return { season, episode, idEpisode };
  } catch {
    return null;
  }
}

export function extractYearFromSlug(slug: unknown): string {
  const yearMatch = typeof slug === 'string' ? /-(\d{4})$/.exec(slug) : null;
  return yearMatch?.[1] ?? '';
}

export function extractMovieSlugFromViewHref(href: string): string {
  try {
    const url = new URL(href, location.origin);
    const pathMatch = /\/movies\/view\/([^/?#]+)/i.exec(url.pathname);
    return pathMatch?.[1] ?? '';
  } catch {
    return '';
  }
}

export function parseEpisodeCard(cardElement: Element | null): ShowCard | null {
  if (!cardElement) {
    return null;
  }

  const link = cardElement.querySelector('a[href*="/shows/view/"]');
  if (!link) {
    return null;
  }

  // The selector guarantees the attribute.
  const linkHref = link.getAttribute('href') ?? '';
  const slug = extractShowSlugFromViewHref(linkHref);
  if (!slug) {
    return null;
  }

  const titleNode = cardElement.querySelector('.mv-item-infor h6');
  const imageNode = cardElement.querySelector('img[data-src], img[src]');
  const episodeContext = extractEpisodeContextFromHref(linkHref);

  return {
    slug,
    title: titleNode ? (titleNode.textContent ?? '').trim() : slug,
    year: extractYearFromSlug(slug),
    poster: getElementImageUrl(imageNode),
    href: new URL(linkHref, location.origin).href,
    episode: episodeContext,
  };
}

export function buildShowViewUrl(slug: string, episodeRecord?: EpisodeRecord | null): string {
  if (!slug) {
    return '/shows';
  }

  if (!episodeRecord) {
    return `/shows/view/${slug}`;
  }

  return `/shows/view/${slug}?season=${episodeRecord.season}&episode=${episodeRecord.episode}&id_episode=${episodeRecord.idEpisode}`;
}

export function buildShowPlayUrl(slug: string, episodeRecord?: EpisodeRecord | null): string {
  if (!slug) {
    return '/shows';
  }

  if (!episodeRecord) {
    return `/shows/view/${slug}`;
  }

  return `/shows/play/${slug}#S${episodeRecord.season}-E${episodeRecord.episode}-${episodeRecord.idEpisode}`;
}

export function buildMovieViewUrl(slug: string): string {
  return slug ? `/movies/view/${slug}` : '/movies';
}

export function isLatestShowsPage(): boolean {
  return location.pathname === '/shows';
}

export function isShowViewPage(): boolean {
  return location.pathname.startsWith('/shows/view/');
}

export function isMoviesPage(): boolean {
  return location.pathname === '/movies';
}

export function isMoviePlayPage(): boolean {
  return location.pathname.startsWith('/movies/play/');
}

export function isMovieViewPage(): boolean {
  return location.pathname.startsWith('/movies/view/');
}

export function getCurrentShowViewData(): ShowViewData | null {
  if (!isShowViewPage()) {
    return null;
  }

  const showStorage = readWindowRecord('show_storage');
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
          ? (titleNode.textContent ?? '').replace(/\s*\d{4}\s*$/, '').trim()
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

export function parseMovieCard(cardElement: Element | null): MovieCard | null {
  if (!cardElement) {
    return null;
  }

  const link = cardElement.querySelector('a[href*="/movies/view/"]');
  if (!link) {
    return null;
  }

  // The selector guarantees the attribute.
  const linkHref = link.getAttribute('href') ?? '';
  const slug = extractMovieSlugFromViewHref(linkHref);
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
  const titleText = titleNode ? (titleNode.textContent ?? '').trim() : '';
  const yearFromTitle = /\((\d{4})\)/.exec(titleText);
  const poster = getElementImageUrl(imageNode) || getElementImageUrl(backgroundNode);

  return {
    slug,
    title: titleText ? titleText.replace(/\s*\(\d{4}\)\s*$/, '').trim() : slug,
    year: yearNode
      ? (yearNode.textContent ?? '').trim()
      : yearFromTitle?.[1] || extractYearFromSlug(slug),
    poster,
    href: new URL(linkHref, location.origin).href,
  };
}

export function getCurrentMovieViewData(): MovieCard | null {
  if (!isMovieViewPage()) {
    return null;
  }

  const slug = extractMovieSlugFromViewHref(location.href);
  if (!slug) {
    return null;
  }

  const movieStorage = readWindowRecord('movie_storage', 'movie');
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
          ? (titleNode.textContent ?? '').trim()
          : slug,
    year:
      typeof movieStorage.year === 'string' || typeof movieStorage.year === 'number'
        ? String(movieStorage.year)
        : extractYearFromSlug(slug),
    poster:
      normalizeImageUrl(
        typeof movieStorage.movie_poster === 'string' && movieStorage.movie_poster
          ? movieStorage.movie_poster
          : typeof movieStorage.poster_medium === 'string' && movieStorage.poster_medium
            ? movieStorage.poster_medium
            : ''
      ) ||
      getElementImageUrl(imageNode) ||
      normalizeImageUrl(ogImageNode?.getAttribute('content') || ''),
    href: location.href,
  };
}

export function updateEpisodeCardButton(button: HTMLButtonElement): void {
  const slug = button.dataset.watchlistSlug || '';
  const entry = getWatchlistEntry(slug);
  const cardEpisode = readButtonEpisode(button);
  let state = 'add';
  let text = '+ Watch';
  let title = 'Add this show to your watchlist';

  if (entry) {
    const hasNewEpisode =
      cardEpisode && (!entry.lastWatched || compareEpisodes(cardEpisode, entry.lastWatched) > 0);
    state = hasNewEpisode ? 'watching-new' : 'watching';
    text = 'Watching';
    title = hasNewEpisode
      ? 'This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.'
      : 'This show is already in your watchlist. Click to remove it.';
  }

  if (button.dataset.state !== state) {
    button.dataset.state = state;
  }
  if (button.textContent !== text) {
    button.textContent = text;
  }
  if (button.title !== title) {
    button.title = title;
  }
  if (button.disabled) {
    button.disabled = false;
  }
}

export function syncEpisodeCardButtons(): void {
  document
    .querySelectorAll<HTMLButtonElement>(`.${SCRIPT_ID}-episode-watch-button`)
    .forEach((button) => {
      updateEpisodeCardButton(button);
    });
}

export function updateShowViewWatchButton(button: HTMLButtonElement): void {
  const slug = button.dataset.watchlistSlug || '';
  const entry = getWatchlistEntry(slug);
  const pageEpisode = readButtonEpisode(button);

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

export function syncShowViewWatchButton(): void {
  document
    .querySelectorAll<HTMLButtonElement>(`.${SCRIPT_ID}-show-view-watch-button`)
    .forEach((button) => {
      updateShowViewWatchButton(button);
    });
}

export function updateMovieCardButton(button: HTMLButtonElement): void {
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

export function syncMovieCardButtons(): void {
  document
    .querySelectorAll<HTMLButtonElement>(`.${SCRIPT_ID}-movie-watch-button`)
    .forEach((button) => {
      updateMovieCardButton(button);
    });
}

export function updateMovieViewWatchButton(button: HTMLButtonElement): void {
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

export function syncMovieViewWatchButton(): void {
  document
    .querySelectorAll<HTMLButtonElement>(`.${SCRIPT_ID}-movie-view-watch-button`)
    .forEach((button) => {
      updateMovieViewWatchButton(button);
    });
}

export function buildShowsListProgress(
  card: ShowCard | null,
  source: ShowsListProgress['source'] = 'auto'
): ShowsListProgress | null {
  if (!card?.slug || !card.episode) {
    return null;
  }

  return {
    slug: card.slug,
    title: card.title || card.slug,
    href: card.href || '',
    episode: card.episode,
    seenAt: Date.now(),
    source,
  };
}

export function isShowsListProgressMatch(
  card: ShowCard | null,
  progress: ShowsListProgress | null
): boolean {
  return (
    !!card &&
    !!progress &&
    card.slug === progress.slug &&
    sameEpisode(card.episode, progress.episode)
  );
}

export function getEpisodeCardOrder(cardElement: Element): number {
  return Array.from(document.querySelectorAll('.episode-item')).indexOf(cardElement);
}

export function applyShowsListProgressMarker(): void {
  if (!hasBody() || !isLatestShowsPage()) {
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

  document.querySelectorAll<HTMLElement>('.episode-item').forEach((cardElement) => {
    const card = parseEpisodeCard(cardElement);
    if (!isShowsListProgressMatch(card, progress)) {
      return;
    }

    cardElement.classList.add(`${SCRIPT_ID}-shows-list-marker`);
    cardElement.dataset.lookmovieListMarker = 'true';
    appState.showsListProgressOrder = getEpisodeCardOrder(cardElement);
  });
}

export function updateShowsListMarkerButton(button: HTMLButtonElement): void {
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

export function syncShowsListMarkerButtons(): void {
  document
    .querySelectorAll<HTMLButtonElement>(`.${SCRIPT_ID}-shows-list-marker-button`)
    .forEach((button) => {
      updateShowsListMarkerButton(button);
    });
}

export function setShowsListProgressMarker(cardElement: Element): void {
  const progress = buildShowsListProgress(parseEpisodeCard(cardElement), 'manual');
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

export function persistShowsListSeenCandidate(): void {
  if (appState.showsListManualMarkerSet || appState.showsListProgress?.source === 'manual') {
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

export function stopShowsListProgressTracking(options?: { persist?: boolean }): void {
  if (options?.persist) {
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
  appState.showsListRefreshScheduled = false;
  appState.showsListObservedCards = new WeakSet();
  appState.showsListSeenCandidate = null;
  appState.showsListSeenCandidateOrder = -1;
  appState.showsListSessionTouched = false;
  appState.showsListManualMarkerSet = false;
}

export function updateShowsListSeenCandidate(cardElement: Element): void {
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

export function refreshShowsListProgressTracking(): void {
  const observer = appState.showsListObserver;
  if (!hasBody() || !isLatestShowsPage() || !observer) {
    return;
  }

  applyShowsListProgressMarker();

  document.querySelectorAll('.episode-item').forEach((cardElement) => {
    if (appState.showsListObservedCards.has(cardElement)) {
      return;
    }

    appState.showsListObservedCards.add(cardElement);
    observer.observe(cardElement);
  });
}

export function scheduleShowsListProgressRefresh(): void {
  if (appState.showsListRefreshScheduled) {
    return;
  }

  appState.showsListRefreshScheduled = true;
  window.setTimeout(() => {
    appState.showsListRefreshScheduled = false;
    refreshShowsListProgressTracking();
  }, 150);
}

export function ensureShowsListProgressTracking(): void {
  if (!hasBody() || !isLatestShowsPage() || typeof IntersectionObserver !== 'function') {
    return;
  }

  if (!appState.showsListObserver) {
    appState.showsListObserver = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry) => {
            updateShowsListSeenCandidate(entry.target);
          });
      },
      { threshold: 0.55 }
    );
  }

  if (!appState.showsListMutationObserver) {
    const mutationObserver = new MutationObserver(() => {
      scheduleShowsListProgressRefresh();
    });
    appState.showsListMutationObserver = mutationObserver;
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  refreshShowsListProgressTracking();
}

export function markShowsListSessionTouched(): void {
  if (isLatestShowsPage()) {
    appState.showsListSessionTouched = true;
  }
}

export function ensureEpisodeCardButtons(): void {
  if (!hasBody() || !isLatestShowsPage()) {
    return;
  }

  document.querySelectorAll('.episode-item').forEach((cardElement) => {
    const card = parseEpisodeCard(cardElement);
    if (!card) {
      return;
    }

    let button = cardElement.querySelector<HTMLButtonElement>(`.${SCRIPT_ID}-episode-watch-button`);
    if (!button) {
      const created = document.createElement('button');
      button = created;
      created.type = 'button';
      created.className = `${SCRIPT_ID}-episode-watch-button`;
      cardElement.appendChild(created);

      const handleClick = async (event: MouseEvent): Promise<void> => {
        event.preventDefault();
        event.stopPropagation();

        const slug = created.dataset.watchlistSlug;
        if (!slug) {
          return;
        }

        if (getWatchlistEntry(slug)) {
          removeShowFromWatchlist(slug);
          return;
        }

        created.dataset.state = 'adding';
        created.textContent = 'Adding...';
        created.disabled = true;

        await addShowToWatchlist({
          slug,
          title: created.dataset.title || slug,
          year: created.dataset.year || '',
          poster: created.dataset.poster || '',
          episode: readButtonEpisode(created),
        });

        updateEpisodeCardButton(created);
      };
      created.addEventListener('click', (event) => {
        void handleClick(event);
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

    let markerButton = cardElement.querySelector<HTMLButtonElement>(
      `.${SCRIPT_ID}-shows-list-marker-button`
    );
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

export function ensureShowViewWatchButton(): void {
  if (!hasBody() || !isShowViewPage()) {
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

  let button = wrap.querySelector<HTMLButtonElement>(`.${SCRIPT_ID}-show-view-watch-button`);
  if (!button) {
    const created = document.createElement('button');
    button = created;
    created.type = 'button';
    created.className = `${SCRIPT_ID}-show-view-watch-button`;
    wrap.appendChild(created);

    const handleClick = async (): Promise<void> => {
      const slug = created.dataset.watchlistSlug;
      if (!slug) {
        return;
      }

      if (getWatchlistEntry(slug)) {
        removeShowFromWatchlist(slug);
        return;
      }

      created.dataset.state = 'adding';
      created.textContent = 'Adding...';
      created.disabled = true;

      await addShowToWatchlist({
        slug,
        title: created.dataset.title || slug,
        year: created.dataset.year || '',
        poster: created.dataset.poster || '',
        episode: readButtonEpisode(created),
      });

      updateShowViewWatchButton(created);
    };
    created.addEventListener('click', () => {
      void handleClick();
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

export function ensureMovieCardButtons(): void {
  if (!hasBody() || isMoviePlayPage()) {
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
      cardElement.querySelector<HTMLElement>('.slide-item__buttons') ||
      cardElement.querySelector<HTMLElement>('.image__placeholder') ||
      (cardElement as HTMLElement);
    let button = buttonHost.querySelector<HTMLButtonElement>(`.${SCRIPT_ID}-movie-watch-button`);
    if (!button) {
      const created = document.createElement('button');
      button = created;
      created.type = 'button';
      created.className = `${SCRIPT_ID}-movie-watch-button ${SCRIPT_ID}-episode-watch-button`;
      buttonHost.appendChild(created);

      if (getComputedStyle(buttonHost).position === 'static') {
        buttonHost.style.position = 'relative';
      }

      created.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const slug = created.dataset.watchlistSlug;
        if (!slug) {
          return;
        }

        if (getMovieWatchlistEntry(slug)) {
          removeMovieFromWatchlist(slug);
          return;
        }

        addMovieToWatchlist({
          slug,
          title: created.dataset.title || slug,
          year: created.dataset.year || '',
          poster: created.dataset.poster || '',
          href: created.dataset.href || buildMovieViewUrl(slug),
        });

        updateMovieCardButton(created);
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

export function ensureMovieViewWatchButton(): void {
  if (!hasBody() || !isMovieViewPage()) {
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

  let button = wrap.querySelector<HTMLButtonElement>(`.${SCRIPT_ID}-movie-view-watch-button`);
  if (!button) {
    const created = document.createElement('button');
    button = created;
    created.type = 'button';
    created.className = `${SCRIPT_ID}-show-view-watch-button ${SCRIPT_ID}-movie-view-watch-button`;
    wrap.appendChild(created);

    created.addEventListener('click', () => {
      const slug = created.dataset.watchlistSlug;
      if (!slug) {
        return;
      }

      if (getMovieWatchlistEntry(slug)) {
        removeMovieFromWatchlist(slug);
        return;
      }

      addMovieToWatchlist({
        slug,
        title: created.dataset.title || slug,
        year: created.dataset.year || '',
        poster: created.dataset.poster || '',
        href: created.dataset.href || buildMovieViewUrl(slug),
      });

      updateMovieViewWatchButton(created);
    });
  }

  button.dataset.watchlistSlug = movie.slug;
  button.dataset.title = movie.title;
  button.dataset.year = movie.year;
  button.dataset.poster = movie.poster;
  button.dataset.href = movie.href;

  updateMovieViewWatchButton(button);
}
