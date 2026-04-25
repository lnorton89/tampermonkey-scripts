/* eslint-disable */
// @ts-nocheck
import './meta';

const SCRIPT_ID = 'lookmovie2-enhancer';
const STORAGE_KEY = `${SCRIPT_ID}:settings`;
const WATCHLIST_KEY = `${SCRIPT_ID}:watchlist`;
const UI_STYLE_ID = `${SCRIPT_ID}-style`;
const FULLSCREEN_STYLE_ID = `${SCRIPT_ID}-fullscreen-style`;
const UI_ROOT_ID = `${SCRIPT_ID}-root`;
const WATCHLIST_REFRESH_MS = 30 * 60 * 1000;
const ROUTE_POLL_MS = 1000;
const DEFAULT_SETTINGS = Object.freeze({
  adTimerBypass: true,
  autoPlay: true,
  autoFullscreen: true,
});

let settings = loadSettings();
let watchlistStore = loadWatchlist();
let originalInitPrePlaybackCounter = null;
let adBypassPoller = null;
let domBootstrapped = false;
let uiBootAttempts = 0;
let fullscreenTriggered = false;
let lastKnownUrl = location.href;
let watchlistRefreshPromise = null;
let watchlistBusy = false;
let watchlistMessage = '';
let watchlistMessageTone = 'muted';
let lastTrackedEpisodeSignature = '';

function loadSettings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      adTimerBypass:
        typeof parsed.adTimerBypass === 'boolean'
          ? parsed.adTimerBypass
          : DEFAULT_SETTINGS.adTimerBypass,
      autoPlay: typeof parsed.autoPlay === 'boolean' ? parsed.autoPlay : DEFAULT_SETTINGS.autoPlay,
      autoFullscreen:
        typeof parsed.autoFullscreen === 'boolean'
          ? parsed.autoFullscreen
          : DEFAULT_SETTINGS.autoFullscreen,
    };
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to load saved settings.`, error);
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(nextSettings) {
  settings = {
    adTimerBypass: !!nextSettings.adTimerBypass,
    autoPlay: !!nextSettings.autoPlay,
    autoFullscreen: !!nextSettings.autoFullscreen,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save settings.`, error);
  }

  syncModalState();

  if (settings.adTimerBypass) {
    tryInstallAdTimerBypass();
    hidePrePlaybackAdUi();
  } else if (typeof originalInitPrePlaybackCounter === 'function') {
    window.initPrePlaybackCounter = originalInitPrePlaybackCounter;
  }

  if (!settings.autoFullscreen) {
    removeWindowedFullscreenFallback();
    fullscreenTriggered = false;
  }
}

function normalizeEpisodeRecord(record) {
  if (!record || typeof record !== 'object') {
    return null;
  }

  const season = toPositiveInteger(record.season);
  const episode = toPositiveInteger(record.episode);
  const idEpisode = toPositiveInteger(record.idEpisode || record.id_episode);

  if (!season || !episode || !idEpisode) {
    return null;
  }

  return {
    season,
    episode,
    idEpisode,
    watchedAt: typeof record.watchedAt === 'number' ? record.watchedAt : undefined,
    updatedAt: typeof record.updatedAt === 'number' ? record.updatedAt : undefined,
  };
}

function normalizeWatchlistEntry(slug, entry) {
  if (!entry || typeof entry !== 'object') {
    return null;
  }

  const normalizedSlug = typeof slug === 'string' && slug.trim() ? slug.trim() : '';
  if (!normalizedSlug) {
    return null;
  }

  return {
    slug: normalizedSlug,
    idShow: toPositiveInteger(entry.idShow || entry.id_show),
    title:
      typeof entry.title === 'string' && entry.title.trim() ? entry.title.trim() : normalizedSlug,
    year:
      typeof entry.year === 'string' || typeof entry.year === 'number'
        ? String(entry.year).trim()
        : '',
    poster: typeof entry.poster === 'string' ? entry.poster : '',
    addedAt: typeof entry.addedAt === 'number' ? entry.addedAt : Date.now(),
    lastSyncedAt: typeof entry.lastSyncedAt === 'number' ? entry.lastSyncedAt : 0,
    lastSyncError: typeof entry.lastSyncError === 'string' ? entry.lastSyncError : '',
    latestEpisode: normalizeEpisodeRecord(entry.latestEpisode),
    lastWatched: normalizeEpisodeRecord(entry.lastWatched),
  };
}

function loadWatchlist() {
  try {
    const parsed = JSON.parse(localStorage.getItem(WATCHLIST_KEY) || '{}');
    const sourceShows =
      parsed && typeof parsed === 'object' && parsed.shows && typeof parsed.shows === 'object'
        ? parsed.shows
        : {};
    const shows = {};

    Object.entries(sourceShows).forEach(([slug, entry]) => {
      const normalized = normalizeWatchlistEntry(slug, entry);
      if (normalized) {
        shows[slug] = normalized;
      }
    });

    return { shows };
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to load watchlist.`, error);
    return { shows: {} };
  }
}

function persistWatchlist() {
  try {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlistStore));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save watchlist.`, error);
  }
}

function saveWatchlist() {
  persistWatchlist();
  renderWatchlist();
  syncLauncherState();
  syncEpisodeCardButtons();
  syncShowViewWatchButton();
}

function setWatchlistMessage(message, tone) {
  watchlistMessage = message || '';
  watchlistMessageTone = tone || 'muted';
  renderWatchlist();
}

function toPositiveInteger(value) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatEpisodeLabel(record) {
  if (!record) {
    return 'Unknown episode';
  }

  return `S${String(record.season).padStart(2, '0')}E${String(record.episode).padStart(2, '0')}`;
}

function compareEpisodes(left, right) {
  if (!left && !right) {
    return 0;
  }

  if (!left) {
    return -1;
  }

  if (!right) {
    return 1;
  }

  if (left.season !== right.season) {
    return left.season - right.season;
  }

  if (left.episode !== right.episode) {
    return left.episode - right.episode;
  }

  return left.idEpisode - right.idEpisode;
}

function sameEpisode(left, right) {
  if (!left || !right) {
    return false;
  }

  return (
    left.idEpisode === right.idEpisode &&
    left.season === right.season &&
    left.episode === right.episode
  );
}

function isLatestWatched(entry) {
  return !!entry && sameEpisode(entry.latestEpisode, entry.lastWatched);
}

function getWatchlistEntries() {
  return Object.values(watchlistStore.shows);
}

function getWatchlistEntry(slug) {
  return slug ? watchlistStore.shows[slug] || null : null;
}

function findWatchlistEntryByIdShow(idShow) {
  if (!idShow) {
    return null;
  }

  return getWatchlistEntries().find((entry) => entry.idShow === idShow) || null;
}

function countUnwatchedLatestEpisodes() {
  return getWatchlistEntries().filter((entry) => entry.latestEpisode && !isLatestWatched(entry))
    .length;
}

