/* eslint-disable */
// @ts-nocheck
export const SCRIPT_ID = 'lookmovie2-enhancer';
export const STORAGE_KEY = `${SCRIPT_ID}:settings`;
export const WATCHLIST_KEY = `${SCRIPT_ID}:watchlist`;
export const MOVIE_WATCHLIST_KEY = `${SCRIPT_ID}:movie-watchlist`;
export const PLAYLIST_KEY = `${SCRIPT_ID}:playlist`;
export const PLAYLIST_SESSION_KEY = `${SCRIPT_ID}:playlist-session`;
export const SHOWS_LIST_PROGRESS_KEY = `${SCRIPT_ID}:shows-list-progress`;
export const UI_STYLE_ID = `${SCRIPT_ID}-style`;
export const FULLSCREEN_STYLE_ID = `${SCRIPT_ID}-fullscreen-style`;
export const FULLSCREEN_EXIT_BUTTON_ID = `${SCRIPT_ID}-fullscreen-exit`;
export const UI_ROOT_ID = `${SCRIPT_ID}-root`;
export const NTFY_REMOTE_ACTIVE_TAB_KEY = `${SCRIPT_ID}:ntfy-active-tab`;
export const NTFY_REMOTE_ACTIVE_TAB_TTL_MS = 15000;
export const NTFY_REMOTE_RESTART_DEBOUNCE_MS = 500;
export const NTFY_TOPIC_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;
export const WATCHLIST_REFRESH_MS = 30 * 60 * 1000;
export const ROUTE_POLL_MS = 1000;
export const DEFAULT_SETTINGS = Object.freeze({
  autoPlay: true,
  autoFullscreen: true,
  ntfyRemoteEnabled: false,
  ntfyServer: 'https://ntfy.sh',
  ntfyTopic: '',
  ntfyControlTopic: '',
  ntfyCommandSecret: '',
});
