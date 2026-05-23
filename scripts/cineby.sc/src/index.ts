/* eslint-disable */
// @ts-nocheck
import './meta';

const SCRIPT_ID = 'cineby-enhancer';
const STORAGE_KEY = `${SCRIPT_ID}:settings`;
const ACTIVE_TAB_KEY = `${SCRIPT_ID}:ntfy-active-tab`;
const ACTIVE_TAB_TTL_MS = 15000;
const ROUTE_POLL_MS = 750;
const TOPIC_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

const DEFAULT_SETTINGS = Object.freeze({
  autoNext: true,
  ntfyRemoteEnabled: false,
  ntfyServer: 'https://ntfy.sh',
  ntfyTopic: '',
  ntfyControlTopic: '',
  ntfyCommandSecret: '',
});

const state = {
  settings: loadSettings(),
  bootstrapped: false,
  lastKnownUrl: location.href,
  tabId: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,
  eventSource: null,
  reconnectTimer: 0,
  claimTimer: 0,
  lastMessageId: '',
  lastNotificationAt: 0,
  status: 'disabled',
  statusMessage: '',
};

function readSettingsSource() {
  if (typeof GM_getValue === 'function') {
    return GM_getValue(STORAGE_KEY, null);
  }

  return localStorage.getItem(STORAGE_KEY);
}

function writeSettingsSource(settings) {
  const value = JSON.stringify(settings);

  if (typeof GM_setValue === 'function') {
    GM_setValue(STORAGE_KEY, value);
    return;
  }

  localStorage.setItem(STORAGE_KEY, value);
}

function normalizeSettings(settings) {
  return {
    autoNext:
      typeof settings.autoNext === 'boolean' ? settings.autoNext : DEFAULT_SETTINGS.autoNext,
    ntfyRemoteEnabled:
      typeof settings.ntfyRemoteEnabled === 'boolean'
        ? settings.ntfyRemoteEnabled
        : DEFAULT_SETTINGS.ntfyRemoteEnabled,
    ntfyServer:
      typeof settings.ntfyServer === 'string' && settings.ntfyServer.trim()
        ? settings.ntfyServer.trim().replace(/\/+$/, '')
        : DEFAULT_SETTINGS.ntfyServer,
    ntfyTopic:
      typeof settings.ntfyTopic === 'string' && settings.ntfyTopic.trim()
        ? settings.ntfyTopic.trim()
        : DEFAULT_SETTINGS.ntfyTopic,
    ntfyControlTopic:
      typeof settings.ntfyControlTopic === 'string' && settings.ntfyControlTopic.trim()
        ? settings.ntfyControlTopic.trim()
        : DEFAULT_SETTINGS.ntfyControlTopic,
    ntfyCommandSecret:
      typeof settings.ntfyCommandSecret === 'string' && settings.ntfyCommandSecret.trim()
        ? settings.ntfyCommandSecret.trim()
        : DEFAULT_SETTINGS.ntfyCommandSecret,
  };
}

