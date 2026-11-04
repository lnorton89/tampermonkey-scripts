import {
  RESUME_FINISHED_PERCENT,
  RESUME_POINT_LIMIT,
  RESUME_STARTED_PERCENT,
  RESUME_SYNC_MS,
  SCRIPT_ID,
} from '../config/constants';
import {
  loadResumePoints,
  normalizeResumePoint,
  persistResumePoints,
  type ResumePoint,
  type ResumePoints,
} from '../core/storage';

// The site keeps "Continue Watching" positions for logged-out viewers in its own localStorage
// ({ progress, duration } in ms), which Chrome can wipe. These are mirrored into Tampermonkey
// storage and written back when missing.
const SITE_RESUME_KEY_PATTERN = /^(?:ep_\d+|lookmovie\.mv_\d+)$/;

let resumePoints: ResumePoints | null = null;

export function episodeResumeKey(idEpisode: number): string {
  return `ep_${idEpisode}`;
}

export function movieResumeKey(idMovie: number): string {
  return `lookmovie.mv_${idMovie}`;
}

function getResumePoints(): ResumePoints {
  if (!resumePoints) {
    resumePoints = loadResumePoints();
  }

  return resumePoints;
}

function readSiteResumePoint(key: string): ResumePoint | null {
  try {
    return normalizeResumePoint(JSON.parse(localStorage.getItem(key) || 'null'));
  } catch {
    return null;
  }
}

function pruneResumePoints(points: ResumePoints): boolean {
  const keys = Object.keys(points);
  if (keys.length <= RESUME_POINT_LIMIT) {
    return false;
  }

  keys
    // Keys come from the object itself, so every lookup hits.
    .sort((left, right) => (points[right]?.savedAt ?? 0) - (points[left]?.savedAt ?? 0))
    .slice(RESUME_POINT_LIMIT)
    .forEach((key) => {
      delete points[key];
    });
  return true;
}

export function syncResumePoints(): void {
  const points = getResumePoints();
  let changed = false;

  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key === null || !SITE_RESUME_KEY_PATTERN.test(key)) {
        continue;
      }

      const sitePoint = readSiteResumePoint(key);
      const saved = points[key];
      if (
        sitePoint &&
        (saved?.progress !== sitePoint.progress || saved.duration !== sitePoint.duration)
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

export function startResumePointSync(): void {
  syncResumePoints();
  window.setInterval(syncResumePoints, RESUME_SYNC_MS);
  window.addEventListener('pagehide', syncResumePoints);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      syncResumePoints();
    }
  });
}

export function getResumePoint(key: string): ResumePoint | null {
  return readSiteResumePoint(key) || getResumePoints()[key] || null;
}

// A position worth continuing from: started, but not finished.
export function getPartialResumePoint(key: string): ResumePoint | null {
  const point = getResumePoint(key);
  if (!point) {
    return null;
  }

  const percent = (point.progress / point.duration) * 100;
  return percent >= RESUME_STARTED_PERCENT && percent < RESUME_FINISHED_PERCENT ? point : null;
}

export function formatTimeLeft(point: ResumePoint): string {
  const minutes = Math.max(1, Math.round((point.duration - point.progress) / 60000));
  if (minutes < 60) {
    return `${minutes}m left`;
  }

  return `${Math.floor(minutes / 60)}h ${minutes % 60}m left`;
}
