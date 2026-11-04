import { SEARCH_RESULT_LIMIT } from '../config/constants';
import type { UnknownRecord } from '@userscripts/core';
import { fetchJson, normalizeImageUrl, readProp, toPositiveInteger, toText } from '../core/utils';

export type SearchType = 'shows' | 'movies';

export interface SearchResult {
  slug: string;
  idShow: number;
  idMovie: number;
  title: string;
  year: string;
  rating: string;
  poster: string;
}

// type matches the site's /api/v1/{type}/do-search endpoints.
export async function searchSiteTitles(type: SearchType, query: string): Promise<SearchResult[]> {
  const trimmed = String(query || '').trim();
  if (trimmed.length < 2) {
    return [];
  }

  const payload = await fetchJson(`/api/v1/${type}/do-search/?q=${encodeURIComponent(trimmed)}`);
  const rawResults = readProp(payload, 'result');
  const results: unknown[] = Array.isArray(rawResults) ? rawResults : [];

  return results
    .filter(
      (result): result is UnknownRecord & { slug: string } =>
        !!result && typeof readProp(result, 'slug') === 'string' && !!readProp(result, 'slug')
    )
    .slice(0, SEARCH_RESULT_LIMIT)
    .map((result) => ({
      slug: result.slug,
      // Ids end up in toPositiveInteger when stored, so converting here gives the same result.
      idShow: toPositiveInteger(result.id_show),
      idMovie: toPositiveInteger(result.id_movie),
      title: typeof result.title === 'string' ? result.title : result.slug,
      year: result.year ? toText(result.year) : '',
      rating: result.imdb_rating ? toText(result.imdb_rating) : '',
      poster: normalizeImageUrl(
        readProp(result.poster, 'w200') || readProp(result.poster, 'w100') || ''
      ),
    }));
}
