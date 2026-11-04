import { SCRIPT_ID } from '../config/constants';
import { saveSettings } from '../core/settings';
import { connectSiteStores, getSiteStores, type AudioTrack } from '../core/siteStores';
import { appState } from '../core/state';
import { normalizeAudioOffset } from '../core/storage';

export const AUDIO_OFFSET_EVENT = `${SCRIPT_ID}:audio-offset`;
const RESUME_KEY = `${SCRIPT_ID}:audio-offset-resume`;
const RESUME_MAX_AGE_MS = 120_000;

interface ResumePosition {
  href: string;
  savedAt: number;
  time: number;
  paused: boolean;
  playbackRate: number;
  volume: number;
  muted: boolean;
}

export type AudioOffsetSupport = 'waiting' | 'supported' | 'unsupported' | 'reopen';

// Each buffer retains its original offset. Live changes recreate the stream at the same
// position; changing timestamps on an already-buffered stream creates overlaps/gaps.
let appliedOffsetMs = appState.settings.audioOffsetMs;
const mediaSources = new Map<string, MediaSource>();
const audioBuffers = new WeakSet<SourceBuffer>();
const bufferOffsets = new WeakMap<SourceBuffer, number>();
let installed = false;
let available = false;
let applying = false;

export function isAudioOffsetApplying(): boolean {
  return applying;
}

export function canApplyAudioOffsetLive(): boolean {
  const state = getSiteStores()?.player.getState();
  return (
    ['supported', 'reopen'].includes(getAudioOffsetSupport()) &&
    !!state?.source &&
    state.display?.getType() === 'web' &&
    typeof state.display.load === 'function' &&
    typeof state.redisplaySource === 'function'
  );
}

export function getAppliedAudioOffset(): number {
  return appliedOffsetMs;
}

export function getAudioOffsetSupport(): AudioOffsetSupport {
  const video = document.querySelector('video');
  const src = video?.currentSrc || video?.src;
  if (!video || !src) return 'waiting';
  if (!available || !src.startsWith('blob:')) return 'unsupported';
  const source = mediaSources.get(src);
  // The async loader can arrive after the player creates its MediaSource. Never pretend that
  // already-buffered audio was shifted; opening a new stream after installation fixes that.
  if (!source) return 'reopen';
  const buffers = Array.from(source.sourceBuffers);
  if (!buffers.length) return 'waiting';
  return buffers.some((buffer) => audioBuffers.has(buffer) && buffer.mode === 'segments')
    ? 'supported'
    : 'unsupported';
}

function notifySupport(): void {
  window.dispatchEvent(new Event(AUDIO_OFFSET_EVENT));
}

