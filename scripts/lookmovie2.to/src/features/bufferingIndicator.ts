import { SCRIPT_ID } from '../config/constants';

// A spinner in the middle of the player whenever playback is waiting instead of moving, so a
// buffering or stalled stream can be told apart from frame lag (which keeps playing and never
// shows this).

const INDICATOR_CLASS = `${SCRIPT_ID}-buffering`;
// Hiccups shorter than this don't flash the spinner.
const SHOW_DELAY_MS = 200;
const CHECK_INTERVAL_MS = 500;
// Waiting with at least this much buffered ahead means the player is stuck, not the network.
const STALLED_BUFFER_SECONDS = 1;

interface BufferingVideo extends HTMLVideoElement {
  _lookmovieBufferingAttached?: boolean;
}

function getBufferedAheadSeconds(video: HTMLVideoElement): number {
  const { buffered, currentTime } = video;
  for (let index = 0; index < buffered.length; index += 1) {
    if (buffered.start(index) <= currentTime + 0.25 && currentTime <= buffered.end(index)) {
      return Math.max(0, buffered.end(index) - currentTime);
    }
  }

  return 0;
}

function buildIndicator(): HTMLDivElement {
  const element = document.createElement('div');
  element.className = INDICATOR_CLASS;
  element.setAttribute('role', 'status');
  element.setAttribute('aria-live', 'polite');

  const spinner = document.createElement('span');
  spinner.className = `${INDICATOR_CLASS}-spinner`;
  spinner.setAttribute('aria-hidden', 'true');

  const label = document.createElement('strong');
  label.textContent = 'Buffering';

  const detail = document.createElement('small');
  detail.className = `${INDICATOR_CLASS}-detail`;

  element.append(spinner, label, detail);
  return element;
}

export function attachBufferingIndicator(video: BufferingVideo): void {
  if (video._lookmovieBufferingAttached || !video.closest('#video_player')) {
    return;
  }

  video._lookmovieBufferingAttached = true;
  let waiting = false;
  let showTimer = 0;
  let indicator: HTMLDivElement | null = null;

  const isBuffering = (): boolean =>
    !video.paused &&
    !video.ended &&
    (waiting || video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA);

  const hide = (): void => {
    window.clearTimeout(showTimer);
    showTimer = 0;
    indicator?.remove();
    indicator = null;
  };

  // With data already buffered the wait isn't the network: the site's stream player is stuck
  // (typically a gap in its buffer), so that case is labelled differently.
  const updateDetail = (): void => {
    const label = indicator?.querySelector('strong');
    const detail = indicator?.querySelector(`.${INDICATOR_CLASS}-detail`);
    const ahead = getBufferedAheadSeconds(video);
    const stalled = ahead >= STALLED_BUFFER_SECONDS;
    if (label) {
      label.textContent = stalled ? 'Stalled' : 'Buffering';
    }
    if (detail) {
      detail.textContent = stalled
        ? `${ahead.toFixed(0)}s buffered, player stuck`
        : `${ahead.toFixed(1)}s buffered ahead`;
    }
    indicator?.setAttribute('data-kind', stalled ? 'stalled' : 'buffering');
  };

  const show = (): void => {
    // The site's player is the fullscreen element, so the indicator stays visible in fullscreen.
    const container = video.closest('#video_player');
    if (!container || !isBuffering()) {
      return;
    }

    if (!indicator?.isConnected) {
      indicator = buildIndicator();
      container.appendChild(indicator);
    }

    updateDetail();
  };

  const check = (): void => {
    if (!video.isConnected) {
      hide();
      window.clearInterval(checkTimer);
      return;
    }

    if (!isBuffering()) {
      hide();
      return;
    }

    if (indicator) {
      updateDetail();
    } else if (!showTimer) {
      showTimer = window.setTimeout(() => {
        showTimer = 0;
        show();
      }, SHOW_DELAY_MS);
    }
  };

  const onWaiting = (): void => {
    waiting = true;
    check();
  };
  const onResumed = (): void => {
    waiting = false;
    check();
  };

  video.addEventListener('waiting', onWaiting);
  video.addEventListener('stalled', check);
  ['playing', 'pause', 'ended', 'emptied', 'seeked'].forEach((type) => {
    video.addEventListener(type, onResumed);
  });
  ['canplay', 'progress', 'timeupdate'].forEach((type) => {
    video.addEventListener(type, check);
  });
  const checkTimer = window.setInterval(check, CHECK_INTERVAL_MS);
}
