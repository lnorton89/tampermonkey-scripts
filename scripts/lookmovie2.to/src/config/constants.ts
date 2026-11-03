/* eslint-disable */
// @ts-nocheck
export const SCRIPT_ID = 'lookmovie2-enhancer';
export const STORAGE_KEY = `${SCRIPT_ID}:settings`;
export const WATCHLIST_KEY = `${SCRIPT_ID}:watchlist`;
export const MOVIE_WATCHLIST_KEY = `${SCRIPT_ID}:movie-watchlist`;
export const PLAYLIST_KEY = `${SCRIPT_ID}:playlist`;
export const PLAYLIST_SESSION_KEY = `${SCRIPT_ID}:playlist-session`;
export const SHOWS_LIST_PROGRESS_KEY = `${SCRIPT_ID}:shows-list-progress`;
export const RESUME_POINTS_KEY = `${SCRIPT_ID}:resume-points`;
export const INTRO_TIMES_KEY = `${SCRIPT_ID}:intro-times`;
export const BACKUP_SNAPSHOTS_KEY = `${SCRIPT_ID}:backup-snapshots`;
export const BACKUP_SNAPSHOT_LIMIT = 14;
export const UI_STYLE_ID = `${SCRIPT_ID}-style`;
export const SITE_THEME_STYLE_ID = `${SCRIPT_ID}-site-theme`;
export const AD_BYPASS_STYLE_ID = `${SCRIPT_ID}-ad-bypass-style`;
export const FULLSCREEN_STYLE_ID = `${SCRIPT_ID}-fullscreen-style`;
export const FULLSCREEN_EXIT_BUTTON_ID = `${SCRIPT_ID}-fullscreen-exit`;
export const UI_ROOT_ID = `${SCRIPT_ID}-root`;
export const NTFY_REMOTE_ACTIVE_TAB_KEY = `${SCRIPT_ID}:ntfy-active-tab`;
export const NTFY_REMOTE_ACTIVE_TAB_TTL_MS = 15000;
export const NTFY_REMOTE_RESTART_DEBOUNCE_MS = 500;
export const NTFY_TOPIC_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;
export const WATCHLIST_REFRESH_MS = 60 * 60 * 1000;
export const ROUTE_POLL_MS = 1000;
export const RESUME_FINISHED_PERCENT = 95;
export const RESUME_STARTED_PERCENT = 2;
export const RESUME_POINT_LIMIT = 2000;
export const RESUME_SYNC_MS = 30 * 1000;
export const UPCOMING_EPISODE_LIMIT = 25;
export const AUTO_NEXT_COUNTDOWN_SECONDS = 10;
export const SEARCH_RESULT_LIMIT = 8;
export const IN_THEATERS_VISIBLE_COUNT = 24;
export const SEARCH_DEBOUNCE_MS = 300;
export const PLAYBACK_RATES = Object.freeze([0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]);
export const DEFAULT_SETTINGS = Object.freeze({
  autoPlay: true,
  autoFullscreen: true,
  windowedFullscreen: true,
  autoNextEpisode: true,
  autoSkipIntro: true,
  autoSkipCredits: true,
  playbackRate: 1,
  siteTheme: true,
  ntfyRemoteEnabled: false,
  ntfyServer: 'https://ntfy.sh',
  ntfyTopic: '',
  ntfyControlTopic: '',
  ntfyCommandSecret: '',
});
