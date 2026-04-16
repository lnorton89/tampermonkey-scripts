import type { EpisodeRecord, ShowViewData } from './types';
import { SCRIPT_ID, parseEpisodeCard, normalizeEpisodeRecord, compareEpisodes, escapeHtml, buildShowViewUrl } from './utils';
import {
  getWatchlistEntry,
  getWatchlistEntries,
  findWatchlistEntryByIdShow,
  isLatestWatched,
  addShowToWatchlist,
  removeShowFromWatchlist,
} from './watchlist';

// ---------------------------------------------------------------------------
// Page detection
// ---------------------------------------------------------------------------

export function isLatestShowsPage(): boolean {
  return location.pathname === '/shows';
}

export function isShowViewPage(): boolean {
  return location.pathname.startsWith('/shows/view/');
}

// ---------------------------------------------------------------------------
// Show view page data extraction
// ---------------------------------------------------------------------------

export function getCurrentShowViewData(): ShowViewData | null {
  if (!isShowViewPage() || !window.show_storage) return null;

  const slug = typeof window.show_storage.slug === 'string' ? window.show_storage.slug : '';
  if (!slug) return null;

  const params = new URLSearchParams(location.search);
  const episode = normalizeEpisodeRecord({
    season: params.get('season'),
    episode: params.get('episode'),
    idEpisode: params.get('id_episode'),
  });

  return {
    slug,
    title: typeof window.show_storage.title === 'string' ? window.show_storage.title : slug,
    year: typeof window.show_storage.year === 'string' || typeof window.show_storage.year === 'number'
      ? String(window.show_storage.year)
      : '',
    poster: typeof window.show_storage.poster_medium === 'string' ? window.show_storage.poster_medium : '',
    idShow: typeof window.show_storage.id_show === 'number' ? window.show_storage.id_show : 0,
    episode,
  };
}

// ---------------------------------------------------------------------------
// Episode card buttons (on /shows page)
// ---------------------------------------------------------------------------

function updateEpisodeCardButton(button: HTMLButtonElement): void {
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

  const hasNewEpisode = cardEpisode && (!entry.lastWatched || compareEpisodes(cardEpisode, entry.lastWatched) > 0);
  button.dataset.state = hasNewEpisode ? 'watching-new' : 'watching';
  button.textContent = 'Watching';
  button.title = hasNewEpisode
    ? 'This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.'
    : 'This show is already in your watchlist. Click to remove it.';
  button.disabled = false;
}

export function syncEpisodeCardButtons(): void {
  document.querySelectorAll<HTMLButtonElement>(`.${SCRIPT_ID}-episode-watch-button`).forEach(updateEpisodeCardButton);
}

async function handleEpisodeButtonClick(button: HTMLButtonElement): Promise<void> {
  const slug = button.dataset.watchlistSlug;
  if (!slug) return;

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
}

