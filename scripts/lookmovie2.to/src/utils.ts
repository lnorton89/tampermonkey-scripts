import type { Settings, EpisodeRecord, EpisodeContext, ParsedEpisodeCard } from './types';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const SCRIPT_ID = 'lookmovie2-enhancer';
export const STORAGE_KEY = `${SCRIPT_ID}:settings`;
export const UI_STYLE_ID = `${SCRIPT_ID}-style`;
export const FULLSCREEN_STYLE_ID = `${SCRIPT_ID}-fullscreen-style`;
export const UI_ROOT_ID = `${SCRIPT_ID}-root`;
export const ROUTE_POLL_MS = 1000;

export const DEFAULT_SETTINGS = Object.freeze({
  adTimerBypass: true,
  autoPlay: true,
  autoFullscreen: true,
});

// ---------------------------------------------------------------------------
// Logger
// ---------------------------------------------------------------------------

export const log = {
  info: (...args: unknown[]): void => {
    console.warn(`[${SCRIPT_ID}]`, ...args);
  },
  warn: (...args: unknown[]): void => {
    console.warn(`[${SCRIPT_ID}]`, ...args);
  },
  error: (...args: unknown[]): void => {
    console.error(`[${SCRIPT_ID}]`, ...args);
  },
};

// ---------------------------------------------------------------------------
// Settings helpers
// ---------------------------------------------------------------------------

export function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? (JSON.parse(stored) as Partial<Settings>) : {};
    return {
      adTimerBypass:
        typeof parsed.adTimerBypass === 'boolean'
          ? parsed.adTimerBypass
          : DEFAULT_SETTINGS.adTimerBypass,
      autoPlay: typeof parsed.autoPlay === 'boolean' ? parsed.autoPlay : DEFAULT_SETTINGS.autoPlay,
      autoFullscreen:
        typeof parsed.autoFullscreen === 'boolean'
          ? parsed.autoFullscreen
          : DEFAULT_SETTINGS.autoFullscreen,
    };
  } catch (error) {
    log.warn('Failed to load saved settings.', error);
    return { ...DEFAULT_SETTINGS };
  }
}

// ---------------------------------------------------------------------------
// Generic utilities
// ---------------------------------------------------------------------------

export function toPositiveInteger(value: unknown): number {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatEpisodeLabel(record: EpisodeRecord | null): string {
  if (!record) {
    return 'Unknown episode';
  }
  return `S${String(record.season).padStart(2, '0')}E${String(record.episode).padStart(2, '0')}`;
}

export function compareEpisodes(left: EpisodeRecord | null, right: EpisodeRecord | null): number {
  if (!left && !right) return 0;
  if (!left) return -1;
  if (!right) return 1;
  if (left.season !== right.season) return left.season - right.season;
  if (left.episode !== right.episode) return left.episode - right.episode;
  return left.idEpisode - right.idEpisode;
}

export function sameEpisode(left: EpisodeRecord | null, right: EpisodeRecord | null): boolean {
  if (!left || !right) return false;
  return (
    left.idEpisode === right.idEpisode &&
    left.season === right.season &&
    left.episode === right.episode
  );
}

export function decodeInlineJsString(value: string): string {
  return value.replace(/\\'/g, "'").replace(/\\\\/g, '\\');
}

// ---------------------------------------------------------------------------
// Episode normalization
// ---------------------------------------------------------------------------

export function normalizeEpisodeRecord(
  raw: Partial<Record<string, unknown>> | null
): EpisodeRecord | null {
  if (!raw || typeof raw !== 'object') return null;

  const season = toPositiveInteger(raw.season);
  const episode = toPositiveInteger(raw.episode);
  const idEpisode = toPositiveInteger(raw.idEpisode ?? raw.id_episode);

  if (!season || !episode || !idEpisode) return null;

  const result: EpisodeRecord = {
    season,
    episode,
    idEpisode,
  };

  if (typeof raw.watchedAt === 'number') {
    result.watchedAt = raw.watchedAt;
  }

  if (typeof raw.updatedAt === 'number') {
    result.updatedAt = raw.updatedAt;
  }

  return result;
}

// ---------------------------------------------------------------------------
// URL / route helpers
// ---------------------------------------------------------------------------

export function extractShowSlugFromViewHref(href: string): string {
  try {
    const url = new URL(href, location.origin);
    const pathMatch = /\/shows\/view\/([^/?#]+)/i.exec(url.pathname);
    return pathMatch?.[1] ?? '';
  } catch {
    return '';
  }
}

export function extractEpisodeContextFromHref(href: string): EpisodeContext | null {
  try {
    const url = new URL(href, location.origin);
    const season = toPositiveInteger(url.searchParams.get('season'));
    const episode = toPositiveInteger(url.searchParams.get('episode'));
    const idEpisode = toPositiveInteger(url.searchParams.get('id_episode'));

    if (!season || !episode || !idEpisode) return null;
    return { season, episode, idEpisode };
  } catch {
    return null;
  }
}

export function extractYearFromSlug(slug: string): string {
  const yearMatch = /-(\d{4})$/.exec(slug);
  return yearMatch?.[1] ?? '';
}

export function buildShowViewUrl(slug: string, episodeRecord: EpisodeRecord | null): string {
  if (!slug) return '/shows';
  if (!episodeRecord) return `/shows/view/${slug}`;
  return `/shows/view/${slug}?season=${String(episodeRecord.season)}&episode=${String(episodeRecord.episode)}&id_episode=${String(episodeRecord.idEpisode)}`;
}

// ---------------------------------------------------------------------------
// Episode card parser
// ---------------------------------------------------------------------------

export function parseEpisodeCard(cardElement: Element | null): ParsedEpisodeCard | null {
  if (!cardElement) return null;

  const link = cardElement.querySelector<HTMLAnchorElement>('a[href*="/shows/view/"]');
  if (!link) return null;

  const href = link.getAttribute('href');
  if (!href) return null;

  const slug = extractShowSlugFromViewHref(href);
  if (!slug) return null;

  const titleNode = cardElement.querySelector('.mv-item-infor h6');
  const imageNode = cardElement.querySelector<HTMLImageElement>('img[data-src], img[src]');
  const episodeContext = extractEpisodeContextFromHref(href);

  return {
    slug,
    title: titleNode ? titleNode.textContent.trim() : slug,
    year: extractYearFromSlug(slug),
    poster: imageNode
      ? (imageNode.getAttribute('data-src') ?? imageNode.getAttribute('src') ?? '')
      : '',
    href: new URL(href, location.origin).href,
    episode: episodeContext,
  };
}
