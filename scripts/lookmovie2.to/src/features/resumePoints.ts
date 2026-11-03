/* eslint-disable */
// @ts-nocheck
import {
  RESUME_FINISHED_PERCENT,
  RESUME_POINT_LIMIT,
  RESUME_STARTED_PERCENT,
  RESUME_SYNC_MS,
  SCRIPT_ID,
} from '../config/constants';
import { loadResumePoints, normalizeResumePoint, persistResumePoints } from '../core/storage';

// The site keeps "Continue Watching" positions for logged-out viewers in its own localStorage
// ({ progress, duration } in ms), which Chrome can wipe. These are mirrored into Tampermonkey
// storage and written back when missing.
const SITE_RESUME_KEY_PATTERN = /^(?:ep_\d+|lookmovie\.mv_\d+)$/;

let resumePoints = null;

export function episodeResumeKey(idEpisode) {
  return `ep_${idEpisode}`;
}

export function movieResumeKey(idMovie) {
  return `lookmovie.mv_${idMovie}`;
}

function getResumePoints() {
  if (!resumePoints) {
    resumePoints = loadResumePoints();
  }

  return resumePoints;
}

function readSiteResumePoint(key) {
  try {
    return normalizeResumePoint(JSON.parse(localStorage.getItem(key) || 'null'));
  } catch (_error) {
    return null;
  }
}

function pruneResumePoints(points) {
  const keys = Object.keys(points);
  if (keys.length <= RESUME_POINT_LIMIT) {
    return false;
  }

  keys
    .sort((left, right) => points[right].savedAt - points[left].savedAt)
    .slice(RESUME_POINT_LIMIT)
    .forEach((key) => delete points[key]);
  return true;
}

export function syncResumePoints() {
  const points = getResumePoints();
  let changed = false;

  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!SITE_RESUME_KEY_PATTERN.test(key)) {
        continue;
      }

      const sitePoint = readSiteResumePoint(key);
      const saved = points[key];
      if (
        sitePoint &&
        (!saved || saved.progress !== sitePoint.progress || saved.duration !== sitePoint.duration)
      ) {
        points[key] = { ...sitePoint, savedAt: Date.now() };
        changed = true;
      }
    }

    Object.entries(points).forEach(([key, point]) => {
      if (localStorage.getItem(key) === null) {
        localStorage.setItem(
          key,
          JSON.stringify({ duration: point.duration, progress: point.progress })
        );
      }
    });
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to sync resume points.`, error);
  }

  if (pruneResumePoints(points) || changed) {
    persistResumePoints(points);
  }
}

export function startResumePointSync() {
  syncResumePoints();
  window.setInterval(syncResumePoints, RESUME_SYNC_MS);
  window.addEventListener('pagehide', syncResumePoints);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      syncResumePoints();
    }
  });
}

export function getResumePoint(key) {
  return readSiteResumePoint(key) || getResumePoints()[key] || null;
}

// A position worth continuing from: started, but not finished.
export function getPartialResumePoint(key) {
  const point = getResumePoint(key);
  if (!point) {
    return null;
  }

  const percent = (point.progress / point.duration) * 100;
  return percent >= RESUME_STARTED_PERCENT && percent < RESUME_FINISHED_PERCENT ? point : null;
}

export function formatTimeLeft(point) {
  const minutes = Math.max(1, Math.round((point.duration - point.progress) / 60000));
  if (minutes < 60) {
    return `${minutes}m left`;
  }

  return `${Math.floor(minutes / 60)}h ${minutes % 60}m left`;
}
