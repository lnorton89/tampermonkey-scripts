import { describe, expect, it, vi } from 'vitest';
import { createSettingsStore, readJson, readStore, writeJson, writeStore } from '@userscripts/core';
import { gmStore } from '../setup';

describe('readStore / writeStore', () => {
  it('writes to GM storage and mirrors to localStorage', () => {
    writeStore('key', 'value');
    expect(gmStore.get('key')).toBe('value');
    expect(localStorage.getItem('key')).toBe('value');
  });

  it('prefers GM storage over localStorage', () => {
    gmStore.set('key', 'gm');
    localStorage.setItem('key', 'local');
    expect(readStore('key')).toBe('gm');
  });

  it('migrates a legacy localStorage value into GM storage', () => {
    localStorage.setItem('key', 'legacy');
    expect(readStore('key')).toBe('legacy');
    expect(gmStore.get('key')).toBe('legacy');
  });

  it('survives localStorage being wiped', () => {
    writeStore('key', 'value');
    localStorage.clear();
    expect(readStore('key')).toBe('value');
  });

  it('removes the value when writing null', () => {
    writeStore('key', 'value');
    writeStore('key', null);
    expect(readStore('key')).toBeNull();
  });

  it('falls back to localStorage when GM storage is not granted', () => {
    vi.stubGlobal('GM_getValue', undefined);
    vi.stubGlobal('GM_setValue', undefined);
    writeStore('key', 'value');
    expect(localStorage.getItem('key')).toBe('value');
    expect(readStore('key')).toBe('value');
  });
});

describe('readJson / writeJson', () => {
  it('round-trips values', () => {
    writeJson('list', [1, 2, 3]);
    expect(readJson('list')).toEqual([1, 2, 3]);
  });

  it('returns the fallback for missing or corrupt values', () => {
    expect(readJson('missing', [])).toEqual([]);
    gmStore.set('corrupt', '{not json');
    expect(readJson('corrupt', 'fallback')).toBe('fallback');
  });
});

describe('createSettingsStore', () => {
  const defaults = { autoPlay: true, rate: 1, topic: '' };
  const store = createSettingsStore({ scriptId: 'test', storageKey: 'settings', defaults });

  it('returns defaults when nothing is saved', () => {
    expect(store.load()).toEqual(defaults);
  });

  it('keeps saved values whose type matches the default and drops the rest', () => {
    gmStore.set('settings', JSON.stringify({ autoPlay: false, rate: 'fast', extra: 1 }));
    expect(store.load()).toEqual({ autoPlay: false, rate: 1, topic: '' });
  });

  it('persists settings', () => {
    store.persist({ autoPlay: false, rate: 2, topic: 'abc' });
    expect(store.load()).toEqual({ autoPlay: false, rate: 2, topic: 'abc' });
  });

  it('returns defaults when the saved JSON is corrupt', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    gmStore.set('settings', '{oops');
    expect(store.load()).toEqual(defaults);
  });

  it('uses a custom normalizer', () => {
    const custom = createSettingsStore({
      scriptId: 'test',
      storageKey: 'settings',
      defaults,
      normalize: (raw, d) => ({ ...d, rate: Number(raw.rate) || d.rate }),
    });
    gmStore.set('settings', JSON.stringify({ rate: '1.5' }));
    expect(custom.load().rate).toBe(1.5);
  });
});
