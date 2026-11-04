import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { STORAGE_KEY } from '../../scripts/aether.ist/src/config/constants';
import type { SiteStores } from '../../scripts/aether.ist/src/core/siteStores';

const bridge = vi.hoisted(() => ({ stores: null as SiteStores | null }));
vi.mock('../../scripts/aether.ist/src/core/siteStores', () => ({
  getSiteStores: () => bridge.stores,
  connectSiteStores: async () => bridge.stores,
}));

function installMediaMocks() {
  class Buffer extends EventTarget {
    mode = 'segments';
    updating = false;
    actualOffset = 0;
    appends: number[] = [];
    get timestampOffset() {
      return this.actualOffset;
    }
    set timestampOffset(value: number) {
      this.actualOffset = value;
    }
    appendBuffer(_data: ArrayBuffer) {
      this.appends.push(this.actualOffset);
    }
  }
  class Source extends EventTarget {
    sourceBuffers: Buffer[] = [];
    addSourceBuffer(_type: string) {
      const buffer = new Buffer();
      this.sourceBuffers.push(buffer);
      return buffer;
    }
  }
  let id = 0;
  vi.stubGlobal('SourceBuffer', Buffer);
  vi.stubGlobal('MediaSource', Source);
  vi.stubGlobal(
    'URL',
    class extends URL {
      static override createObjectURL() {
        return `blob:https://aether.ist/${++id}`;
      }
      static override revokeObjectURL() {
        /* Revoking does not detach an attached MediaSource. */
      }
    }
  );
  return { Buffer, Source };
}

beforeEach(() => {
  bridge.stores = null;
  vi.resetModules();
  document.body.innerHTML = '<video></video>';
  sessionStorage.clear();
});

afterEach(() => vi.useRealTimers());

async function setup(offset: number) {
  const mocks = installMediaMocks();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ audioOffsetMs: offset }));
  const feature = await import('../../scripts/aether.ist/src/features/audioOffset');
  feature.installAudioOffset();
  const source = new mocks.Source();
  const video = document.querySelector('video')!;
  video.src = URL.createObjectURL(source as unknown as MediaSource);
  return { ...mocks, ...feature, source, video };
}