function sortWatchlistEntries(entries) {
  return [...entries].sort((left, right) => {
    const leftWeight = left.latestEpisode ? (isLatestWatched(left) ? 1 : 0) : 2;
    const rightWeight = right.latestEpisode ? (isLatestWatched(right) ? 1 : 0) : 2;

    if (leftWeight !== rightWeight) {
      return leftWeight - rightWeight;
    }

    return left.title.localeCompare(right.title);
  });
}

function extractShowSlugFromViewHref(href) {
  try {
    const url = new URL(href, location.origin);
    const pathMatch = url.pathname.match(/\/shows\/view\/([^/?#]+)/i);
    return pathMatch ? pathMatch[1] : '';
  } catch (error) {
    return '';
  }
}

function extractEpisodeContextFromHref(href) {
  try {
    const url = new URL(href, location.origin);
    const season = toPositiveInteger(url.searchParams.get('season'));
    const episode = toPositiveInteger(url.searchParams.get('episode'));
    const idEpisode = toPositiveInteger(url.searchParams.get('id_episode'));

    if (!season || !episode || !idEpisode) {
      return null;
    }

    return { season, episode, idEpisode };
  } catch (error) {
    return null;
  }
}

function extractYearFromSlug(slug) {
  const yearMatch = typeof slug === 'string' ? slug.match(/-(\d{4})$/) : null;
  return yearMatch ? yearMatch[1] : '';
}

function parseEpisodeCard(cardElement) {
  if (!cardElement) {
    return null;
  }

  const link = cardElement.querySelector('a[href*="/shows/view/"]');
  if (!link) {
    return null;
  }

  const slug = extractShowSlugFromViewHref(link.getAttribute('href'));
  if (!slug) {
    return null;
  }

  const titleNode = cardElement.querySelector('.mv-item-infor h6');
  const imageNode = cardElement.querySelector('img[data-src], img[src]');
  const episodeContext = extractEpisodeContextFromHref(link.getAttribute('href'));

  return {
    slug,
    title: titleNode ? titleNode.textContent.trim() : slug,
    year: extractYearFromSlug(slug),
    poster: imageNode
      ? imageNode.getAttribute('data-src') || imageNode.getAttribute('src') || ''
      : '',
    href: new URL(link.getAttribute('href'), location.origin).href,
    episode: episodeContext,
  };
}

function buildShowViewUrl(slug, episodeRecord) {
  if (!slug) {
    return '/shows';
  }

  if (!episodeRecord) {
    return `/shows/view/${slug}`;
  }

  return `/shows/view/${slug}?season=${episodeRecord.season}&episode=${episodeRecord.episode}&id_episode=${episodeRecord.idEpisode}`;
}

function shouldRefreshEntry(entry, now) {
  if (!entry) {
    return false;
  }

  if (!entry.idShow || !entry.latestEpisode) {
    return true;
  }

  return !entry.lastSyncedAt || now - entry.lastSyncedAt >= WATCHLIST_REFRESH_MS;
}

async function fetchText(url) {
  const response = await fetch(url, { credentials: 'same-origin' });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return response.text();
}

async function fetchJson(url) {
  const response = await fetch(url, { credentials: 'same-origin' });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return response.json();
}

function decodeInlineJsString(value) {
  return value.replaceAll("\\'", "'").replaceAll('\\\\', '\\');
}

async function resolveShowRecordBySlug(slug, fallback) {
  const html = await fetchText(`/shows/view/${slug}`);
  const idMatch = html.match(/id_show:\s*(\d+)/);
  const titleMatch = html.match(/title:\s*'((?:\\'|[^'])*)'/);
  const yearMatch = html.match(/year:\s*'((?:\\'|[^'])*)'/);
  const posterMatch = html.match(/poster_medium:\s*'((?:\\'|[^'])*)'/);

  return {
    slug,
    idShow: idMatch ? toPositiveInteger(idMatch[1]) : 0,
    title: titleMatch
      ? decodeInlineJsString(titleMatch[1]).trim()
      : fallback && fallback.title
        ? fallback.title
        : slug,
    year: yearMatch
      ? decodeInlineJsString(yearMatch[1]).trim()
      : fallback && fallback.year
        ? fallback.year
        : '',
    poster: posterMatch
      ? decodeInlineJsString(posterMatch[1]).trim()
      : fallback && fallback.poster
        ? fallback.poster
        : '',
  };
}

async function fetchLatestEpisodeByIdShow(idShow) {
  const payload = await fetchJson(`/api/v2/download/episode/list?id=${idShow}`);
  const latest = payload && payload.latest ? payload.latest : null;
  const episodeRecord = normalizeEpisodeRecord({
    season: latest && latest.season,
    episode: latest && latest.episode,
    idEpisode: latest && latest.id_episode,
  });

  if (!episodeRecord) {
    return null;
  }

  episodeRecord.updatedAt = Date.now();
  return episodeRecord;
}

async function addShowToWatchlist(showDetails) {
  if (!showDetails || !showDetails.slug) {
    return;
  }

  const existingEntry = getWatchlistEntry(showDetails.slug);
  if (existingEntry) {
    setWatchlistMessage(`${existingEntry.title} is already in your watchlist.`, 'muted');
    syncEpisodeCardButtons();
    return;
  }

  setWatchlistMessage(`Adding ${showDetails.title || showDetails.slug}...`, 'muted');

  let resolved = {
    slug: showDetails.slug,
    idShow: 0,
    title: showDetails.title || showDetails.slug,
    year: showDetails.year || '',
    poster: showDetails.poster || '',
  };

  try {
    resolved = await resolveShowRecordBySlug(showDetails.slug, showDetails);
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to resolve show metadata for ${showDetails.slug}.`, error);
  }

  watchlistStore.shows[showDetails.slug] = normalizeWatchlistEntry(showDetails.slug, {
    slug: showDetails.slug,
    idShow: resolved.idShow,
    title: resolved.title || showDetails.title || showDetails.slug,
    year: resolved.year || showDetails.year || '',
    poster: resolved.poster || showDetails.poster || '',
    addedAt: Date.now(),
    latestEpisode: showDetails.episode || null,
    lastSyncedAt: 0,
  });

  saveWatchlist();
  setWatchlistMessage(
    `${resolved.title || showDetails.title || showDetails.slug} added to your watchlist.`,
    'success'
  );

  await refreshWatchlistEntries({ force: true, slugs: [showDetails.slug] });
}

function removeShowFromWatchlist(slug) {
  const entry = getWatchlistEntry(slug);
  if (!entry) {
    return;
  }

  delete watchlistStore.shows[slug];
  saveWatchlist();
  setWatchlistMessage(`${entry.title} removed from your watchlist.`, 'muted');
}

function toggleLatestEpisodeWatched(slug) {
  const entry = getWatchlistEntry(slug);
  if (!entry || !entry.latestEpisode) {
    return;
  }

  if (isLatestWatched(entry)) {
    entry.lastWatched = null;
    setWatchlistMessage(`${entry.title} marked as having an unwatched latest episode.`, 'muted');
  } else {
    entry.lastWatched = {
      ...entry.latestEpisode,
      watchedAt: Date.now(),
    };
    setWatchlistMessage(
      `${entry.title} marked watched through ${formatEpisodeLabel(entry.latestEpisode)}.`,
      'success'
    );
  }

  saveWatchlist();
}

async function refreshWatchlistEntries(options) {
  const force = !!(options && options.force);
  const slugSet = options && Array.isArray(options.slugs) ? new Set(options.slugs) : null;

  if (watchlistRefreshPromise) {
    return watchlistRefreshPromise;
  }

  const now = Date.now();
  const entries = getWatchlistEntries().filter((entry) => {
    if (slugSet && !slugSet.has(entry.slug)) {
      return false;
    }

    return force || shouldRefreshEntry(entry, now);
  });

  if (!entries.length) {
    renderWatchlist();
    syncEpisodeCardButtons();
    return Promise.resolve();
  }

  watchlistBusy = true;
  setWatchlistMessage(
    `Refreshing ${entries.length} watchlist ${entries.length === 1 ? 'show' : 'shows'}...`,
    'muted'
  );

  watchlistRefreshPromise = (async () => {
    for (const entry of entries) {
      try {
        if (!entry.idShow) {
          const resolved = await resolveShowRecordBySlug(entry.slug, entry);
          entry.idShow = resolved.idShow;
          entry.title = resolved.title || entry.title;
          entry.year = resolved.year || entry.year;
          entry.poster = resolved.poster || entry.poster;
        }

        if (!entry.idShow) {
          throw new Error('Unable to resolve show id.');
        }

        const latestEpisode = await fetchLatestEpisodeByIdShow(entry.idShow);
        entry.latestEpisode = latestEpisode;
        entry.lastSyncError = '';
        entry.lastSyncedAt = Date.now();
      } catch (error) {
        entry.lastSyncError = error instanceof Error ? error.message : String(error);
        entry.lastSyncedAt = Date.now();
        console.warn(`[${SCRIPT_ID}] Failed to refresh ${entry.slug}.`, error);
      }
    }

    saveWatchlist();
    setWatchlistMessage('Watchlist refreshed.', 'success');
  })()
    .catch((error) => {
      console.warn(`[${SCRIPT_ID}] Watchlist refresh failed.`, error);
      setWatchlistMessage('Watchlist refresh failed.', 'danger');
    })
    .finally(() => {
      watchlistBusy = false;
      renderWatchlist();
      syncEpisodeCardButtons();
      watchlistRefreshPromise = null;
    });

  return watchlistRefreshPromise;
}

function readPlayPageEpisodeContext() {
  if (!location.pathname.startsWith('/shows/play/')) {
    return null;
  }

  const hashMatch = location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);
  if (!hashMatch) {
    return null;
  }

  const idShow = toPositiveInteger(window.id_show);
  const season = toPositiveInteger(hashMatch[1]);
  const episode = toPositiveInteger(hashMatch[2]);
  const idEpisode = toPositiveInteger(hashMatch[3]);

  if (!idShow || !season || !episode || !idEpisode) {
    return null;
  }

  return {
    idShow,
    season,
    episode,
    idEpisode,
  };
}

function maybeTrackWatchedEpisodeFromPlayer() {
  const context = readPlayPageEpisodeContext();
  if (!context) {
    return;
  }

  const signature = `${context.idShow}:${context.idEpisode}`;
  if (signature === lastTrackedEpisodeSignature) {
    return;
  }

  const entry = findWatchlistEntryByIdShow(context.idShow);
  if (!entry) {
    return;
  }

  entry.lastWatched = {
    season: context.season,
    episode: context.episode,
    idEpisode: context.idEpisode,
    watchedAt: Date.now(),
  };

  if (!entry.latestEpisode || compareEpisodes(entry.lastWatched, entry.latestEpisode) > 0) {
    entry.latestEpisode = {
      season: context.season,
      episode: context.episode,
      idEpisode: context.idEpisode,
      updatedAt: Date.now(),
    };
  }

  lastTrackedEpisodeSignature = signature;
  saveWatchlist();
  setWatchlistMessage(
    `${entry.title} updated to watched through ${formatEpisodeLabel(entry.lastWatched)}.`,
    'success'
  );
}

function hidePrePlaybackAdUi(options = {}) {
  const hideContainer = !!options.hideContainer;
  const playerPreInitAds = document.querySelector('.player-pre-init-ads');
  if (playerPreInitAds) {
    if (hideContainer) {
      playerPreInitAds.classList.add('tw-hidden');
    }
    playerPreInitAds.classList.add('finished');
  }

  const loadingPleaseWait = document.querySelector('.pre-init-ads--loading-please-wait');
  if (loadingPleaseWait) {
    loadingPleaseWait.classList.add('tw-hidden');
  }

  const adTimer = document.querySelector('.player-pre-init-ads_timer');
  if (adTimer) {
    adTimer.classList.add('tw-opacity-0');
  }

  document.querySelectorAll('.pre-init-ads--close').forEach((button) => {
    button.classList.remove('tw-hidden');
  });
  document.querySelectorAll('.pre-init-ads--back-button').forEach((button) => {
    button.classList.remove('tw-hidden');
  });

  if (typeof window._counterTimeout !== 'undefined') {
    clearInterval(window._counterTimeout);
    window._counterTimeout = undefined;
  }

  if (typeof window.enableWindowScroll === 'function') {
    window.enableWindowScroll();
  }
}

function bypassPrePlaybackCounter() {
  console.log(`[${SCRIPT_ID}] initPrePlaybackCounter bypassed.`);

  return new Promise((resolve) => {
    hidePrePlaybackAdUi({ hideContainer: true });
    resolve();
  }).finally(() => {
    if (typeof window.enableWindowScroll === 'function') {
      window.enableWindowScroll();
    }
  });
}

function tryInstallAdTimerBypass() {
  if (!settings.adTimerBypass) {
    return false;
  }

  if (
    typeof window.initPrePlaybackCounter === 'function' &&
    window.initPrePlaybackCounter !== bypassPrePlaybackCounter
  ) {
    if (!originalInitPrePlaybackCounter) {
      originalInitPrePlaybackCounter = window.initPrePlaybackCounter;
    }
    window.initPrePlaybackCounter = bypassPrePlaybackCounter;
    console.log(`[${SCRIPT_ID}] Installed ad timer bypass override.`);
    return true;
  }

  return window.initPrePlaybackCounter === bypassPrePlaybackCounter;
}

function startAdTimerPolling() {
  if (adBypassPoller) {
    return;
  }

  adBypassPoller = window.setInterval(() => {
    if (settings.adTimerBypass) {
      tryInstallAdTimerBypass();
      hidePrePlaybackAdUi({ hideContainer: false });
    }
  }, 250);
}

function dismissResumeModalIfPresent() {
  if (!settings.autoPlay) {
    return false;
  }

  const dismissButton = document.getElementById('progress-from-beginning-button');
  if (dismissButton) {
    console.log(`[${SCRIPT_ID}] Dismissing playback modal.`);
    dismissButton.click();
    return true;
  }

  return false;
}

function applyWindowedFullscreenFallback() {
  if (!document.head) {
    return false;
  }

  if (!document.getElementById(FULLSCREEN_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = FULLSCREEN_STYLE_ID;
    style.textContent = `
            #video_player {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                z-index: 999999 !important;
                background: black !important;
            }

            body.${SCRIPT_ID}-fullscreen {
                overflow: hidden !important;
            }
        `;
    document.head.appendChild(style);
  }

  if (document.body) {
    document.body.classList.add(`${SCRIPT_ID}-fullscreen`);
  }

  return true;
}

function removeWindowedFullscreenFallback() {
  const style = document.getElementById(FULLSCREEN_STYLE_ID);
  if (style) {
    style.remove();
  }

  if (document.body) {
    document.body.classList.remove(`${SCRIPT_ID}-fullscreen`);
  }
}

function triggerVideoJsFullscreen() {
  if (!settings.autoFullscreen || fullscreenTriggered) {
    return false;
  }

  const playerContainer = document.getElementById('video_player');
  if (!playerContainer) {
    return false;
  }

  const fullscreenButton = playerContainer.querySelector('.vjs-fullscreen-control');
  if (fullscreenButton) {
    fullscreenButton.click();
  }

  console.log(`[${SCRIPT_ID}] Applying fullscreen behavior.`);
  applyWindowedFullscreenFallback();
  fullscreenTriggered = true;
  return true;
}

function handleVideoPlay() {
  maybeTrackWatchedEpisodeFromPlayer();

  if (!settings.autoPlay && !settings.autoFullscreen) {
    return;
  }

  window.setTimeout(() => {
    const dismissed = dismissResumeModalIfPresent();

    window.setTimeout(
      () => {
        triggerVideoJsFullscreen();
      },
      dismissed ? 500 : 200
    );
  }, 300);
}

function attachAutoplayLogic(videoElement) {
  if (!videoElement || videoElement._lookmovieEnhancerAttached) {
    return;
  }

  videoElement._lookmovieEnhancerAttached = true;
  videoElement.addEventListener('play', handleVideoPlay);
}

function findAndAttachToVideos() {
  document.querySelectorAll('video').forEach(attachAutoplayLogic);
}

function watchVideos() {
  const waitForBody = window.setInterval(() => {
    if (!document.body) {
      return;
    }

    window.clearInterval(waitForBody);
    findAndAttachToVideos();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type !== 'childList') {
          return;
        }

        mutation.addedNodes.forEach((node) => {
          if (!node || node.nodeType !== Node.ELEMENT_NODE) {
            return;
          }

          if (node.tagName === 'VIDEO') {
            attachAutoplayLogic(node);
          }

          if (typeof node.querySelectorAll === 'function') {
            node.querySelectorAll('video').forEach(attachAutoplayLogic);
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }, 100);
}

function watchNavigation() {
  window.setInterval(() => {
    if (location.href === lastKnownUrl) {
      return;
    }

    lastKnownUrl = location.href;
    fullscreenTriggered = false;
    lastTrackedEpisodeSignature = '';
    removeWindowedFullscreenFallback();
    findAndAttachToVideos();
    ensureUi();
    renderWatchlist();
    syncEpisodeCardButtons();
    ensureEpisodeCardButtons();
    syncShowViewWatchButton();
    ensureShowViewWatchButton();
    refreshWatchlistEntries();
  }, ROUTE_POLL_MS);
}

function ensureUiStyle() {
  if (!document.head || document.getElementById(UI_STYLE_ID)) {
    return;
  }

  const style = document.createElement('style');
  style.id = UI_STYLE_ID;
  style.textContent = `
        #${UI_ROOT_ID}-button {
            position: fixed;
            right: 20px;
            bottom: 20px;
            z-index: 2147483647;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            border: 0;
            border-radius: 999px;
            padding: 10px 14px;
            color: #ffffff;
            background: rgba(17, 24, 39, 0.92);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
            font: 700 14px/1 Arial, sans-serif;
            letter-spacing: 0.04em;
            cursor: pointer;
        }

        #${UI_ROOT_ID}-button[data-has-new="true"] {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.96), rgba(30, 64, 175, 0.96));
        }

        #${UI_ROOT_ID}-button-badge {
            min-width: 20px;
            padding: 3px 7px;
            border-radius: 999px;
            background: #f97316;
            color: #fff7ed;
            font-size: 11px;
            text-align: center;
        }

        #${UI_ROOT_ID}-overlay {
            position: fixed;
            inset: 0;
            z-index: 2147483647;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(5, 10, 20, 0.65);
        }

        #${UI_ROOT_ID}-overlay.${SCRIPT_ID}-open {
            display: flex;
        }

        #${UI_ROOT_ID}-modal {
            width: min(95vw, 1600px);
            height: min(92vh, 1100px);
            border: 1px solid rgba(148, 163, 184, 0.25);
            border-radius: 18px;
            overflow: hidden;
            background: #0f172a;
            color: #e5e7eb;
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.45);
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
        }

        #${UI_ROOT_ID}-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
            padding: 18px 18px 10px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
        }

        #${UI_ROOT_ID}-title {
            margin: 0;
            font-size: 18px;
            font-weight: 700;
        }

        #${UI_ROOT_ID}-subtitle {
            margin: 6px 0 0;
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.45;
        }

        #${UI_ROOT_ID}-close {
            border: 0;
            background: transparent;
            color: #cbd5e1;
            font-size: 22px;
            line-height: 1;
            cursor: pointer;
        }

        #${UI_ROOT_ID}-content {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 20px;
            flex: 1;
            min-height: 0;
        }

        #${UI_ROOT_ID}-settings-panel {
            min-width: 0;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
            padding-bottom: 18px;
        }

        #${UI_ROOT_ID}-watchlist-panel {
            min-width: 0;
        }

        @media (min-width: 980px) {
            #${UI_ROOT_ID}-content {
                display: grid;
                grid-template-columns: 280px minmax(0, 1fr);
                gap: 24px;
            }

            #${UI_ROOT_ID}-settings-panel {
                border-bottom: none;
                border-right: 1px solid rgba(148, 163, 184, 0.12);
                padding-bottom: 0;
                padding-right: 20px;
            }

            #${UI_ROOT_ID}-watchlist-panel {
                padding-left: 0;
            }
        }

        #${UI_ROOT_ID}-settings-title,
        #${UI_ROOT_ID}-watchlist-title {
            margin: 0 0 12px;
            color: #f8fafc;
            font-size: 15px;
            font-weight: 700;
        }

        #${UI_ROOT_ID}-settings {
            display: grid;
            gap: 12px;
        }

        .${SCRIPT_ID}-setting {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 12px;
            align-items: center;
            padding: 14px;
            border: 1px solid rgba(148, 163, 184, 0.18);
            border-radius: 14px;
            background: rgba(15, 23, 42, 0.7);
        }

        .${SCRIPT_ID}-setting-title {
            margin: 0;
            color: #f8fafc;
            font-size: 14px;
            font-weight: 700;
        }

        .${SCRIPT_ID}-setting-copy {
            margin: 4px 0 0;
            color: #94a3b8;
            font-size: 12px;
            line-height: 1.45;
        }

        .${SCRIPT_ID}-switch {
            position: relative;
            display: inline-block;
            width: 52px;
            height: 30px;
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
            background: #334155;
            transition: background 0.18s ease;
        }

        .${SCRIPT_ID}-slider::before {
            content: '';
            position: absolute;
            top: 4px;
            left: 4px;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #ffffff;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
            transition: transform 0.18s ease;
        }

        .${SCRIPT_ID}-switch input:checked + .${SCRIPT_ID}-slider {
            background: #2563eb;
        }

        .${SCRIPT_ID}-switch input:checked + .${SCRIPT_ID}-slider::before {
            transform: translateX(22px);
        }

        #${UI_ROOT_ID}-watchlist-toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 14px;
            padding-bottom: 12px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
        }

        #${UI_ROOT_ID}-watchlist-summary {
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.45;
        }

        #${UI_ROOT_ID}-watchlist-status {
            min-height: 18px;
            margin-bottom: 10px;
            font-size: 12px;
            line-height: 1.45;
        }

        #${UI_ROOT_ID}-watchlist-status[data-tone="success"] {
            color: #86efac;
        }

        #${UI_ROOT_ID}-watchlist-status[data-tone="danger"] {
            color: #fda4af;
        }

        #${UI_ROOT_ID}-watchlist-status[data-tone="muted"] {
            color: #94a3b8;
        }

        #${UI_ROOT_ID}-watchlist-list {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 14px;
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            overflow-x: hidden;
            padding-right: 8px;
        }

        .${SCRIPT_ID}-watch-empty {
            grid-column: 1 / -1;
            padding: 32px 24px;
            border: 1px dashed rgba(148, 163, 184, 0.2);
            border-radius: 14px;
            color: #94a3b8;
            font-size: 14px;
            line-height: 1.55;
            background: rgba(15, 23, 42, 0.35);
            text-align: center;
            align-self: center;
        }

        .${SCRIPT_ID}-watch-item {
            display: flex;
            flex-direction: column;
            gap: 0;
            border: 1px solid rgba(148, 163, 184, 0.16);
            border-radius: 12px;
            background: rgba(15, 23, 42, 0.85);
            overflow: hidden;
            transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .${SCRIPT_ID}-watch-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .${SCRIPT_ID}-watch-item[data-state="new"] {
            border-color: rgba(249, 115, 22, 0.55);
            box-shadow: 0 0 0 1px rgba(249, 115, 22, 0.18);
        }

        .${SCRIPT_ID}-watch-item[data-state="new"]:hover {
            box-shadow: 0 8px 24px rgba(249, 115, 22, 0.15);
        }

        .${SCRIPT_ID}-watch-item-poster {
            position: relative;
            width: 100%;
            aspect-ratio: 2 / 3;
            overflow: hidden;
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.8));
        }

        .${SCRIPT_ID}-watch-item-poster img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .${SCRIPT_ID}-watch-item-poster-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 8px 10px;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }

        .${SCRIPT_ID}-watch-item-body {
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            flex: 1;
        }

        .${SCRIPT_ID}-watch-item-head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 8px;
        }

        .${SCRIPT_ID}-watch-item-title {
            color: #f8fafc;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            line-height: 1.3;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .${SCRIPT_ID}-watch-item-copy {
            margin: 3px 0 0;
            color: #94a3b8;
            font-size: 11px;
            line-height: 1.4;
        }

        .${SCRIPT_ID}-watch-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 5px 8px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.03em;
            white-space: nowrap;
        }

        .${SCRIPT_ID}-watch-badge[data-state="new"] {
            background: rgba(249, 115, 22, 0.18);
            color: #fdba74;
        }

        .${SCRIPT_ID}-watch-badge[data-state="watched"] {
            background: rgba(34, 197, 94, 0.18);
            color: #86efac;
        }

        .${SCRIPT_ID}-watch-badge[data-state="pending"] {
            background: rgba(148, 163, 184, 0.18);
            color: #cbd5e1;
        }

        .${SCRIPT_ID}-watch-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }

        .${SCRIPT_ID}-button,
        .${SCRIPT_ID}-link-button {
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 999px;
            padding: 5px 10px;
            background: rgba(30, 41, 59, 0.9);
            color: #e2e8f0;
            font: 600 11px/1 Arial, sans-serif;
            cursor: pointer;
            text-decoration: none;
            white-space: nowrap;
        }

        .${SCRIPT_ID}-button:hover,
        .${SCRIPT_ID}-link-button:hover {
            border-color: rgba(96, 165, 250, 0.65);
            color: #f8fafc;
        }

        .${SCRIPT_ID}-button[disabled] {
            cursor: wait;
            opacity: 0.65;
        }

        .${SCRIPT_ID}-danger-button:hover {
            border-color: rgba(251, 113, 133, 0.7);
        }

        #${UI_ROOT_ID}-footer {
            padding: 0 18px 18px;
            color: #94a3b8;
            font: 12px/1.45 Arial, sans-serif;
        }

        .${SCRIPT_ID}-episode-watch-button {
            position: absolute;
            top: 12px;
            right: 12px;
            z-index: 5;
            border: 0;
            border-radius: 999px;
            padding: 8px 10px;
            background: rgba(15, 23, 42, 0.92);
            color: #e2e8f0;
            font: 700 12px/1 Arial, sans-serif;
            box-shadow: 0 10px 26px rgba(0, 0, 0, 0.28);
            cursor: pointer;
        }

        .${SCRIPT_ID}-episode-watch-button[data-state="watching"] {
            background: rgba(30, 64, 175, 0.92);
            color: #dbeafe;
        }

        .${SCRIPT_ID}-episode-watch-button[data-state="watching-new"] {
            background: rgba(194, 65, 12, 0.95);
            color: #ffedd5;
        }

        .${SCRIPT_ID}-episode-watch-button[data-state="adding"] {
            cursor: wait;
            opacity: 0.8;
        }

        .${SCRIPT_ID}-show-view-watch-wrap {
            margin-top: 14px;
        }

        .${SCRIPT_ID}-show-view-watch-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            min-height: 44px;
            border: 1px solid rgba(148, 163, 184, 0.28);
            border-radius: 999px;
            padding: 10px 16px;
            background: rgba(15, 23, 42, 0.92);
            color: #f8fafc;
            font: 700 13px/1 Arial, sans-serif;
            cursor: pointer;
            transition: transform 0.14s ease, border-color 0.14s ease, background 0.14s ease;
        }

        .${SCRIPT_ID}-show-view-watch-button:hover {
            transform: translateY(-1px);
            border-color: rgba(96, 165, 250, 0.65);
        }

        .${SCRIPT_ID}-show-view-watch-button[data-state="watching"] {
            background: rgba(30, 64, 175, 0.92);
            color: #dbeafe;
        }

        .${SCRIPT_ID}-show-view-watch-button[data-state="watching-new"] {
            background: rgba(194, 65, 12, 0.95);
            color: #ffedd5;
        }

        .${SCRIPT_ID}-show-view-watch-button[data-state="adding"] {
            cursor: wait;
            opacity: 0.8;
        }

        @media (max-width: 1400px) {
            #${UI_ROOT_ID}-watchlist-list {
                grid-template-columns: repeat(4, 1fr);
            }
        }

        @media (max-width: 1100px) {
            #${UI_ROOT_ID}-watchlist-list {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (max-width: 850px) {
            #${UI_ROOT_ID}-content {
                display: flex;
                flex-direction: column;
            }

            #${UI_ROOT_ID}-settings-panel {
                border-bottom: 1px solid rgba(148, 163, 184, 0.12);
                border-right: none;
                padding-bottom: 16px;
                padding-right: 0;
            }

            #${UI_ROOT_ID}-watchlist-list {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (max-width: 640px) {
            #${UI_ROOT_ID}-watchlist-list {
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }

            #${UI_ROOT_ID}-modal {
                width: 100vw;
                height: 100vh;
                border-radius: 0;
            }
        }
    `;

  document.head.appendChild(style);
}

function settingMarkup(settingKey, title, copy) {
  return `
        <label class="${SCRIPT_ID}-setting">
            <div>
                <p class="${SCRIPT_ID}-setting-title">${title}</p>
                <p class="${SCRIPT_ID}-setting-copy">${copy}</p>
            </div>
            <span class="${SCRIPT_ID}-switch">
                <input type="checkbox" data-setting="${settingKey}">
                <span class="${SCRIPT_ID}-slider"></span>
            </span>
        </label>
    `;
}

function ensureUi() {
  ensureUiStyle();

  if (!document.body || document.getElementById(UI_ROOT_ID)) {
    return;
  }

  const root = document.createElement('div');
  root.id = UI_ROOT_ID;
  root.innerHTML = `
        <button id="${UI_ROOT_ID}-button" type="button" aria-haspopup="dialog" aria-expanded="false">
            <span id="${UI_ROOT_ID}-button-label">LM Tools</span>
            <span id="${UI_ROOT_ID}-button-badge" hidden>0</span>
        </button>
        <div id="${UI_ROOT_ID}-overlay" aria-hidden="true">
            <div id="${UI_ROOT_ID}-modal" role="dialog" aria-modal="true" aria-labelledby="${UI_ROOT_ID}-title">
                <div id="${UI_ROOT_ID}-header">
                    <div>
                        <h2 id="${UI_ROOT_ID}-title">LookMovie2 Enhancer</h2>
                        <p id="${UI_ROOT_ID}-subtitle">Playback helpers plus a personal show watchlist with latest episode tracking.</p>
                    </div>
                    <button id="${UI_ROOT_ID}-close" type="button" aria-label="Close settings">&times;</button>
                </div>
                <div id="${UI_ROOT_ID}-content">
                    <section id="${UI_ROOT_ID}-settings-panel">
                        <h3 id="${UI_ROOT_ID}-settings-title">Playback Tools</h3>
                        <div id="${UI_ROOT_ID}-settings">
                            ${settingMarkup('adTimerBypass', 'Ad timer bypass', 'Skips the pre-playback counter and hides the ad overlay.')}
                            ${settingMarkup('autoPlay', 'Auto play', 'Clicks the resume or start button when the playback modal appears.')}
                            ${settingMarkup('autoFullscreen', 'Auto fullscreen', 'Clicks fullscreen and applies the fullscreen fallback after playback starts.')}
                        </div>
                    </section>
                    <section id="${UI_ROOT_ID}-watchlist-panel">
                        <div id="${UI_ROOT_ID}-watchlist-toolbar">
                            <div>
                                <h3 id="${UI_ROOT_ID}-watchlist-title">Watchlist</h3>
                                <div id="${UI_ROOT_ID}-watchlist-summary"></div>
                            </div>
                            <button id="${UI_ROOT_ID}-watchlist-refresh" class="${SCRIPT_ID}-button" type="button" data-watchlist-action="refresh">Refresh</button>
                        </div>
                        <div id="${UI_ROOT_ID}-watchlist-status" data-tone="muted"></div>
                        <div id="${UI_ROOT_ID}-watchlist-list"></div>
                    </section>
                </div>
                <div id="${UI_ROOT_ID}-footer">Settings and watchlist data are saved locally in your browser.</div>
            </div>
        </div>
    `;

  document.body.appendChild(root);

  const toggleButton = document.getElementById(`${UI_ROOT_ID}-button`);
  const overlay = document.getElementById(`${UI_ROOT_ID}-overlay`);
  const closeButton = document.getElementById(`${UI_ROOT_ID}-close`);

  function openModal() {
    overlay.classList.add(`${SCRIPT_ID}-open`);
    overlay.setAttribute('aria-hidden', 'false');
    toggleButton.setAttribute('aria-expanded', 'true');
    refreshWatchlistEntries();
  }

  function closeModal() {
    overlay.classList.remove(`${SCRIPT_ID}-open`);
    overlay.setAttribute('aria-hidden', 'true');
    toggleButton.setAttribute('aria-expanded', 'false');
  }

  toggleButton.addEventListener('click', () => {
    if (overlay.classList.contains(`${SCRIPT_ID}-open`)) {
      closeModal();
    } else {
      openModal();
    }
  });

  closeButton.addEventListener('click', closeModal);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeModal();
    }
  });

  document.querySelectorAll(`#${UI_ROOT_ID} input[data-setting]`).forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      saveSettings({
        ...settings,
        [checkbox.dataset.setting]: checkbox.checked,
      });
    });
  });

  root.addEventListener('click', (event) => {
    const actionTarget = event.target.closest('[data-watchlist-action]');
    if (!actionTarget) {
      return;
    }

    const action = actionTarget.dataset.watchlistAction;
    const slug = actionTarget.dataset.slug || '';

    if (action === 'refresh') {
      refreshWatchlistEntries({ force: true });
      return;
    }

    if (action === 'toggle-latest-watched' && slug) {
      toggleLatestEpisodeWatched(slug);
      return;
    }

    if (action === 'remove' && slug) {
      removeShowFromWatchlist(slug);
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  syncModalState();
  renderWatchlist();
  syncLauncherState();
}

function syncLauncherState() {
  const button = document.getElementById(`${UI_ROOT_ID}-button`);
  const badge = document.getElementById(`${UI_ROOT_ID}-button-badge`);
  const label = document.getElementById(`${UI_ROOT_ID}-button-label`);
  if (!button || !badge || !label) {
    return;
  }

  const newCount = countUnwatchedLatestEpisodes();
  label.textContent = 'LM Tools';

  if (newCount > 0) {
    badge.hidden = false;
    badge.textContent = String(newCount);
    button.dataset.hasNew = 'true';
  } else {
    badge.hidden = true;
    badge.textContent = '0';
    button.dataset.hasNew = 'false';
  }
}

function buildWatchlistItemMarkup(entry) {
  const state = entry.latestEpisode ? (isLatestWatched(entry) ? 'watched' : 'new') : 'pending';
  const latestCopy = entry.latestEpisode
    ? `Latest ${formatEpisodeLabel(entry.latestEpisode)}`
    : 'Latest episode not synced yet';
  const watchedCopy = entry.lastWatched
    ? `Watched through ${formatEpisodeLabel(entry.lastWatched)}`
    : 'Nothing marked watched yet';
  const errorCopy = entry.lastSyncError ? `Sync issue: ${entry.lastSyncError}` : '';
  const statusLabel =
    state === 'new' ? 'New episode' : state === 'watched' ? 'Up to date' : 'Pending sync';
  const openHref = buildShowViewUrl(entry.slug, entry.latestEpisode);
  const toggleLabel = isLatestWatched(entry) ? 'Unwatch latest' : 'Mark latest watched';
  const toggleDisabled = entry.latestEpisode ? '' : 'disabled';
  const yearCopy = entry.year ? ` (${escapeHtml(entry.year)})` : '';
  const posterUrl = entry.poster || '';
  const summaryPieces = [latestCopy, watchedCopy];

  if (errorCopy) {
    summaryPieces.push(errorCopy);
  }

  const posterHtml = posterUrl
    ? `<img src="${escapeHtml(posterUrl)}" alt="${escapeHtml(entry.title)}" loading="lazy">`
    : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#64748b;font-size:48px;">📺</div>`;

  return `
        <article class="${SCRIPT_ID}-watch-item" data-state="${state}">
            <div class="${SCRIPT_ID}-watch-item-poster">
                ${posterHtml}
                <div class="${SCRIPT_ID}-watch-item-poster-overlay">
                    <a class="${SCRIPT_ID}-link-button" href="${escapeHtml(openHref)}" style="font-size:11px;padding:6px 10px;">Open</a>
                    <span class="${SCRIPT_ID}-watch-badge" data-state="${state}">${escapeHtml(statusLabel)}</span>
                </div>
            </div>
            <div class="${SCRIPT_ID}-watch-item-body">
                <div>
                    <a class="${SCRIPT_ID}-watch-item-title" href="${escapeHtml(openHref)}">${escapeHtml(entry.title)}${yearCopy}</a>
                    <p class="${SCRIPT_ID}-watch-item-copy">${escapeHtml(summaryPieces.join(' • '))}</p>
                </div>
                <div class="${SCRIPT_ID}-watch-actions">
                    <button class="${SCRIPT_ID}-button" type="button" data-watchlist-action="toggle-latest-watched" data-slug="${escapeHtml(entry.slug)}" ${toggleDisabled}>${escapeHtml(toggleLabel)}</button>
                    <button class="${SCRIPT_ID}-button ${SCRIPT_ID}-danger-button" type="button" data-watchlist-action="remove" data-slug="${escapeHtml(entry.slug)}">Remove</button>
                </div>
            </div>
        </article>
    `;
}

function renderWatchlist() {
  const summary = document.getElementById(`${UI_ROOT_ID}-watchlist-summary`);
  const status = document.getElementById(`${UI_ROOT_ID}-watchlist-status`);
  const list = document.getElementById(`${UI_ROOT_ID}-watchlist-list`);
  const refreshButton = document.getElementById(`${UI_ROOT_ID}-watchlist-refresh`);

  if (!summary || !status || !list || !refreshButton) {
    return;
  }

  const entries = sortWatchlistEntries(getWatchlistEntries());
  const newCount = entries.filter((entry) => entry.latestEpisode && !isLatestWatched(entry)).length;
  summary.textContent = entries.length
    ? `${entries.length} tracked ${entries.length === 1 ? 'show' : 'shows'}${newCount ? ` | ${newCount} with a newer latest episode` : ''}`
    : 'Add shows from the latest episodes page to start tracking them.';

  status.dataset.tone = watchlistMessageTone;
  status.textContent = watchlistBusy
    ? watchlistMessage || 'Refreshing watchlist...'
    : watchlistMessage || '';

  refreshButton.disabled = watchlistBusy;

  if (!entries.length) {
    list.innerHTML = `<div class="${SCRIPT_ID}-watch-empty">On the <code>/shows</code> page, use the overlay button on any episode card to add that show to your personal watchlist.</div>`;
    return;
  }

  list.innerHTML = entries.map(buildWatchlistItemMarkup).join('');
}

function isLatestShowsPage() {
  return location.pathname === '/shows';
}

function isShowViewPage() {
  return location.pathname.startsWith('/shows/view/');
}

function getCurrentShowViewData() {
  if (!isShowViewPage() || !window.show_storage) {
    return null;
  }

  const slug = typeof window.show_storage.slug === 'string' ? window.show_storage.slug : '';
  if (!slug) {
    return null;
  }

  const params = new URLSearchParams(location.search);
  const episode = normalizeEpisodeRecord({
    season: params.get('season'),
    episode: params.get('episode'),
    idEpisode: params.get('id_episode'),
  });

  return {
    slug,
    title: typeof window.show_storage.title === 'string' ? window.show_storage.title : slug,
    year:
      typeof window.show_storage.year === 'string' || typeof window.show_storage.year === 'number'
        ? String(window.show_storage.year)
        : '',
    poster:
      typeof window.show_storage.poster_medium === 'string'
        ? window.show_storage.poster_medium
        : '',
    idShow: toPositiveInteger(window.show_storage.id_show),
    episode,
  };
}

function updateEpisodeCardButton(button) {
  const slug = button.dataset.watchlistSlug || '';
  const entry = getWatchlistEntry(slug);
  const cardEpisode = normalizeEpisodeRecord({
    season: button.dataset.season,
    episode: button.dataset.episode,
    idEpisode: button.dataset.idEpisode,
  });

  if (!entry) {
    button.dataset.state = 'add';
    button.textContent = '+ Watch';
    button.title = 'Add this show to your watchlist';
    button.disabled = false;
    return;
  }

  const hasNewEpisode =
    cardEpisode && (!entry.lastWatched || compareEpisodes(cardEpisode, entry.lastWatched) > 0);
  button.dataset.state = hasNewEpisode ? 'watching-new' : 'watching';
  button.textContent = 'Watching';
  button.title = hasNewEpisode
    ? 'This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.'
    : 'This show is already in your watchlist. Click to remove it.';
  button.disabled = false;
}

function syncEpisodeCardButtons() {
  document.querySelectorAll(`.${SCRIPT_ID}-episode-watch-button`).forEach(updateEpisodeCardButton);
}

function updateShowViewWatchButton(button) {
  const slug = button.dataset.watchlistSlug || '';
  const entry = getWatchlistEntry(slug);
  const pageEpisode = normalizeEpisodeRecord({
    season: button.dataset.season,
    episode: button.dataset.episode,
    idEpisode: button.dataset.idEpisode,
  });

  if (!entry) {
    button.dataset.state = 'add';
    button.textContent = '+ Add To Watchlist';
    button.title = 'Add this show to your watchlist';
    button.disabled = false;
    return;
  }

  const hasNewEpisode =
    pageEpisode && (!entry.lastWatched || compareEpisodes(pageEpisode, entry.lastWatched) > 0);
  button.dataset.state = hasNewEpisode ? 'watching-new' : 'watching';
  button.textContent = hasNewEpisode ? 'Watching: New Episode' : 'Watching';
  button.title = hasNewEpisode
    ? 'This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.'
    : 'This show is already in your watchlist. Click to remove it.';
  button.disabled = false;
}

function syncShowViewWatchButton() {
  document
    .querySelectorAll(`.${SCRIPT_ID}-show-view-watch-button`)
    .forEach(updateShowViewWatchButton);
}

function ensureEpisodeCardButtons() {
  if (!document.body || !isLatestShowsPage()) {
    return;
  }

  document.querySelectorAll('.episode-item').forEach((cardElement) => {
    const card = parseEpisodeCard(cardElement);
    if (!card) {
      return;
    }

    let button = cardElement.querySelector(`.${SCRIPT_ID}-episode-watch-button`);
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = `${SCRIPT_ID}-episode-watch-button`;
      cardElement.appendChild(button);

      button.addEventListener('click', async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const slug = button.dataset.watchlistSlug;
        if (!slug) {
          return;
        }

        if (getWatchlistEntry(slug)) {
          removeShowFromWatchlist(slug);
          return;
        }

        button.dataset.state = 'adding';
        button.textContent = 'Adding...';
        button.disabled = true;

        await addShowToWatchlist({
          slug,
          title: button.dataset.title || slug,
          year: button.dataset.year || '',
          poster: button.dataset.poster || '',
          episode: normalizeEpisodeRecord({
            season: button.dataset.season,
            episode: button.dataset.episode,
            idEpisode: button.dataset.idEpisode,
          }),
        });

        updateEpisodeCardButton(button);
      });
    }

    button.dataset.watchlistSlug = card.slug;
    button.dataset.title = card.title;
    button.dataset.year = card.year;
    button.dataset.poster = card.poster;
    if (card.episode) {
      button.dataset.season = String(card.episode.season);
      button.dataset.episode = String(card.episode.episode);
      button.dataset.idEpisode = String(card.episode.idEpisode);
    }

    updateEpisodeCardButton(button);
  });
}

