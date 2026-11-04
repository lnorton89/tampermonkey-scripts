import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_SETTINGS } from '../../scripts/aether.ist/src/config/constants';
import type {
  SiteStore,
  SiteStores,
  SubtitleState,
  PlayerState,
} from '../../scripts/aether.ist/src/core/siteStores';
import { appState } from '../../scripts/aether.ist/src/core/state';
import {
  createSubtitleResyncTick,
  ensureSubtitleResyncSetting,
  restartSubtitleAnalysis,
} from '../../scripts/aether.ist/src/features/subtitleResync';

const bridge = vi.hoisted(() => ({ stores: null as SiteStores | null }));
vi.mock('../../scripts/aether.ist/src/core/siteStores', () => ({
  getSiteStores: () => bridge.stores,
  connectSiteStores: async () => bridge.stores,
}));

function store<T>(initial: T): SiteStore<T> {
  let state = initial;
  const listeners = new Set<(state: T, previous: T) => void>();
  return {
    getState: () => state,
    setState: (patch) => {
      const previous = state;
      state = { ...state, ...patch };
      listeners.forEach((fn) => fn(state, previous));
    },
    subscribe: (fn) => {
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
      };
    },
  };
}

let stores: SiteStores;
let video: HTMLVideoElement;
let clock = 0;
let result = vi.fn<SubtitleState['setAutoSyncResult']>();
beforeEach(() => {
  clock = 0;
  vi.spyOn(performance, 'now').mockImplementation(() => clock);
  appState.settings = { ...DEFAULT_SETTINGS };
  document.body.innerHTML = '<video id="video-element" src="blob:stream"></video>';
  video = document.querySelector('video')!;
  Object.defineProperties(video, {
    paused: { value: false, configurable: true },
    readyState: { value: 4, configurable: true },
    seeking: { value: false, configurable: true },
  });
  result = vi.fn();
  stores = {
    subtitles: store<SubtitleState>({
      autoSyncEnabled: true,
      delay: -0.1,
      setAutoSyncResult: result,
    }),
    player: store<PlayerState>({
      source: { type: 'hls' },
      caption: {
        selected: { id: 'en', srtData: 'test subtitles' },
        asTrack: false,
        translateTask: { pending: true },
      },
      currentAudioTrack: null,
      display: {
        getType: () => 'web',
        load: vi.fn(),
        on: vi.fn(),
        off: vi.fn(),
        changeAudioTrack: vi.fn(),
      },
      redisplaySource: vi.fn(),
    }),
  };
  bridge.stores = stores;
});

function playFor(tick: () => void, seconds: number) {
  for (let i = 0; i < seconds; i++) {
    clock += 1000;
    video.currentTime += 1;
    tick();
  }
}

describe('periodic subtitle re-sync', () => {
  it('starts a fresh scan after each minute with the menu closed and retains the caption/delay', () => {
    const original = stores.player.getState().caption;
    const selections: unknown[] = [];
    stores.player.subscribe((state) => selections.push(state.caption.selected));
    const tick = createSubtitleResyncTick(stores);
    tick();
    playFor(tick, 59);
    expect(result).not.toHaveBeenCalled();
    playFor(tick, 1);
    expect(result).toHaveBeenCalledOnce();
    expect(selections).toEqual([null, original.selected]);
    expect(stores.player.getState().caption).toEqual(original);
    expect(stores.subtitles.getState().delay).toBe(-0.1);
    playFor(tick, 60);
    expect(result).toHaveBeenCalledTimes(2);
  });

  it('does not count time paused or buffering', () => {
    const tick = createSubtitleResyncTick(stores);
    tick();
    playFor(tick, 40);
    Object.defineProperty(video, 'paused', { value: true });
    playFor(tick, 90);
    Object.defineProperty(video, 'paused', { value: false });
    Object.defineProperty(video, 'readyState', { value: 2 });
    playFor(tick, 90);
    expect(result).not.toHaveBeenCalled();
    Object.defineProperty(video, 'readyState', { value: 4 });
    playFor(tick, 21);
    expect(result).toHaveBeenCalledOnce();
  });

  it('resets the timer on seeking, source changes and subtitle changes', () => {
    const tick = createSubtitleResyncTick(stores);
    tick();
    playFor(tick, 50);
    video.currentTime += 100;
    tick();
    playFor(tick, 50);
    video.src = 'blob:new-episode';
    tick();
    playFor(tick, 50);
    stores.player.setState({
      caption: {
        ...stores.player.getState().caption,
        selected: { id: 'fr', srtData: 'French subtitles' },
      },
    });
    tick();
    playFor(tick, 59);
    expect(result).not.toHaveBeenCalled();
    playFor(tick, 1);
    expect(result).toHaveBeenCalledOnce();
  });

  it('stops immediately when either toggle is off, and starts fresh on re-enable', () => {
    const tick = createSubtitleResyncTick(stores);
    tick();
    playFor(tick, 50);
    stores.subtitles.setState({ autoSyncEnabled: false });
    playFor(tick, 100);
    expect(result).not.toHaveBeenCalled();
    stores.subtitles.setState({ autoSyncEnabled: true });
    tick();
    playFor(tick, 60);
    expect(result).toHaveBeenCalledOnce();
    appState.settings.subtitleResyncEnabled = false;
    playFor(tick, 100);
    expect(result).toHaveBeenCalledOnce();
  });

  it('does not override manual delay changes or restart native/cast captions', () => {
    const tick = createSubtitleResyncTick(stores);
    tick();
    playFor(tick, 50);
    stores.subtitles.setState({ delay: 1 });
    tick();
    playFor(tick, 30);
    expect(result).not.toHaveBeenCalled();
    stores.player.setState({ caption: { ...stores.player.getState().caption, asTrack: true } });
    expect(restartSubtitleAnalysis(stores)).toBe(false);
    playFor(tick, 120);
    expect(result).not.toHaveBeenCalled();
  });

  it('adds a default-on toggle below the sync controls, before diagnostics, without duplicates', () => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<section><div id="native-sync"><p class="font-medium">Auto-sync with audio</p><button></button></div><span>Listens to audio</span><span id="sync-status">Synced</span><div id="diagnostics">Sync Diagnostics</div></section>`
    );
    ensureSubtitleResyncSetting();
    ensureSubtitleResyncSetting();
    const rows = document.querySelectorAll('[data-aether-enhancer-subtitle-resync]');
    expect(rows).toHaveLength(1);
    const row = rows[0]!;
    expect(row.previousElementSibling?.id).toBe('sync-status');
    expect(row.nextElementSibling?.id).toBe('diagnostics');
    const button = row.querySelector('button')!;
    expect(button.getAttribute('aria-checked')).toBe('true');
    button.click();
    expect(appState.settings.subtitleResyncEnabled).toBe(false);
    expect(stores.subtitles.getState().autoSyncEnabled).toBe(true);
  });

  it('keeps the preference on but unavailable while parent auto-sync is off', () => {
    stores.subtitles.setState({ autoSyncEnabled: false });
    document.body.insertAdjacentHTML(
      'beforeend',
      '<section><div><p class="font-medium">Auto-sync with audio</p><button></button></div></section>'
    );
    ensureSubtitleResyncSetting();
    const button = document.querySelector<HTMLButtonElement>(
      '[data-aether-enhancer-subtitle-resync] button'
    )!;
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-checked')).toBe('true');
  });
});