/** Shift only separate audio SourceBuffers. Muxed buffers would shift the picture as well. */
export function installAudioOffset(): void {
  if (installed) return;
  installed = true;
  const pageWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
  if (!pageWindow.MediaSource || !pageWindow.SourceBuffer) return;
  const prototype = pageWindow.SourceBuffer.prototype;
  const timestampOffset = Object.getOwnPropertyDescriptor(prototype, 'timestampOffset');
  // eslint-disable-next-line @typescript-eslint/unbound-method -- native accessors called with the SourceBuffer receiver
  const getOffset = timestampOffset?.get as ((this: SourceBuffer) => number) | undefined;
  // eslint-disable-next-line @typescript-eslint/unbound-method -- native accessors called with the SourceBuffer receiver
  const setOffset = timestampOffset?.set as
    | ((this: SourceBuffer, value: number) => void)
    | undefined;
  if (!timestampOffset?.configurable || !getOffset || !setOffset) return;

  // HLS uses timestampOffset for discontinuities and reads it back. Expose its original
  // timeline to HLS, while the browser receives that timeline plus our signed audio offset.
  Object.defineProperty(prototype, 'timestampOffset', {
    ...timestampOffset,
    get(this: SourceBuffer): number {
      return getOffset.call(this) - (bufferOffsets.get(this) ?? 0) / 1000;
    },
    set(this: SourceBuffer, value: number): void {
      setOffset.call(this, value + (bufferOffsets.get(this) ?? 0) / 1000);
    },
  });

  // eslint-disable-next-line @typescript-eslint/unbound-method -- forwarding with the native receiver
  const appendBuffer = prototype.appendBuffer;
  prototype.appendBuffer = function (this: SourceBuffer, data: BufferSource): void {
    if (
      audioBuffers.has(this) &&
      this.mode === 'segments' &&
      !bufferOffsets.has(this) &&
      !this.updating
    ) {
      if (appliedOffsetMs !== 0)
        setOffset.call(this, getOffset.call(this) + appliedOffsetMs / 1000);
      bufferOffsets.set(this, appliedOffsetMs);
    }
    appendBuffer.call(this, data);
  };

  // eslint-disable-next-line @typescript-eslint/unbound-method -- forwarding with the native receiver
  const addSourceBuffer = pageWindow.MediaSource.prototype.addSourceBuffer;
  pageWindow.MediaSource.prototype.addSourceBuffer = function (
    this: MediaSource,
    type: string
  ): SourceBuffer {
    const buffer = addSourceBuffer.call(this, type);
    if (/^audio\//i.test(type.trim())) audioBuffers.add(buffer);
    notifySupport();
    return buffer;
  };

  const createObjectURL = pageWindow.URL.createObjectURL.bind(pageWindow.URL);
  pageWindow.URL.createObjectURL = (object: Blob | MediaSource): string => {
    const url = createObjectURL(object);
    if (object instanceof pageWindow.MediaSource) {
      mediaSources.set(url, object);
      object.addEventListener('sourceclose', () => mediaSources.delete(url), { once: true });
    }
    return url;
  };
  // HLS revokes the object URL after attaching it. Keep its association until sourceclose.
  available = true;
}

function readResumePosition(): ResumePosition | null {
  try {
    const raw: unknown = JSON.parse(sessionStorage.getItem(RESUME_KEY) || 'null');
    sessionStorage.removeItem(RESUME_KEY);
    if (!raw || typeof raw !== 'object') return null;
    const value = raw as Partial<ResumePosition>;
    if (
      value.href !== location.href ||
      typeof value.savedAt !== 'number' ||
      !Number.isFinite(value.savedAt) ||
      Date.now() - value.savedAt < 0 ||
      Date.now() - value.savedAt > RESUME_MAX_AGE_MS ||
      typeof value.time !== 'number' ||
      !Number.isFinite(value.time) ||
      value.time < 0 ||
      typeof value.paused !== 'boolean' ||
      typeof value.playbackRate !== 'number' ||
      !Number.isFinite(value.playbackRate) ||
      value.playbackRate <= 0 ||
      value.playbackRate > 16 ||
      typeof value.volume !== 'number' ||
      !Number.isFinite(value.volume) ||
      value.volume < 0 ||
      value.volume > 1 ||
      typeof value.muted !== 'boolean'
    )
      return null;
    return value as ResumePosition;
  } catch {
    return null;
  }
}

export function reloadWithAudioOffset(offsetMs: number): boolean {
  const video = document.querySelector('video');
  if (!video || getAudioOffsetSupport() !== 'supported') return false;
  const resume: ResumePosition = {
    href: location.href,
    savedAt: Date.now(),
    time: video.currentTime,
    paused: video.paused,
    playbackRate: video.playbackRate,
    volume: video.volume,
    muted: video.muted,
  };
  try {
    sessionStorage.setItem(RESUME_KEY, JSON.stringify(resume));
  } catch {
    return false;
  }
  saveSettings({ ...appState.settings, audioOffsetMs: normalizeAudioOffset(offsetMs) });
  location.reload();
  return true;
}

/** Refresh only Aether's stream, keeping the same video, audio graph, page and captions. */
export async function applyAudioOffset(offsetMs: number): Promise<boolean> {
  if (applying) return false;
  const stores = await connectSiteStores();
  if (applying) return false;
  if (!stores || !canApplyAudioOffsetLive()) return reloadWithAudioOffset(offsetMs);
  const state = stores.player.getState();
  const display = state.display!;
  const video =
    document.querySelector<HTMLVideoElement>('#video-element') || document.querySelector('video');
  const support = getAudioOffsetSupport();
  if (!video || video.readyState < 1 || !['supported', 'reopen'].includes(support)) return false;
  const position = {
    time: video.currentTime,
    paused: video.paused,
    rate: video.playbackRate,
    volume: video.volume,
    muted: video.muted,
  };
  const previousTrack = state.currentAudioTrack;
  const href = location.href;
  applying = true;
  notifySupport();
  return new Promise<boolean>((resolve) => {
    let finished = false;
    let restoreTimer: number | undefined;
    const sameStream = (): boolean =>
      location.href === href &&
      video.isConnected &&
      stores.player.getState().source === state.source;
    const finish = (success: boolean): void => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timeout);
      window.clearTimeout(restoreTimer);
      video.removeEventListener('loadedmetadata', onMetadata);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('error', onError);
      display.off('audiotracks', onTracks);
      applying = false;
      notifySupport();
      resolve(success);
    };
    const onSeeked = (): void => {
      if (!sameStream()) {
        finish(false);
        return;
      }
      if (position.paused) video.pause();
      else
        void video.play().catch(() => {
          /* The play button remains available if autoplay is blocked. */
        });
      finish(true);
    };
    const onMetadata = (): void => {
      restoreTimer = window.setTimeout(() => {
        if (!sameStream()) {
          finish(false);
          return;
        }
        video.playbackRate = position.rate;
        video.volume = position.volume;
        video.muted = position.muted;
        const end = Number.isFinite(video.duration) ? Math.max(0, video.duration - 0.05) : Infinity;
        video.currentTime = Math.min(position.time, end);
        if (!video.seeking) onSeeked();
      }, 0);
    };
    const onError = (): void => finish(false);
    const onTracks = (tracks: AudioTrack[]): void => {
      if (!sameStream() || !previousTrack) return;
      const track =
        tracks.find(
          (track) => track.id === previousTrack.id && track.language === previousTrack.language
        ) ??
        tracks.find(
          (track) =>
            track.language === previousTrack.language && track.label === previousTrack.label
        );
      if (track) display.changeAudioTrack(track);
    };
    const timeout = window.setTimeout(() => finish(false), 30_000);
    video.addEventListener('loadedmetadata', onMetadata, { once: true });
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('error', onError);
    display.on('audiotracks', onTracks);
    try {
      // Aether's redisplaySource alone doesn't destroy its previous HLS instance. Clear it
      // first so repeated slider adjustments cannot leave orphaned downloads/decoders.
      display.load({
        source: null,
        startAt: position.time,
        automaticQuality: false,
        preferredQuality: null,
      });
      appliedOffsetMs = normalizeAudioOffset(offsetMs);
      saveSettings({ ...appState.settings, audioOffsetMs: appliedOffsetMs });
      stores.player.getState().redisplaySource(position.time);
    } catch {
      finish(false);
    }
  });
}

