import {
  PLAYER_PATH_PATTERN,
  SCRIPT_ID,
  SKIP_INTRO_ALWAYS_VISIBLE_SECONDS,
  SKIP_POLL_MS,
  SKIP_SEEK_ATTEMPTS,
  SKIP_SEGMENTS,
  type SkipSegment,
} from '../config/constants';
import { appState } from '../core/state';
import {
  getMediaKey,
  getSkipTimes,
  requestSkipTimes,
  type MediaRef,
  type SegmentTimes,
  type SkipTimes,
} from './skipTimes';

function getEpisodeKey(): string {
  return PLAYER_PATH_PATTERN.test(location.pathname) ? location.pathname : '';
}

// Aether sets the media session title to "S1 E1: Winter Is Coming"; the tab title ("Game of
// Thrones - S1 - E1") is only set on a direct page load.
function getEpisodeLabel(): string {
  // `navigator.mediaSession` is missing in some browsers despite its non-optional DOM typing.
  const mediaSession = navigator.mediaSession as MediaSession | undefined;
  return `${mediaSession?.metadata?.title || ''} | ${document.title}`;
}

// Returns undefined while the label still names the previous episode (after an in-player episode
// change it lags for a moment), and null when the media can't be identified at all.
function getCurrentMedia(): MediaRef | null | undefined {
  const tmdbMatch = /^\/media\/tmdb-(tv|movie)-(\d+)/.exec(location.pathname);
  const tmdbId = tmdbMatch?.[2];
  if (!tmdbMatch || !tmdbId) {
    return null;
  }

  if (tmdbMatch[1] === 'movie') {
    return { tmdbId };
  }

  const episodeMatch = /\bS(\d+)\s*-?\s*E(\d+)\b/.exec(getEpisodeLabel());
  if (!episodeMatch) {
    return null;
  }

  if (`${episodeMatch[1]}:${episodeMatch[2]}` === appState.skipStaleEpisode) {
    return undefined;
  }

  return { tmdbId, season: episodeMatch[1], episode: episodeMatch[2] };
}

// The stale check compares against the episode last identified rather than the label at the URL
// change, because Aether can already show the new episode's title in the same moment.
function resetForEpisode(episodeKey: string): void {
  appState.skipStaleEpisode = appState.skipLastEpisode;
  appState.skipLastEpisode = '';
  appState.skipEpisodeKey = episodeKey;
  appState.skippedSegments = {};
  appState.skipSeekAttempts = {};
  appState.skipIntroStartTime = null;
  appState.skipIntroControlsNudged = false;
}

function findSkipIntroButton(): HTMLButtonElement | undefined {
  return Array.from(document.querySelectorAll('button')).find((button) =>
    /^skip intro$/i.test((button.textContent || '').trim())
  );
}

// The Skip Intro button is only mounted while the player controls are showing once playback is
// past the first few seconds, so a resumed episode needs the controls revealed once.
function revealPlayerControls(video: HTMLVideoElement): void {
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
// The segment only counts as skipped once a later check sees playback past it, since the player
// can still move playback back while the stream is starting (resume position, stream start).
function skipWithTimes(video: HTMLVideoElement, segment: SkipSegment, times: SegmentTimes): void {
  const duration = Number.isFinite(video.duration) ? video.duration : Infinity;
  const end = Math.min(times.end, duration);
  const attempts = appState.skipSeekAttempts[segment] || 0;

  if (!Number.isFinite(end) || video.currentTime >= end - 0.5) {
    if (attempts) {
      appState.skippedSegments[segment] = true;
    }
    return;
  }

  if (video.currentTime < times.start) {
    return;
  }

  if (attempts >= SKIP_SEEK_ATTEMPTS) {
    appState.skippedSegments[segment] = true;
    return;
  }

  appState.skipSeekAttempts[segment] = attempts + 1;
  video.currentTime = end;
  console.info(
    `[${SCRIPT_ID}] Skipped ${segment} ${times.start.toFixed(1)}s -> ${end.toFixed(1)}s.`
  );
}

function skipWithSiteButton(video: HTMLVideoElement): void {
  const button = findSkipIntroButton();
  if (button) {
    button.click();
    appState.skippedSegments.intro = true;
    console.info(`[${SCRIPT_ID}] Clicked Skip Intro.`);
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

function checkSkipSegments(): void {
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

  appState.skipStaleEpisode = '';
  let skipTimes: SkipTimes | null = null;
  if (media) {
    appState.skipLastEpisode = media.season ? `${media.season}:${media.episode ?? ''}` : '';
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

export function watchSkipSegments(): void {
  window.setInterval(checkSkipSegments, SKIP_POLL_MS);
}
