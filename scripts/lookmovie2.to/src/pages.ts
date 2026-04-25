/* eslint-disable */
// @ts-nocheck
import { SCRIPT_ID } from './constants';
import { normalizeEpisodeRecord, compareEpisodes } from './episodes';
import { escapeHtml, toPositiveInteger } from './utils';
import { addShowToWatchlist, getWatchlistEntry, removeShowFromWatchlist } from './watchlist';

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
    poster: imageNode
      ? imageNode.getAttribute('data-src') || imageNode.getAttribute('src') || ''
      : '',
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

export function isLatestShowsPage() {
  return location.pathname === '/shows';
}

export function isShowViewPage() {
  return location.pathname.startsWith('/shows/view/');
}

export function getCurrentShowViewData() {
  if (!isShowViewPage() || !window.show_storage) {
    return null;
  }

  const slug = typeof window.show_storage.slug === 'string' ? window.show_storage.slug : '';
  if (!slug) {
    return null;
  }

  const params = new URLSearchParams(location.search);
  const episode = normalizeEpisodeRecord({
    season: params.get('season'),
    episode: params.get('episode'),
    idEpisode: params.get('id_episode'),
  });

  return {
    slug,
    title: typeof window.show_storage.title === 'string' ? window.show_storage.title : slug,
    year:
      typeof window.show_storage.year === 'string' || typeof window.show_storage.year === 'number'
        ? String(window.show_storage.year)
        : '',
    poster:
      typeof window.show_storage.poster_medium === 'string'
        ? window.show_storage.poster_medium
        : '',
    idShow: toPositiveInteger(window.show_storage.id_show),
    episode,
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
