import { SCRIPT_ID, FULLSCREEN_STYLE_ID, log } from './utils';

// ---------------------------------------------------------------------------
// Module state
// ---------------------------------------------------------------------------

let autoPlayEnabled = false;
let autoFullscreenEnabled = false;
let fullscreenTriggered = false;
let onVideoPlay: (() => void) | null = null;

export function onVideoPlayCallback(cb: (() => void) | null): void {
  onVideoPlay = cb;
}

// ---------------------------------------------------------------------------
// Fullscreen helpers
// ---------------------------------------------------------------------------

function applyWindowedFullscreenFallback(): void {
  if (!document.head) return;

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
}

export function removeWindowedFullscreenFallback(): void {
  const style = document.getElementById(FULLSCREEN_STYLE_ID);
  if (style) style.remove();

  if (document.body) {
    document.body.classList.remove(`${SCRIPT_ID}-fullscreen`);
  }
}

function triggerVideoJsFullscreen(): boolean {
  if (!autoFullscreenEnabled || fullscreenTriggered) return false;

  const playerContainer = document.getElementById('video_player');
  if (!playerContainer) return false;

  const fullscreenButton = playerContainer.querySelector('.vjs-fullscreen-control');
  if (fullscreenButton) {
    (fullscreenButton as HTMLElement).click();
  }

  log.info('Applying fullscreen behavior.');
  applyWindowedFullscreenFallback();
  fullscreenTriggered = true;
  return true;
}

// ---------------------------------------------------------------------------
// Resume modal
// ---------------------------------------------------------------------------

function dismissResumeModalIfPresent(): boolean {
  if (!autoPlayEnabled) return false;

  const dismissButton = document.getElementById('progress-from-beginning-button');
  if (dismissButton) {
    log.info('Dismissing playback modal.');
    (dismissButton).click();
    return true;
  }

  return false;
}

// ---------------------------------------------------------------------------
// Video event handling
// ---------------------------------------------------------------------------

function handleVideoPlay(): void {
  onVideoPlay?.();

  if (!autoPlayEnabled && !autoFullscreenEnabled) return;

  window.setTimeout(() => {
    const dismissed = dismissResumeModalIfPresent();

    window.setTimeout(() => {
      triggerVideoJsFullscreen();
    }, dismissed ? 500 : 200);
  }, 300);
}

function attachAutoplayLogic(videoElement: HTMLVideoElement): void {
  if (!videoElement || videoElement._lookmovieEnhancerAttached) return;

  videoElement._lookmovieEnhancerAttached = true;
  videoElement.addEventListener('play', handleVideoPlay);
}

function findAndAttachToVideos(): void {
  document.querySelectorAll<HTMLVideoElement>('video').forEach(attachAutoplayLogic);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function setAutoPlay(enabled: boolean): void {
  autoPlayEnabled = enabled;
}

export function setAutoFullscreen(enabled: boolean): void {
  autoFullscreenEnabled = enabled;

  if (!enabled) {
    removeWindowedFullscreenFallback();
    fullscreenTriggered = false;
  }
}

export function resetFullscreenState(): void {
  fullscreenTriggered = false;
  removeWindowedFullscreenFallback();
}

export function watchVideos(): void {
  const waitForBody = window.setInterval(() => {
    if (!document.body) return;

    window.clearInterval(waitForBody);
    findAndAttachToVideos();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type !== 'childList') return;

        mutation.addedNodes.forEach((node) => {
          if (node?.nodeType !== Node.ELEMENT_NODE) return;

          if ((node as Element).tagName === 'VIDEO') {
            attachAutoplayLogic(node as HTMLVideoElement);
          }

          if (typeof (node as Element).querySelectorAll === 'function') {
            (node as Element).querySelectorAll<HTMLVideoElement>('video').forEach(attachAutoplayLogic);
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }, 100);
}

export function refreshVideoAttachments(): void {
  findAndAttachToVideos();
}
