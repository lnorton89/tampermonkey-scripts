// Remote control over ntfy (https://ntfy.sh): the script subscribes to a "control" topic and runs
// the commands posted there, and publishes now-playing notifications with action buttons to a
// "display" topic. When several tabs are open, the visible tab that last claimed the remote is the
// only one that obeys commands.

import { isRecord, type UnknownRecord } from './values';

export const DEFAULT_NTFY_SERVER = 'https://ntfy.sh';
const TOPIC_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

export interface NtfyConfig {
  enabled: boolean;
  server: string;
  /** Topic that notifications are published to. */
  topic: string;
  /** Topic that commands are read from. Defaults to `<topic>-controls`. */
  controlTopic: string;
  /** When set, commands must start with this secret. */
  secret: string;
}

export type NtfyStatus = 'disabled' | 'connecting' | 'connected' | 'error';

export interface RemoteCommand {
  command: string;
  seconds?: number;
  percent?: number;
}

// --- Topics and URLs -------------------------------------------------------------------------

export function normalizeTopic(topic: unknown): string {
  return (typeof topic === 'string' ? topic : '').trim().replace(/^\/+|\/+$/g, '');
}

export function isValidTopic(topic: unknown): boolean {
  return TOPIC_PATTERN.test(normalizeTopic(topic));
}

export function getTopicValidationMessage(topic: unknown, label: string): string {
  const normalized = normalizeTopic(topic);
  if (!normalized) {
    return `${label} topic is required.`;
  }

  if (normalized.length > 64) {
    return `${label} topic must be 64 characters or fewer.`;
  }

  return `${label} topic can only use letters, numbers, hyphens, and underscores.`;
}

export function getServerUrl(config: NtfyConfig): string {
  return (config.server.trim() || DEFAULT_NTFY_SERVER).replace(/\/+$/, '');
}

export function getDisplayTopic(config: NtfyConfig): string {
  return normalizeTopic(config.topic);
}

export function getControlTopic(config: NtfyConfig): string {
  const configured = normalizeTopic(config.controlTopic);
  if (configured) {
    return configured;
  }

  const display = getDisplayTopic(config);
  return display ? `${display}-controls` : '';
}

/** A message describing what's wrong with the configured topics, or '' when both are valid. */
export function getTopicConfigurationError(config: NtfyConfig): string {
  const display = getDisplayTopic(config);
  if (!isValidTopic(display)) {
    return getTopicValidationMessage(display, 'Display');
  }

  const control = getControlTopic(config);
  if (!isValidTopic(control)) {
    return getTopicValidationMessage(control, 'Control');
  }

  return '';
}

export function getPublishUrl(config: NtfyConfig, topic: string): string {
  return `${getServerUrl(config)}/${encodeURIComponent(topic)}`;
}

/** Server-sent-events URL for the control topic, starting from now. '' when it isn't valid. */
export function buildSubscribeUrl(config: NtfyConfig, now = Date.now()): string {
  const topic = getControlTopic(config);
  if (!isValidTopic(topic)) {
    return '';
  }

  const url = new URL(`${getServerUrl(config)}/${encodeURIComponent(topic)}/sse`);
  url.searchParams.set('since', String(Math.floor(now / 1000)));
  return url.toString();
}

export function buildCommandBody(config: NtfyConfig, command: string): string {
  const secret = config.secret.trim();
  return secret ? `${secret} ${command}` : command;
}

/** An ntfy notification action button that posts `command` to the control topic. */
export function buildAction(config: NtfyConfig, label: string, command: string): UnknownRecord {
  return {
    action: 'http',
    label,
    url: getPublishUrl(config, getControlTopic(config)),
    method: 'POST',
    body: buildCommandBody(config, command),
    clear: false,
  };
}

// --- Commands --------------------------------------------------------------------------------

function withNumber(
  command: string,
  key: 'seconds' | 'percent',
  value: unknown
): RemoteCommand | null {
  const number = Number(value);
  return Number.isFinite(number) ? { command, [key]: number } : null;
}

function parseCommandFromJson(value: UnknownRecord, secret: string): RemoteCommand | null {
  if (secret && value.secret !== secret) {
    return null;
  }

  const rawCommand = value.command ?? value.action ?? '';
  const command = (typeof rawCommand === 'string' ? rawCommand : '').trim().toLowerCase();
  if (!command) {
    return null;
  }

  if (command === 'seek') {
    return withNumber(command, 'seconds', value.seconds ?? value.by ?? value.value);
  }

  if (command === 'volume') {
    return withNumber(command, 'percent', value.percent ?? value.value);
  }

  return { command };
}

/**
 * Parses a command message. Accepts plain text (`seek -10`, `secret volume 50`) or JSON
 * (`{"command":"seek","seconds":-10,"secret":"..."}`). Returns null when the secret doesn't match
 * or the message isn't a command.
 */
