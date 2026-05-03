/* eslint-disable */
// @ts-nocheck
import {
  NTFY_REMOTE_ACTIVE_TAB_KEY,
  NTFY_REMOTE_ACTIVE_TAB_TTL_MS,
  NTFY_TOPIC_PATTERN,
  SCRIPT_ID,
} from '../config/constants';
import { appState } from '../core/state';
import { notifyUiChanged } from '../ui/events';
import {
  getActiveVideo,
  pauseActiveVideo,
  playNextShowEpisode,
  playActiveVideo,
  seekActiveVideoBy,
  setActiveVideoMuted,
  setActiveVideoVolume,
  toggleActiveVideoFullscreen,
  toggleActiveVideoPlayback,
} from './player';

let eventSource = null;
let lastMessageId = '';
let reconnectTimer = 0;
let lastIgnoredFocusMessageAt = 0;
let claimListenersInstalled = false;

function setStatus(status, message = '') {
  appState.ntfyRemoteStatus = status;
  appState.ntfyRemoteMessage = message;
  notifyUiChanged();
}

function normalizeTopic(topic) {
  return String(topic || '')
    .trim()
    .replace(/^\/+|\/+$/g, '');
}

function isValidTopic(topic) {
  return NTFY_TOPIC_PATTERN.test(normalizeTopic(topic));
}

function getTopicValidationMessage(topic, label) {
  const normalizedTopic = normalizeTopic(topic);
  if (!normalizedTopic) {
    return `${label} topic is required.`;
  }

  if (normalizedTopic.length > 64) {
    return `${label} topic must be 64 characters or fewer.`;
  }

  return `${label} topic can only use letters, numbers, hyphens, and underscores.`;
}

function isVisibleDocument() {
  return document.visibilityState !== 'hidden';
}