function loadSettings() {
  try {
    return normalizeSettings(JSON.parse(readSettingsSource() || '{}'));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to load settings.`, error);
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(nextSettings) {
  state.settings = normalizeSettings(nextSettings);
  writeSettingsSource(state.settings);
  renderPanel();
  restartNtfyRemote();
}

function setStatus(status, message = '') {
  state.status = status;
  state.statusMessage = message;
  renderPanel();
}

function waitForBody(callback) {
  if (document.body) {
    callback();
    return;
  }

  const timer = window.setInterval(() => {
    if (!document.body) {
      return;
    }

    window.clearInterval(timer);
    callback();
  }, 100);
}

function getActiveVideo() {
  const videos = Array.from(document.querySelectorAll('video')).filter((video) => {
    const rect = video.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  });

  return (
    videos.find((video) => !video.paused && !video.ended) ||
    videos.find((video) => video.readyState > 0) ||
    videos[0] ||
    null
  );
}

function playActiveVideo() {
  const video = getActiveVideo();
  if (!video) return false;
  video.play();
  return true;
}

function pauseActiveVideo() {
  const video = getActiveVideo();
  if (!video) return false;
  video.pause();
  return true;
}

function toggleActiveVideoPlayback() {
  const video = getActiveVideo();
  if (!video) return clickPlayerByLabel(/\b(play|pause)\b/i);

  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  return true;
}

function seekActiveVideoBy(seconds) {
  const video = getActiveVideo();
  if (!video || !Number.isFinite(seconds)) return false;

  const duration = Number.isFinite(video.duration) ? video.duration : Number.MAX_SAFE_INTEGER;
  video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  return true;
}

function setActiveVideoVolume(percent) {
  const video = getActiveVideo();
  if (!video || !Number.isFinite(percent)) return false;

  video.volume = Math.max(0, Math.min(1, percent / 100));
  video.muted = false;
  return true;
}

function setActiveVideoMuted(muted) {
  const video = getActiveVideo();
  if (!video) return false;

  video.muted = !!muted;
  return true;
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    return true;
  }

  const target =
    getActiveVideo() ||
    document.querySelector('iframe') ||
    document.querySelector('[class*="player" i], [id*="player" i]');

  if (!target || typeof target.requestFullscreen !== 'function') {
    return false;
  }

  target.requestFullscreen();
  return true;
}

function getControlText(element) {
  return `${element.textContent || ''} ${element.getAttribute('aria-label') || ''} ${
    element.getAttribute('title') || ''
  }`.replace(/\s+/g, ' ');
}

function isVisibleElement(element) {
  if (!element || typeof element.getBoundingClientRect !== 'function') return false;
  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.opacity !== '0'
  );
}

function clickPlayerByLabel(pattern) {
  const control = Array.from(
    document.querySelectorAll('button, a, [role="button"], [aria-label], [title]')
  ).find((element) => isVisibleElement(element) && pattern.test(getControlText(element)));

  if (!control) {
    return false;
  }

  control.click();
  return true;
}

function parseEpisodeUrl(url) {
  try {
    const parsed = new URL(url, location.origin);
    const parts = parsed.pathname.split('/').filter(Boolean);
    const tvIndex = parts.findIndex((part) => part === 'tv');

    if (tvIndex < 0) return null;

    const id = Number(parts[tvIndex + 1]);
    const season = Number(parts[tvIndex + 2]);
    const episode = Number(parts[tvIndex + 3]);

    if (!id || !season || !episode) return null;

    return {
      href: parsed.href,
      localePrefix: parts.slice(0, tvIndex),
      id,
      season,
      episode,
    };
  } catch (_error) {
    return null;
  }
}

function buildEpisodeHref(current, season, episode) {
  const parts = [
    ...current.localePrefix,
    'tv',
    String(current.id),
    String(season),
    String(episode),
  ];
  const url = new URL(`/${parts.join('/')}`, location.origin);
  url.searchParams.set('play', 'true');
  return url.href;
}

function findNextEpisodeLink(current) {
  const next = Array.from(document.querySelectorAll('a[href*="/tv/"]'))
    .map((link) => parseEpisodeUrl(link.getAttribute('href')))
    .filter((episode) => {
      if (!episode || episode.id !== current.id) return false;
      if (episode.season > current.season) return true;
      return episode.season === current.season && episode.episode > current.episode;
    })
    .sort((left, right) => left.season - right.season || left.episode - right.episode)[0];

  return next?.href || '';
}

function playNextEpisode() {
  const current = parseEpisodeUrl(location.href);
  if (!current) return false;

  if (
    clickPlayerByLabel(/\b(next|next episode|episode next)\b/i) ||
    clickPlayerByLabel(/\b(skip)\b/i)
  ) {
    return true;
  }

  location.href =
    findNextEpisodeLink(current) || buildEpisodeHref(current, current.season, current.episode + 1);
  return true;
}

function attachVideo(video) {
  if (!video || video._cinebyEnhancerAttached) return;

  video._cinebyEnhancerAttached = true;
  video.addEventListener('play', () => publishPlayerNotification('play'));
  video.addEventListener('pause', () => publishPlayerNotification('pause'));
  video.addEventListener('ended', () => {
    publishPlayerNotification('ended');
    if (state.settings.autoNext) {
      window.setTimeout(playNextEpisode, 900);
    }
  });
}

function scanVideos() {
  document.querySelectorAll('video').forEach(attachVideo);
}

function watchVideos() {
  waitForBody(() => {
    scanVideos();

    const observer = new MutationObserver(scanVideos);
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

function normalizeTopic(topic) {
  return String(topic || '')
    .trim()
    .replace(/^\/+|\/+$/g, '');
}

function isValidTopic(topic) {
  return TOPIC_PATTERN.test(normalizeTopic(topic));
}

function getDisplayTopic() {
  return normalizeTopic(state.settings.ntfyTopic);
}

function getControlTopic() {
  return (
    normalizeTopic(state.settings.ntfyControlTopic) ||
    (getDisplayTopic() ? `${getDisplayTopic()}-controls` : '')
  );
}

function getTopicConfigurationError() {
  const displayTopic = getDisplayTopic();
  const controlTopic = getControlTopic();

  if (!isValidTopic(displayTopic)) return 'Add a valid display topic.';
  if (!isValidTopic(controlTopic)) return 'Add a valid control topic.';

  return '';
}

function getNtfyServer() {
  return String(state.settings.ntfyServer || DEFAULT_SETTINGS.ntfyServer).replace(/\/+$/, '');
}

function getPublishUrl(topic) {
  return `${getNtfyServer()}/${encodeURIComponent(topic)}`;
}

function buildSubscribeUrl() {
  const topic = getControlTopic();
  if (!topic || !isValidTopic(topic)) return '';

  const url = new URL(`${getPublishUrl(topic)}/sse`);
  url.searchParams.set('since', String(Math.floor(Date.now() / 1000)));
  return url.href;
}

function readActiveTabClaim() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ACTIVE_TAB_KEY) || 'null');
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (_error) {
    return null;
  }
}

function isCurrentRemoteTab() {
  const claim = readActiveTabClaim();
  if (!claim || !claim.tabId || claim.tabId === state.tabId) return true;
  return Date.now() - Number(claim.updatedAt || 0) > ACTIVE_TAB_TTL_MS;
}

function claimRemoteTab(reason = 'activity') {
  if (!state.settings.ntfyRemoteEnabled || document.visibilityState === 'hidden') {
    return false;
  }

  try {
    localStorage.setItem(
      ACTIVE_TAB_KEY,
      JSON.stringify({
        tabId: state.tabId,
        href: location.href,
        title: getPlayerTitle(),
        updatedAt: Date.now(),
      })
    );
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to claim ntfy remote tab.`, error);
  }

  setStatus('connected', `This tab owns remote (${reason}).`);
  return true;
}

