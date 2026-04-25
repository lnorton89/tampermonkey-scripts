/* eslint-disable */
// @ts-nocheck
import { toPositiveInteger } from '../core/utils';

export function normalizeEpisodeRecord(record) {
  if (!record || typeof record !== 'object') {
    return null;
  }

  const season = toPositiveInteger(record.season);
  const episode = toPositiveInteger(record.episode);
  const idEpisode = toPositiveInteger(record.idEpisode || record.id_episode);

  if (!season || !episode || !idEpisode) {
    return null;
  }

  return {
    season,
    episode,
    idEpisode,
    watchedAt: typeof record.watchedAt === 'number' ? record.watchedAt : undefined,
    updatedAt: typeof record.updatedAt === 'number' ? record.updatedAt : undefined,
  };
}

export function formatEpisodeLabel(record) {
  if (!record) {
    return 'Unknown episode';
  }

  return `S${String(record.season).padStart(2, '0')}E${String(record.episode).padStart(2, '0')}`;
}

export function compareEpisodes(left, right) {
  if (!left && !right) {
    return 0;
  }

  if (!left) {
    return -1;
  }

  if (!right) {
    return 1;
  }

  if (left.season !== right.season) {
    return left.season - right.season;
  }

  if (left.episode !== right.episode) {
    return left.episode - right.episode;
  }

  return left.idEpisode - right.idEpisode;
}

export function sameEpisode(left, right) {
  if (!left || !right) {
    return false;
  }

  return (
    left.idEpisode === right.idEpisode &&
    left.season === right.season &&
    left.episode === right.episode
  );
}

export function isLatestWatched(entry) {
  return !!entry && sameEpisode(entry.latestEpisode, entry.lastWatched);
}
