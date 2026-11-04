import {
  buildAction,
  createNtfyRemote,
  findActiveVideo,
  getControlTopic,
  getDisplayTopic,
  getServerUrl,
  getTopicConfigurationError,
  sendJsonRequest,
  type NtfyConfig,
} from '@userscripts/core';
import { ACTIVE_TAB_KEY, ACTIVE_TAB_TTL_MS, SCRIPT_ID } from '../config/constants';
import { state } from '../core/state';
import { setStatus } from '../ui/panel';
import { playNextEpisode } from './episodes';
import {
  getPlayerTitle,
  getPosterUrl,
  toggleActiveVideoPlayback,
  toggleFullscreen,
  videoControls,
} from './player';

function getNtfyConfig(): NtfyConfig {
  const { settings } = state;
  return {
    enabled: settings.ntfyRemoteEnabled,
    server: settings.ntfyServer,
    topic: settings.ntfyTopic,
    controlTopic: settings.ntfyControlTopic,
    secret: settings.ntfyCommandSecret,
  };
}

const remote = createNtfyRemote({
  scriptId: SCRIPT_ID,
  siteName: 'Cineby',
  tabClaimKey: ACTIVE_TAB_KEY,
  tabClaimTtlMs: ACTIVE_TAB_TTL_MS,
  getConfig: getNtfyConfig,
  getTitle: () => getPlayerTitle(),
  handlers: {
    play: () => videoControls.play(),
    pause: () => videoControls.pause(),
    toggle: () => toggleActiveVideoPlayback(),
    seekBy: (seconds) => videoControls.seekBy(seconds),
    fullscreen: () => toggleFullscreen(),
    next: () => playNextEpisode(),
    setMuted: (muted) => videoControls.setMuted(muted),
    setVolume: (percent) => videoControls.setVolume(percent),
  },
  onStatus: (status, message) => {
    setStatus(status, message);
  },
  onCommandHandled: (command) => {
    publishPlayerNotification(command.command);
  },
});

export function startNtfyRemote(): boolean {
  return remote.start();
}

export function restartNtfyRemote(): boolean {
  return remote.restart();
}

export function publishPlayerNotification(reason = 'update'): boolean {
  const config = getNtfyConfig();
  if (!config.enabled || !remote.claim(reason)) {
    return false;
  }

  const displayTopic = getDisplayTopic(config);
  const controlTopic = getControlTopic(config);
  if (!displayTopic || !controlTopic || getTopicConfigurationError(config)) {
    return false;
  }

  const video = findActiveVideo();
  const payload = {
    topic: displayTopic,
    title: video?.paused ? 'Paused on Cineby' : 'Playing on Cineby',
    message: getPlayerTitle(),
    tags: ['tv'],
    priority: 3,
    sequence_id: `${SCRIPT_ID}-player`,
    click: location.href,
    attach: getPosterUrl() || undefined,
    actions: [
      buildAction(config, 'Play/Pause', 'toggle'),
      buildAction(config, 'Next', 'next'),
      buildAction(config, '-30s', 'seek -30'),
      buildAction(config, '+30s', 'seek 30'),
      buildAction(config, 'Fullscreen', 'fullscreen'),
    ],
  };

  state.lastNotificationAt = Date.now();

  // JSON publishing goes to the server root; the topic is in the body.
  sendJsonRequest(getServerUrl(config), payload)
    .then(() => {
      setStatus('connected', `Updated ntfy notification (${reason}).`);
    })
    .catch((error: unknown) => {
      console.warn(`[${SCRIPT_ID}] Failed to publish ntfy notification.`, error);
      setStatus('error', 'Could not publish ntfy notification.');
    });

  return true;
}