function ensureShowViewWatchButton() {
  if (!document.body || !isShowViewPage()) {
    return;
  }

  const show = getCurrentShowViewData();
  if (!show) {
    return;
  }

  const actionHost =
    document.querySelector('.watch-heading') ||
    document.querySelector('.movie-single-ct.main-content') ||
    document.querySelector('.internal-page-container');
  if (!actionHost) {
    return;
  }

  let wrap = document.querySelector(`.${SCRIPT_ID}-show-view-watch-wrap`);
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = `${SCRIPT_ID}-show-view-watch-wrap`;
    actionHost.appendChild(wrap);
  }

  let button = wrap.querySelector(`.${SCRIPT_ID}-show-view-watch-button`);
  if (!button) {
    button = document.createElement('button');
    button.type = 'button';
    button.className = `${SCRIPT_ID}-show-view-watch-button`;
    wrap.appendChild(button);

    button.addEventListener('click', async () => {
      const slug = button.dataset.watchlistSlug;
      if (!slug) {
        return;
      }

      if (getWatchlistEntry(slug)) {
        removeShowFromWatchlist(slug);
        return;
      }

      button.dataset.state = 'adding';
      button.textContent = 'Adding...';
      button.disabled = true;

      await addShowToWatchlist({
        slug,
        title: button.dataset.title || slug,
        year: button.dataset.year || '',
        poster: button.dataset.poster || '',
        episode: normalizeEpisodeRecord({
          season: button.dataset.season,
          episode: button.dataset.episode,
          idEpisode: button.dataset.idEpisode,
        }),
      });

      updateShowViewWatchButton(button);
    });
  }

  button.dataset.watchlistSlug = show.slug;
  button.dataset.title = show.title;
  button.dataset.year = show.year;
  button.dataset.poster = show.poster;
  if (show.episode) {
    button.dataset.season = String(show.episode.season);
    button.dataset.episode = String(show.episode.episode);
    button.dataset.idEpisode = String(show.episode.idEpisode);
  } else {
    delete button.dataset.season;
    delete button.dataset.episode;
    delete button.dataset.idEpisode;
  }

  updateShowViewWatchButton(button);
}

function syncModalState() {
  document.querySelectorAll(`#${UI_ROOT_ID} input[data-setting]`).forEach((checkbox) => {
    checkbox.checked = !!settings[checkbox.dataset.setting];
  });
}

function bootstrapDomFeatures() {
  if (domBootstrapped) {
    return;
  }

  domBootstrapped = true;
  watchVideos();
  watchNavigation();

  const uiBootstrapper = window.setInterval(() => {
    uiBootAttempts += 1;
    ensureUi();
    ensureEpisodeCardButtons();
    ensureShowViewWatchButton();

    if (document.getElementById(UI_ROOT_ID) || uiBootAttempts > 100) {
      window.clearInterval(uiBootstrapper);
    }
  }, 100);

  renderWatchlist();
  syncLauncherState();
  syncEpisodeCardButtons();
  syncShowViewWatchButton();
  refreshWatchlistEntries();
}

tryInstallAdTimerBypass();
startAdTimerPolling();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapDomFeatures, { once: true });
} else {
  bootstrapDomFeatures();
}
