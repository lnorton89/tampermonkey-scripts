/* eslint-disable */
// @ts-nocheck
import {
  PLAYER_PATH_PATTERN,
  SCRIPT_ID,
  SKIP_INTRO_ALWAYS_VISIBLE_SECONDS,
  SKIP_INTRO_POLL_MS,
} from '../config/constants';
import { appState } from '../core/state';
import { getIntroTimes, getMediaKey } from './introTimes';

function getEpisodeKey() {
  return PLAYER_PATH_PATTERN.test(location.pathname) ? location.pathname : '';
}

// Aether sets the media session title to "S1 E1: Winter Is Coming"; the tab title ("Game of
// Thrones - S1 - E1") is only set on a direct page load.
function getEpisodeLabel() {
  return `${navigator.mediaSession?.metadata?.title || ''} | ${document.title}`;
}

// After an in-player episode change the label still names the previous episode for a moment,
// so it isn't trusted until it changes.
function getCurrentMediaKey() {
  const episodeLabel = getEpisodeLabel();
  if (appState.skipIntroStaleLabel && episodeLabel === appState.skipIntroStaleLabel) {
    return '';
  }

  const tmdbMatch = location.pathname.match(/^\/media\/tmdb-(tv|movie)-(\d+)/);
  if (!tmdbMatch) {
    return '';
  }

  if (tmdbMatch[1] === 'movie') {
    return getMediaKey(tmdbMatch[2]);
  }

  const episodeMatch = episodeLabel.match(/\bS(\d+)\s*-?\s*E(\d+)\b/);
  return episodeMatch ? getMediaKey(tmdbMatch[2], episodeMatch[1], episodeMatch[2]) : '';
}

function resetForEpisode(episodeKey) {
  appState.skipIntroStaleLabel = appState.skipIntroEpisodeKey ? getEpisodeLabel() : '';
  appState.skipIntroEpisodeKey = episodeKey;
  appState.skipIntroDone = false;
  appState.skipIntroStartTime = null;
  appState.skipIntroControlsNudged = false;
}

function findSkipIntroButton() {
  return Array.from(document.querySelectorAll('button')).find((button) =>
    /^skip intro$/i.test((button.textContent || '').trim())
  );
}

// The Skip Intro button is only mounted while the player controls are showing once playback is
// past the first few seconds, so a resumed episode needs the controls revealed once.
function revealPlayerControls(video) {
  const rect = video.getBoundingClientRect();
  const clientX = rect.left + rect.width / 2;
  const clientY = rect.top + rect.height / 2;
  const target = document.elementFromPoint(clientX, clientY) || video;
  const init = { bubbles: true, cancelable: true, clientX, clientY };

  target.dispatchEvent(new PointerEvent('pointermove', init));
  target.dispatchEvent(new MouseEvent('mousemove', init));
}

function skipWithIntroTimes(video, introTimes) {
  const { start, end } = introTimes;
  const duration = Number.isFinite(video.duration) ? video.duration : Infinity;

  if (video.currentTime >= end || end >= duration) {
    return;
  }

  // Waiting for the intro start keeps cold opens that play before the intro.
  if (video.currentTime < start) {
    return;
  }

  video.currentTime = end;
  appState.skipIntroDone = true;
  console.log(`[${SCRIPT_ID}] Skipped intro ${start.toFixed(1)}s -> ${end.toFixed(1)}s.`);
}

function skipWithSiteButton(video) {
  const button = findSkipIntroButton();
  if (button) {
    button.click();
    appState.skipIntroDone = true;
    console.log(`[${SCRIPT_ID}] Clicked Skip Intro.`);
    return;
  }

  if (appState.skipIntroStartTime === null && !video.paused) {
    appState.skipIntroStartTime = video.currentTime;
  }

  if (
    !appState.skipIntroControlsNudged &&
    appState.skipIntroStartTime !== null &&
    appState.skipIntroStartTime > SKIP_INTRO_ALWAYS_VISIBLE_SECONDS
  ) {
    appState.skipIntroControlsNudged = true;
    revealPlayerControls(video);
  }
}

function checkSkipIntro() {
  const episodeKey = getEpisodeKey();
  if (episodeKey !== appState.skipIntroEpisodeKey) {
    resetForEpisode(episodeKey);
  }

  if (!episodeKey || !appState.settings.autoSkipIntro || appState.skipIntroDone) {
    return;
  }

  const video = document.querySelector('video');
  if (!video || video.readyState < 1) {
    return;
  }

  const mediaKey = getCurrentMediaKey();
  if (!mediaKey) {
    return;
  }

  appState.skipIntroStaleLabel = '';
  const introTimes = getIntroTimes(mediaKey);
  if (introTimes && typeof introTimes.end === 'number') {
    skipWithIntroTimes(video, introTimes);
    return;
  }

  // Without TheIntroDB times Aether falls back to subtitle detection, which only exposes the
  // intro end through its own Skip Intro button.
  skipWithSiteButton(video);
}

export function watchSkipIntro() {
  window.setInterval(checkSkipIntro, SKIP_INTRO_POLL_MS);
}
