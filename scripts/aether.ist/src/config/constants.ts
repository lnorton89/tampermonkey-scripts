/* eslint-disable */
// @ts-nocheck
export const SCRIPT_ID = 'aether-enhancer';
export const STORAGE_KEY = `${SCRIPT_ID}:settings`;
export const AD_RELOAD_SESSION_KEY = `${SCRIPT_ID}:ad-reload`;
export const HIDE_BANNER_STYLE_ID = `${SCRIPT_ID}-hide-banner-style`;
export const SITE_PREFERENCES_KEY = '__MW::preferences';
export const SITE_AD_SCRIPT_ID = 'profiton-pops-script';
export const SITE_AD_SCRIPT_SRC_PATTERN = /scarreddeponer\.com/;
export const PLAYER_PATH_PATTERN = /^\/media\/[^/]+\/[^/]+\/[^/]+/;
export const INTRO_DB_API_PREFIX = 'https://api.theintrodb.org/';
export const SKIP_POLL_MS = 500;
export const SKIP_SEEK_ATTEMPTS = 3;
// Aether always shows its Skip Intro button for the first 10s of playback; after that it only
// appears while the player controls are visible.
export const SKIP_INTRO_ALWAYS_VISIBLE_SECONDS = 10;
export const SKIP_SEGMENTS = Object.freeze([
  { segment: 'recap', settingKey: 'autoSkipRecap', label: 'Auto skip recap' },
  { segment: 'intro', settingKey: 'autoSkipIntro', label: 'Auto skip intro' },
  { segment: 'credits', settingKey: 'autoSkipCredits', label: 'Auto skip credits' },
  { segment: 'preview', settingKey: 'autoSkipPreview', label: 'Auto skip preview' },
]);
export const DEFAULT_SETTINGS = Object.freeze({
  autoSkipIntro: true,
  autoSkipRecap: false,
  autoSkipCredits: false,
  autoSkipPreview: false,
});
