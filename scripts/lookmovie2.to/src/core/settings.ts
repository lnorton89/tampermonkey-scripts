/* eslint-disable */
// @ts-nocheck
import { appState } from './state';
import { persistSettings } from './storage';
import { syncModalState } from '../ui';
import { removeWindowedFullscreenFallback } from '../features/player';
import { restartNtfyRemote } from '../features/ntfyRemote';

export function saveSettings(nextSettings) {
  const previousNtfySettings = {
    ntfyRemoteEnabled: appState.settings.ntfyRemoteEnabled,
    ntfyServer: appState.settings.ntfyServer,
    ntfyTopic: appState.settings.ntfyTopic,
    ntfyControlTopic: appState.settings.ntfyControlTopic,
    ntfyCommandSecret: appState.settings.ntfyCommandSecret,
  };

  appState.settings = {
    autoPlay: !!nextSettings.autoPlay,
    autoFullscreen: !!nextSettings.autoFullscreen,
    ntfyRemoteEnabled: !!nextSettings.ntfyRemoteEnabled,
    ntfyServer:
      typeof nextSettings.ntfyServer === 'string' && nextSettings.ntfyServer.trim()
        ? nextSettings.ntfyServer.trim().replace(/\/+$/, '')
        : 'https://ntfy.sh',
    ntfyTopic:
      typeof nextSettings.ntfyTopic === 'string' && nextSettings.ntfyTopic.trim()
        ? nextSettings.ntfyTopic.trim()
        : '',
    ntfyControlTopic:
      typeof nextSettings.ntfyControlTopic === 'string' && nextSettings.ntfyControlTopic.trim()
        ? nextSettings.ntfyControlTopic.trim()
        : '',
    ntfyCommandSecret:
      typeof nextSettings.ntfyCommandSecret === 'string' && nextSettings.ntfyCommandSecret.trim()
        ? nextSettings.ntfyCommandSecret.trim()
        : '',
  };

  persistSettings(appState.settings);
  syncModalState();

  if (!appState.settings.autoFullscreen) {
    removeWindowedFullscreenFallback();
    appState.fullscreenTriggered = false;
  }

  if (
    previousNtfySettings.ntfyRemoteEnabled !== appState.settings.ntfyRemoteEnabled ||
    previousNtfySettings.ntfyServer !== appState.settings.ntfyServer ||
    previousNtfySettings.ntfyTopic !== appState.settings.ntfyTopic ||
    previousNtfySettings.ntfyControlTopic !== appState.settings.ntfyControlTopic ||
    previousNtfySettings.ntfyCommandSecret !== appState.settings.ntfyCommandSecret
  ) {
    restartNtfyRemote();
  }
}