export function parseCommand(message: unknown, secretSetting: string): RemoteCommand | null {
  const text = (typeof message === 'string' ? message : '').trim();
  if (!text) {
    return null;
  }

  const secret = secretSetting.trim();

  try {
    const parsed: unknown = JSON.parse(text);
    if (isRecord(parsed)) {
      return parseCommandFromJson(parsed, secret);
    }
  } catch {
    // Plain-text commands are the common path.
  }

  let commandText = text;
  if (secret) {
    if (commandText !== secret && !commandText.startsWith(`${secret} `)) {
      return null;
    }

    commandText = commandText.slice(secret.length).trim();
  }

  const [rawCommand = '', rawValue = ''] = commandText.split(/\s+/, 2);
  const command = rawCommand.toLowerCase();

  if (command === 'seek') {
    return withNumber(command, 'seconds', rawValue);
  }

  if (command === 'volume') {
    return withNumber(command, 'percent', rawValue);
  }

  return { command };
}

export interface RemoteCommandHandlers {
  play(): boolean;
  pause(): boolean;
  toggle(): boolean;
  seekBy(seconds: number): boolean;
  fullscreen(): boolean;
  next(): boolean;
  setMuted(muted: boolean): boolean;
  setVolume(percent: number): boolean;
}

/** Runs a parsed command. Returns false when nothing handled it. */
export function runRemoteCommand(command: RemoteCommand, handlers: RemoteCommandHandlers): boolean {
  switch (command.command) {
    case 'play':
      return handlers.play();
    case 'pause':
      return handlers.pause();
    case 'toggle':
    case 'playpause':
    case 'play-pause':
      return handlers.toggle();
    case 'seek':
      return command.seconds !== undefined && handlers.seekBy(command.seconds);
    case 'fullscreen':
    case 'fs':
      return handlers.fullscreen();
    case 'next':
      return handlers.next();
    case 'mute':
      return handlers.setMuted(true);
    case 'unmute':
      return handlers.setMuted(false);
    case 'volume':
      return command.percent !== undefined && handlers.setVolume(command.percent);
    default:
      return false;
  }
}

// --- Requests --------------------------------------------------------------------------------

/** Sends JSON with fetch, falling back to GM_xmlhttpRequest for servers that don't allow CORS. */
export async function sendJsonRequest(url: string, body: unknown, method = 'POST'): Promise<void> {
  const data = JSON.stringify(body);
  const headers = { 'Content-Type': 'application/json' };

  try {
    const response = await fetch(url, { method, body: data, headers });
    if (!response.ok) {
      throw new Error(`ntfy request failed with HTTP ${String(response.status)}`);
    }
  } catch (fetchError) {
    if (typeof GM_xmlhttpRequest !== 'function') {
      throw fetchError;
    }

    await new Promise<void>((resolve, reject) => {
      GM_xmlhttpRequest({
        method: method as 'POST',
        url,
        data,
        headers,
        onload(response) {
          if (response.status >= 200 && response.status < 300) {
            resolve();
            return;
          }

          reject(new Error(`ntfy request failed with HTTP ${String(response.status)}`));
        },
        onerror() {
          reject(new Error('ntfy request failed'));
        },
      });
    });
  }
}

// --- Tab ownership ---------------------------------------------------------------------------

export interface TabClaim {
  tabId: string;
  href: string;
  title: string;
  updatedAt: number;
}

export function createTabId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