function releaseRemoteTab() {
  const claim = readActiveTabClaim();
  if (claim?.tabId === state.tabId) {
    localStorage.removeItem(ACTIVE_TAB_KEY);
  }
}

function buildCommandBody(command) {
  const secret = String(state.settings.ntfyCommandSecret || '').trim();
  return secret ? `${secret} ${command}` : command;
}

function buildAction(label, command) {
  return {
    action: 'http',
    label,
    url: getPublishUrl(getControlTopic()),
    method: 'POST',
    body: buildCommandBody(command),
    clear: false,
  };
}

function getPlayerTitle() {
  const route = parseEpisodeUrl(location.href);
  const heading =
    document.querySelector('h1')?.textContent ||
    document.querySelector('[class*="title" i]')?.textContent ||
    document.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
    document.title ||
    'Cineby';

  const title = String(heading).replace(/\s+/g, ' ').trim() || 'Cineby';
  return route
    ? `${title} - S${String(route.season).padStart(2, '0')}E${String(route.episode).padStart(2, '0')}`
    : title;
}

function getPosterUrl() {
  const video = getActiveVideo();
  const metaImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
  const image = document
    .querySelector('img[src*="image.tmdb"], img[src*="wsrv.nl"]')
    ?.getAttribute('src');

  try {
    return new URL(video?.getAttribute('poster') || metaImage || image || '', location.origin).href;
  } catch (_error) {
    return '';
  }
}

