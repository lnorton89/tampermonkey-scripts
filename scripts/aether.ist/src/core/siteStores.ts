import { isRecord } from '@userscripts/core';

export interface SiteStore<T> {
  getState(): T;
  setState(value: Partial<T>): void;
  subscribe(listener: (state: T, previous: T) => void): () => void;
}

export interface SubtitleState {
  autoSyncEnabled: boolean;
  delay: number;
  setAutoSyncResult(result: { status: string; at: number }): void;
}

export interface AudioTrack {
  id: string;
  language?: string;
  label?: string;
}

export interface PlayerState {
  source: unknown;
  caption: {
    selected: { id?: string; srtData?: string; [key: string]: unknown } | null;
    asTrack: boolean;
    [key: string]: unknown;
  };
  currentAudioTrack: AudioTrack | null;
  display: {
    getType(): string;
    load(options: {
      source: null;
      startAt: number;
      automaticQuality: boolean;
      preferredQuality: null;
    }): void;
    on(event: 'audiotracks', listener: (tracks: AudioTrack[]) => void): void;
    off(event: 'audiotracks', listener: (tracks: AudioTrack[]) => void): void;
    changeAudioTrack(track: AudioTrack): void;
  } | null;
  redisplaySource(time: number): void;
}

export interface SiteStores {
  subtitles: SiteStore<SubtitleState>;
  player: SiteStore<PlayerState>;
}

let connected: SiteStores | null = null;
let pending: Promise<SiteStores | null> | null = null;
let retryAfter = 0;

export function getSiteStores(): SiteStores | null {
  return connected;
}

// Export names are minified on each site build. Identify the two Zustand stores by their
// stable state/method names instead. No React internals or copied app state are involved.
export function findSiteStores(exports: Record<string, unknown>): SiteStores | null {
  let subtitles: SiteStore<SubtitleState> | undefined;
  let player: SiteStore<PlayerState> | undefined;
  for (const value of Object.values(exports)) {
    if (typeof value !== 'function') continue;
    const store = value as unknown as Partial<SiteStore<unknown>>;
    if (
      typeof store.getState !== 'function' ||
      typeof store.subscribe !== 'function' ||
      typeof store.setState !== 'function'
    )
      continue;
    const state = store.getState();
    if (!isRecord(state)) continue;
    if (
      typeof state.autoSyncEnabled === 'boolean' &&
      typeof state.setAutoSyncResult === 'function' &&
      typeof state.delay === 'number'
    ) {
      subtitles = store as SiteStore<SubtitleState>;
    }
    if (
      typeof state.redisplaySource === 'function' &&
      isRecord(state.caption) &&
      'display' in state
    ) {
      player = store as SiteStore<PlayerState>;
    }
  }
  return subtitles && player ? { subtitles, player } : null;
}

export function connectSiteStores(): Promise<SiteStores | null> {
  if (connected) return Promise.resolve(connected);
  if (pending) return pending;
  if (Date.now() < retryAfter) return Promise.resolve(null);
  const script = Array.from(
    document.querySelectorAll<HTMLScriptElement>('script[type="module"][src]')
  ).find((element) => {
    const url = new URL(element.src, location.href);
    return url.origin === location.origin && /^\/assets\/index-[\w-]+\.js$/.test(url.pathname);
  });
  if (!script) return Promise.resolve(null);
  retryAfter = Date.now() + 5000;
  pending = (async () => {
    try {
      const pageWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
      // Import the exact, already-loaded entry URL in the PAGE realm. Its module cache
      // returns the existing stores; importing in the userscript realm could mount a second app.
      const importInPage = pageWindow.Function('url', 'return import(url)') as (
        url: string
      ) => Promise<Record<string, unknown>>;
      connected = findSiteStores(await importInPage(script.src));
    } catch {
      // A changed site bundle or restrictive CSP leaves the existing player untouched.
    } finally {
      pending = null;
    }
    return connected;
  })();
  return pending;
}
