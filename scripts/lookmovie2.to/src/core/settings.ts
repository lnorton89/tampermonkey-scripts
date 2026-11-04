import { appState } from './state';
import { normalizeSettings, persistSettings } from './storage';
import { syncModalState } from '../ui';
import { removeWindowedFullscreenFallback } from '../features/player';
import { restartNtfyRemote } from '../features/ntfyRemote';
import { ensureInTheatersSection } from '../features/inTheaters';
import { syncSiteTheme } from '../features/siteTheme';
import { NTFY_REMOTE_RESTART_DEBOUNCE_MS, type Settings } from '../config/constants';

let ntfyRestartTimer = 0;

function scheduleNtfyRemoteRestart(): void {
  window.clearTimeout(ntfyRestartTimer);
  ntfyRestartTimer = window.setTimeout(() => {
    restartNtfyRemote();
  }, NTFY_REMOTE_RESTART_DEBOUNCE_MS);
}

export function saveSettings(nextSettings: Settings): void {
  const previousNtfySettings = {
    ntfyRemoteEnabled: appState.settings.ntfyRemoteEnabled,
    ntfyServer: appState.settings.ntfyServer,
    ntfyTopic: appState.settings.ntfyTopic,
    ntfyControlTopic: appState.settings.ntfyControlTopic,
    ntfyCommandSecret: appState.settings.ntfyCommandSecret,
  };

  appState.settings = normalizeSettings(nextSettings);

  persistSettings(appState.settings);
  syncModalState();
  syncSiteTheme();
  ensureInTheatersSection();

  if (!appState.settings.autoFullscreen || !appState.settings.windowedFullscreen) {
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
    scheduleNtfyRemoteRestart();
  }
}