function readActiveTabClaim() {
  try {
    const parsed = JSON.parse(localStorage.getItem(NTFY_REMOTE_ACTIVE_TAB_KEY) || 'null');
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (_error) {
    return null;
  }
}

function writeActiveTabClaim() {
  try {
    localStorage.setItem(
      NTFY_REMOTE_ACTIVE_TAB_KEY,
      JSON.stringify({
        tabId: appState.ntfyRemoteTabId,
        href: location.href,
        title: getPlayerTitle(),
        updatedAt: Date.now(),
      })
    );
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to claim ntfy remote tab.`, error);
  }
}

function clearActiveTabClaim() {
  const claim = readActiveTabClaim();
  if (!claim || claim.tabId !== appState.ntfyRemoteTabId) {
    return;
  }

  localStorage.removeItem(NTFY_REMOTE_ACTIVE_TAB_KEY);
}

export function isCurrentNtfyRemoteTab() {
  const claim = readActiveTabClaim();
  if (!claim || !claim.tabId) {
    return true;
  }

  if (claim.tabId === appState.ntfyRemoteTabId) {
    return true;
  }

  return Date.now() - Number(claim.updatedAt || 0) > NTFY_REMOTE_ACTIVE_TAB_TTL_MS;
}

export function claimNtfyRemoteTab(reason = 'activity') {
  if (!appState.settings.ntfyRemoteEnabled || !isVisibleDocument() || !getActiveVideo()) {
    return false;
  }

  writeActiveTabClaim();
  setStatus('connected', `This tab controls Android remote (${reason}).`);
  return true;
}

function refreshNtfyRemoteClaim() {
  if (
    appState.settings.ntfyRemoteEnabled &&
    isCurrentNtfyRemoteTab() &&
    isVisibleDocument() &&
    getActiveVideo()
  ) {
    writeActiveTabClaim();
  }
}

export function releaseNtfyRemoteTab() {
  clearActiveTabClaim();
}

function getControlTopic() {
  const configuredTopic = normalizeTopic(appState.settings.ntfyControlTopic);
  if (configuredTopic) {
    return configuredTopic;
  }

  const displayTopic = normalizeTopic(appState.settings.ntfyTopic);
  return displayTopic ? `${displayTopic}-controls` : '';
}

function getTopicConfigurationError() {
  const displayTopic = getDisplayTopic();
  const controlTopic = getControlTopic();

  if (!isValidTopic(displayTopic)) {
    return getTopicValidationMessage(displayTopic, 'Display');
  }

  if (!isValidTopic(controlTopic)) {
    return getTopicValidationMessage(controlTopic, 'Control');
  }

  return '';
}

function buildSubscribeUrl() {
  const server = String(appState.settings.ntfyServer || 'https://ntfy.sh').replace(/\/+$/, '');
  const topic = getControlTopic();
  if (!server || !topic || !isValidTopic(topic)) {
    return '';
  }

  const url = new URL(`${server}/${encodeURIComponent(topic)}/sse`);
  url.searchParams.set('since', String(Math.floor(Date.now() / 1000)));
  return url.toString();
}

function getDisplayTopic() {
  return normalizeTopic(appState.settings.ntfyTopic);
}

function getPublishUrl(topic) {
  const server = String(appState.settings.ntfyServer || 'https://ntfy.sh').replace(/\/+$/, '');
  return `${server}/${encodeURIComponent(topic)}`;
}

function getPublishRootUrl() {
  return String(appState.settings.ntfyServer || 'https://ntfy.sh').replace(/\/+$/, '');
}

function buildCommandBody(command) {
  const secret = String(appState.settings.ntfyCommandSecret || '').trim();
  return secret ? `${secret} ${command}` : command;
}

function buildAction(label, command) {
  const controlTopic = getControlTopic();

  return {
    action: 'http',
    label,
    url: getPublishUrl(controlTopic),
    method: 'POST',
    body: buildCommandBody(command),
    clear: false,
  };
}

function isShowPlayPage() {
  return location.pathname.startsWith('/shows/play/');
}

function isMoviePlayPage() {
  return location.pathname.startsWith('/movies/play/');
}

function buildPlayerActions(isPaused) {
  const playPauseLabel = isPaused ? 'Play' : 'Pause';
  const playPauseCommand = isPaused ? 'play' : 'pause';
  const actions = [
    buildAction(playPauseLabel, playPauseCommand),
    buildAction('Full', 'fullscreen'),
  ];

  if (isShowPlayPage()) {
    actions.push(buildAction('Next', 'next'));
  } else if (isMoviePlayPage()) {
    actions.push(buildAction('-30s', 'seek -30'));
  } else {
    actions.push(buildAction('+30s', 'seek 30'));
  }

  return actions;
}

function formatTitleWithYear(title, year) {
  const normalizedTitle = String(title || '')
    .replace(/\s+/g, ' ')
    .trim();
  const normalizedYear =
    typeof year === 'string' || typeof year === 'number' ? String(year).trim() : '';

  if (!normalizedTitle) {
    return '';
  }

  if (/ \(\d{4}\)$/.test(normalizedTitle)) {
    return normalizedTitle;
  }

  const compactYearMatch = normalizedTitle.match(/^(.*?)(\d{4})$/);
  if (compactYearMatch && compactYearMatch[1].trim()) {
    return `${compactYearMatch[1].trim()} (${compactYearMatch[2]})`;
  }

  if (normalizedYear && !normalizedTitle.endsWith(`(${normalizedYear})`)) {
    return `${normalizedTitle} (${normalizedYear})`;
  }

  return normalizedTitle;
}

function getPlayerTitle() {
  const showStorage = window.show_storage || window.show || {};
  const movieStorage = window.movie_storage || window.movie || {};
  const structuredTitle =
    typeof showStorage.title === 'string' && showStorage.title.trim()
      ? formatTitleWithYear(showStorage.title, showStorage.year)
      : typeof movieStorage.title === 'string' && movieStorage.title.trim()
        ? formatTitleWithYear(movieStorage.title, movieStorage.year)
        : '';

  if (structuredTitle) {
    return structuredTitle;
  }

  const heading =
    document.querySelector('h1')?.textContent ||
    document.querySelector('.movie-title, .film-title, .show-title')?.textContent ||
    document.title ||
    'LookMovie2';

  return formatTitleWithYear(heading) || 'LookMovie2';
}

function getRouteEpisodeLabel() {
  const match = location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);
  if (!match) {
    return '';
  }

  return `S${String(match[1]).padStart(2, '0')}E${String(match[2]).padStart(2, '0')}`;
}

function normalizeImageUrl(url) {
  const value = String(url || '').trim();
  if (!value || value.startsWith('data:image/')) {
    return '';
  }

  try {
    return new URL(value, location.origin).href;
  } catch (_error) {
    return '';
  }
}

function getElementImageUrl(element) {
  if (!element) {
    return '';
  }

  const style = element.getAttribute('style') || '';
  const styleMatch = style.match(/background-image:\s*url\((['"]?)(.*?)\1\)/i);

  return normalizeImageUrl(
    element.getAttribute('content') ||
      element.getAttribute('data-background-image') ||
      element.getAttribute('data-lazy-background') ||
      element.getAttribute('data-src-portrait') ||
      element.getAttribute('data-src') ||
      styleMatch?.[2] ||
      element.getAttribute('src')
  );
}

function getPlayerPosterUrl() {
  const video = getActiveVideo();
  const movieStorage = window.movie_storage || window.movie || {};
  const showStorage = window.show_storage || window.show || {};
  const posterNode = document.querySelector(
    [
      'meta[property="og:image"]',
      '.movie__poster[data-background-image]',
      '.movie__poster[style*="background-image"]',
      '.movie-single-ct img[data-src]',
      '.movie-single-ct img[src]',
      '.internal-page-container img[data-src]',
      '.internal-page-container img[src]',
      '[data-background-image]',
      '[style*="background-image"]',
      'img[data-src-portrait]',
      'img[data-src]',
    ].join(', ')
  );

  return (
    normalizeImageUrl(video?.getAttribute('poster')) ||
    normalizeImageUrl(movieStorage.movie_poster) ||
    normalizeImageUrl(movieStorage.poster_medium) ||
    normalizeImageUrl(showStorage.poster_medium) ||
    normalizeImageUrl(showStorage.poster) ||
    getElementImageUrl(posterNode)
  );
}

function sendJsonRequest(url, body, method = 'POST') {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);

    fetch(url, {
      method,
      body: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`ntfy request failed with HTTP ${response.status}`);
        }

        resolve(response);
      })
      .catch((fetchError) => {
        if (typeof GM_xmlhttpRequest !== 'function') {
          reject(fetchError);
          return;
        }

        GM_xmlhttpRequest({
          method,
          url,
          data: payload,
          headers: {
            'Content-Type': 'application/json',
          },
          onload(response) {
            if (response.status >= 200 && response.status < 300) {
              resolve(response);
              return;
            }

            reject(new Error(`ntfy request failed with HTTP ${response.status}`));
          },
          onerror(error) {
            reject(error);
          },
        });
      });
  });
}

function sendBinaryRequest(url, body, headers, method = 'POST') {
  return fetch(url, {
    method,
    body,
    headers,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`ntfy request failed with HTTP ${response.status}`);
    }

    return response;
  });
}

function fetchPosterBlob(url) {
  if (!url) {
    return Promise.resolve(null);
  }

  return fetch(url, {
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Poster request failed with HTTP ${response.status}`);
      }

      return response.blob();
    })
    .then((blob) => {
      if (!blob || !blob.size || blob.size > 15 * 1024 * 1024) {
        return null;
      }

      return blob;
    })
    .catch((error) => {
      console.warn(`[${SCRIPT_ID}] Could not fetch poster for ntfy attachment.`, error);
      return null;
    });
}

