import {
  FULLSCREEN_EXIT_BUTTON_ID,
  FULLSCREEN_STYLE_ID,
  RESUME_FINISHED_PERCENT,
  SCRIPT_ID,
} from '../config/constants';
import { createVideoControls, findActiveVideo, waitForBody } from '@userscripts/core';
import { appState } from '../core/state';
import type { EpisodeRecord } from '../domain/episodes';
import { cancelAutoNextCountdown, startAutoNextCountdown } from './autoNext';
import { handleIntroTimeUpdate, showPlayerToast } from './introSkip';
import { publishPlayerNotification } from './ntfyRemote';
import { applyPlaybackRate, ensurePlayerMenu } from './playerMenu';
import { completeCurrentPlaylistEntryAndAdvance } from './playlist';
import { findNextShowEpisode, maybeTrackWatchedEpisodeFromPlayer } from './watchlist';

interface PlayerContainer extends HTMLElement {
  _lookmovieFullscreenExitActivityAttached?: boolean;
  _lookmovieFullscreenExitActivityTimer?: number;
}

interface TrackedVideo extends HTMLVideoElement {
  _lookmovieEnhancerAttached?: boolean;
}

function getPlayerContainer(): PlayerContainer | null {
  return document.getElementById('video_player');
}

// Videos inside the site's player come first.
export function getActiveVideo(): HTMLVideoElement | null {
  return findActiveVideo(document.getElementById('video_player'));
}

const videoControls = createVideoControls(getActiveVideo);

export function playActiveVideo(): boolean {
  return videoControls.play();
}

export function pauseActiveVideo(): boolean {
  return videoControls.pause();
}

export function toggleActiveVideoPlayback(): boolean {
  return videoControls.toggle();
}

export function seekActiveVideoBy(seconds: number): boolean {
  return videoControls.seekBy(seconds);
}

export function setActiveVideoVolume(percent: number): boolean {
  return videoControls.setVolume(percent);
}

export function setActiveVideoMuted(muted: boolean): boolean {
  return videoControls.setMuted(muted);
}

export function toggleActiveVideoFullscreen(): boolean {
  const playerContainer = document.getElementById('video_player');
  const fullscreenButton = playerContainer?.querySelector<HTMLElement>('.vjs-fullscreen-control');
  const isWindowedFullscreen = !!document.getElementById(FULLSCREEN_STYLE_ID);
  const isNativeFullscreen = !!document.fullscreenElement;
  const isVideoJsFullscreen = !!playerContainer?.classList.contains('vjs-fullscreen');

  if (isWindowedFullscreen || isNativeFullscreen || isVideoJsFullscreen) {
    if (isWindowedFullscreen) {
      removeWindowedFullscreenFallback();
    }

    if (isNativeFullscreen && typeof document.exitFullscreen === 'function') {
      void document.exitFullscreen();
    }

    if (isVideoJsFullscreen && fullscreenButton) {
      fullscreenButton.click();
    }

    appState.fullscreenTriggered = false;
    return true;
  }

  return enterActiveVideoFullscreen();
}

// Clicks the player's own fullscreen button. Browsers only honour that right after a user
// gesture, so the windowed fallback (player stretched over the page) covers the other cases
// unless the user turned it off.
export function enterActiveVideoFullscreen(): boolean {
  const playerContainer = document.getElementById('video_player');
  if (
    document.getElementById(FULLSCREEN_STYLE_ID) ||
    document.fullscreenElement ||
    playerContainer?.classList.contains('vjs-fullscreen')
  ) {
    return true;
  }

  if (!playerContainer) {
    return false;
  }

  const fullscreenButton = playerContainer.querySelector<HTMLElement>('.vjs-fullscreen-control');
  if (fullscreenButton) {
    fullscreenButton.click();
  }

  if (appState.settings.windowedFullscreen) {
    applyWindowedFullscreenFallback();
  } else if (!fullscreenButton) {
    return false;
  }

  appState.fullscreenTriggered = true;
  return true;
}

