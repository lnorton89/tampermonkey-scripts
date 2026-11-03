/* eslint-disable */
// @ts-nocheck
import {
  PLAYER_PATH_PATTERN,
  SCRIPT_ID,
  SKIP_INTRO_ALWAYS_VISIBLE_SECONDS,
  SKIP_POLL_MS,
  SKIP_SEGMENTS,
} from '../config/constants';
import { appState } from '../core/state';
import { getMediaKey, getSkipTimes, requestSkipTimes } from './skipTimes';

function getEpisodeKey() {
  return PLAYER_PATH_PATTERN.test(location.pathname) ? location.pathname : '';
}

// Aether sets the media session title to "S1 E1: Winter Is Coming"; the tab title ("Game of
// Thrones - S1 - E1") is only set on a direct page load.
function getEpisodeLabel() {
  return `${navigator.mediaSession?.metadata?.title || ''} | ${document.title}`;
}

// Returns undefined while the label still names the previous episode (after an in-player episode
// change it lags for a moment), and null when the media can't be identified at all.
function getCurrentMedia() {
  const episodeLabel = getEpisodeLabel();
  if (appState.skipStaleLabel && episodeLabel === appState.skipStaleLabel) {
    return undefined;
  }

  const tmdbMatch = location.pathname.match(/^\/media\/tmdb-(tv|movie)-(\d+)/);
  if (!tmdbMatch) {
    return null;
  }

  if (tmdbMatch[1] === 'movie') {
    return { tmdbId: tmdbMatch[2] };
  }

  const episodeMatch = episodeLabel.match(/\bS(\d+)\s*-?\s*E(\d+)\b/);
  return episodeMatch
    ? { tmdbId: tmdbMatch[2], season: episodeMatch[1], episode: episodeMatch[2] }
    : null;
}

function resetForEpisode(episodeKey) {
  appState.skipStaleLabel = appState.skipEpisodeKey ? getEpisodeLabel() : '';
  appState.skipEpisodeKey = episodeKey;
  appState.skippedSegments = {};
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

// Seeks past a segment once playback is inside it. Waiting for the segment start keeps cold opens
// that play before the intro. Open-ended credits and previews skip to the end of the file.
function skipWithTimes(video, segment, times) {
  const duration = Number.isFinite(video.duration) ? video.duration : Infinity;
  const end = Math.min(times.end, duration);

  if (!Number.isFinite(end) || video.currentTime < times.start || video.currentTime >= end - 0.5) {
    return;
  }

  video.currentTime = end;
  appState.skippedSegments[segment] = true;
  console.log(
    `[${SCRIPT_ID}] Skipped ${segment} ${times.start.toFixed(1)}s -> ${end.toFixed(1)}s.`
  );
}

function skipWithSiteButton(video) {
  const button = findSkipIntroButton();
  if (button) {
    button.click();
    appState.skippedSegments.intro = true;
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

function checkSkipSegments() {
  const episodeKey = getEpisodeKey();
  if (episodeKey !== appState.skipEpisodeKey) {
    resetForEpisode(episodeKey);
  }

  const pendingSegments = SKIP_SEGMENTS.filter(
    ({ segment, settingKey }) => appState.settings[settingKey] && !appState.skippedSegments[segment]
  );
  if (!episodeKey || !pendingSegments.length) {
    return;
  }

  const video = document.querySelector('video');
  if (!video || video.readyState < 1) {
    return;
  }

  const media = getCurrentMedia();
  if (media === undefined) {
    return;
  }

  appState.skipStaleLabel = '';
  let skipTimes = null;
  if (media) {
    skipTimes = getSkipTimes(getMediaKey(media.tmdbId, media.season, media.episode));

    // Clicking Aether's own button before the times arrive would skip cold opens, so wait for
    // them; requestSkipTimes always records an entry, even when the lookup fails.
    if (!skipTimes) {
      requestSkipTimes(media);
      return;
    }
  }

  pendingSegments.forEach(({ segment }) => {
    const times = skipTimes?.[segment];
    if (times) {
      skipWithTimes(video, segment, times);
    } else if (segment === 'intro') {
      // Without TheIntroDB times Aether falls back to subtitle detection, which only exposes the
      // intro end through its own Skip Intro button.
      skipWithSiteButton(video);
    }
  });
}

export function watchSkipSegments() {
  window.setInterval(checkSkipSegments, SKIP_POLL_MS);
}