function buildNotificationHeaders(payload, filename, contentType) {
  const headers = {
    Title: payload.title,
    Message: payload.message,
    Priority: String(payload.priority),
    Tags: Array.isArray(payload.tags) ? payload.tags.join(',') : '',
    Click: payload.click,
    Actions: JSON.stringify(payload.actions || []),
    'X-Sequence-ID': payload.sequence_id,
  };

  if (filename) {
    headers.Filename = filename;
  }

  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  Object.keys(headers).forEach((key) => {
    if (!headers[key]) {
      delete headers[key];
    }
  });

  return headers;
}

function sendPlayerNotificationPayload(displayTopic, payload, posterUrl) {
  return fetchPosterBlob(posterUrl).then((posterBlob) => {
    if (posterBlob) {
      return sendBinaryRequest(
        getPublishUrl(displayTopic),
        posterBlob,
        buildNotificationHeaders(payload, 'lookmovie-poster.jpg', posterBlob.type || 'image/jpeg')
      );
    }

    return sendJsonRequest(getPublishRootUrl(), payload);
  });
}

export function publishPlayerNotification(reason = 'update') {
  if (!appState.settings.ntfyRemoteEnabled) {
    return false;
  }

  if (!claimNtfyRemoteTab(reason)) {
    return false;
  }

  const displayTopic = getDisplayTopic();
  const controlTopic = getControlTopic();
  if (!displayTopic || !controlTopic || getTopicConfigurationError()) {
    return false;
  }

  const video = getActiveVideo();
  if (!video) {
    return false;
  }

  const isPaused = video.paused;
  const title = getPlayerTitle();
  const episodeLabel = getRouteEpisodeLabel();
  const posterUrl = getPlayerPosterUrl();
  const payload = {
    topic: displayTopic,
    title: isPaused ? 'Paused on LookMovie2' : 'Playing on LookMovie2',
    message: episodeLabel ? `${title} - ${episodeLabel}` : title,
    tags: ['tv'],
    priority: 3,
    sequence_id: `${SCRIPT_ID}-player`,
    click: location.href,
    actions: buildPlayerActions(isPaused),
  };

  appState.ntfyLastNotificationAt = Date.now();

  sendPlayerNotificationPayload(displayTopic, payload, posterUrl)
    .then(() => setStatus('connected', `Updated Android player notification (${reason}).`))
    .catch((error) => {
      console.warn(`[${SCRIPT_ID}] Failed to publish ntfy player notification.`, error);
      setStatus('error', 'Could not publish Android player notification.');
    });

  return true;
}

