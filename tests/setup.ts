import { afterEach, beforeEach, vi } from 'vitest';

/** In-memory stand-in for Tampermonkey's GM storage, reset before each test. */
export const gmStore = new Map<string, unknown>();

beforeEach(() => {
  gmStore.clear();
  localStorage.clear();
  vi.stubGlobal('GM_getValue', (key: string, fallback: unknown) =>
    gmStore.has(key) ? gmStore.get(key) : fallback
  );
  vi.stubGlobal('GM_setValue', (key: string, value: unknown) => {
    gmStore.set(key, value);
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});
