import { SCRIPT_ID } from '../config/constants';

// A plain-text readout in the player's corner (toggled with D) for diagnosing lag: whether frames
// are being dropped, whether the stream changed resolution, whether it is buffering, and whether
// the page's main thread is janky. It updates once a second and draws nothing costly over the
// video, so turning it on doesn't change what it measures.

const STATS_CLASS = `${SCRIPT_ID}-stats`;
const UPDATE_MS = 1000;

interface Sample {
  at: number;
  total: number;
  dropped: number;
}

let panel: HTMLPreElement | null = null;
let timer = 0;
let rafId = 0;
let lastSample: Sample | null = null;
let worstFrameGap = 0;
let lastFrameAt = 0;

function getVideo(): HTMLVideoElement | null {
  return document.querySelector<HTMLVideoElement>('#video_player video');
}

function getBufferedAhead(video: HTMLVideoElement): number {
  const { buffered, currentTime } = video;
  for (let index = 0; index < buffered.length; index += 1) {
    if (buffered.start(index) <= currentTime + 0.25 && currentTime <= buffered.end(index)) {
      return buffered.end(index) - currentTime;
    }
  }

  return 0;
}

function getFullscreenMode(): string {
  if (document.fullscreenElement) {
    return 'native';
  }

  return document.getElementById(`${SCRIPT_ID}-fullscreen-style`) ? 'windowed' : 'off';
}

// The longest gap between animation frames shows main-thread stalls, separate from video decoding.
function trackFrames(now: number): void {
  if (lastFrameAt) {
    worstFrameGap = Math.max(worstFrameGap, now - lastFrameAt);
  }

  lastFrameAt = now;
  rafId = window.requestAnimationFrame(trackFrames);
}

function render(): void {
  const video = getVideo();
  if (!panel || !video) {
    return;
  }

  if (panel.parentElement !== video.closest('#video_player')) {
    video.closest('#video_player')?.appendChild(panel);
  }

  const quality = video.getVideoPlaybackQuality();
  const now = performance.now();
  const sample: Sample = {
    at: now,
    total: quality.totalVideoFrames,
    dropped: quality.droppedVideoFrames,
  };
  const previous = lastSample;
  lastSample = sample;

  const seconds = previous ? (now - previous.at) / 1000 : 0;
  const frames = previous ? sample.total - previous.total : 0;
  const dropped = previous ? sample.dropped - previous.dropped : 0;
  const fps = seconds ? frames / seconds : 0;
  const droppedPercent = frames ? (100 * dropped) / frames : 0;
  const totalPercent = sample.total ? (100 * sample.dropped) / sample.total : 0;
  const rect = video.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;

  panel.textContent = [
    `stream    ${video.videoWidth}x${video.videoHeight}`,
    `drawn at  ${Math.round(rect.width * ratio)}x${Math.round(rect.height * ratio)} (dpr ${ratio})`,
    `fps       ${fps.toFixed(1)}  rate ${video.playbackRate}x`,
    `dropped   ${dropped}/s (${droppedPercent.toFixed(0)}%)  total ${sample.dropped} (${totalPercent.toFixed(1)}%)`,
    `buffer    ${getBufferedAhead(video).toFixed(1)}s ahead  readyState ${video.readyState}`,
    `jank      worst frame gap ${Math.round(worstFrameGap)}ms`,
    `fullscr   ${getFullscreenMode()}  ${video.paused ? 'paused' : 'playing'}`,
  ].join('\n');
  worstFrameGap = 0;
}

export function togglePlaybackStats(): boolean {
  if (panel) {
    window.clearInterval(timer);
    window.cancelAnimationFrame(rafId);
    panel.remove();
    panel = null;
    lastSample = null;
    lastFrameAt = 0;
    return true;
  }

  if (!getVideo()) {
    return false;
  }

  panel = document.createElement('pre');
  panel.className = STATS_CLASS;
  panel.setAttribute('aria-hidden', 'true');
  render();
  timer = window.setInterval(render, UPDATE_MS);
  rafId = window.requestAnimationFrame(trackFrames);
  return true;
}
