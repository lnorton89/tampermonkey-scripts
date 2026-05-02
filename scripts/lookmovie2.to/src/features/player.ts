/* eslint-disable */
// @ts-nocheck
import { FULLSCREEN_STYLE_ID, SCRIPT_ID } from '../config/constants';
import { appState } from '../core/state';
import { publishPlayerNotification } from './ntfyRemote';
import { maybeTrackWatchedEpisodeFromPlayer } from './watchlist';

export function getActiveVideo() {
  const playerContainer = document.getElementById('video_player');
  const playerVideos = playerContainer ? Array.from(playerContainer.querySelectorAll('video')) : [];
  const videos = [
    ...new Set([...playerVideos, ...Array.from(document.querySelectorAll('video'))]),
  ].filter((video) => {
    const rect = video.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  });

  return (
    videos.find((video) => !video.paused && !video.ended) ||
    videos.find((video) => video.readyState > 0) ||
    videos[0] ||
    null
  );
}

export function playActiveVideo() {
  const video = getActiveVideo();
  if (!video) {
    return false;
  }

  video.play();
  return true;
}

export function pauseActiveVideo() {
  const video = getActiveVideo();
  if (!video) {
    return false;
  }

  video.pause();
  return true;
}

export function toggleActiveVideoPlayback() {
  const video = getActiveVideo();
  if (!video) {
    return false;
  }

  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  return true;
}

export function seekActiveVideoBy(seconds) {
  const video = getActiveVideo();
  if (!video || !Number.isFinite(seconds)) {
    return false;
  }

  const duration = Number.isFinite(video.duration) ? video.duration : Number.MAX_SAFE_INTEGER;
  video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  return true;
}

export function setActiveVideoVolume(percent) {
  const video = getActiveVideo();
  if (!video || !Number.isFinite(percent)) {
    return false;
  }

  video.volume = Math.max(0, Math.min(1, percent / 100));
  video.muted = false;
  return true;
}

export function setActiveVideoMuted(muted) {
  const video = getActiveVideo();
  if (!video) {
    return false;
  }

  video.muted = !!muted;
  return true;
}

export function toggleActiveVideoFullscreen() {
  const playerContainer = document.getElementById('video_player');
  const fullscreenButton = playerContainer?.querySelector('.vjs-fullscreen-control');

  if (fullscreenButton) {
    fullscreenButton.click();
    return true;
  }

  return applyWindowedFullscreenFallback();
}

export function dismissResumeModalIfPresent() {
  if (!appState.settings.autoPlay) {
    return false;
  }

  const dismissButton = document.getElementById('progress-from-beginning-button');
  if (dismissButton) {
    console.log(`[${SCRIPT_ID}] Dismissing playback modal.`);
    dismissButton.click();
    return true;
  }

  return false;
}

export function applyWindowedFullscreenFallback() {
  if (!document.head) {
    return false;
  }

  if (!document.getElementById(FULLSCREEN_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = FULLSCREEN_STYLE_ID;
    style.textContent = `
            #video_player {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                z-index: 999999 !important;
                background: black !important;
            }

            body.${SCRIPT_ID}-fullscreen {
                overflow: hidden !important;
            }
        `;
    document.head.appendChild(style);
  }

  if (document.body) {
    document.body.classList.add(`${SCRIPT_ID}-fullscreen`);
  }

  return true;
}

export function removeWindowedFullscreenFallback() {
  const style = document.getElementById(FULLSCREEN_STYLE_ID);
  if (style) {
    style.remove();
  }

  if (document.body) {
    document.body.classList.remove(`${SCRIPT_ID}-fullscreen`);
  }
}

export function triggerVideoJsFullscreen() {
  if (!appState.settings.autoFullscreen || appState.fullscreenTriggered) {
    return false;
  }

  const playerContainer = document.getElementById('video_player');
  if (!playerContainer) {
    return false;
  }

  const fullscreenButton = playerContainer.querySelector('.vjs-fullscreen-control');
  if (fullscreenButton) {
    fullscreenButton.click();
  }

  console.log(`[${SCRIPT_ID}] Applying fullscreen behavior.`);
  applyWindowedFullscreenFallback();
  appState.fullscreenTriggered = true;
  return true;
}

export function handleVideoPlay() {
  maybeTrackWatchedEpisodeFromPlayer();
  publishPlayerNotification('play');

  if (!appState.settings.autoPlay && !appState.settings.autoFullscreen) {
    return;
  }

  window.setTimeout(() => {
    const dismissed = dismissResumeModalIfPresent();

    window.setTimeout(
      () => {
        triggerVideoJsFullscreen();
      },
      dismissed ? 500 : 200
    );
  }, 300);
}

export function handleVideoPause() {
  publishPlayerNotification('pause');
}

export function handleVideoEnded() {
  publishPlayerNotification('ended');
}

export function attachAutoplayLogic(videoElement) {
  if (!videoElement || videoElement._lookmovieEnhancerAttached) {
    return;
  }

  videoElement._lookmovieEnhancerAttached = true;
  videoElement.addEventListener('play', handleVideoPlay);
  videoElement.addEventListener('pause', handleVideoPause);
  videoElement.addEventListener('ended', handleVideoEnded);
}

export function findAndAttachToVideos() {
  document.querySelectorAll('video').forEach(attachAutoplayLogic);
}

export function watchVideos() {
  const waitForBody = window.setInterval(() => {
    if (!document.body) {
      return;
    }

    window.clearInterval(waitForBody);
    findAndAttachToVideos();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type !== 'childList') {
          return;
        }

        mutation.addedNodes.forEach((node) => {
          if (!node || node.nodeType !== Node.ELEMENT_NODE) {
            return;
          }

          if (node.tagName === 'VIDEO') {
            attachAutoplayLogic(node);
          }

          if (typeof node.querySelectorAll === 'function') {
            node.querySelectorAll('video').forEach(attachAutoplayLogic);
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }, 100);
}
