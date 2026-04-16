/* ==UserScript==
// @name         LookMovie2 Enhancer
// @namespace    http://tampermonkey.net/
// @version      1.2.0
// @description  Combines playback helpers with a persistent show watchlist for latest episode tracking.
// @author       Lawrence
// @match        *://*.lookmovie2.to/*
// @grant        none
// @run-at       document-start
// ==UserScript== */


"use strict";
(() => {
  // scripts/lookmovie2.to/src/utils.ts
  var SCRIPT_ID = "lookmovie2-enhancer";
  var STORAGE_KEY = `${SCRIPT_ID}:settings`;
  var UI_STYLE_ID = `${SCRIPT_ID}-style`;
  var FULLSCREEN_STYLE_ID = `${SCRIPT_ID}-fullscreen-style`;
  var UI_ROOT_ID = `${SCRIPT_ID}-root`;
  var ROUTE_POLL_MS = 1e3;
  var DEFAULT_SETTINGS = Object.freeze({
    adTimerBypass: true,
    autoPlay: true,
    autoFullscreen: true
  });
  var log = {
    info: (message, ...styles) => {
      if (styles.length > 0) {
        console.info(`%c[${SCRIPT_ID}]%c${message}`, "", ...styles);
      } else {
        console.info(`[${SCRIPT_ID}] ${message}`);
      }
    },
    warn: (...args) => {
      console.warn(`[${SCRIPT_ID}]`, ...args);
    },
    error: (...args) => {
      console.error(`[${SCRIPT_ID}]`, ...args);
    }
  };
  function loadSettings() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : {};
      return {
        adTimerBypass: typeof parsed.adTimerBypass === "boolean" ? parsed.adTimerBypass : DEFAULT_SETTINGS.adTimerBypass,
        autoPlay: typeof parsed.autoPlay === "boolean" ? parsed.autoPlay : DEFAULT_SETTINGS.autoPlay,
        autoFullscreen: typeof parsed.autoFullscreen === "boolean" ? parsed.autoFullscreen : DEFAULT_SETTINGS.autoFullscreen
      };
    } catch (error) {
      log.warn("Failed to load saved settings.", error);
      return { ...DEFAULT_SETTINGS };
    }
  }
  function toPositiveInteger(value) {
    const parsed = Number.parseInt(String(value), 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }
  function escapeHtml(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function formatEpisodeLabel(record) {
    if (!record) {
      return "Unknown episode";
    }
    return `S${String(record.season).padStart(2, "0")}E${String(record.episode).padStart(2, "0")}`;
  }
  function compareEpisodes(left, right) {
    if (!left && !right) return 0;
    if (!left) return -1;
    if (!right) return 1;
    if (left.season !== right.season) return left.season - right.season;
    if (left.episode !== right.episode) return left.episode - right.episode;
    return left.idEpisode - right.idEpisode;
  }
  function sameEpisode(left, right) {
    if (!left || !right) return false;
    return left.idEpisode === right.idEpisode && left.season === right.season && left.episode === right.episode;
  }
  function decodeInlineJsString(value) {
    return value.replace(/\\'/g, "'").replace(/\\\\/g, "\\");
  }
  function normalizeEpisodeRecord(raw) {
    if (!raw || typeof raw !== "object") return null;
    const season = toPositiveInteger(raw.season);
    const episode = toPositiveInteger(raw.episode);
    const idEpisode = toPositiveInteger(raw.idEpisode ?? raw.id_episode);
    if (!season || !episode || !idEpisode) return null;
    const result = {
      season,
      episode,
      idEpisode
    };
    if (typeof raw.watchedAt === "number") {
      result.watchedAt = raw.watchedAt;
    }
    if (typeof raw.updatedAt === "number") {
      result.updatedAt = raw.updatedAt;
    }
    return result;
  }
  function extractShowSlugFromViewHref(href) {
    try {
      const url = new URL(href, location.origin);
      const pathMatch = /\/shows\/view\/([^/?#]+)/i.exec(url.pathname);
      return pathMatch?.[1] ?? "";
    } catch {
      return "";
    }
  }
  function extractEpisodeContextFromHref(href) {
    try {
      const url = new URL(href, location.origin);
      const season = toPositiveInteger(url.searchParams.get("season"));
      const episode = toPositiveInteger(url.searchParams.get("episode"));
      const idEpisode = toPositiveInteger(url.searchParams.get("id_episode"));
      if (!season || !episode || !idEpisode) return null;
      return { season, episode, idEpisode };
    } catch {
      return null;
    }
  }
  function extractYearFromSlug(slug) {
    const yearMatch = /-(\d{4})$/.exec(slug);
    return yearMatch?.[1] ?? "";
  }
  function buildShowViewUrl(slug, episodeRecord) {
    if (!slug) return "/shows";
    if (!episodeRecord) return `/shows/view/${slug}`;
    return `/shows/view/${slug}?season=${String(episodeRecord.season)}&episode=${String(episodeRecord.episode)}&id_episode=${String(episodeRecord.idEpisode)}`;
  }
  function parseEpisodeCard(cardElement) {
    if (!cardElement) return null;
    const link = cardElement.querySelector('a[href*="/shows/view/"]');
    if (!link) return null;
    const href = link.getAttribute("href");
    if (!href) return null;
    const slug = extractShowSlugFromViewHref(href);
    if (!slug) return null;
    const titleNode = cardElement.querySelector(".mv-item-infor h6");
    const imageNode = cardElement.querySelector("img[data-src], img[src]");
    const episodeContext = extractEpisodeContextFromHref(href);
    return {
      slug,
      title: titleNode ? titleNode.textContent.trim() : slug,
      year: extractYearFromSlug(slug),
      poster: imageNode ? imageNode.getAttribute("data-src") ?? imageNode.getAttribute("src") ?? "" : "",
      href: new URL(href, location.origin).href,
      episode: episodeContext
    };
  }

  // scripts/lookmovie2.to/src/watchlist.ts
  var WATCHLIST_KEY = `${SCRIPT_ID}:watchlist`;
  var WATCHLIST_REFRESH_MS = 30 * 60 * 1e3;
  var watchlistStore = loadWatchlist();
  var watchlistMessage = "";
  var watchlistMessageTone = "muted";
  var watchlistRefreshPromise = null;
  var watchlistBusy = false;
  var onChangeCallbacks = [];
  function onChange(cb) {
    onChangeCallbacks.push(cb);
  }
  function emitChange() {
    onChangeCallbacks.forEach((cb) => {
      cb();
    });
  }
  function normalizeWatchlistEntry(slug, entry) {
    if (!entry || typeof entry !== "object") return null;
    const normalizedSlug = typeof slug === "string" && slug.trim() ? slug.trim() : "";
    if (!normalizedSlug) return null;
    return {
      slug: normalizedSlug,
      idShow: toPositiveInteger(entry.idShow ?? entry.id_show),
      title: typeof entry.title === "string" && entry.title.trim() ? entry.title.trim() : normalizedSlug,
      year: typeof entry.year === "string" || typeof entry.year === "number" ? String(entry.year).trim() : "",
      poster: typeof entry.poster === "string" ? entry.poster : "",
      addedAt: typeof entry.addedAt === "number" ? entry.addedAt : Date.now(),
      lastSyncedAt: typeof entry.lastSyncedAt === "number" ? entry.lastSyncedAt : 0,
      lastSyncError: typeof entry.lastSyncError === "string" ? entry.lastSyncError : "",
      latestEpisode: normalizeEpisodeRecord(entry.latestEpisode),
      lastWatched: normalizeEpisodeRecord(entry.lastWatched)
    };
  }
  function loadWatchlist() {
    try {
      const stored = localStorage.getItem(WATCHLIST_KEY);
      const parsed = stored ? JSON.parse(stored) : {};
      const sourceShows = parsed.shows ?? {};
      const shows = {};
      Object.entries(sourceShows).forEach(([slug, entry]) => {
        const normalized = normalizeWatchlistEntry(slug, entry);
        if (normalized) {
          shows[slug] = normalized;
        }
      });
      return { shows };
    } catch (error) {
      log.warn("Failed to load watchlist.", error);
      return { shows: {} };
    }
  }
  function persistWatchlist() {
    try {
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlistStore));
    } catch (error) {
      log.warn("Failed to save watchlist.", error);
    }
  }
  function saveWatchlist() {
    persistWatchlist();
    emitChange();
  }
  function getWatchlistEntries() {
    return Object.values(watchlistStore.shows);
  }
  function getWatchlistEntry(slug) {
    return slug ? watchlistStore.shows[slug] ?? null : null;
  }
  function findWatchlistEntryByIdShow(idShow) {
    if (!idShow) return null;
    return getWatchlistEntries().find((entry) => entry.idShow === idShow) ?? null;
  }
  function isLatestWatched(entry) {
    return sameEpisode(entry.latestEpisode, entry.lastWatched);
  }
  function countUnwatchedLatestEpisodes() {
    return getWatchlistEntries().filter((entry) => entry.latestEpisode && !isLatestWatched(entry)).length;
  }
  function sortWatchlistEntries(entries) {
    return [...entries].sort((left, right) => {
      const leftWeight = left.latestEpisode ? isLatestWatched(left) ? 1 : 0 : 2;
      const rightWeight = right.latestEpisode ? isLatestWatched(right) ? 1 : 0 : 2;
      if (leftWeight !== rightWeight) return leftWeight - rightWeight;
      return left.title.localeCompare(right.title);
    });
  }
  function getWatchlistMessage() {
    return watchlistMessage;
  }
  function getWatchlistMessageTone() {
    return watchlistMessageTone;
  }
  function isWatchlistBusy() {
    return watchlistBusy;
  }
  function setWatchlistMessage(message, tone) {
    watchlistMessage = message;
    watchlistMessageTone = tone;
    emitChange();
  }
  async function addShowToWatchlist(showDetails) {
    if (!showDetails.slug) return;
    const existingEntry = getWatchlistEntry(showDetails.slug);
    if (existingEntry) {
      setWatchlistMessage(`${existingEntry.title} is already in your watchlist.`, "muted");
      emitChange();
      return;
    }
    setWatchlistMessage(`Adding ${showDetails.title ?? showDetails.slug}...`, "muted");
    let resolved = {
      slug: showDetails.slug,
      idShow: 0,
      title: showDetails.title ?? showDetails.slug,
      year: showDetails.year ?? "",
      poster: showDetails.poster ?? ""
    };
    try {
      const fetched = await resolveShowRecordBySlug(showDetails.slug, showDetails);
      resolved = {
        slug: showDetails.slug,
        idShow: fetched.idShow ?? 0,
        title: fetched.title ?? showDetails.title ?? showDetails.slug,
        year: fetched.year ?? showDetails.year ?? "",
        poster: fetched.poster ?? showDetails.poster ?? ""
      };
    } catch (error) {
      log.warn(`Failed to resolve show metadata for ${showDetails.slug}.`, error);
    }
    const normalized = normalizeWatchlistEntry(showDetails.slug, {
      slug: showDetails.slug,
      idShow: resolved.idShow,
      title: resolved.title,
      year: resolved.year,
      poster: resolved.poster,
      addedAt: Date.now(),
      latestEpisode: showDetails.episode ?? null,
      lastSyncedAt: 0
    });
    if (normalized) {
      watchlistStore.shows[showDetails.slug] = normalized;
    }
    saveWatchlist();
    setWatchlistMessage(`${resolved.title} added to your watchlist.`, "success");
    await refreshWatchlistEntries({ force: true, slugs: [showDetails.slug] });
  }
  function removeShowFromWatchlist(slug) {
    const entry = getWatchlistEntry(slug);
    if (!entry) return;
    watchlistStore.shows[slug] = void 0;
    saveWatchlist();
    setWatchlistMessage(`${entry.title} removed from your watchlist.`, "muted");
  }
  function toggleLatestEpisodeWatched(slug) {
    const entry = getWatchlistEntry(slug);
    if (!entry?.latestEpisode) return;
    if (isLatestWatched(entry)) {
      entry.lastWatched = null;
      setWatchlistMessage(`${entry.title} marked as having an unwatched latest episode.`, "muted");
    } else {
      entry.lastWatched = {
        ...entry.latestEpisode,
        watchedAt: Date.now()
      };
      setWatchlistMessage(
        `${entry.title} marked watched through ${formatEpisodeLabel(entry.latestEpisode)}.`,
        "success"
      );
    }
    saveWatchlist();
  }
  function shouldRefreshEntry(entry, now) {
    if (!entry.idShow || !entry.latestEpisode) return true;
    return !entry.lastSyncedAt || now - entry.lastSyncedAt >= WATCHLIST_REFRESH_MS;
  }
  async function refreshWatchlistEntries(options) {
    const force = !!options?.force;
    const slugSet = options && Array.isArray(options.slugs) ? new Set(options.slugs) : null;
    if (watchlistRefreshPromise) return watchlistRefreshPromise;
    const now = Date.now();
    const entries = getWatchlistEntries().filter((entry) => {
      if (slugSet && !slugSet.has(entry.slug)) return false;
      return force || shouldRefreshEntry(entry, now);
    });
    if (!entries.length) {
      emitChange();
      return Promise.resolve();
    }
    watchlistBusy = true;
    setWatchlistMessage(
      `Refreshing ${String(entries.length)} watchlist ${entries.length === 1 ? "show" : "shows"}...`,
      "muted"
    );
    watchlistRefreshPromise = (async () => {
      for (const entry of entries) {
        try {
          if (!entry.idShow) {
            const resolved = await resolveShowRecordBySlug(entry.slug, entry);
            entry.idShow = resolved.idShow ?? 0;
            entry.title = resolved.title ?? entry.title;
            entry.year = resolved.year ?? entry.year;
            entry.poster = resolved.poster ?? entry.poster;
          }
          if (!entry.idShow) {
            throw new Error("Unable to resolve show id.");
          }
          const latestEpisode = await fetchLatestEpisodeByIdShow(entry.idShow);
          entry.latestEpisode = latestEpisode;
          entry.lastSyncError = "";
          entry.lastSyncedAt = Date.now();
        } catch (error) {
          entry.lastSyncError = error instanceof Error ? error.message : String(error);
          entry.lastSyncedAt = Date.now();
          log.warn(`Failed to refresh ${entry.slug}.`, error);
        }
      }
      saveWatchlist();
      setWatchlistMessage("Watchlist refreshed.", "success");
    })().catch((error) => {
      log.warn("Watchlist refresh failed.", error);
      setWatchlistMessage("Watchlist refresh failed.", "danger");
    }).finally(() => {
      watchlistBusy = false;
      emitChange();
      watchlistRefreshPromise = null;
    });
    return watchlistRefreshPromise;
  }
  async function fetchText(url) {
    const response = await fetch(url, { credentials: "same-origin" });
    if (!response.ok) throw new Error(`Request failed (${String(response.status)})`);
    return response.text();
  }
  async function fetchJson(url) {
    const response = await fetch(url, { credentials: "same-origin" });
    if (!response.ok) throw new Error(`Request failed (${String(response.status)})`);
    return response.json();
  }
  async function resolveShowRecordBySlug(slug, fallback) {
    const html = await fetchText(`/shows/view/${slug}`);
    const idMatch = /id_show:\s*(\d+)/.exec(html);
    const titleMatch = /title:\s*'((?:\\'|[^'])*)'/.exec(html);
    const yearMatch = /year:\s*'((?:\\'|[^'])*)'/.exec(html);
    const posterMatch = /poster_medium:\s*'((?:\\'|[^'])*)'/.exec(html);
    return {
      slug,
      idShow: idMatch ? toPositiveInteger(idMatch[1]) : 0,
      title: titleMatch?.[1] ? decodeInlineJsString(titleMatch[1]).trim() : fallback?.title ?? slug,
      year: yearMatch?.[1] ? decodeInlineJsString(yearMatch[1]).trim() : fallback?.year ?? "",
      poster: posterMatch?.[1] ? decodeInlineJsString(posterMatch[1]).trim() : fallback?.poster ?? ""
    };
  }
  async function fetchLatestEpisodeByIdShow(idShow) {
    const payload = await fetchJson(`/api/v2/download/episode/list?id=${String(idShow)}`);
    const latest = payload.latest ?? null;
    const episodeRecord = normalizeEpisodeRecord(latest);
    if (!episodeRecord) return null;
    episodeRecord.updatedAt = Date.now();
    return episodeRecord;
  }
  function readPlayPageEpisodeContext() {
    if (!location.pathname.startsWith("/shows/play/")) return null;
    const hashMatch = /^#S(\d+)-E(\d+)-(\d+)$/i.exec(location.hash);
    if (!hashMatch) return null;
    const idShow = toPositiveInteger(window.id_show);
    const season = toPositiveInteger(hashMatch[1]);
    const episode = toPositiveInteger(hashMatch[2]);
    const idEpisode = toPositiveInteger(hashMatch[3]);
    if (!idShow || !season || !episode || !idEpisode) return null;
    return { idShow, season, episode, idEpisode };
  }
  var lastTrackedEpisodeSignature = "";
  function maybeTrackWatchedEpisodeFromPlayer() {
    const context = readPlayPageEpisodeContext();
    if (!context) return;
    const signature = `${String(context.idShow)}:${String(context.idEpisode)}`;
    if (signature === lastTrackedEpisodeSignature) return;
    const entry = findWatchlistEntryByIdShow(context.idShow);
    if (!entry) return;
    entry.lastWatched = {
      season: context.season,
      episode: context.episode,
      idEpisode: context.idEpisode,
      watchedAt: Date.now()
    };
    if (!entry.latestEpisode || compareEpisodes(entry.lastWatched, entry.latestEpisode) > 0) {
      entry.latestEpisode = {
        season: context.season,
        episode: context.episode,
        idEpisode: context.idEpisode,
        updatedAt: Date.now()
      };
    }
    lastTrackedEpisodeSignature = signature;
    saveWatchlist();
    setWatchlistMessage(
      `${entry.title} updated to watched through ${formatEpisodeLabel(entry.lastWatched)}.`,
      "success"
    );
  }
  function resetTrackedEpisode() {
    lastTrackedEpisodeSignature = "";
  }

  // scripts/lookmovie2.to/src/ad-bypass.ts
  var originalInitPrePlaybackCounter = null;
  var adBypassPoller = null;
  function hidePrePlaybackAdUi() {
    const playerPreInitAds = document.querySelector(".player-pre-init-ads");
    if (playerPreInitAds) {
      playerPreInitAds.classList.add("tw-hidden");
      playerPreInitAds.classList.add("finished");
    }
    const loadingPleaseWait = document.querySelector(".pre-init-ads--loading-please-wait");
    if (loadingPleaseWait) {
      loadingPleaseWait.classList.add("tw-hidden");
    }
    const adTimer = document.querySelector(".player-pre-init-ads_timer");
    if (adTimer) {
      adTimer.classList.add("tw-opacity-0");
    }
    document.querySelectorAll(".pre-init-ads--close").forEach((button) => {
      button.classList.remove("tw-hidden");
    });
    document.querySelectorAll(".pre-init-ads--back-button").forEach((button) => {
      button.classList.remove("tw-hidden");
    });
    if (typeof window._counterTimeout !== "undefined") {
      clearInterval(window._counterTimeout);
      delete window._counterTimeout;
    }
    if (typeof window.enableWindowScroll === "function") {
      window.enableWindowScroll();
    }
  }
  function bypassPrePlaybackCounter() {
    log.info("initPrePlaybackCounter bypassed.");
    return new Promise((resolve) => {
      hidePrePlaybackAdUi();
      resolve();
    }).finally(() => {
      if (typeof window.enableWindowScroll === "function") {
        window.enableWindowScroll();
      }
    });
  }
  function tryInstallAdTimerBypass(enabled) {
    if (!enabled) return false;
    if (typeof window.initPrePlaybackCounter === "function" && window.initPrePlaybackCounter !== bypassPrePlaybackCounter) {
      originalInitPrePlaybackCounter ?? (originalInitPrePlaybackCounter = window.initPrePlaybackCounter);
      window.initPrePlaybackCounter = bypassPrePlaybackCounter;
      log.info("Installed ad timer bypass override.");
      return true;
    }
    return window.initPrePlaybackCounter === bypassPrePlaybackCounter;
  }
  function restoreOriginalPrePlaybackCounter() {
    if (originalInitPrePlaybackCounter) {
      window.initPrePlaybackCounter = originalInitPrePlaybackCounter;
    }
  }
  function startAdTimerPolling(enabled) {
    if (adBypassPoller) return;
    adBypassPoller = window.setInterval(() => {
      if (enabled) {
        tryInstallAdTimerBypass(enabled);
        hidePrePlaybackAdUi();
      }
    }, 250);
  }
  function hideAdUi() {
    hidePrePlaybackAdUi();
  }

  // scripts/lookmovie2.to/src/auto-play.ts
  var autoPlayEnabled = false;
  var autoFullscreenEnabled = false;
  var fullscreenTriggered = false;
  var onVideoPlay = null;
  function onVideoPlayCallback(cb) {
    onVideoPlay = cb;
  }
  function applyWindowedFullscreenFallback() {
    if (!document.getElementById(FULLSCREEN_STYLE_ID)) {
      const style = document.createElement("style");
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
    document.body.classList.add(`${SCRIPT_ID}-fullscreen`);
  }
  function removeWindowedFullscreenFallback() {
    const style = document.getElementById(FULLSCREEN_STYLE_ID);
    if (style) style.remove();
    document.body.classList.remove(`${SCRIPT_ID}-fullscreen`);
  }
  function triggerVideoJsFullscreen() {
    if (!autoFullscreenEnabled || fullscreenTriggered) return false;
    const playerContainer = document.getElementById("video_player");
    if (!playerContainer) return false;
    const fullscreenButton = playerContainer.querySelector(".vjs-fullscreen-control");
    if (fullscreenButton) {
      fullscreenButton.click();
    }
    log.info("Applying fullscreen behavior.");
    applyWindowedFullscreenFallback();
    fullscreenTriggered = true;
    return true;
  }
  function dismissResumeModalIfPresent() {
    if (!autoPlayEnabled) return false;
    const dismissButton = document.getElementById("progress-from-beginning-button");
    if (dismissButton) {
      log.info("Dismissing playback modal.");
      dismissButton.click();
      return true;
    }
    return false;
  }
  function handleVideoPlay() {
    onVideoPlay?.();
    if (!autoPlayEnabled && !autoFullscreenEnabled) return;
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
    if (videoElement._lookmovieEnhancerAttached) return;
    videoElement._lookmovieEnhancerAttached = true;
    videoElement.addEventListener("play", handleVideoPlay);
  }
  function findAndAttachToVideos() {
    document.querySelectorAll("video").forEach(attachAutoplayLogic);
  }
  function setAutoPlay(enabled) {
    autoPlayEnabled = enabled;
  }
  function setAutoFullscreen(enabled) {
    autoFullscreenEnabled = enabled;
    if (!enabled) {
      removeWindowedFullscreenFallback();
      fullscreenTriggered = false;
    }
  }
  function resetFullscreenState() {
    fullscreenTriggered = false;
    removeWindowedFullscreenFallback();
  }
  function watchVideos() {
    const waitForBody = window.setInterval(() => {
      window.clearInterval(waitForBody);
      findAndAttachToVideos();
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type !== "childList") return;
          mutation.addedNodes.forEach((node) => {
            if (!(node instanceof Element)) return;
            const element = node;
            if (element.tagName === "VIDEO") {
              attachAutoplayLogic(element);
            }
            element.querySelectorAll("video").forEach(attachAutoplayLogic);
          });
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }, 100);
  }
  function refreshVideoAttachments() {
    findAndAttachToVideos();
  }

  // scripts/lookmovie2.to/src/ui.ts
  var UI_STYLES = `
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
    min-height: 0;
    display: flex;
    flex-direction: column;
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
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    background: #0f172a;
    transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.22s ease;
    cursor: pointer;
  }

  .${SCRIPT_ID}-watch-item:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }

  .${SCRIPT_ID}-watch-item[data-state="new"] {
    outline: 2px solid rgba(249, 115, 22, 0.7);
    outline-offset: -2px;
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
  }

  .${SCRIPT_ID}-watch-item[data-state="new"]:hover {
    outline-color: rgba(249, 115, 22, 0.9);
    box-shadow: 0 20px 40px rgba(249, 115, 22, 0.3);
  }

  .${SCRIPT_ID}-watch-item-poster {
    position: relative;
    width: 100%;
    aspect-ratio: 2 / 3;
    overflow: hidden;
    background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  }

  .${SCRIPT_ID}-watch-item-poster img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), filter 0.25s ease;
  }

  .${SCRIPT_ID}-watch-item:hover .${SCRIPT_ID}-watch-item-poster img {
    transform: scale(1.08);
    filter: brightness(1.05);
  }

  .${SCRIPT_ID}-watch-item-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.4) 40%,
      transparent 60%
    );
    pointer-events: none;
    z-index: 1;
  }

  .${SCRIPT_ID}-watch-item-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: rgba(255, 255, 255, 0.15);
  }

  .${SCRIPT_ID}-watch-item-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #22c55e, #4ade80);
    transition: width 0.3s ease;
  }

  .${SCRIPT_ID}-watch-item-badge {
    position: absolute;
    top: 8px;
    left: 8px;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    backdrop-filter: blur(8px);
  }

  .${SCRIPT_ID}-watch-item-badge[data-state="new"] {
    background: rgba(249, 115, 22, 0.95);
    color: #fff;
  }

  .${SCRIPT_ID}-watch-item-badge[data-state="watched"] {
    background: rgba(34, 197, 94, 0.9);
    color: #fff;
  }

  .${SCRIPT_ID}-watch-item-badge[data-state="pending"] {
    background: rgba(100, 116, 139, 0.85);
    color: #e2e8f0;
  }

  .${SCRIPT_ID}-watch-item-actions {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    gap: 6px;
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .${SCRIPT_ID}-watch-item:hover .${SCRIPT_ID}-watch-item-actions {
    opacity: 1;
    transform: translateY(0);
  }

  .${SCRIPT_ID}-watch-action-btn {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(12px);
    transition: background 0.15s ease, transform 0.15s ease;
  }

  .${SCRIPT_ID}-watch-action-btn:hover {
    background: rgba(37, 99, 235, 0.9);
    transform: scale(1.1);
  }

  .${SCRIPT_ID}-watch-action-btn:active {
    transform: scale(0.95);
  }

  .${SCRIPT_ID}-watch-action-btn[data-action="remove"]:hover {
    background: rgba(220, 38, 38, 0.9);
  }

  .${SCRIPT_ID}-watch-item-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 50px 10px 10px;
    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);
    z-index: 2;
  }

  .${SCRIPT_ID}-watch-item-title {
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 4px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  }

  .${SCRIPT_ID}-watch-item-meta {
    color: rgba(255, 255, 255, 0.7);
    font-size: 11px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
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

  .${SCRIPT_ID}-watch-item:hover .${SCRIPT_ID}-watch-item-poster img {
    transform: scale(1.05);
  }

  .${SCRIPT_ID}-watch-item-info {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px;
    background: linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 50%, transparent 100%);
  }

  .${SCRIPT_ID}-watch-item-title {
    color: #f8fafc;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 4px;
  }

  .${SCRIPT_ID}-watch-item-copy {
    color: #94a3b8;
    font-size: 10px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 8px;
  }

  .${SCRIPT_ID}-watch-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  .${SCRIPT_ID}-watch-badge[data-state="new"] {
    background: rgba(249, 115, 22, 0.9);
    color: #fff;
  }

  .${SCRIPT_ID}-watch-badge[data-state="watched"] {
    background: rgba(34, 197, 94, 0.9);
    color: #fff;
  }

  .${SCRIPT_ID}-watch-badge[data-state="pending"] {
    background: rgba(148, 163, 184, 0.4);
    color: #e2e8f0;
  }

  .${SCRIPT_ID}-watch-item-actions {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    gap: 6px;
    opacity: 0;
    transition: opacity 0.18s ease;
  }

  .${SCRIPT_ID}-watch-item:hover .${SCRIPT_ID}-watch-item-actions {
    opacity: 1;
  }

  .${SCRIPT_ID}-watch-open-btn {
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
    transition: background 0.15s ease;
  }

  .${SCRIPT_ID}-watch-open-btn:hover {
    background: rgba(37, 99, 235, 0.9);
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
  var settings = { adTimerBypass: true, autoPlay: true, autoFullscreen: true };
  var onSettingsChange = null;
  function onSettingsChangeCallback(cb) {
    onSettingsChange = cb;
  }
  function saveSettings(nextSettings) {
    settings = {
      adTimerBypass: nextSettings.adTimerBypass,
      autoPlay: nextSettings.autoPlay,
      autoFullscreen: nextSettings.autoFullscreen
    };
    try {
      localStorage.setItem(`${SCRIPT_ID}:settings`, JSON.stringify(settings));
    } catch (error) {
      log.warn("Failed to save settings.", error);
    }
    syncModalState();
    onSettingsChange?.(settings);
  }
  function syncModalState() {
    document.querySelectorAll(`#${UI_ROOT_ID} input[data-setting]`).forEach((checkbox) => {
      const settingKey = checkbox.dataset.setting;
      if (settingKey) {
        checkbox.checked = settings[settingKey];
      }
    });
  }
  function ensureUiStyle() {
    if (document.getElementById(UI_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = UI_STYLE_ID;
    style.textContent = UI_STYLES;
    document.head.appendChild(style);
  }
  function initUI(initialSettings) {
    settings = initialSettings;
    syncModalState();
  }
  var overlayEl = null;
  var toggleButton = null;
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
    if (document.getElementById(UI_ROOT_ID)) return;
    const root = document.createElement("div");
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
              ${settingMarkup("adTimerBypass", "Ad timer bypass", "Skips the pre-playback counter and hides the ad overlay.")}
              ${settingMarkup("autoPlay", "Auto play", "Clicks the resume or start button when the playback modal appears.")}
              ${settingMarkup("autoFullscreen", "Auto fullscreen", "Clicks fullscreen and applies the fullscreen fallback after playback starts.")}
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
    toggleButton = document.getElementById(`${UI_ROOT_ID}-button`);
    overlayEl = document.getElementById(`${UI_ROOT_ID}-overlay`);
    const closeButton = document.getElementById(`${UI_ROOT_ID}-close`);
    function openModal() {
      if (!overlayEl || !toggleButton) return;
      overlayEl.classList.add(`${SCRIPT_ID}-open`);
      overlayEl.setAttribute("aria-hidden", "false");
      toggleButton.setAttribute("aria-expanded", "true");
      void refreshWatchlistEntries({ force: true });
    }
    function closeModal() {
      if (!overlayEl || !toggleButton) return;
      overlayEl.classList.remove(`${SCRIPT_ID}-open`);
      overlayEl.setAttribute("aria-hidden", "true");
      toggleButton.setAttribute("aria-expanded", "false");
    }
    if (toggleButton) {
      toggleButton.addEventListener("click", () => {
        if (!overlayEl) return;
        if (overlayEl.classList.contains(`${SCRIPT_ID}-open`)) {
          closeModal();
        } else {
          openModal();
        }
      });
    }
    closeButton?.addEventListener("click", closeModal);
    if (overlayEl) {
      overlayEl.addEventListener("click", (event) => {
        if (event.target === event.currentTarget) closeModal();
      });
    }
    document.querySelectorAll(`#${UI_ROOT_ID} input[data-setting]`).forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const settingKey = checkbox.dataset.setting;
        if (settingKey) {
          saveSettings({
            ...settings,
            [settingKey]: checkbox.checked
          });
        }
      });
    });
    root.addEventListener("click", (event) => {
      const target = event.target;
      const actionTarget = target.closest("[data-watchlist-action]");
      if (!actionTarget) return;
      const { watchlistAction: action, slug = "" } = actionTarget.dataset;
      if (action === "refresh") {
        void refreshWatchlistEntries({ force: true });
        return;
      }
      if (action === "toggle-latest-watched" && slug) {
        toggleLatestEpisodeWatched(slug);
        return;
      }
      if (action === "remove" && slug) {
        removeShowFromWatchlist(slug);
      }
    });
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeModal();
    });
    syncModalState();
    renderWatchlist();
    syncLauncherState(countUnwatchedLatestEpisodes());
  }
  function buildWatchlistItemMarkup(entry) {
    const state = entry.latestEpisode ? isLatestWatched(entry) ? "watched" : "new" : "pending";
    const statusLabel = state === "new" ? "New" : state === "watched" ? "Current" : "Pending";
    const openHref = buildShowViewUrl(entry.slug, entry.latestEpisode);
    const posterUrl = entry.poster || "";
    const yearDisplay = entry.year ? escapeHtml(entry.year) : "";
    const metaText = entry.latestEpisode ? `Latest: S${String(entry.latestEpisode.season).padStart(2, "0")}E${String(entry.latestEpisode.episode).padStart(2, "0")}` : "Not synced";
    const posterHtml = posterUrl ? `<img src="${escapeHtml(posterUrl)}" alt="${escapeHtml(entry.title)}" loading="lazy">` : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#475569;font-size:32px;">\u{1F4FA}</div>`;
    const progressPercent = calculateProgress(entry);
    return `
    <article class="${SCRIPT_ID}-watch-item" data-state="${state}">
      <div class="${SCRIPT_ID}-watch-item-poster">
        ${posterHtml}
        <div class="${SCRIPT_ID}-watch-item-gradient"></div>
        <span class="${SCRIPT_ID}-watch-item-badge" data-state="${state}">${escapeHtml(statusLabel)}</span>
        <div class="${SCRIPT_ID}-watch-item-actions">
          <button class="${SCRIPT_ID}-watch-action-btn" type="button" data-watchlist-action="toggle-latest-watched" data-slug="${escapeHtml(entry.slug)}" title="${isLatestWatched(entry) ? "Mark unwatched" : "Mark watched"}">${isLatestWatched(entry) ? "\u2713" : "\u2299"}</button>
          <button class="${SCRIPT_ID}-watch-action-btn" type="button" data-action="remove" data-watchlist-action="remove" data-slug="${escapeHtml(entry.slug)}" title="Remove">\u2715</button>
        </div>
        ${progressPercent !== null ? `
        <div class="${SCRIPT_ID}-watch-item-progress">
          <div class="${SCRIPT_ID}-watch-item-progress-fill" style="width: ${String(progressPercent)}%"></div>
        </div>
        ` : ""}
        <div class="${SCRIPT_ID}-watch-item-info">
          <a class="${SCRIPT_ID}-watch-item-title" href="${escapeHtml(openHref)}">${escapeHtml(entry.title)}${yearDisplay ? ` <span style="opacity:0.6">(${yearDisplay})</span>` : ""}</a>
          <span class="${SCRIPT_ID}-watch-item-meta">${escapeHtml(metaText)}</span>
        </div>
      </div>
    </article>
  `;
  }
  function calculateProgress(entry) {
    if (!entry.latestEpisode || !entry.lastWatched) return null;
    if (entry.lastWatched.season !== entry.latestEpisode.season) return null;
    const totalEpisodes = entry.latestEpisode.episode;
    if (totalEpisodes === 0) return null;
    const watched = Math.min(entry.lastWatched.episode, totalEpisodes);
    return Math.round(watched / totalEpisodes * 100);
  }
  function renderWatchlist() {
    const summary = document.getElementById(`${UI_ROOT_ID}-watchlist-summary`);
    const status = document.getElementById(`${UI_ROOT_ID}-watchlist-status`);
    const list = document.getElementById(`${UI_ROOT_ID}-watchlist-list`);
    const refreshButton = document.getElementById(`${UI_ROOT_ID}-watchlist-refresh`);
    if (!summary || !status || !list || !refreshButton) return;
    const entries = sortWatchlistEntries(getWatchlistEntries());
    const newCount = entries.filter((entry) => entry.latestEpisode && !isLatestWatched(entry)).length;
    summary.textContent = entries.length ? `${String(entries.length)} tracked ${entries.length === 1 ? "show" : "shows"}${newCount ? ` | ${String(newCount)} with a newer latest episode` : ""}` : "Add shows from the latest episodes page to start tracking them.";
    status.dataset.tone = getWatchlistMessageTone();
    status.textContent = isWatchlistBusy() ? getWatchlistMessage() || "Refreshing watchlist..." : getWatchlistMessage() || "";
    refreshButton.disabled = isWatchlistBusy();
    if (!entries.length) {
      list.innerHTML = `<div class="${SCRIPT_ID}-watch-empty">On the <code>/shows</code> page, use the overlay button on any episode card to add that show to your personal watchlist.</div>`;
      return;
    }
    list.innerHTML = entries.map(buildWatchlistItemMarkup).join("");
  }
  function syncLauncherState(count) {
    const button = document.getElementById(`${UI_ROOT_ID}-button`);
    const badge = document.getElementById(`${UI_ROOT_ID}-button-badge`);
    const label = document.getElementById(`${UI_ROOT_ID}-button-label`);
    if (!button || !badge || !label) {
      return;
    }
    label.textContent = "LM Tools";
    if (count > 0) {
      badge.hidden = false;
      badge.textContent = String(count);
      button.dataset.hasNew = "true";
    } else {
      badge.hidden = true;
      badge.textContent = "0";
      button.dataset.hasNew = "false";
    }
  }

  // scripts/lookmovie2.to/src/page-helpers.ts
  function isLatestShowsPage() {
    return location.pathname === "/shows";
  }
  function isShowViewPage() {
    return location.pathname.startsWith("/shows/view/");
  }
  function getCurrentShowViewData() {
    if (!isShowViewPage() || !window.show_storage) return null;
    const slug = typeof window.show_storage.slug === "string" ? window.show_storage.slug : "";
    if (!slug) return null;
    const params = new URLSearchParams(location.search);
    const episode = normalizeEpisodeRecord({
      season: params.get("season"),
      episode: params.get("episode"),
      idEpisode: params.get("id_episode")
    });
    return {
      slug,
      title: typeof window.show_storage.title === "string" ? window.show_storage.title : slug,
      year: typeof window.show_storage.year === "string" || typeof window.show_storage.year === "number" ? String(window.show_storage.year) : "",
      poster: typeof window.show_storage.poster_medium === "string" ? window.show_storage.poster_medium : "",
      idShow: typeof window.show_storage.id_show === "number" ? window.show_storage.id_show : 0,
      episode
    };
  }
  function updateEpisodeCardButton(button) {
    const slug = button.dataset.watchlistSlug ?? "";
    const entry = getWatchlistEntry(slug);
    const cardEpisode = normalizeEpisodeRecord({
      season: button.dataset.season,
      episode: button.dataset.episode,
      idEpisode: button.dataset.idEpisode
    });
    if (!entry) {
      button.dataset.state = "add";
      button.textContent = "+ Watch";
      button.title = "Add this show to your watchlist";
      button.disabled = false;
      return;
    }
    const hasNewEpisode = cardEpisode && (!entry.lastWatched || compareEpisodes(cardEpisode, entry.lastWatched) > 0);
    button.dataset.state = hasNewEpisode ? "watching-new" : "watching";
    button.textContent = "Watching";
    button.title = hasNewEpisode ? "This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist." : "This show is already in your watchlist. Click to remove it.";
    button.disabled = false;
  }
  function syncEpisodeCardButtons() {
    document.querySelectorAll(`.${SCRIPT_ID}-episode-watch-button`).forEach(updateEpisodeCardButton);
  }
  function handleEpisodeButtonClick(button) {
    const slug = button.dataset.watchlistSlug;
    if (!slug) return;
    if (getWatchlistEntry(slug)) {
      removeShowFromWatchlist(slug);
      return;
    }
    button.dataset.state = "adding";
    button.textContent = "Adding...";
    button.disabled = true;
    void addShowToWatchlist({
      slug,
      title: button.dataset.title ?? slug,
      year: button.dataset.year ?? "",
      poster: button.dataset.poster ?? "",
      episode: normalizeEpisodeRecord({
        season: button.dataset.season,
        episode: button.dataset.episode,
        idEpisode: button.dataset.idEpisode
      })
    });
    updateEpisodeCardButton(button);
  }
  function ensureEpisodeCardButtons() {
    if (!isLatestShowsPage()) return;
    document.querySelectorAll(".episode-item").forEach((cardElement) => {
      const card = parseEpisodeCard(cardElement);
      if (!card) return;
      let button = cardElement.querySelector(`.${SCRIPT_ID}-episode-watch-button`);
      if (!button) {
        button = document.createElement("button");
        button.type = "button";
        button.className = `${SCRIPT_ID}-episode-watch-button`;
        cardElement.appendChild(button);
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const target = event.currentTarget;
          handleEpisodeButtonClick(target);
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
  function updateShowViewWatchButton(button) {
    const slug = button.dataset.watchlistSlug ?? "";
    const entry = getWatchlistEntry(slug);
    const pageEpisode = normalizeEpisodeRecord({
      season: button.dataset.season,
      episode: button.dataset.episode,
      idEpisode: button.dataset.idEpisode
    });
    if (!entry) {
      button.dataset.state = "add";
      button.textContent = "+ Add To Watchlist";
      button.title = "Add this show to your watchlist";
      button.disabled = false;
      return;
    }
    const hasNewEpisode = pageEpisode && (!entry.lastWatched || compareEpisodes(pageEpisode, entry.lastWatched) > 0);
    button.dataset.state = hasNewEpisode ? "watching-new" : "watching";
    button.textContent = hasNewEpisode ? "Watching: New Episode" : "Watching";
    button.title = hasNewEpisode ? "This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist." : "This show is already in your watchlist. Click to remove it.";
    button.disabled = false;
  }
  function syncShowViewWatchButton() {
    document.querySelectorAll(`.${SCRIPT_ID}-show-view-watch-button`).forEach(updateShowViewWatchButton);
  }
  function handleShowViewButtonClick(button) {
    const slug = button.dataset.watchlistSlug;
    if (!slug) return;
    if (getWatchlistEntry(slug)) {
      removeShowFromWatchlist(slug);
      return;
    }
    button.dataset.state = "adding";
    button.textContent = "Adding...";
    button.disabled = true;
    void addShowToWatchlist({
      slug,
      title: button.dataset.title ?? slug,
      year: button.dataset.year ?? "",
      poster: button.dataset.poster ?? "",
      episode: normalizeEpisodeRecord({
        season: button.dataset.season,
        episode: button.dataset.episode,
        idEpisode: button.dataset.idEpisode
      })
    });
    updateShowViewWatchButton(button);
  }
  function ensureShowViewWatchButton() {
    if (!isShowViewPage()) return;
    const show = getCurrentShowViewData();
    if (!show) return;
    const actionHost = document.querySelector(".watch-heading") ?? document.querySelector(".movie-single-ct.main-content") ?? document.querySelector(".internal-page-container");
    if (!actionHost) return;
    let wrap = document.querySelector(`.${SCRIPT_ID}-show-view-watch-wrap`);
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.className = `${SCRIPT_ID}-show-view-watch-wrap`;
      actionHost.appendChild(wrap);
    }
    let button = wrap.querySelector(`.${SCRIPT_ID}-show-view-watch-button`);
    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.className = `${SCRIPT_ID}-show-view-watch-button`;
      wrap.appendChild(button);
      const newButton = button;
      newButton.addEventListener("click", () => {
        handleShowViewButtonClick(newButton);
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
  var EPISODE_BUTTON_STYLES_ID = `${SCRIPT_ID}-episode-button-styles`;
  var EPISODE_BUTTON_STYLES = `
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
`;
  function ensureEpisodeButtonStyles() {
    if (document.getElementById(EPISODE_BUTTON_STYLES_ID)) return;
    const style = document.createElement("style");
    style.id = EPISODE_BUTTON_STYLES_ID;
    style.textContent = EPISODE_BUTTON_STYLES;
    document.head.appendChild(style);
  }

  // scripts/lookmovie2.to/src/index.ts
  var settings2 = loadSettings();
  var domBootstrapped = false;
  var uiBootAttempts = 0;
  var lastKnownUrl = location.href;
  function handleSettingsChange(nextSettings) {
    settings2 = nextSettings;
    if (settings2.adTimerBypass) {
      tryInstallAdTimerBypass(settings2.adTimerBypass);
      hideAdUi();
    } else {
      restoreOriginalPrePlaybackCounter();
    }
    setAutoPlay(settings2.autoPlay);
    setAutoFullscreen(settings2.autoFullscreen);
  }
  function watchNavigation() {
    window.setInterval(() => {
      if (location.href === lastKnownUrl) return;
      lastKnownUrl = location.href;
      resetFullscreenState();
      resetTrackedEpisode();
      refreshVideoAttachments();
      ensureUi();
      renderWatchlist();
      syncEpisodeCardButtons();
      ensureEpisodeCardButtons();
      syncShowViewWatchButton();
      ensureShowViewWatchButton();
      void refreshWatchlistEntries();
    }, ROUTE_POLL_MS);
  }
  function bootstrapDomFeatures() {
    if (domBootstrapped) return;
    domBootstrapped = true;
    ensureEpisodeButtonStyles();
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
    syncLauncherState(countUnwatchedLatestEpisodes());
    syncEpisodeCardButtons();
    syncShowViewWatchButton();
    void refreshWatchlistEntries();
  }
  var buildInfo = {
    name: "lookmovie2.to",
    version: "1.2.0",
    built: "2026-04-16T06:50:12.389Z"
  };
  function init() {
    log.info(
      `${buildInfo.name} v${buildInfo.version} loaded @ ${buildInfo.built}`,
      "font-weight: bold; color: #22c55e;"
    );
    onVideoPlayCallback(() => {
      maybeTrackWatchedEpisodeFromPlayer();
    });
    initUI(settings2);
    onSettingsChangeCallback(handleSettingsChange);
    onChange(() => {
      renderWatchlist();
      syncLauncherState(countUnwatchedLatestEpisodes());
      syncEpisodeCardButtons();
      syncShowViewWatchButton();
    });
    setAutoPlay(settings2.autoPlay);
    setAutoFullscreen(settings2.autoFullscreen);
    tryInstallAdTimerBypass(settings2.adTimerBypass);
    startAdTimerPolling(settings2.adTimerBypass);
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", bootstrapDomFeatures, { once: true });
    } else {
      bootstrapDomFeatures();
    }
  }
  init();
})();
