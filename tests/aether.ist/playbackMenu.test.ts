import { beforeEach, describe, expect, it, vi } from 'vitest';
import type * as Core from '@userscripts/core';

const mocks = vi.hoisted(() => ({
  support: 'supported',
  onDomChange: vi.fn((callback: () => void) => callback()),
  reload: vi.fn(() => true),
}));
vi.mock('@userscripts/core', async (importOriginal) => ({
  ...(await importOriginal<typeof Core>()),
  onDomChange: mocks.onDomChange,
}));
vi.mock('../../scripts/aether.ist/src/features/audioOffset', () => ({
  AUDIO_OFFSET_EVENT: 'aether-test:offset',
  getAppliedAudioOffset: () => 0,
  getAudioOffsetSupport: () => mocks.support,
  reloadWithAudioOffset: mocks.reload,
}));

beforeEach(() => {
  mocks.support = 'supported';
  mocks.reload.mockClear();
  document.body.innerHTML = `
    <div class="overflow-y-auto">
      <div id="speed"><p class="font-medium">Playback speed</p></div>
      <div id="booster"><div><p class="font-medium">Audio Booster</p><input type="range"></div></div>
      <div id="autoplay"><div><button class="group/toggle">Autoplay</button></div></div>
    </div>`;
});

describe('playback menu audio offset', () => {
  it('inserts directly below the booster without duplicating controls or skip toggles', async () => {
    const { watchPlaybackMenu } =
      await import('../../scripts/aether.ist/src/features/playbackMenu');
    watchPlaybackMenu();
    mocks.onDomChange.mock.calls.at(-1)![0]();
    const sections = document.querySelectorAll('[data-aether-enhancer-audio-offset]');
    expect(sections).toHaveLength(1);
    expect(sections[0]!.previousElementSibling?.id).toBe('booster');
    expect(sections[0]!.nextElementSibling?.id).toBe('autoplay');
    expect(document.querySelectorAll('[data-aether-enhancer-setting]')).toHaveLength(4);
  });

  it('allows negative values, reset and keyboard editing without triggering player shortcuts', async () => {
    const { watchPlaybackMenu } =
      await import('../../scripts/aether.ist/src/features/playbackMenu');
    watchPlaybackMenu();
    const row = document.querySelector('[data-aether-enhancer-audio-offset]')!;
    const slider = row.querySelector<HTMLInputElement>('input[type="range"]')!;
    const number = row.querySelector<HTMLInputElement>('input[type="number"]')!;
    const apply = row.querySelector<HTMLButtonElement>('[data-apply]')!;
    expect(apply.disabled).toBe(true);
    slider.value = '-200';
    slider.dispatchEvent(new Event('input', { bubbles: true }));
    expect(number.value).toBe('-200');
    expect(apply.disabled).toBe(false);
    apply.click();
    expect(mocks.reload).toHaveBeenCalledWith(-200);
    const shortcut = vi.fn();
    document.addEventListener('keydown', shortcut);
    number.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    expect(shortcut).not.toHaveBeenCalled();
    document.removeEventListener('keydown', shortcut);
    row.querySelector<HTMLButtonElement>('[data-reset]')!.click();
    expect(number.value).toBe('0');
    expect(apply.disabled).toBe(true);
  });

  it('explains unsupported sources and keeps Apply disabled', async () => {
    mocks.support = 'unsupported';
    const { watchPlaybackMenu } =
      await import('../../scripts/aether.ist/src/features/playbackMenu');
    watchPlaybackMenu();
    const row = document.querySelector('[data-aether-enhancer-audio-offset]')!;
    expect(row.querySelector('[role="status"]')!.textContent).toContain('Try another source');
    expect(row.querySelector<HTMLButtonElement>('[data-apply]')!.disabled).toBe(true);
  });
});