function sendJsonRequest(url, body, method = 'POST') {
  const payload = JSON.stringify(body);

  return fetch(url, {
    method,
    body: payload,
    headers: { 'Content-Type': 'application/json' },
  }).catch((fetchError) => {
    if (typeof GM_xmlhttpRequest !== 'function') {
      throw fetchError;
    }

    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method,
        url,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
        onload(response) {
          if (response.status >= 200 && response.status < 300) {
            resolve(response);
          } else {
            reject(new Error(`ntfy request failed with HTTP ${response.status}`));
          }
        },
        onerror: reject,
      });
    });
  });
}

function publishPlayerNotification(reason = 'update') {
  if (!state.settings.ntfyRemoteEnabled || !claimRemoteTab(reason)) {
    return false;
  }

  const displayTopic = getDisplayTopic();
  const controlTopic = getControlTopic();
  if (!displayTopic || !controlTopic || getTopicConfigurationError()) {
    return false;
  }

  const video = getActiveVideo();
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
      buildAction('Play/Pause', 'toggle'),
      buildAction('Next', 'next'),
      buildAction('-30s', 'seek -30'),
      buildAction('+30s', 'seek 30'),
      buildAction('Fullscreen', 'fullscreen'),
    ],
  };

  state.lastNotificationAt = Date.now();

  sendJsonRequest(getNtfyServer(), payload)
    .then(() => setStatus('connected', `Updated ntfy notification (${reason}).`))
    .catch((error) => {
      console.warn(`[${SCRIPT_ID}] Failed to publish ntfy notification.`, error);
      setStatus('error', 'Could not publish ntfy notification.');
    });

  return true;
}

