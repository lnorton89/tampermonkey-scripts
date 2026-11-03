/* eslint-disable */
// @ts-nocheck
import { SCRIPT_ID, SITE_THEME_STYLE_ID } from '../config/constants';
import { appState } from '../core/state';

// Restyles LookMovie's own pages: wider layout on big screens, responsive poster grids,
// a calmer background and no premium upsell links.
const SITE_THEME_CSS = `
  body {
    background: #020d18 !important;
  }

  .hero.common-hero,
  .ht-footer {
    background-image: linear-gradient(180deg, #0a1b2e 0%, #020d18 70%) !important;
  }

  header.ht-header {
    position: sticky !important;
    top: 0;
    background: rgba(2, 13, 24, 0.86) !important;
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(148, 163, 184, 0.12);
  }

  @media (min-width: 1400px) {
    .container {
      max-width: min(1760px, calc(100vw - 96px)) !important;
      width: auto !important;
    }
  }

  .flex-wrap-movielist {
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 30px 22px;
  }

  .flex-wrap-movielist > .movie-item-style-2 {
    width: auto !important;
    height: auto !important;
    margin: 0 !important;
  }

  .movie-item-style-2 .image__placeholder {
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 2 / 3;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
    transition: transform 0.18s ease, box-shadow 0.18s ease;
  }

  .movie-item-style-2 .image__placeholder img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }

  .movie-item-style-2:hover .image__placeholder {
    transform: translateY(-4px);
    box-shadow: 0 16px 34px rgba(0, 0, 0, 0.5), 0 0 0 2px rgba(56, 189, 248, 0.55);
  }

  .movie-item-style-2 .mv-item-infor {
    padding-top: 8px;
  }

  .movie-item-style-2 .mv-item-infor h6,
  .movie-item-style-2 .mv-item-infor a {
    font-size: 14px !important;
    line-height: 1.35 !important;
  }

  .tv-episodes-list {
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 20px;
  }

  .tv-episodes-list > .episode-item {
    width: auto !important;
    max-width: none !important;
    margin: 0 !important;
  }

  .tv-episodes-list .episode-item .mv-item-infor p {
    font-size: 14px !important;
    line-height: 1.5 !important;
  }

  .tv-episodes-list .episode-item {
    border-radius: 12px;
    overflow: hidden;
    transition: background 0.18s ease, box-shadow 0.18s ease;
  }

  .tv-episodes-list .episode-item:hover {
    box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.45);
  }

  .${SCRIPT_ID}-in-theaters {
    margin-bottom: 40px;
  }

  .${SCRIPT_ID}-in-theaters .flex-wrap-movielist[data-expanded='false'] .${SCRIPT_ID}-in-theaters-extra {
    display: none !important;
  }

  .${SCRIPT_ID}-in-theaters-toggle {
    display: block;
    margin: 28px auto 0;
    padding: 10px 22px;
    border: 1px solid rgba(148, 163, 184, 0.3);
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.85);
    color: #f8fafc;
    font: 700 13px/1 Arial, sans-serif;
    cursor: pointer;
  }

  .${SCRIPT_ID}-in-theaters-toggle:hover {
    border-color: rgba(56, 189, 248, 0.6);
  }

  a[href="/premium.html"] {
    display: none !important;
  }
`;

export function syncSiteTheme() {
  const existing = document.getElementById(SITE_THEME_STYLE_ID);
  if (!appState.settings.siteTheme) {
    if (existing) {
      existing.remove();
    }
    return;
  }

  if (existing || !document.documentElement) {
    return;
  }

  const style = document.createElement('style');
  style.id = SITE_THEME_STYLE_ID;
  style.textContent = SITE_THEME_CSS;
  (document.head || document.documentElement).appendChild(style);
}