export function watchAudioOffsetPlayback(): void {
  void connectSiteStores().then(notifySupport);
  let resume = readResumePosition();
  let scheduled = false;
  const sync = (): void => {
    if (scheduled) return;
    scheduled = true;
    // Run after Aether's own loadedmetadata handler restores its saved progress.
    window.setTimeout(() => {
      scheduled = false;
      const video = document.querySelector('video');
      if (!video || video.readyState < 1) return;
      notifySupport();
      if (
        resume &&
        (resume.href !== location.href || Date.now() - resume.savedAt > RESUME_MAX_AGE_MS)
      ) {
        resume = null;
      }
      if (resume) {
        const position = resume;
        resume = null;
        video.playbackRate = position.playbackRate;
        video.volume = position.volume;
        video.muted = position.muted;
        const end = Number.isFinite(video.duration) ? Math.max(0, video.duration - 0.05) : Infinity;
        video.currentTime = Math.min(position.time, end);
        const restorePlayState = (): void => {
          if (position.paused) video.pause();
          else
            void video.play().catch(() => {
              /* Browser may require a play gesture after reload. */
            });
        };
        if (video.seeking) video.addEventListener('seeked', restorePlayState, { once: true });
        else restorePlayState();
      }
      // Positive audio offsets leave a short empty range at the start. Start at the first
      // common buffered frame instead of leaving the video stuck waiting at time zero.
      if (appliedOffsetMs > 0 && getAudioOffsetSupport() === 'supported' && video.buffered.length) {
        const start = video.buffered.start(0);
        if (video.currentTime < start && start <= appliedOffsetMs / 1000 + 0.1) {
          video.currentTime = start;
        }
      }
    }, 0);
  };
  for (const event of ['loadedmetadata', 'progress', 'canplay', 'emptied']) {
    document.addEventListener(event, sync, true);
  }
  sync();
}
