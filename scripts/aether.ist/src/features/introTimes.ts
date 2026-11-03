/* eslint-disable */
// @ts-nocheck
import { INTRO_DB_API_PREFIX, SCRIPT_ID } from '../config/constants';

// Intro segments from TheIntroDB keyed by `${tmdbId}:${season}:${episode}`. Aether only uses the
// intro end for its Skip Intro button, so the start time is read from its own API responses.
const introTimesByMedia = new Map();

export function getMediaKey(tmdbId, season, episode) {
  return `${tmdbId}:${season ?? ''}:${episode ?? ''}`;
}

export function getIntroTimes(mediaKey) {
  return introTimesByMedia.get(mediaKey) || null;
}

function getRequestUrl(input) {
  if (typeof input === 'string') {
    return input;
  }

  return input?.url || String(input || '');
}

function recordIntroTimes(requestUrl, data) {
  const params = new URL(requestUrl).searchParams;
  const tmdbId = params.get('tmdb_id');
  if (!tmdbId) {
    return;
  }

  const intro = Array.isArray(data?.intro)
    ? data.intro.find((segment) => segment && typeof segment.end_ms === 'number')
    : null;
  const mediaKey = getMediaKey(tmdbId, params.get('season'), params.get('episode'));

  introTimesByMedia.set(
    mediaKey,
    intro
      ? {
          start: typeof intro.start_ms === 'number' ? intro.start_ms / 1000 : 0,
          end: intro.end_ms / 1000,
        }
      : { start: null, end: null }
  );
}

export function installIntroTimesCapture() {
  const pageWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
  const originalFetch = pageWindow.fetch;
  if (typeof originalFetch !== 'function') {
    return;
  }

  pageWindow.fetch = function (...args) {
    const responsePromise = originalFetch.apply(this, args);
    const requestUrl = getRequestUrl(args[0]);

    if (requestUrl.startsWith(INTRO_DB_API_PREFIX)) {
      responsePromise
        .then((response) => (response.ok ? response.clone().json() : null))
        .then((data) => data && recordIntroTimes(requestUrl, data))
        .catch((error) => console.warn(`[${SCRIPT_ID}] Failed to read intro times.`, error));
    }

    return responsePromise;
  };
}
