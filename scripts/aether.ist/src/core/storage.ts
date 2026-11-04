import { createSettingsStore } from '@userscripts/core';
import { DEFAULT_SETTINGS, SCRIPT_ID, STORAGE_KEY, type Settings } from '../config/constants';

const settingsStore = createSettingsStore<Settings>({
  scriptId: SCRIPT_ID,
  storageKey: STORAGE_KEY,
  defaults: DEFAULT_SETTINGS,
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