function parseCommandFromJson(value) {
  const secret = String(state.settings.ntfyCommandSecret || '').trim();
  if (secret && value.secret !== secret) return null;

  const command = String(value.command || value.action || '')
    .trim()
    .toLowerCase();
  if (!command) return null;

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
  if (!text) return null;

  try {
    const parsed = JSON.parse(text);
    if (parsed && typeof parsed === 'object') {
      return parseCommandFromJson(parsed);
    }
  } catch (_error) {
    // Text commands are the normal ntfy action path.
  }

  const secret = String(state.settings.ntfyCommandSecret || '').trim();
  let commandText = text;

  if (secret) {
    if (commandText !== secret && !commandText.startsWith(`${secret} `)) return null;
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
      return toggleFullscreen();
    case 'next':
      return playNextEpisode();
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

function handleNtfyMessage(event) {
  let payload = null;

  try {
    payload = JSON.parse(event.data || '{}');
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to parse ntfy event.`, error);
    return;
  }

  if (!payload || payload.event !== 'message' || !payload.message) return;
  if (payload.id && payload.id === state.lastMessageId) return;

  state.lastMessageId = payload.id || '';

  if (document.visibilityState === 'hidden' || !isCurrentRemoteTab()) {
    setStatus('connected', 'Another visible Cineby tab owns the remote.');
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
    handled ? `Ran: ${command.command}` : `No player handled: ${command.command}`
  );
}

function stopNtfyRemote() {
  window.clearTimeout(state.reconnectTimer);
  state.reconnectTimer = 0;

  if (state.eventSource) {
    state.eventSource.close();
    state.eventSource = null;
  }

  if (state.claimTimer) {
    window.clearInterval(state.claimTimer);
    state.claimTimer = 0;
  }

  releaseRemoteTab();
  setStatus('disabled', '');
}

function startNtfyRemote() {
  window.clearTimeout(state.reconnectTimer);
  state.reconnectTimer = 0;

  if (!state.settings.ntfyRemoteEnabled) {
    stopNtfyRemote();
    return false;
  }

  const subscribeUrl = buildSubscribeUrl();
  if (!subscribeUrl) {
    stopNtfyRemote();
    setStatus('disabled', getTopicConfigurationError() || 'Add an ntfy topic.');
    return false;
  }

  if (state.eventSource) {
    state.eventSource.close();
  }

  if (!state.claimTimer) {
    state.claimTimer = window.setInterval(() => {
      if (isCurrentRemoteTab()) {
        claimRemoteTab('refresh');
      }
    }, 5000);
  }

  setStatus('connecting', 'Connecting to ntfy.');
  state.eventSource = new EventSource(subscribeUrl);
  state.eventSource.onopen = () => setStatus('connected', 'Connected to ntfy.');
  state.eventSource.onmessage = handleNtfyMessage;
  state.eventSource.onerror = () => {
    setStatus('error', 'ntfy connection lost. Reconnecting soon.');
    if (state.eventSource) {
      state.eventSource.close();
      state.eventSource = null;
    }

    state.reconnectTimer = window.setTimeout(startNtfyRemote, 5000);
  };

  return true;
}

function restartNtfyRemote() {
  if (state.eventSource) {
    state.eventSource.close();
    state.eventSource = null;
  }

  return startNtfyRemote();
}

function injectStyles() {
  if (document.getElementById(`${SCRIPT_ID}-style`)) return;

  const style = document.createElement('style');
  style.id = `${SCRIPT_ID}-style`;
  style.textContent = `
    #${SCRIPT_ID}-panel {
      position: fixed;
      right: 16px;
      bottom: 16px;
      z-index: 2147483647;
      width: min(330px, calc(100vw - 32px));
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 8px;
      background: rgba(9, 12, 18, 0.92);
      color: #f8fafc;
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.42);
      font: 13px/1.35 Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      backdrop-filter: blur(18px);
    }

    #${SCRIPT_ID}-panel button,
    #${SCRIPT_ID}-panel input {
      font: inherit;
    }

    .${SCRIPT_ID}-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 10px 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .${SCRIPT_ID}-title {
      margin: 0;
      font-weight: 750;
      font-size: 13px;
    }

    .${SCRIPT_ID}-body {
      display: grid;
      gap: 10px;
      padding: 12px;
    }

    .${SCRIPT_ID}-collapsed .${SCRIPT_ID}-body {
      display: none;
    }

    .${SCRIPT_ID}-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .${SCRIPT_ID}-label {
      display: grid;
      gap: 3px;
      min-width: 0;
    }

    .${SCRIPT_ID}-label strong {
      font-size: 12px;
    }

    .${SCRIPT_ID}-label span,
    .${SCRIPT_ID}-status {
      color: #aeb7c8;
      font-size: 11px;
    }

    .${SCRIPT_ID}-input {
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 6px;
      padding: 7px 8px;
      background: rgba(255, 255, 255, 0.06);
      color: #f8fafc;
      outline: none;
    }

    .${SCRIPT_ID}-input:focus {
      border-color: rgba(96, 165, 250, 0.75);
    }

    .${SCRIPT_ID}-button {
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 6px;
      padding: 7px 9px;
      background: rgba(255, 255, 255, 0.07);
      color: #f8fafc;
      cursor: pointer;
    }

    .${SCRIPT_ID}-button:hover {
      background: rgba(255, 255, 255, 0.12);
    }

    .${SCRIPT_ID}-switch {
      position: relative;
      width: 40px;
      height: 22px;
      flex: 0 0 auto;
    }

    .${SCRIPT_ID}-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .${SCRIPT_ID}-slider {
      position: absolute;
      inset: 0;
      border-radius: 999px;
      background: rgba(148, 163, 184, 0.28);
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .${SCRIPT_ID}-slider::before {
      content: "";
      position: absolute;
      width: 18px;
      height: 18px;
      left: 2px;
      top: 2px;
      border-radius: 999px;
      background: #fff;
      transition: transform 0.15s ease;
    }

    .${SCRIPT_ID}-switch input:checked + .${SCRIPT_ID}-slider {
      background: #2563eb;
    }

    .${SCRIPT_ID}-switch input:checked + .${SCRIPT_ID}-slider::before {
      transform: translateX(18px);
    }
  `;
  document.head.appendChild(style);
}

function createToggle(settingKey, title, copy) {
  const row = document.createElement('label');
  row.className = `${SCRIPT_ID}-row`;
  row.innerHTML = `
    <span class="${SCRIPT_ID}-label">
      <strong>${title}</strong>
      <span>${copy}</span>
    </span>
    <span class="${SCRIPT_ID}-switch">
      <input type="checkbox" ${state.settings[settingKey] ? 'checked' : ''}>
      <span class="${SCRIPT_ID}-slider"></span>
    </span>
  `;

  row.querySelector('input').addEventListener('change', (event) => {
    saveSettings({
      ...state.settings,
      [settingKey]: event.currentTarget.checked,
    });
  });

  return row;
}

function createInput(settingKey, placeholder, type = 'text') {
  const input = document.createElement('input');
  input.className = `${SCRIPT_ID}-input`;
  input.type = type;
  input.placeholder = placeholder;
  input.value = state.settings[settingKey] || '';
  input.addEventListener('change', () => {
    saveSettings({
      ...state.settings,
      [settingKey]: input.value,
    });
  });
  return input;
}

function renderPanel() {
  if (!document.body) return;

  injectStyles();

  const wasCollapsed = document
    .getElementById(`${SCRIPT_ID}-panel`)
    ?.classList.contains(`${SCRIPT_ID}-collapsed`);
  document.getElementById(`${SCRIPT_ID}-panel`)?.remove();

  const panel = document.createElement('section');
  panel.id = `${SCRIPT_ID}-panel`;
  if (wasCollapsed) panel.classList.add(`${SCRIPT_ID}-collapsed`);

  const head = document.createElement('div');
  head.className = `${SCRIPT_ID}-head`;
  head.innerHTML = `
    <p class="${SCRIPT_ID}-title">Cineby</p>
    <button type="button" class="${SCRIPT_ID}-button" title="Collapse">^</button>
  `;
  head.querySelector('button').addEventListener('click', () => {
    panel.classList.toggle(`${SCRIPT_ID}-collapsed`);
    head.querySelector('button').textContent = panel.classList.contains(`${SCRIPT_ID}-collapsed`)
      ? 'v'
      : '^';
  });

  const body = document.createElement('div');
  body.className = `${SCRIPT_ID}-body`;
  body.appendChild(
    createToggle('autoNext', 'Auto next', 'Go to the next episode when playback ends.')
  );
  body.appendChild(
    createToggle(
      'ntfyRemoteEnabled',
      'ntfy remote',
      'Publish player notifications and accept commands.'
    )
  );
  body.appendChild(createInput('ntfyTopic', 'Display topic'));
  body.appendChild(createInput('ntfyControlTopic', 'Control topic (defaults to display-controls)'));
  body.appendChild(createInput('ntfyCommandSecret', 'Optional command secret', 'password'));

  const controls = document.createElement('div');
  controls.className = `${SCRIPT_ID}-row`;
  controls.innerHTML = `
    <button type="button" class="${SCRIPT_ID}-button">Notify</button>
    <button type="button" class="${SCRIPT_ID}-button">Next</button>
    <span class="${SCRIPT_ID}-status">${state.status}${state.statusMessage ? `: ${state.statusMessage}` : ''}</span>
  `;
  controls.children[0].addEventListener('click', () => publishPlayerNotification('manual'));
  controls.children[1].addEventListener('click', playNextEpisode);
  body.appendChild(controls);

  panel.appendChild(head);
  panel.appendChild(body);
  document.body.appendChild(panel);
}

function watchNavigation() {
  window.setInterval(() => {
    if (location.href === state.lastKnownUrl) return;

    state.lastKnownUrl = location.href;
    scanVideos();
    renderPanel();

    if (state.settings.ntfyRemoteEnabled) {
      window.setTimeout(() => publishPlayerNotification('navigation'), 500);
    }
  }, ROUTE_POLL_MS);
}

function installLifecycleListeners() {
  window.addEventListener('focus', () => claimRemoteTab('focus'));
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      claimRemoteTab('visible');
    } else {
      releaseRemoteTab();
    }
  });
  window.addEventListener('pagehide', releaseRemoteTab);
}

function bootstrap() {
  if (state.bootstrapped) return;

  state.bootstrapped = true;
  watchVideos();
  watchNavigation();
  installLifecycleListeners();
  waitForBody(() => {
    renderPanel();
    startNtfyRemote();
    window.setTimeout(() => publishPlayerNotification('ready'), 1500);
  });
}

bootstrap();
