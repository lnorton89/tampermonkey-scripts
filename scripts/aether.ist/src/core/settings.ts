/* eslint-disable */
// @ts-nocheck
import { appState } from './state';
import { normalizeSettings, persistSettings } from './storage';
import { syncModalState } from '../ui';

export function saveSettings(nextSettings) {
  appState.settings = normalizeSettings(nextSettings);

  persistSettings(appState.settings);
  syncModalState();
}
