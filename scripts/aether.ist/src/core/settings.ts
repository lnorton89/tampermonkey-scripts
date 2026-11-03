/* eslint-disable */
// @ts-nocheck
import { appState } from './state';
import { normalizeSettings, persistSettings } from './storage';

export function saveSettings(nextSettings) {
  appState.settings = normalizeSettings(nextSettings);

  persistSettings(appState.settings);
}