function parseCommandFromJson(value) {
  const secret = String(appState.settings.ntfyCommandSecret || '').trim();
  if (secret && value.secret !== secret) {
    return null;
  }

  const command = String(value.command || value.action || '')
    .trim()
    .toLowerCase();

  if (!command) {
    return null;
  }

  if (command === 'seek') {
    const seconds = Number(value.seconds ?? value.by ?? value.value);
    return Number.isFinite(seconds) ? { command, seconds } : null;
  }

  if (command === 'volume') {
    const percent = Number(value.percent ?? value.value);
    return Number.isFinite(percent) ? { command, percent } : null;
  }

  return { command };
}

function parseCommand(message) {
  const text = String(message || '').trim();
  if (!text) {
    return null;
  }

  try {
    const parsed = JSON.parse(text);
    if (parsed && typeof parsed === 'object') {
      return parseCommandFromJson(parsed);
    }
  } catch (_error) {
    // Plain-text commands are the common path.
  }

  const secret = String(appState.settings.ntfyCommandSecret || '').trim();
  let commandText = text;

  if (secret) {
    if (commandText !== secret && !commandText.startsWith(`${secret} `)) {
      return null;
    }

    commandText = commandText.slice(secret.length).trim();
  }

  const [command = '', rawValue = ''] = commandText.split(/\s+/, 2);
  const normalizedCommand = command.toLowerCase();

  if (normalizedCommand === 'seek') {
    const seconds = Number(rawValue);
    return Number.isFinite(seconds) ? { command: normalizedCommand, seconds } : null;
  }

  if (normalizedCommand === 'volume') {
    const percent = Number(rawValue);
    return Number.isFinite(percent) ? { command: normalizedCommand, percent } : null;
  }

  return { command: normalizedCommand };
}