/** Tracks which tab owns the remote through a localStorage entry every tab of the site can see. */
export function createTabClaimStore(key: string, ttlMs: number, tabId = createTabId()) {
  function read(): Partial<TabClaim> | null {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(key) ?? 'null');
      return isRecord(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  return {
    tabId,
    read,
    /** True when this tab owns the remote, nobody does, or the owner's claim expired. */
    isCurrent(now = Date.now()): boolean {
      const claim = read();
      if (!claim?.tabId || claim.tabId === tabId) {
        return true;
      }

      return now - Number(claim.updatedAt ?? 0) > ttlMs;
    },
    write(title: string): void {
      const claim: TabClaim = { tabId, href: location.href, title, updatedAt: Date.now() };
      localStorage.setItem(key, JSON.stringify(claim));
    },
    clear(): void {
      if (read()?.tabId === tabId) {
        localStorage.removeItem(key);
      }
    },
  };
}

// --- Remote controller -----------------------------------------------------------------------

export interface NtfyRemoteOptions {
  scriptId: string;
  /** Used in status messages, e.g. "Another visible Cineby tab owns the remote." */
  siteName: string;
  tabClaimKey: string;
  tabClaimTtlMs?: number;
  getConfig(): NtfyConfig;
  /** Extra condition for this tab to take the remote, e.g. "has a video". */
  canClaim?(): boolean;
  getTitle(): string;
  handlers: RemoteCommandHandlers;
  onStatus(status: NtfyStatus, message: string): void;
  /** Called shortly after a command ran, typically to publish an updated notification. */
  onCommandHandled?: (command: RemoteCommand) => void;
}

const RECONNECT_MS = 5000;
const CLAIM_REFRESH_MS = 5000;
const IGNORED_STATUS_THROTTLE_MS = 5000;

export function createNtfyRemote(options: NtfyRemoteOptions) {
  const claims = createTabClaimStore(options.tabClaimKey, options.tabClaimTtlMs ?? 15000);
  let eventSource: EventSource | null = null;
  let reconnectTimer = 0;
  let claimTimer = 0;
  let lastMessageId = '';
  let lastIgnoredAt = 0;
  let listenersInstalled = false;

  const isVisible = (): boolean => document.visibilityState !== 'hidden';
  const canClaim = (): boolean => options.canClaim?.() ?? true;

  function writeClaim(): void {
    try {
      claims.write(options.getTitle());
    } catch (error) {
      console.warn(`[${options.scriptId}] Failed to claim ntfy remote tab.`, error);
    }
  }

  function claim(reason = 'activity'): boolean {
    if (!options.getConfig().enabled || !isVisible() || !canClaim()) {
      return false;
    }

    writeClaim();
    options.onStatus('connected', `This tab controls the remote (${reason}).`);
    return true;
  }

  function release(): void {
    claims.clear();
  }

  function refreshClaim(): void {
    if (options.getConfig().enabled && claims.isCurrent() && isVisible() && canClaim()) {
      writeClaim();
    }
  }

  function installListeners(): void {
    if (listenersInstalled) {
      return;
    }

    listenersInstalled = true;
    window.addEventListener('focus', () => claim('focus'));
    document.addEventListener('visibilitychange', () => {
      if (isVisible()) {
        claim('visible');
      } else {
        release();
      }
    });
    window.addEventListener('pagehide', release);
  }

  function handleMessage(event: MessageEvent<unknown>): void {
    let payload: unknown;
    try {
      payload = JSON.parse(typeof event.data === 'string' ? event.data : '{}');
    } catch (error) {
      console.warn(`[${options.scriptId}] Failed to parse ntfy event.`, error);
      return;
    }

    if (!isRecord(payload) || payload.event !== 'message' || typeof payload.message !== 'string') {
      return;
    }

    const id = typeof payload.id === 'string' ? payload.id : '';
    if (id && id === lastMessageId) {
      return;
    }

    lastMessageId = id;

    if (!isVisible() || !claims.isCurrent()) {
      const now = Date.now();
      if (now - lastIgnoredAt > IGNORED_STATUS_THROTTLE_MS) {
        lastIgnoredAt = now;
        options.onStatus('connected', `Another visible ${options.siteName} tab owns the remote.`);
      }
      return;
    }

    const command = parseCommand(payload.message, options.getConfig().secret);
    if (!command) {
      options.onStatus('connected', 'Ignored ntfy message.');
      return;
    }

    const handled = runRemoteCommand(command, options.handlers);
    if (handled && options.onCommandHandled) {
      const onHandled = options.onCommandHandled;
      window.setTimeout(() => {
        onHandled(command);
      }, 150);
    }

    options.onStatus(
      'connected',
      handled ? `Ran remote command: ${command.command}` : `No player handled: ${command.command}`
    );
  }

  function closeSource(): void {
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
  }

  function stop(): void {
    window.clearTimeout(reconnectTimer);
    reconnectTimer = 0;
    closeSource();

    if (claimTimer) {
      window.clearInterval(claimTimer);
      claimTimer = 0;
    }

    release();
    options.onStatus('disabled', '');
  }

  function start(): boolean {
    window.clearTimeout(reconnectTimer);
    reconnectTimer = 0;

    const config = options.getConfig();
    if (!config.enabled) {
      stop();
      return false;
    }

    const subscribeUrl = buildSubscribeUrl(config);
    if (!subscribeUrl) {
      stop();
      options.onStatus(
        'disabled',
        getTopicConfigurationError(config) || 'Add an ntfy topic to enable remote control.'
      );
      return false;
    }

    closeSource();

    if (!claimTimer) {
      claimTimer = window.setInterval(refreshClaim, CLAIM_REFRESH_MS);
    }

    installListeners();

    options.onStatus('connecting', 'Connecting to ntfy.');
    const source = new EventSource(subscribeUrl);
    eventSource = source;
    source.onopen = () => {
      options.onStatus('connected', 'Connected to ntfy.');
    };
    source.onmessage = handleMessage;
    source.onerror = () => {
      options.onStatus('error', 'ntfy connection lost. Reconnecting soon.');
      closeSource();
      reconnectTimer = window.setTimeout(start, RECONNECT_MS);
    };

    return true;
  }

  return {
    tabId: claims.tabId,
    start,
    stop,
    restart(): boolean {
      closeSource();
      return start();
    },
    claim,
    release,
    isCurrentTab: (): boolean => claims.isCurrent(),
  };
}

export type NtfyRemote = ReturnType<typeof createNtfyRemote>;
