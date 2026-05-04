/* eslint-disable */
// @ts-nocheck
import { FULLSCREEN_EXIT_BUTTON_ID, FULLSCREEN_STYLE_ID, SCRIPT_ID } from '../config/constants';
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
  const isWindowedFullscreen = !!document.getElementById(FULLSCREEN_STYLE_ID);
  const isNativeFullscreen = !!document.fullscreenElement;
  const isVideoJsFullscreen = !!playerContainer?.classList.contains('vjs-fullscreen');

  if (isWindowedFullscreen || isNativeFullscreen || isVideoJsFullscreen) {
    if (isWindowedFullscreen) {
      removeWindowedFullscreenFallback();
    }

    if (isNativeFullscreen && typeof document.exitFullscreen === 'function') {
      document.exitFullscreen();
    }

    if (isVideoJsFullscreen && fullscreenButton) {
      fullscreenButton.click();
    }

    appState.fullscreenTriggered = false;
    return true;
  }

  if (!playerContainer) {
    return false;
  }

  if (fullscreenButton) {
    fullscreenButton.click();
  }

  applyWindowedFullscreenFallback();
  appState.fullscreenTriggered = true;
  return true;
}

export function enterActiveVideoFullscreen() {
  if (document.getElementById(FULLSCREEN_STYLE_ID)) {
    return true;
  }

  const playerContainer = document.getElementById('video_player');
  if (!playerContainer) {
    return false;
  }

  const fullscreenButton = playerContainer.querySelector('.vjs-fullscreen-control');
  if (fullscreenButton) {
    fullscreenButton.click();
  }

  applyWindowedFullscreenFallback();
  appState.fullscreenTriggered = true;
  return true;
}

export function exitActiveVideoFullscreen() {
  const playerContainer = document.getElementById('video_player');
  const fullscreenButton = playerContainer?.querySelector('.vjs-fullscreen-control');
  const isVideoJsFullscreen = !!playerContainer?.classList.contains('vjs-fullscreen');
  let handled = false;

  if (document.getElementById(FULLSCREEN_STYLE_ID)) {
    removeWindowedFullscreenFallback();
    handled = true;
  }

  if (document.fullscreenElement && typeof document.exitFullscreen === 'function') {
    document.exitFullscreen();
    handled = true;
  }

  if (isVideoJsFullscreen && fullscreenButton) {
    fullscreenButton.click();
    handled = true;
  }

  if (handled) {
    appState.fullscreenTriggered = false;
  }

  return handled;
}

function isVisibleControl(element) {
  if (!element || typeof element.getBoundingClientRect !== 'function') {
    return false;
  }

  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function getControlText(element) {
  return `${element.textContent || ''} ${element.getAttribute('aria-label') || ''} ${
    element.getAttribute('title') || ''
  }`.trim();
}

function parseShowPlayEpisodeFromUrl(url) {
  try {
    const parsed = new URL(url, location.origin);
    if (!parsed.pathname.startsWith('/shows/play/')) {
      return null;
    }

    const match = parsed.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);
    if (!match) {
      return null;
    }

    return {
      href: parsed.href,
      season: Number(match[1]),
      episode: Number(match[2]),
      idEpisode: Number(match[3]),
    };
  } catch (_error) {
    return null;
  }
}

function clickVisibleNextEpisodeControl() {
  const selectors = [
    '.vjs-next-control',
    '.vjs-next-button',
    '.next-episode',
    '.episode-next',
    '[aria-label*="next" i]',
    '[title*="next" i]',
    'button',
    'a',
    '[role="button"]',
  ];

  const control = Array.from(document.querySelectorAll(selectors.join(', '))).find((element) => {
    if (!isVisibleControl(element)) {
      return false;
    }

    return (
      /\bnext\b/i.test(getControlText(element)) && !/\bpreview\b/i.test(getControlText(element))
    );
  });

  if (!control) {
    return false;
  }

  control.click();
  return true;
}

function navigateToNextEpisodeLink() {
  const currentEpisode = parseShowPlayEpisodeFromUrl(location.href);
  if (!currentEpisode) {
    return false;
  }

  const nextEpisode = Array.from(document.querySelectorAll('a[href*="/shows/play/"]'))
    .map((link) => parseShowPlayEpisodeFromUrl(link.getAttribute('href')))
    .filter((episode) => {
      if (!episode) {
        return false;
      }

      if (episode.season > currentEpisode.season) {
        return true;
      }

      return episode.season === currentEpisode.season && episode.episode > currentEpisode.episode;
    })
    .sort((left, right) => left.season - right.season || left.episode - right.episode)[0];

  if (!nextEpisode) {
    return false;
  }

  location.href = nextEpisode.href;
  return true;
}

