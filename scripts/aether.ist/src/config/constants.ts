/* eslint-disable */
// @ts-nocheck
export const SCRIPT_ID = 'aether-enhancer';
export const STORAGE_KEY = `${SCRIPT_ID}:settings`;
export const UI_STYLE_ID = `${SCRIPT_ID}-style`;
export const UI_ROOT_ID = `${SCRIPT_ID}-root`;
export const PLAYER_PATH_PATTERN = /^\/media\/[^/]+\/[^/]+\/[^/]+/;
export const INTRO_DB_API_PREFIX = 'https://api.theintrodb.org/';
export const SKIP_INTRO_POLL_MS = 500;
// Aether always shows its Skip Intro button for the first 10s of playback; after that it only
// appears while the player controls are visible.
export const SKIP_INTRO_ALWAYS_VISIBLE_SECONDS = 10;
export const LAUNCHER_IDLE_HIDE_MS = 2500;
export const DEFAULT_SETTINGS = Object.freeze({
  autoSkipIntro: true,
});
