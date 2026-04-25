/* eslint-disable */
// @ts-nocheck
export const SCRIPT_ID = 'lookmovie2-enhancer';
export const STORAGE_KEY = `${SCRIPT_ID}:settings`;
export const WATCHLIST_KEY = `${SCRIPT_ID}:watchlist`;
export const UI_STYLE_ID = `${SCRIPT_ID}-style`;
export const FULLSCREEN_STYLE_ID = `${SCRIPT_ID}-fullscreen-style`;
export const UI_ROOT_ID = `${SCRIPT_ID}-root`;
export const WATCHLIST_REFRESH_MS = 30 * 60 * 1000;
export const ROUTE_POLL_MS = 1000;
export const DEFAULT_SETTINGS = Object.freeze({
  autoPlay: true,
  autoFullscreen: true,
});
