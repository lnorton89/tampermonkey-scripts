import { isRecord } from '@userscripts/core';
import { INTRO_DB_API_PREFIX, SCRIPT_ID, type SkipSegment } from '../config/constants';

export interface SegmentTimes {
  start: number;
  end: number;
}

export type SkipTimes = Readonly<Record<SkipSegment, SegmentTimes | null>>;

export interface MediaRef {
  tmdbId: string;
  season?: string | null;
  episode?: string | null;
}

// TheIntroDB segments keyed by `${tmdbId}:${season}:${episode}`. Aether only exposes the end of
// each segment through its skip buttons, so the full times are read from its own API responses.
const skipTimesByMedia = new Map<string, SkipTimes>();
const requestedMediaKeys = new Set<string>();
const EMPTY_SKIP_TIMES: SkipTimes = Object.freeze({
  intro: null,
  recap: null,
  credits: null,
  preview: null,
});

// Credits and previews may run to the end of the file, which TheIntroDB reports as a null end.
const OPEN_ENDED_SEGMENTS = new Set<SkipSegment>(['credits', 'preview']);

export function getMediaKey(
  tmdbId: string,
  season?: string | null,
  episode?: string | null
): string {
  return `${tmdbId}:${season ?? ''}:${episode ?? ''}`;
}

export function getSkipTimes(mediaKey: string): SkipTimes | null {
  return skipTimesByMedia.get(mediaKey) || null;
}

function getRequestUrl(input: RequestInfo | URL | undefined): string {
  if (typeof input === 'string') {
    return input;
  }

  if (!input) {
    return '';
  }

  if ('url' in input) {
    return input.url;
  }

  return input.href;
}

function toSegmentTimes(segmentType: SkipSegment, segments: unknown): SegmentTimes | null {
  const segment = Array.isArray(segments)
    ? (segments as unknown[]).find(
        (item): item is Record<string, unknown> =>
          isRecord(item) &&
          (typeof item.end_ms === 'number' ||
            (OPEN_ENDED_SEGMENTS.has(segmentType) && typeof item.start_ms === 'number'))
      )
    : null;

  if (!segment) {
    return null;
  }

  return {
    start: typeof segment.start_ms === 'number' ? segment.start_ms / 1000 : 0,
    end: typeof segment.end_ms === 'number' ? segment.end_ms / 1000 : Infinity,
  };
}

function recordSkipTimes(requestUrl: string, data: unknown): void {
  const params = new URL(requestUrl).searchParams;
  const tmdbId = params.get('tmdb_id');
  if (!tmdbId) {
    return;
  }

  const mediaKey = getMediaKey(tmdbId, params.get('season'), params.get('episode'));
  const record = isRecord(data) ? data : {};
  skipTimesByMedia.set(mediaKey, {
    intro: toSegmentTimes('intro', record.intro),
    recap: toSegmentTimes('recap', record.recap),
    credits: toSegmentTimes('credits', record.credits),
    preview: toSegmentTimes('preview', record.preview),
  });
}

// The loader fetches this build asynchronously, so on a direct page load Aether has usually
// requested the times before the fetch hook exists. In that case they're requested again here.
export function requestSkipTimes({ tmdbId, season, episode }: MediaRef): void {
  const mediaKey = getMediaKey(tmdbId, season, episode);
  if (skipTimesByMedia.has(mediaKey) || requestedMediaKeys.has(mediaKey)) {
    return;
  }

  requestedMediaKeys.add(mediaKey);
  const params = new URLSearchParams({ tmdb_id: tmdbId });
  if (season && episode) {
    params.set('season', season);
    params.set('episode', episode);
  }

  const requestUrl = `${INTRO_DB_API_PREFIX}v3/media?${params.toString()}`;
  fetch(requestUrl, { headers: { Accept: 'application/json' } })
    .then((response): Promise<unknown> | null => (response.ok ? response.json() : null))
    .then((data) => {
      if (!skipTimesByMedia.has(mediaKey)) {
        if (data) {
          recordSkipTimes(requestUrl, data);
        } else {
          skipTimesByMedia.set(mediaKey, EMPTY_SKIP_TIMES);
        }
      }
    })
    .catch((error: unknown) => {
      console.warn(`[${SCRIPT_ID}] Failed to fetch skip times.`, error);
      if (!skipTimesByMedia.has(mediaKey)) {
        skipTimesByMedia.set(mediaKey, EMPTY_SKIP_TIMES);
      }
    });
}

export function installSkipTimesCapture(): void {
  const pageWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
  // eslint-disable-next-line @typescript-eslint/unbound-method -- called below with the original `this`
  const originalFetch = pageWindow.fetch;
  if (typeof originalFetch !== 'function') {
    return;
  }

  pageWindow.fetch = function (this: unknown, ...args: Parameters<typeof fetch>) {
    const responsePromise = originalFetch.apply(this, args);
    const requestUrl = getRequestUrl(args[0]);

    if (requestUrl.startsWith(INTRO_DB_API_PREFIX)) {
      responsePromise
        .then((response): Promise<unknown> | null => (response.ok ? response.clone().json() : null))
        .then((data) => data && recordSkipTimes(requestUrl, data))
        .catch((error: unknown) => {
          console.warn(`[${SCRIPT_ID}] Failed to read skip times.`, error);
        });
    }

    return responsePromise;
  };
}