export function playNextShowEpisode() {
  if (!location.pathname.startsWith('/shows/play/')) {
    return false;
  }

  return clickVisibleNextEpisodeControl() || navigateToNextEpisodeLink();
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

export function ensureWindowedFullscreenExitButton() {
  const playerContainer = document.getElementById('video_player');
  if (!playerContainer) {
    return false;
  }

  let button = document.getElementById(FULLSCREEN_EXIT_BUTTON_ID);
  if (!button) {
    button = document.createElement('button');
    button.id = FULLSCREEN_EXIT_BUTTON_ID;
    button.type = 'button';
    button.textContent = 'Exit';
    button.setAttribute('aria-label', 'Exit windowed fullscreen');
    button.title = 'Exit windowed fullscreen';
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      removeWindowedFullscreenFallback();
      appState.fullscreenTriggered = false;
    });
  }

  if (button.parentElement !== playerContainer) {
    playerContainer.appendChild(button);
  }

  if (!playerContainer._lookmovieFullscreenExitActivityAttached) {
    const revealExitButton = () => {
      window.clearTimeout(playerContainer._lookmovieFullscreenExitActivityTimer);
      playerContainer.classList.add(`${SCRIPT_ID}-fullscreen-exit-active`);
      playerContainer._lookmovieFullscreenExitActivityTimer = window.setTimeout(() => {
        playerContainer.classList.remove(`${SCRIPT_ID}-fullscreen-exit-active`);
      }, 1800);
    };

    playerContainer._lookmovieFullscreenExitActivityAttached = true;
    playerContainer.addEventListener('mouseenter', revealExitButton);
    playerContainer.addEventListener('mousemove', revealExitButton);
  }

  return true;
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

            #${FULLSCREEN_EXIT_BUTTON_ID} {
                position: absolute !important;
                top: 14px !important;
                right: 14px !important;
                z-index: 1000000 !important;
                min-width: 0 !important;
                border: 1px solid rgba(255, 255, 255, 0.34) !important;
                border-radius: 999px !important;
                padding: 8px 12px !important;
                background: rgba(15, 23, 42, 0.86) !important;
                color: #f8fafc !important;
                font: 700 12px/1 Arial, sans-serif !important;
                letter-spacing: 0 !important;
                cursor: pointer !important;
                opacity: 0 !important;
                pointer-events: none !important;
                transform: translateY(-4px) !important;
                transition: opacity 0.15s ease, transform 0.15s ease, border-color 0.15s ease !important;
            }

            #video_player.${SCRIPT_ID}-fullscreen-exit-active #${FULLSCREEN_EXIT_BUTTON_ID},
            #video_player:focus-within #${FULLSCREEN_EXIT_BUTTON_ID},
            #${FULLSCREEN_EXIT_BUTTON_ID}:hover,
            #${FULLSCREEN_EXIT_BUTTON_ID}:focus {
                opacity: 1 !important;
                pointer-events: auto !important;
                transform: translateY(0) !important;
            }

            #${FULLSCREEN_EXIT_BUTTON_ID}:hover,
            #${FULLSCREEN_EXIT_BUTTON_ID}:focus {
                border-color: rgba(125, 211, 252, 0.78) !important;
            }
        `;
    document.head.appendChild(style);
  }

  ensureWindowedFullscreenExitButton();

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

  const playerContainer = document.getElementById('video_player');
  if (playerContainer) {
    window.clearTimeout(playerContainer._lookmovieFullscreenExitActivityTimer);
    playerContainer.classList.remove(`${SCRIPT_ID}-fullscreen-exit-active`);
  }

  const exitButton = document.getElementById(FULLSCREEN_EXIT_BUTTON_ID);
  if (exitButton) {
    exitButton.remove();
  }

  if (document.body) {
    document.body.classList.remove(`${SCRIPT_ID}-fullscreen`);
  }
}

export function triggerVideoJsFullscreen() {
  if (!appState.settings.autoFullscreen || appState.fullscreenTriggered) {
    return false;
  }

  console.log(`[${SCRIPT_ID}] Applying fullscreen behavior.`);
  return enterActiveVideoFullscreen();
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
