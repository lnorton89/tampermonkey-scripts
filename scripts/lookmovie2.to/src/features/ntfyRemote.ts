import {
  buildAction,
  createNtfyRemote,
  getControlTopic,
  getDisplayTopic,
  getPublishUrl,
  getServerUrl,
  getTopicConfigurationError,
  sendJsonRequest,
  type NtfyConfig,
  type NtfyStatus,
  type UnknownRecord,
} from '@userscripts/core';
import {
  NTFY_REMOTE_ACTIVE_TAB_KEY,
  NTFY_REMOTE_ACTIVE_TAB_TTL_MS,
  SCRIPT_ID,
} from '../config/constants';
import { appState } from '../core/state';
import type { WatchlistEntry } from '../core/storage';
import {
  decodeInlineJsString,
  getElementImageUrl,
  normalizeImageUrl,
  readWindowRecord,
  readWindowValue,
  toText,
} from '../core/utils';
import { isMoviePlayPage } from './pages';
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

interface NotificationPayload {
  topic: string;
  title: string;
  message: string;
  tags: string[];
  priority: number;
  sequence_id: string;
  click: string;
  actions: UnknownRecord[];
}

const showPosterCache = new Map<string, string>();

function setStatus(status: NtfyStatus, message = ''): void {
  appState.ntfyRemoteStatus = status;
  appState.ntfyRemoteMessage = message;
  notifyUiChanged();
}

function getConfig(): NtfyConfig {
  const { settings } = appState;
  return {
    enabled: settings.ntfyRemoteEnabled,
    server: settings.ntfyServer,
    topic: settings.ntfyTopic,
    controlTopic: settings.ntfyControlTopic,
    secret: settings.ntfyCommandSecret,
  };
}

// Subscribing, reconnecting, tab ownership and command parsing are shared with other scripts.
// Handlers are wrapped so the player module can finish loading first (the two import each other).
const remote = createNtfyRemote({
  scriptId: SCRIPT_ID,
  siteName: 'LookMovie',
  tabClaimKey: NTFY_REMOTE_ACTIVE_TAB_KEY,
  tabClaimTtlMs: NTFY_REMOTE_ACTIVE_TAB_TTL_MS,
  getConfig,
  canClaim: () => !!getActiveVideo(),
  getTitle: () => getPlayerTitle(),
  handlers: {
    play: () => playActiveVideo(),
    pause: () => pauseActiveVideo(),
    toggle: () => toggleActiveVideoPlayback(),
    seekBy: (seconds) => seekActiveVideoBy(seconds),
    fullscreen: () => toggleActiveVideoFullscreen(),
    next: () => playNextShowEpisode(),
    setMuted: (muted) => setActiveVideoMuted(muted),
    setVolume: (percent) => setActiveVideoVolume(percent),
  },
  onStatus: setStatus,
  onCommandHandled: (command) => {
    publishPlayerNotification(command.command);
  },
});

export function isCurrentNtfyRemoteTab(): boolean {
  return remote.isCurrentTab();
}

export function claimNtfyRemoteTab(reason = 'activity'): boolean {
  return remote.claim(reason);
}

export function releaseNtfyRemoteTab(): void {
  remote.release();
}

function isShowPlayPage(): boolean {
  return location.pathname.startsWith('/shows/play/');
}

function getShowStorage(): UnknownRecord {
  return readWindowRecord('show_storage', 'show');
}

function getMovieStorage(): UnknownRecord {
  return readWindowRecord('movie_storage', 'movie');
}

function isMoviePlaybackContext(): boolean {
  if (isMoviePlayPage()) {
    return true;
  }

  const movieStorage = getMovieStorage();
  return !isShowPlayPage() && !!(movieStorage.id_movie || movieStorage.title || movieStorage.slug);
}

