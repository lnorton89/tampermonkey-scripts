import { describe, expect, it } from 'vitest';
import { normalizeSettings } from '../../scripts/aether.ist/src/core/storage';

describe('Aether audio offset settings', () => {
  it('migrates existing skip preferences with audio offset off by default', () => {
    expect(normalizeSettings({ autoSkipIntro: false, autoSkipCredits: true })).toEqual({
      autoSkipIntro: false,
      autoSkipRecap: false,
      autoSkipCredits: true,
      autoSkipPreview: false,
      audioOffsetMs: 0,
      subtitleResyncEnabled: true,
    });
  });

  it('remembers an explicit opt-out of periodic subtitle re-sync', () => {
    expect(normalizeSettings({ subtitleResyncEnabled: false }).subtitleResyncEnabled).toBe(false);
  });

  it.each([
    [-200, -200],
    [245, 250],
    [-5000, -1000],
    [5000, 1000],
    [NaN, 0],
    [Infinity, 0],
    ['-200', 0],
    [null, 0],
  ])('normalizes stored offset %s to %i', (value, expected) => {
    expect(normalizeSettings({ audioOffsetMs: value }).audioOffsetMs).toBe(expected);
  });
});
