import { asBoolean, asTrimmedString, createSettingsStore } from '@userscripts/core';
import { DEFAULT_SETTINGS, SCRIPT_ID, STORAGE_KEY, type Settings } from '../config/constants';

const settingsStore = createSettingsStore<Settings>({
  scriptId: SCRIPT_ID,
  storageKey: STORAGE_KEY,
  defaults: DEFAULT_SETTINGS,
  normalize: (raw, defaults) => ({
    autoNext: asBoolean(raw.autoNext, defaults.autoNext),
    ntfyRemoteEnabled: asBoolean(raw.ntfyRemoteEnabled, defaults.ntfyRemoteEnabled),
    // The default has no trailing slash, so stripping it from the fallback changes nothing.
    ntfyServer: asTrimmedString(raw.ntfyServer, defaults.ntfyServer).replace(/\/+$/, ''),
    ntfyTopic: asTrimmedString(raw.ntfyTopic, defaults.ntfyTopic),
    ntfyControlTopic: asTrimmedString(raw.ntfyControlTopic, defaults.ntfyControlTopic),
    ntfyCommandSecret: asTrimmedString(raw.ntfyCommandSecret, defaults.ntfyCommandSecret),
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
