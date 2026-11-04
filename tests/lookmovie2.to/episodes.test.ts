import { describe, expect, it } from 'vitest';
import {
  compareEpisodes,
  formatEpisodeLabel,
  isLatestWatched,
  normalizeEpisodeRecord,
} from '../../scripts/lookmovie2.to/src/domain/episodes';

describe('normalizeEpisodeRecord', () => {
  it('accepts both camelCase and the API snake_case id', () => {
    expect(normalizeEpisodeRecord({ season: '2', episode: 3, id_episode: '99' })).toEqual({
      season: 2,
      episode: 3,
      idEpisode: 99,
      watchedAt: undefined,
      updatedAt: undefined,
    });
  });

  it('keeps timestamps only when they are numbers', () => {
    const record = normalizeEpisodeRecord({
      season: 1,
      episode: 1,
      idEpisode: 5,
      watchedAt: 123,
      updatedAt: 'later',
    });
    expect(record?.watchedAt).toBe(123);
    expect(record?.updatedAt).toBeUndefined();
  });

  it('rejects incomplete records', () => {
    expect(normalizeEpisodeRecord(null)).toBeNull();
    expect(normalizeEpisodeRecord({ season: 1, episode: 1 })).toBeNull();
    expect(normalizeEpisodeRecord({ season: 0, episode: 1, idEpisode: 1 })).toBeNull();
  });
});

describe('episode helpers', () => {
  const ep = (season: number, episode: number, idEpisode = season * 100 + episode) => ({
    season,
    episode,
    idEpisode,
  });

  it('formats labels', () => {
    expect(formatEpisodeLabel(ep(1, 9))).toBe('S01E09');
    expect(formatEpisodeLabel(null)).toBe('Unknown episode');
  });

  it('orders by season, then episode', () => {
    const sorted = [ep(2, 1), ep(1, 10), ep(1, 2)].sort(compareEpisodes);
    expect(sorted.map(formatEpisodeLabel)).toEqual(['S01E02', 'S01E10', 'S02E01']);
    expect(compareEpisodes(null, ep(1, 1))).toBeLessThan(0);
  });

  it('knows when the latest episode has been watched', () => {
    expect(isLatestWatched({ latestEpisode: ep(1, 2), lastWatched: ep(1, 2) })).toBe(true);
    expect(isLatestWatched({ latestEpisode: ep(1, 3), lastWatched: ep(1, 2) })).toBe(false);
    expect(isLatestWatched(null)).toBe(false);
  });
});