describe('audio offset media timeline', () => {
  it.each([-250, 300])(
    'applies %i ms only to audio, without accumulating on each append',
    async (offset) => {
      const { source, getAudioOffsetSupport } = await setup(offset);
      const audio = source.addSourceBuffer('audio/mp4; codecs="mp4a.40.2"');
      const video = source.addSourceBuffer('video/mp4; codecs="avc1.64001f"');
      for (let i = 0; i < 3; i++) {
        audio.appendBuffer(new ArrayBuffer(0));
        video.appendBuffer(new ArrayBuffer(0));
      }
      expect(audio.appends).toEqual([offset / 1000, offset / 1000, offset / 1000]);
      expect(video.appends).toEqual([0, 0, 0]);
      expect(audio.timestampOffset).toBeCloseTo(0);
      expect(getAudioOffsetSupport()).toBe('supported');
    }
  );

  it('preserves HLS discontinuity adjustments and readback before and after appending', async () => {
    const { source } = await setup(-200);
    const audio = source.addSourceBuffer('audio/mp4');
    audio.timestampOffset = 10;
    audio.appendBuffer(new ArrayBuffer(0));
    expect(audio.actualOffset).toBeCloseTo(9.8);
    expect(audio.timestampOffset).toBeCloseTo(10);
    audio.timestampOffset = 30;
    audio.appendBuffer(new ArrayBuffer(0));
    expect(audio.actualOffset).toBeCloseTo(29.8);
    expect(audio.timestampOffset).toBeCloseTo(30);
  });

  it('leaves zero offset, combined AV buffers and sequence mode unchanged', async () => {
    const { source } = await setup(-250);
    const muxed = source.addSourceBuffer('video/mp4; codecs="avc1.64001f,mp4a.40.2"');
    const sequential = source.addSourceBuffer('audio/mpeg');
    sequential.mode = 'sequence';
    muxed.appendBuffer(new ArrayBuffer(0));
    sequential.appendBuffer(new ArrayBuffer(0));
    expect(muxed.actualOffset).toBe(0);
    expect(sequential.actualOffset).toBe(0);
  });

  it('passes through the original timing when the saved offset is zero', async () => {
    const { source } = await setup(0);
    const audio = source.addSourceBuffer('audio/mp4');
    audio.timestampOffset = 5;
    audio.appendBuffer(new ArrayBuffer(0));
    expect(audio.actualOffset).toBe(5);
    expect(audio.timestampOffset).toBe(5);
  });

  it('retains an attached source after HLS revokes its URL and releases it on close', async () => {
    const { source, video, getAudioOffsetSupport } = await setup(-200);
    source.addSourceBuffer('audio/mp4');
    URL.revokeObjectURL(video.src);
    expect(getAudioOffsetSupport()).toBe('supported');
    source.dispatchEvent(new Event('sourceclose'));
    expect(getAudioOffsetSupport()).toBe('reopen');
  });

  it('reports direct files, late attachment, and streams without separate audio accurately', async () => {
    const { source, video, getAudioOffsetSupport } = await setup(-200);
    expect(getAudioOffsetSupport()).toBe('waiting');
    source.addSourceBuffer('video/mp4');
    expect(getAudioOffsetSupport()).toBe('unsupported');
    video.src = 'https://aether.ist/video.mp4';
    expect(getAudioOffsetSupport()).toBe('unsupported');
    video.src = 'blob:https://aether.ist/already-playing';
    expect(getAudioOffsetSupport()).toBe('reopen');
  });

  it('does not patch media APIs twice', async () => {
    const { source, installAudioOffset } = await setup(-200);
    installAudioOffset();
    const audio = source.addSourceBuffer('audio/mp4');
    audio.appendBuffer(new ArrayBuffer(0));
    expect(audio.actualOffset).toBeCloseTo(-0.2);
  });

  it('saves the exact playback state before reloading with the chosen offset', async () => {
    const { source, video, reloadWithAudioOffset } = await setup(0);
    source.addSourceBuffer('audio/mp4');
    const reload = vi.fn();
    vi.stubGlobal('location', { href: 'https://aether.ist/media/movie/123', reload });
    video.currentTime = 123.456;
    video.playbackRate = 1.5;
    video.volume = 0.4;
    video.muted = true;
    expect(reloadWithAudioOffset(-200)).toBe(true);
    expect(reload).toHaveBeenCalledOnce();
    expect(
      JSON.parse(sessionStorage.getItem('aether-enhancer:audio-offset-resume')!)
    ).toMatchObject({
      href: location.href,
      time: 123.456,
      playbackRate: 1.5,
      volume: 0.4,
      muted: true,
      paused: true,
    });
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toMatchObject({ audioOffsetMs: -200 });
  });

  it('restores playback after metadata without replaying stale resume data', async () => {
    vi.useFakeTimers();
    const { video, watchAudioOffsetPlayback } = await setup(-200);
    const pause = vi.spyOn(video, 'pause').mockImplementation(() => undefined);
    Object.defineProperty(video, 'readyState', { value: 1 });
    Object.defineProperty(video, 'duration', { value: 200 });
    sessionStorage.setItem(
      'aether-enhancer:audio-offset-resume',
      JSON.stringify({
        href: location.href,
        savedAt: Date.now(),
        time: 84.125,
        paused: true,
        playbackRate: 1.5,
        volume: 0.4,
        muted: true,
      })
    );
    watchAudioOffsetPlayback();
    vi.runAllTimers();
    expect(video.currentTime).toBe(84.125);
    expect(video.playbackRate).toBe(1.5);
    expect(video.volume).toBe(0.4);
    expect(video.muted).toBe(true);
    expect(pause).toHaveBeenCalledOnce();
    expect(sessionStorage.getItem('aether-enhancer:audio-offset-resume')).toBeNull();
  });

  it('refreshes the stream in place, freezes old buffer offsets and restores paused playback', async () => {
    vi.useFakeTimers();
    const feature = await setup(0);
    const { source, Source, video, applyAudioOffset, getAppliedAudioOffset } = feature;
    const original = source.addSourceBuffer('audio/mp4');
    original.appendBuffer(new ArrayBuffer(0));
    Object.defineProperty(video, 'readyState', { value: 1 });
    Object.defineProperty(video, 'duration', { value: 100 });
    const pause = vi.spyOn(video, 'pause').mockImplementation(() => undefined);
    video.currentTime = 42.25;
    video.playbackRate = 1.5;
    video.volume = 0.4;
    video.muted = true;
    const state = {
      source: { type: 'hls' },
      caption: { selected: { id: 'en', srtData: 'subtitles' }, asTrack: false },
      currentAudioTrack: null,
      display: {
        getType: () => 'web',
        load: vi.fn(),
        on: vi.fn(),
        off: vi.fn(),
        changeAudioTrack: vi.fn(),
      },
      redisplaySource: vi.fn(() => {
        const next = new Source();
        video.src = URL.createObjectURL(next as unknown as MediaSource);
        const audio = next.addSourceBuffer('audio/mp4');
        audio.appendBuffer(new ArrayBuffer(0));
        expect(audio.actualOffset).toBeCloseTo(-0.25);
        video.currentTime = 0;
        video.dispatchEvent(new Event('loadedmetadata'));
      }),
    };
    bridge.stores = {
      player: { getState: () => state, setState: vi.fn(), subscribe: vi.fn() },
      subtitles: {
        getState: () => ({ autoSyncEnabled: true, delay: 0, setAutoSyncResult: vi.fn() }),
        setState: vi.fn(),
        subscribe: vi.fn(),
      },
    };
    const first = applyAudioOffset(-250);
    const overlapping = applyAudioOffset(300);
    await Promise.resolve();
    await vi.advanceTimersByTimeAsync(0);
    expect(await first).toBe(true);
    expect(await overlapping).toBe(false);
    expect(state.display.load).toHaveBeenCalledWith(expect.objectContaining({ source: null }));
    expect(state.redisplaySource).toHaveBeenCalledWith(42.25);
    expect(video.currentTime).toBe(42.25);
    expect(video.playbackRate).toBe(1.5);
    expect(video.volume).toBe(0.4);
    expect(video.muted).toBe(true);
    expect(pause).toHaveBeenCalledOnce();
    expect(getAppliedAudioOffset()).toBe(-250);
    expect(original.timestampOffset).toBe(0);
    original.appendBuffer(new ArrayBuffer(0));
    expect(original.actualOffset).toBe(0);
    expect(state.caption.selected.id).toBe('en');
  });
});
