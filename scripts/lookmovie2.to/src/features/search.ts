/* eslint-disable */
// @ts-nocheck
import { SEARCH_RESULT_LIMIT } from '../config/constants';
import { fetchJson, normalizeImageUrl } from '../core/utils';

// type is 'shows' or 'movies', matching the site's /api/v1/{type}/do-search endpoints.
export async function searchSiteTitles(type, query) {
  const trimmed = String(query || '').trim();
  if (trimmed.length < 2) {
    return [];
  }

  const payload = await fetchJson(`/api/v1/${type}/do-search/?q=${encodeURIComponent(trimmed)}`);
  const results = payload && Array.isArray(payload.result) ? payload.result : [];

  return results
    .filter((result) => result && typeof result.slug === 'string' && result.slug)
    .slice(0, SEARCH_RESULT_LIMIT)
    .map((result) => ({
      slug: result.slug,
      idShow: result.id_show || 0,
      idMovie: result.id_movie || 0,
      title: typeof result.title === 'string' ? result.title : result.slug,
      year: result.year ? String(result.year) : '',
      rating: result.imdb_rating ? String(result.imdb_rating) : '',
      poster: normalizeImageUrl(
        (result.poster && (result.poster.w200 || result.poster.w100)) || ''
      ),
    }));
}
