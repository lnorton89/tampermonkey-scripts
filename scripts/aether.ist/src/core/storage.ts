import { createSettingsStore, normalizeByDefaults } from '@userscripts/core';
import {
  AUDIO_OFFSET_LIMIT_MS,
  AUDIO_OFFSET_STEP_MS,
  DEFAULT_SETTINGS,
  SCRIPT_ID,
  STORAGE_KEY,
  type Settings,
} from '../config/constants';

export function normalizeAudioOffset(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 0;
  const clamped = Math.max(-AUDIO_OFFSET_LIMIT_MS, Math.min(AUDIO_OFFSET_LIMIT_MS, value));
  return Math.round(clamped / AUDIO_OFFSET_STEP_MS) * AUDIO_OFFSET_STEP_MS || 0;
}

const settingsStore = createSettingsStore<Settings>({
  scriptId: SCRIPT_ID,
  storageKey: STORAGE_KEY,
  defaults: DEFAULT_SETTINGS,
  normalize: (raw, defaults) => ({
    ...normalizeByDefaults(raw, defaults),
    audioOffsetMs: normalizeAudioOffset(raw.audioOffsetMs),
  }),
});

export function normalizeSettings(settings: unknown): Settings {
  return settingsStore.normalize(settings);
}

export function loadSettings(): Settings {
  return settingsStore.load();
}

export function persistSettings(settings: Settings): void {
  settingsStore.persist(settings);
}
