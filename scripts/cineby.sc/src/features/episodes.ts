import { clickControlByLabel } from '@userscripts/core';

export interface EpisodeRoute {
  href: string;
  localePrefix: string[];
  id: number;
  season: number;
  episode: number;
}

export function parseEpisodeUrl(url: string | null): EpisodeRoute | null {
  try {
    // A null href resolves like the string "null", as it did before this was typed.
    const parsed = new URL(String(url), location.origin);
    const parts = parsed.pathname.split('/').filter(Boolean);
    const tvIndex = parts.findIndex((part) => part === 'tv');

    if (tvIndex < 0) return null;

    const id = Number(parts[tvIndex + 1]);
    const season = Number(parts[tvIndex + 2]);
    const episode = Number(parts[tvIndex + 3]);

    if (!id || !season || !episode) return null;

    return {
      href: parsed.href,
      localePrefix: parts.slice(0, tvIndex),
      id,
      season,
      episode,
    };
  } catch {
    return null;
  }
}

function buildEpisodeHref(current: EpisodeRoute, season: number, episode: number): string {
  const parts = [
    ...current.localePrefix,
    'tv',
    String(current.id),
    String(season),
    String(episode),
  ];
  const url = new URL(`/${parts.join('/')}`, location.origin);
  url.searchParams.set('play', 'true');
  return url.href;
}

function findNextEpisodeLink(current: EpisodeRoute): string {
  const next = Array.from(document.querySelectorAll('a[href*="/tv/"]'))
    .map((link) => parseEpisodeUrl(link.getAttribute('href')))
    .filter((episode): episode is EpisodeRoute => {
      if (episode?.id !== current.id) return false;
      if (episode.season > current.season) return true;
      return episode.season === current.season && episode.episode > current.episode;
    })
    .sort((left, right) => left.season - right.season || left.episode - right.episode)[0];

  return next?.href || '';
}

export function playNextEpisode(): boolean {
  const current = parseEpisodeUrl(location.href);
  if (!current) return false;

  if (
    clickControlByLabel(/\b(next|next episode|episode next)\b/i) ||
    clickControlByLabel(/\b(skip)\b/i)
  ) {
    return true;
  }

  location.href =
    findNextEpisodeLink(current) || buildEpisodeHref(current, current.season, current.episode + 1);
  return true;
}
