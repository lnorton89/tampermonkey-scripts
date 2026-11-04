import type { Settings } from '../config/constants';
import { appState } from './state';
import { normalizeSettings, persistSettings } from './storage';

export function saveSettings(nextSettings: Settings): void {
  appState.settings = normalizeSettings(nextSettings);

  persistSettings(appState.settings);
}
