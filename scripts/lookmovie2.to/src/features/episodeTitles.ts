import { readStore, writeStore } from '@userscripts/core';
import { EPISODE_TITLES_KEY, EPISODE_TITLES_LIMIT, SCRIPT_ID } from '../config/constants';
import {
  decodeInlineJsString,
  entriesOf,
  fetchText,
  readProp,
  readWindowRecord,
} from '../core/utils';
import { formatEpisodeLabel, type EpisodeRecord } from '../domain/episodes';

// LookMovie's episode API has no titles. Only a show's play page lists them (`show_storage.seasons`),
// so titles are read from there, either from the current page or by fetching the play page, and
// cached by episode id.

let titles: Record<string, string> | null = null;
const showFetches = new Map<string, Promise<boolean>>();
let lastCapturedSignature = '';
// Play page fetches run one after another so a page full of shows doesn't burst the site.
let fetchQueue: Promise<unknown> = Promise.resolve();

function loadTitles(): Record<string, string> {
  if (titles) {
    return titles;
  }

  titles = {};
  try {
    const parsed: unknown = JSON.parse(readStore(EPISODE_TITLES_KEY) || '{}');
    entriesOf(parsed).forEach(([id, title]) => {
      if (typeof title === 'string' && title.trim()) {
        titles![id] = title;
      }
    });
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Could not read cached episode titles.`, error);
  }

  return titles;
}

function persistTitles(store: Record<string, string>): void {
  // Keys keep insertion order, so dropping from the front forgets the oldest titles first.
  const ids = Object.keys(store);
  if (ids.length > EPISODE_TITLES_LIMIT) {
    ids.slice(0, ids.length - EPISODE_TITLES_LIMIT).forEach((id) => {
      delete store[id];
    });
  }

  try {
    writeStore(EPISODE_TITLES_KEY, JSON.stringify(store));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Could not save episode titles.`, error);
  }
}

/** Adds titles keyed by episode id. Returns whether anything changed. */
function rememberEpisodeTitles(found: Record<string, string>): boolean {
  const store = loadTitles();
  let changed = false;
  Object.entries(found).forEach(([id, title]) => {
    if (store[id] !== title) {
      delete store[id];
      store[id] = title;
      changed = true;
    }
  });

  if (changed) {
    persistTitles(store);
  }

  return changed;
}

// Unnamed episodes come through as "Episode 3", which says nothing the S01E03 label doesn't.
function cleanTitle(value: unknown): string {
  const title = typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
  return /^episode\s*#?\d+$/i.test(title) ? '' : title;
}

/** Titles by episode id from a play page's inline `seasons: [{ title, ..., id_episode }]` list. */
export function parseEpisodeTitles(html: string): Record<string, string> {
  const found: Record<string, string> = {};
  for (const match of html.matchAll(/\{[^{}]*?\bid_episode\b[^{}]*?\}/g)) {
    const block = match[0];
    const titleMatch = /\btitle:\s*'((?:\\.|[^'\\])*)'/.exec(block);
    const idMatch = /\bid_episode:\s*['"]?(\d+)/.exec(block);
    const title = cleanTitle(decodeInlineJsString(titleMatch?.[1]));
    if (idMatch?.[1] && title) {
      found[idMatch[1]] = title;
    }
  }

  return found;
}

export function getEpisodeTitle(idEpisode: number | null | undefined): string {
  return idEpisode ? loadTitles()[String(idEpisode)] || '' : '';
}

/** `S53E17 · Evolution: On the Run`, or just `S53E17` while the title is unknown. */
export function formatEpisodeWithTitle(record: EpisodeRecord | null | undefined): string {
  const label = formatEpisodeLabel(record);
  const title = getEpisodeTitle(record?.idEpisode);
  return title ? `${label} · ${title}` : label;
}

/** Caches the titles a show play page already has in `show_storage`. Returns whether any were new. */
export function captureCurrentPageEpisodeTitles(): boolean {
  const showStorage = readWindowRecord('show_storage');
  const seasons = readProp(showStorage, 'seasons');
  if (!Array.isArray(seasons) || !seasons.length) {
    return false;
  }

  const signature = `${String(readProp(showStorage, 'id_show'))}:${seasons.length}`;
  if (signature === lastCapturedSignature) {
    return false;
  }

  lastCapturedSignature = signature;
  const found: Record<string, string> = {};
  seasons.forEach((season) => {
    const id = readProp(season, 'id_episode');
    const title = cleanTitle(readProp(season, 'title'));
    if ((typeof id === 'number' || typeof id === 'string') && String(id) && title) {
      found[String(id)] = title;
    }
  });

  return rememberEpisodeTitles(found);
}

/**
 * Makes sure titles for `episodes` of the show are cached, fetching its play page at most once per
 * page load. Resolves to whether new titles were cached.
 */
export function ensureShowEpisodeTitles(
  slug: string,
  episodes: (EpisodeRecord | null | undefined)[]
): Promise<boolean> {
  const missing = episodes.some((episode) => episode && !getEpisodeTitle(episode.idEpisode));
  if (!slug || !missing) {
    return Promise.resolve(false);
  }

  let pending = showFetches.get(slug);
  if (!pending) {
    pending = fetchQueue
      .then(() => fetchText(`/shows/play/${encodeURIComponent(slug)}`))
      .then((html) => rememberEpisodeTitles(parseEpisodeTitles(html)))
      .catch((error: unknown) => {
        console.warn(`[${SCRIPT_ID}] Could not load episode titles for ${slug}.`, error);
        return false;
      });
    showFetches.set(slug, pending);
    fetchQueue = pending;
  }

  return pending;
}