function buildPlayerActions(config: NtfyConfig): UnknownRecord[] {
  const actions = [
    buildAction(config, 'Play/Pause', 'toggle'),
    buildAction(config, 'Fullscreen', 'fullscreen'),
  ];

  if (isShowPlayPage()) {
    actions.push(buildAction(config, 'Next', 'next'));
  } else if (isMoviePlaybackContext()) {
    actions.push(buildAction(config, '-30s', 'seek -30'));
  } else {
    actions.push(buildAction(config, '+30s', 'seek 30'));
  }

  return actions;
}

function formatTitleWithYear(title: unknown, year?: unknown): string {
  const normalizedTitle = toText(title || '')
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

  const compactYearMatch = /^(.*?)(\d{4})$/.exec(normalizedTitle);
  const compactTitle = compactYearMatch?.[1]?.trim() ?? '';
  if (compactYearMatch && compactTitle) {
    return `${compactTitle} (${compactYearMatch[2] ?? ''})`;
  }

  if (normalizedYear && !normalizedTitle.endsWith(`(${normalizedYear})`)) {
    return `${normalizedTitle} (${normalizedYear})`;
  }

  return normalizedTitle;
}

function getPlayerTitle(): string {
  const showStorage = getShowStorage();
  const movieStorage = getMovieStorage();
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

function getRouteEpisodeLabel(): string {
  const match = /^#S(\d+)-E(\d+)-(\d+)$/i.exec(location.hash);
  if (!match) {
    return '';
  }

  return `S${String(match[1]).padStart(2, '0')}E${String(match[2]).padStart(2, '0')}`;
}

function getCurrentShowWatchlistEntry(): WatchlistEntry | null {
  const showStorage = getShowStorage();
  const idShow = Number(
    readWindowValue('id_show') || showStorage.id_show || showStorage.idShow || 0
  );
  const entries = Object.values(appState.watchlistStore.shows);

  if (idShow) {
    const entry = entries.find((watchlistEntry) => watchlistEntry.idShow === idShow);
    if (entry) {
      return entry;
    }
  }

  const slug = toText(showStorage.slug || '').trim();
  return slug ? appState.watchlistStore.shows[slug] || null : null;
}

function getCurrentShowSlug(): string {
  const showStorage = getShowStorage();
  const watchlistEntry = getCurrentShowWatchlistEntry();
  const pathMatch = /\/shows\/view\/([^/?#]+)/i.exec(location.pathname);
  const showLink = document.querySelector('a[href*="/shows/view/"]');
  const linkMatch = showLink?.getAttribute('href')?.match(/\/shows\/view\/([^/?#]+)/i);

  return (
    toText(showStorage.slug || '').trim() ||
    toText(showStorage.seo_url || '').trim() ||
    String(watchlistEntry?.slug || '').trim() ||
    (pathMatch?.[1] ?? '') ||
    (linkMatch?.[1] ?? '')
  );
}

function getShowPosterFromViewPage(slug: string): Promise<string> {
  if (!slug) {
    return Promise.resolve('');
  }

  if (showPosterCache.has(slug)) {
    return Promise.resolve(showPosterCache.get(slug) || '');
  }

  return fetch(`/shows/view/${encodeURIComponent(slug)}`, { credentials: 'same-origin' })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Show poster request failed with HTTP ${response.status}`);
      }

      return response.text();
    })
    .then((html) => {
      const posterMatch = /poster_medium:\s*'((?:\\'|[^'])*)'/.exec(html);
      const posterUrl = normalizeImageUrl(posterMatch ? decodeInlineJsString(posterMatch[1]) : '');
      showPosterCache.set(slug, posterUrl);
      return posterUrl;
    })
    .catch((error: unknown) => {
      console.warn(`[${SCRIPT_ID}] Could not resolve show poster for ntfy attachment.`, error);
      showPosterCache.set(slug, '');
      return '';
    });
}

function getPlayerPosterUrl(): string {
  const video = getActiveVideo();
  const movieStorage = getMovieStorage();
  const showStorage = getShowStorage();
  const showWatchlistEntry = getCurrentShowWatchlistEntry();
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
    normalizeImageUrl(showStorage.poster_large) ||
    normalizeImageUrl(showStorage.poster_original) ||
    normalizeImageUrl(showStorage.poster) ||
    normalizeImageUrl(showWatchlistEntry?.poster) ||
    getElementImageUrl(posterNode)
  );
}

function resolvePlayerPosterUrl(): Promise<string> {
  const posterUrl = getPlayerPosterUrl();
  if (posterUrl || !isShowPlayPage()) {
    return Promise.resolve(posterUrl);
  }

  return getShowPosterFromViewPage(getCurrentShowSlug());
}

function sendBinaryRequest(
  url: string,
  body: Blob,
  headers: Record<string, string>,
  method = 'POST'
): Promise<Response> {
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

function fetchPosterBlob(url: string): Promise<Blob | null> {
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
      if (!blob.size || blob.size > 15 * 1024 * 1024) {
        return null;
      }

      return blob;
    })
    .catch((error: unknown) => {
      console.warn(`[${SCRIPT_ID}] Could not fetch poster for ntfy attachment.`, error);
      return null;
    });
}

function buildNotificationHeaders(
  payload: NotificationPayload,
  filename: string,
  contentType: string
): Record<string, string> {
  const headers: Record<string, string> = {
    Title: payload.title,
    Message: payload.message,
    Priority: String(payload.priority),
    Tags: payload.tags.join(','),
    Click: payload.click,
    Actions: JSON.stringify(payload.actions),
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

function sendPlayerNotificationPayload(
  config: NtfyConfig,
  displayTopic: string,
  payload: NotificationPayload,
  posterUrl: string
): Promise<unknown> {
  return fetchPosterBlob(posterUrl).then((posterBlob): Promise<unknown> => {
    if (posterBlob) {
      return sendBinaryRequest(
        getPublishUrl(config, displayTopic),
        posterBlob,
        buildNotificationHeaders(payload, 'lookmovie-poster.jpg', posterBlob.type || 'image/jpeg')
      );
    }

    // Publishing JSON to the server root lets the payload name its own topic.
    return sendJsonRequest(getServerUrl(config), payload);
  });
}

export function publishPlayerNotification(reason = 'update'): boolean {
  if (!appState.settings.ntfyRemoteEnabled) {
    return false;
  }

  if (!claimNtfyRemoteTab(reason)) {
    return false;
  }

  const config = getConfig();
  const displayTopic = getDisplayTopic(config);
  const controlTopic = getControlTopic(config);
  if (!displayTopic || !controlTopic || getTopicConfigurationError(config)) {
    return false;
  }

  const video = getActiveVideo();
  if (!video) {
    return false;
  }

  const isPaused = video.paused;
  const title = getPlayerTitle();
  const episodeLabel = getRouteEpisodeLabel();
  const payload: NotificationPayload = {
    topic: displayTopic,
    title: isPaused ? 'Paused on LookMovie2' : 'Playing on LookMovie2',
    message: episodeLabel ? `${title} - ${episodeLabel}` : title,
    tags: ['tv'],
    priority: 3,
    sequence_id: `${SCRIPT_ID}-player`,
    click: location.href,
    actions: buildPlayerActions(config),
  };

  appState.ntfyLastNotificationAt = Date.now();

  resolvePlayerPosterUrl()
    .then((posterUrl) => sendPlayerNotificationPayload(config, displayTopic, payload, posterUrl))
    .then(() => {
      setStatus('connected', `Updated Android player notification (${reason}).`);
    })
    .catch((error: unknown) => {
      console.warn(`[${SCRIPT_ID}] Failed to publish ntfy player notification.`, error);
      setStatus('error', 'Could not publish Android player notification.');
    });

  return true;
}

export function stopNtfyRemote(): void {
  remote.stop();
}

export function startNtfyRemote(): boolean {
  return remote.start();
}

export function restartNtfyRemote(): boolean {
  return remote.restart();
}
