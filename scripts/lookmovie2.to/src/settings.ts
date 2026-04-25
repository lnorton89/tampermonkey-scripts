/* eslint-disable */
// @ts-nocheck
import { appState } from './state';
import { persistSettings } from './storage';
import { syncModalState } from './ui';
import { removeWindowedFullscreenFallback } from './player';

export function saveSettings(nextSettings) {
  appState.settings = {
    autoPlay: !!nextSettings.autoPlay,
    autoFullscreen: !!nextSettings.autoFullscreen,
  };

  persistSettings(appState.settings);
  syncModalState();

  if (!appState.settings.autoFullscreen) {
    removeWindowedFullscreenFallback();
    appState.fullscreenTriggered = false;
  }
}
