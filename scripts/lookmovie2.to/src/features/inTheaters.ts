/* eslint-disable */
// @ts-nocheck
import { IN_THEATERS_VISIBLE_COUNT, SCRIPT_ID } from '../config/constants';
import { appState } from '../core/state';
import { normalizeImageUrl } from '../core/utils';
import { ensureMovieCardButtons, syncMovieCardButtons } from './pages';

// The home page's "recent / in theaters" slider is now shipped hidden by the site, but its slides
// are still in the page. This shows those movies as a poster grid above the movies filter, using
// the site's own card markup so its styles and the enhancer's movie buttons apply.
const SECTION_CLASS = `${SCRIPT_ID}-in-theaters`;

function readSlides() {
  const seen = new Set();
  return Array.from(document.querySelectorAll('.hero-slider .slide-item'))
    .map((slide) => {
      const link = slide.querySelector('.slide-item__backdrop--wrapper a[href*="/movies/view/"]');
      const image = slide.querySelector('.slide-item__backdrop img');
      const titleNode = slide.querySelector('.slide-item__title');
      const yearNode = titleNode && titleNode.querySelector('span');
      const href = link ? link.getAttribute('href') : '';
      if (!href || seen.has(href)) {
        return null;
      }

      seen.add(href);
      const title = titleNode
        ? Array.from(titleNode.childNodes)
            .filter((node) => node.nodeType === Node.TEXT_NODE)
            .map((node) => node.textContent)
            .join('')
            .trim()
        : '';
      return {
        href,
        title: title || (image && image.getAttribute('alt')) || '',
        year: yearNode ? yearNode.textContent.replace(/[()]/g, '').trim() : '',
        rating: (slide.querySelector('.slide-item__stat span') || {}).textContent || '',
        poster: normalizeImageUrl(
          (image &&
            (image.getAttribute('data-src-portrait') ||
              image.getAttribute('data-src-landscape'))) ||
            ''
        ),
        qualityTag: slide.querySelector('.quality-tag'),
      };
    })
    .filter(Boolean);
}

function buildCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-item-style-2 movie-item-style-1';

  const hover = document.createElement('div');
  hover.className = 'hvr-inner';
  const hoverLink = document.createElement('a');
  hoverLink.href = movie.href;
  hoverLink.append(' WATCH NOW ');
  const playIcon = document.createElement('i');
  playIcon.className = 'ion-play';
  hoverLink.append(playIcon);
  hover.append(hoverLink);

  const placeholder = document.createElement('div');
  placeholder.className = 'image__placeholder';
  const imageLink = document.createElement('a');
  imageLink.href = movie.href;
  const image = document.createElement('img');
  image.src = movie.poster;
  image.alt = movie.title;
  image.loading = 'lazy';
  imageLink.append(image);

  if (movie.rating.trim()) {
    const rate = document.createElement('p');
    rate.className = 'rate';
    const star = document.createElement('i');
    star.className = 'ion-android-star';
    const value = document.createElement('span');
    value.textContent = movie.rating.trim();
    rate.append(star, value, ' /10');
    imageLink.append(rate);
  }

  if (movie.year) {
    const year = document.createElement('p');
    year.className = 'year';
    year.textContent = movie.year;
    imageLink.append(year);
  }

  placeholder.append(imageLink);
  if (movie.qualityTag) {
    placeholder.append(movie.qualityTag.cloneNode(true));
  }

  const info = document.createElement('div');
  info.className = 'mv-item-infor';
  const heading = document.createElement('h6');
  const titleLink = document.createElement('a');
  titleLink.href = movie.href;
  titleLink.textContent = movie.title;
  heading.append(titleLink);
  info.append(heading);

  card.append(hover, placeholder, info);
  return card;
}

function findFilterRow() {
  const heading = Array.from(document.querySelectorAll('.page-single .hero-ct h1')).find(
    (element) => /movies filter/i.test(element.textContent || '')
  );
  return heading ? heading.closest('.row') : null;
}

export function ensureInTheatersSection() {
  const existing = document.querySelector(`.${SECTION_CLASS}`);
  if (location.pathname !== '/' || !appState.settings.siteTheme) {
    if (existing) {
      existing.remove();
    }
    return;
  }

  const filterRow = findFilterRow();
  if (existing || !filterRow) {
    return;
  }

  const movies = readSlides();
  if (!movies.length) {
    return;
  }

  const section = document.createElement('div');
  section.className = `row ipad-width ${SECTION_CLASS}`;
  section.innerHTML = `
    <div class="col-sm-12"><div class="hero-ct"><h1>Recent &amp; In Theaters</h1></div></div>
    <div class="col-sm-12"><div class="flex-wrap-movielist"></div></div>
  `;

  const grid = section.querySelector('.flex-wrap-movielist');
  grid.dataset.expanded = 'false';
  movies.forEach((movie, index) => {
    const card = buildCard(movie);
    if (index >= IN_THEATERS_VISIBLE_COUNT) {
      card.classList.add(`${SECTION_CLASS}-extra`);
    }
    grid.append(card);
  });

  if (movies.length > IN_THEATERS_VISIBLE_COUNT) {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = `${SECTION_CLASS}-toggle`;
    toggle.textContent = `Show all ${movies.length}`;
    toggle.addEventListener('click', () => {
      const expanded = grid.dataset.expanded !== 'true';
      grid.dataset.expanded = expanded ? 'true' : 'false';
      toggle.textContent = expanded ? 'Show fewer' : `Show all ${movies.length}`;
    });
    grid.parentElement.append(toggle);
  }

  filterRow.parentElement.insertBefore(section, filterRow);
  ensureMovieCardButtons();
  syncMovieCardButtons();
}