export function ensureEpisodeCardButtons(): void {
  if (!document.body || !isLatestShowsPage()) return;

  document.querySelectorAll('.episode-item').forEach((cardElement) => {
    const card = parseEpisodeCard(cardElement);
    if (!card) return;

    let button = cardElement.querySelector<HTMLButtonElement>(`.${SCRIPT_ID}-episode-watch-button`);
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = `${SCRIPT_ID}-episode-watch-button`;
      cardElement.appendChild(button);

      button.addEventListener('click', async (event) => {
        event.preventDefault();
        event.stopPropagation();
        await handleEpisodeButtonClick(button!);
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
  });
}

// ---------------------------------------------------------------------------
// Show view watch button (on /shows/view/:slug page)
// ---------------------------------------------------------------------------

function updateShowViewWatchButton(button: HTMLButtonElement): void {
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

  const hasNewEpisode = pageEpisode && (!entry.lastWatched || compareEpisodes(pageEpisode, entry.lastWatched) > 0);
  button.dataset.state = hasNewEpisode ? 'watching-new' : 'watching';
  button.textContent = hasNewEpisode ? 'Watching: New Episode' : 'Watching';
  button.title = hasNewEpisode
    ? 'This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.'
    : 'This show is already in your watchlist. Click to remove it.';
  button.disabled = false;
}

export function syncShowViewWatchButton(): void {
  document.querySelectorAll<HTMLButtonElement>(`.${SCRIPT_ID}-show-view-watch-button`).forEach(updateShowViewWatchButton);
}

async function handleShowViewButtonClick(button: HTMLButtonElement): Promise<void> {
  const slug = button.dataset.watchlistSlug;
  if (!slug) return;

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
}

export function ensureShowViewWatchButton(): void {
  if (!document.body || !isShowViewPage()) return;

  const show = getCurrentShowViewData();
  if (!show) return;

  const actionHost = document.querySelector('.watch-heading')
    || document.querySelector('.movie-single-ct.main-content')
    || document.querySelector('.internal-page-container');
  if (!actionHost) return;

  let wrap = document.querySelector(`.${SCRIPT_ID}-show-view-watch-wrap`);
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = `${SCRIPT_ID}-show-view-watch-wrap`;
    actionHost.appendChild(wrap);
  }

  let button = wrap.querySelector<HTMLButtonElement>(`.${SCRIPT_ID}-show-view-watch-button`);
  if (!button) {
    button = document.createElement('button');
    button.type = 'button';
    button.className = `${SCRIPT_ID}-show-view-watch-button`;
    wrap.appendChild(button);

    button.addEventListener('click', async () => {
      await handleShowViewButtonClick(button!);
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

// ---------------------------------------------------------------------------
// Episode watch button styles (injected separately since they're page-specific)
// ---------------------------------------------------------------------------

const EPISODE_BUTTON_STYLES_ID = `${SCRIPT_ID}-episode-button-styles`;
const EPISODE_BUTTON_STYLES = `
  .${SCRIPT_ID}-episode-watch-button {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 5;
    border: 0;
    border-radius: 999px;
    padding: 8px 10px;
    background: rgba(15, 23, 42, 0.92);
    color: #e2e8f0;
    font: 700 12px/1 Arial, sans-serif;
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.28);
    cursor: pointer;
  }

  .${SCRIPT_ID}-episode-watch-button[data-state="watching"] {
    background: rgba(30, 64, 175, 0.92);
    color: #dbeafe;
  }

  .${SCRIPT_ID}-episode-watch-button[data-state="watching-new"] {
    background: rgba(194, 65, 12, 0.95);
    color: #ffedd5;
  }

  .${SCRIPT_ID}-episode-watch-button[data-state="adding"] {
    cursor: wait;
    opacity: 0.8;
  }

  .${SCRIPT_ID}-show-view-watch-wrap {
    margin-top: 14px;
  }

  .${SCRIPT_ID}-show-view-watch-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 44px;
    border: 1px solid rgba(148, 163, 184, 0.28);
    border-radius: 999px;
    padding: 10px 16px;
    background: rgba(15, 23, 42, 0.92);
    color: #f8fafc;
    font: 700 13px/1 Arial, sans-serif;
    cursor: pointer;
    transition: transform 0.14s ease, border-color 0.14s ease, background 0.14s ease;
  }

  .${SCRIPT_ID}-show-view-watch-button:hover {
    transform: translateY(-1px);
    border-color: rgba(96, 165, 250, 0.65);
  }

  .${SCRIPT_ID}-show-view-watch-button[data-state="watching"] {
    background: rgba(30, 64, 175, 0.92);
    color: #dbeafe;
  }

  .${SCRIPT_ID}-show-view-watch-button[data-state="watching-new"] {
    background: rgba(194, 65, 12, 0.95);
    color: #ffedd5;
  }

  .${SCRIPT_ID}-show-view-watch-button[data-state="adding"] {
    cursor: wait;
    opacity: 0.8;
  }
`;

export function ensureEpisodeButtonStyles(): void {
  if (!document.head || document.getElementById(EPISODE_BUTTON_STYLES_ID)) return;

  const style = document.createElement('style');
  style.id = EPISODE_BUTTON_STYLES_ID;
  style.textContent = EPISODE_BUTTON_STYLES;
  document.head.appendChild(style);
}