function runCommand(command) {
  switch (command.command) {
    case 'play':
      return playActiveVideo();
    case 'pause':
      return pauseActiveVideo();
    case 'toggle':
    case 'playpause':
    case 'play-pause':
      return toggleActiveVideoPlayback();
    case 'seek':
      return seekActiveVideoBy(command.seconds);
    case 'fullscreen':
    case 'fs':
      return toggleActiveVideoFullscreen();
    case 'next':
      return playNextShowEpisode();
    case 'mute':
      return setActiveVideoMuted(true);
    case 'unmute':
      return setActiveVideoMuted(false);
    case 'volume':
      return setActiveVideoVolume(command.percent);
    default:
      return false;
  }
}

function handleMessage(event) {
  let payload = null;

  try {
    payload = JSON.parse(event.data || '{}');
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to parse ntfy event.`, error);
    return;
  }

  if (!payload || payload.event !== 'message' || !payload.message) {
    return;
  }

  if (payload.id && payload.id === lastMessageId) {
    return;
  }

  lastMessageId = payload.id || '';

  if (!isVisibleDocument() || !isCurrentNtfyRemoteTab()) {
    const now = Date.now();
    if (now - lastIgnoredFocusMessageAt > 5000) {
      lastIgnoredFocusMessageAt = now;
      setStatus('connected', 'Another visible LookMovie tab owns the Android remote.');
    }
    return;
  }

  const command = parseCommand(payload.message);

  if (!command) {
    setStatus('connected', 'Ignored ntfy message.');
    return;
  }

  const handled = runCommand(command);
  if (handled) {
    window.setTimeout(() => publishPlayerNotification(command.command), 150);
  }

  setStatus(
    'connected',
    handled ? `Ran remote command: ${command.command}` : `No player handled: ${command.command}`
  );
}

export function stopNtfyRemote() {
  window.clearTimeout(reconnectTimer);
  reconnectTimer = 0;

  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }

  if (appState.ntfyRemoteClaimTimer) {
    window.clearInterval(appState.ntfyRemoteClaimTimer);
    appState.ntfyRemoteClaimTimer = 0;
  }

  releaseNtfyRemoteTab();
  setStatus('disabled', '');
}

export function startNtfyRemote() {
  window.clearTimeout(reconnectTimer);
  reconnectTimer = 0;

  if (!appState.settings.ntfyRemoteEnabled) {
    stopNtfyRemote();
    return false;
  }

  const subscribeUrl = buildSubscribeUrl();
  if (!subscribeUrl) {
    stopNtfyRemote();
    setStatus(
      'disabled',
      getTopicConfigurationError() || 'Add an ntfy topic to enable remote control.'
    );
    return false;
  }

  if (eventSource) {
    eventSource.close();
  }

  if (!appState.ntfyRemoteClaimTimer) {
    appState.ntfyRemoteClaimTimer = window.setInterval(refreshNtfyRemoteClaim, 5000);
  }

  if (!claimListenersInstalled) {
    claimListenersInstalled = true;
    window.addEventListener('focus', () => claimNtfyRemoteTab('focus'));
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        claimNtfyRemoteTab('visible');
      } else {
        releaseNtfyRemoteTab();
      }
    });
    window.addEventListener('pagehide', releaseNtfyRemoteTab);
  }

  setStatus('connecting', 'Connecting to ntfy.');
  eventSource = new EventSource(subscribeUrl);
  eventSource.onopen = () => setStatus('connected', 'Connected to ntfy.');
  eventSource.onmessage = handleMessage;
  eventSource.onerror = () => {
    setStatus('error', 'ntfy connection lost. Reconnecting soon.');
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }

    reconnectTimer = window.setTimeout(startNtfyRemote, 5000);
  };

  return true;
}

export function restartNtfyRemote() {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }

  return startNtfyRemote();
}
