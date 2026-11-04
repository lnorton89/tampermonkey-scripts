import {
  clickControlByLabel,
  createVideoControls,
  findActiveVideo,
  waitForBody,
} from '@userscripts/core';
import { state } from '../core/state';
import { parseEpisodeUrl, playNextEpisode } from './episodes';
import { publishPlayerNotification } from './remote';

export const videoControls = createVideoControls(() => findActiveVideo());

// Falls back to the site's play/pause control when no video element is visible.
export function toggleActiveVideoPlayback(): boolean {
  if (!findActiveVideo()) return clickControlByLabel(/\b(play|pause)\b/i);
  return videoControls.toggle();
}

export function toggleFullscreen(): boolean {
  // `fullscreenElement` is null when nothing is fullscreen.
  if (document.fullscreenElement) {
    void document.exitFullscreen();
    return true;
  }

  const target =
    findActiveVideo() ||
    document.querySelector('iframe') ||
    document.querySelector('[class*="player" i], [id*="player" i]');

  if (!target || typeof target.requestFullscreen !== 'function') {
    return false;
  }

  void target.requestFullscreen();
  return true;
}

export function getPlayerTitle(): string {
  const route = parseEpisodeUrl(location.href);
  const heading =
    document.querySelector('h1')?.textContent ||
    document.querySelector('[class*="title" i]')?.textContent ||
    document.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
    document.title ||
    'Cineby';

  const title = heading.replace(/\s+/g, ' ').trim() || 'Cineby';
  return route
    ? `${title} - S${String(route.season).padStart(2, '0')}E${String(route.episode).padStart(2, '0')}`
    : title;
}

export function getPosterUrl(): string {
  const video = findActiveVideo();
  const metaImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
  const image = document
    .querySelector('img[src*="image.tmdb"], img[src*="wsrv.nl"]')
    ?.getAttribute('src');

  try {
    return new URL(video?.getAttribute('poster') || metaImage || image || '', location.origin).href;
  } catch {
    return '';
  }
}

const attachedVideos = new WeakSet<HTMLVideoElement>();

function attachVideo(video: HTMLVideoElement): void {
  if (attachedVideos.has(video)) return;

  attachedVideos.add(video);
  video.addEventListener('play', () => publishPlayerNotification('play'));
  video.addEventListener('pause', () => publishPlayerNotification('pause'));
  video.addEventListener('ended', () => {
    publishPlayerNotification('ended');
    if (state.settings.autoNext) {
      window.setTimeout(playNextEpisode, 900);
    }
  });
}

export function scanVideos(): void {
  document.querySelectorAll('video').forEach(attachVideo);
}

export function watchVideos(): void {
  waitForBody((body) => {
    scanVideos();

    const observer = new MutationObserver(scanVideos);
    observer.observe(body, { childList: true, subtree: true });
  });
}