export function exitActiveVideoFullscreen(): boolean {
  const playerContainer = document.getElementById('video_player');
  const fullscreenButton = playerContainer?.querySelector<HTMLElement>('.vjs-fullscreen-control');
  const isVideoJsFullscreen = !!playerContainer?.classList.contains('vjs-fullscreen');
  let handled = false;

  if (document.getElementById(FULLSCREEN_STYLE_ID)) {
    removeWindowedFullscreenFallback();
    handled = true;
  }

  if (document.fullscreenElement && typeof document.exitFullscreen === 'function') {
    void document.exitFullscreen();
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

// Switches episodes the way the site's own episode picker does: rewrite the hash, then fire the
// event its player listens for. The site's "switch-next-episode" event isn't used because it
// relies on an index that is stale when the page was opened on an episode URL.
export function switchToShowEpisode(episode: EpisodeRecord): void {
  history.replaceState(null, '', `#S${episode.season}-E${episode.episode}-${episode.idEpisode}`);
  window.dispatchEvent(new Event('ChangedEpisodeHash'));
}

export function playNextShowEpisode(nextEpisode?: EpisodeRecord | null): boolean {
  if (!location.pathname.startsWith('/shows/play/')) {
    return false;
  }

  if (nextEpisode) {
    switchToShowEpisode(nextEpisode);
    return true;
  }

  findNextShowEpisode()
    .then((episode) => {
      if (episode) {
        switchToShowEpisode(episode);
      } else {
        showPlayerToast('This is the last episode.');
      }
    })
    .catch((error: unknown) => {
      console.warn(`[${SCRIPT_ID}] Could not find the next episode.`, error);
    });
  return true;
}

export function dismissResumeModalIfPresent(): boolean {
  if (!appState.settings.autoPlay) {
    return false;
  }

  // The site's resume dialog: continue where playback stopped unless it was already finished.
  const continueButton = document.getElementById('progress-continue-button');
  const restartButton = document.getElementById('progress-from-beginning-button');
  // A missing bar parses as NaN, like `parseFloat(undefined)` did.
  const progressPercent = Number.parseFloat(
    document.getElementById('progress-bar')?.style.width ?? ''
  );
  const dismissButton =
    Number.isFinite(progressPercent) && progressPercent >= RESUME_FINISHED_PERCENT
      ? restartButton || continueButton
      : continueButton || restartButton;
  if (dismissButton) {
    console.info(`[${SCRIPT_ID}] Dismissing playback modal (${dismissButton.id}).`);
    dismissButton.click();
    return true;
  }

  return false;
}

export function ensureWindowedFullscreenExitButton(): boolean {
  const playerContainer = getPlayerContainer();
  if (!playerContainer) {
    return false;
  }

  let button = document.getElementById(FULLSCREEN_EXIT_BUTTON_ID) as HTMLButtonElement | null;
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
    const revealExitButton = (): void => {
      window.clearTimeout(playerContainer._lookmovieFullscreenExitActivityTimer);
      playerContainer.classList.add(`${SCRIPT_ID}-fullscreen-exit-active`);
      playerContainer._lookmovieFullscreenExitActivityTimer = window.setTimeout(() => {
        playerContainer.classList.remove(`${SCRIPT_ID}-fullscreen-exit-active`);
      }, 1600);
    };

    playerContainer._lookmovieFullscreenExitActivityAttached = true;
    playerContainer.addEventListener('pointermove', revealExitButton);
  }

  return true;
}

export function applyWindowedFullscreenFallback(): boolean {
  // `document.head` is typed non-null but is null before the parser reaches it.
  if (!(document.head as HTMLHeadElement | null)) {
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
                cursor: none !important;
            }

            #video_player.${SCRIPT_ID}-fullscreen-exit-active {
                cursor: auto !important;
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
            #${FULLSCREEN_EXIT_BUTTON_ID}:hover,
            #${FULLSCREEN_EXIT_BUTTON_ID}:focus-visible {
                opacity: 1 !important;
                pointer-events: auto !important;
                transform: translateY(0) !important;
            }

            #${FULLSCREEN_EXIT_BUTTON_ID}:hover,
            #${FULLSCREEN_EXIT_BUTTON_ID}:focus-visible {
                border-color: rgba(125, 211, 252, 0.78) !important;
            }
        `;
    document.head.appendChild(style);
  }

  ensureWindowedFullscreenExitButton();

  if (document.body as HTMLElement | null) {
    document.body.classList.add(`${SCRIPT_ID}-fullscreen`);
  }

  return true;
}

export function removeWindowedFullscreenFallback(): void {
  const style = document.getElementById(FULLSCREEN_STYLE_ID);
  if (style) {
    style.remove();
  }

  const playerContainer = getPlayerContainer();
  if (playerContainer) {
    window.clearTimeout(playerContainer._lookmovieFullscreenExitActivityTimer);
    playerContainer.classList.remove(`${SCRIPT_ID}-fullscreen-exit-active`);
  }

  const exitButton = document.getElementById(FULLSCREEN_EXIT_BUTTON_ID);
  if (exitButton) {
    exitButton.remove();
  }

  if (document.body as HTMLElement | null) {
    document.body.classList.remove(`${SCRIPT_ID}-fullscreen`);
  }
}

export function triggerVideoJsFullscreen(): boolean {
  if (!appState.settings.autoFullscreen || appState.fullscreenTriggered) {
    return false;
  }

  console.info(`[${SCRIPT_ID}] Applying fullscreen behavior.`);
  return enterActiveVideoFullscreen();
}

export function handleVideoPlay(): void {
  cancelAutoNextCountdown();
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

export function handleVideoPause(): void {
  publishPlayerNotification('pause');
}

export function handleVideoEnded(): void {
  publishPlayerNotification('ended');
  window.setTimeout(() => {
    if (!completeCurrentPlaylistEntryAndAdvance()) {
      void startAutoNextCountdown();
    }
  }, 750);
}

export function attachAutoplayLogic(videoElement: TrackedVideo | null): void {
  if (!videoElement || videoElement._lookmovieEnhancerAttached) {
    return;
  }

  videoElement._lookmovieEnhancerAttached = true;
  videoElement.addEventListener('play', handleVideoPlay);
  videoElement.addEventListener('loadedmetadata', () => {
    if (videoElement.closest('#video_player')) {
      ensurePlayerMenu();
      applyPlaybackRate(videoElement);
    }
  });
  // The site's player resets the rate when it loads a source, so it is reapplied on play.
  videoElement.addEventListener('play', () => {
    if (videoElement.closest('#video_player')) {
      applyPlaybackRate(videoElement);
    }
  });
  videoElement.addEventListener('pause', handleVideoPause);
  videoElement.addEventListener('ended', handleVideoEnded);
  videoElement.addEventListener('timeupdate', () => {
    if (videoElement.closest('#video_player')) {
      ensurePlayerMenu();
      handleIntroTimeUpdate(videoElement);
    }
  });
}

export function findAndAttachToVideos(): void {
  document.querySelectorAll('video').forEach((video) => {
    attachAutoplayLogic(video);
  });
}

export function watchVideos(): void {
  waitForBody((body) => {
    findAndAttachToVideos();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type !== 'childList') {
          return;
        }

        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) {
            return;
          }

          const element = node as Element;
          if (element.tagName === 'VIDEO') {
            attachAutoplayLogic(element as HTMLVideoElement);
          }

          if (typeof element.querySelectorAll === 'function') {
            element.querySelectorAll('video').forEach((video) => {
              attachAutoplayLogic(video);
            });
          }
        });
      });
    });

    observer.observe(body, { childList: true, subtree: true });
  });
}
