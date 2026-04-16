import type { Settings, WatchlistEntry } from './types';
import {
  SCRIPT_ID,
  UI_STYLE_ID,
  UI_ROOT_ID,
  escapeHtml,
  formatEpisodeLabel,
  log,
} from './utils';
import {
  getWatchlistEntries,
  getWatchlistEntry,
  isLatestWatched,
  countUnwatchedLatestEpisodes,
  sortWatchlistEntries,
  getWatchlistMessage,
  getWatchlistMessageTone,
  isWatchlistBusy,
  refreshWatchlistEntries,
  removeShowFromWatchlist,
  toggleLatestEpisodeWatched,
  onChange,
} from './watchlist';
import { buildShowViewUrl } from './utils';

// ---------------------------------------------------------------------------
// CSS styles
// ---------------------------------------------------------------------------

const UI_STYLES = `
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

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

let settings: Settings = { adTimerBypass: true, autoPlay: true, autoFullscreen: true };
let onSettingsChange: ((s: Settings) => void) | null = null;

export function onSettingsChangeCallback(cb: (s: Settings) => void): void {
  onSettingsChange = cb;
}

function saveSettings(nextSettings: Settings): void {
  settings = {
    adTimerBypass: !!nextSettings.adTimerBypass,
    autoPlay: !!nextSettings.autoPlay,
    autoFullscreen: !!nextSettings.autoFullscreen,
  };

  try {
    localStorage.setItem(`${SCRIPT_ID}:settings`, JSON.stringify(settings));
  } catch (error) {
    log.warn('Failed to save settings.', error);
  }

  syncModalState();
  onSettingsChange?.(settings);
}

export function syncModalState(): void {
  document.querySelectorAll<HTMLInputElement>(`#${UI_ROOT_ID} input[data-setting]`).forEach((checkbox) => {
    checkbox.checked = !!settings[checkbox.dataset.setting as keyof Settings];
  });
}

// ---------------------------------------------------------------------------
// UI style injection
// ---------------------------------------------------------------------------

export function ensureUiStyle(): void {
  if (!document.head || document.getElementById(UI_STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = UI_STYLE_ID;
  style.textContent = UI_STYLES;
  document.head.appendChild(style);
}

export function initUI(initialSettings: Settings): void {
  settings = initialSettings;
  syncModalState();
}

let overlayEl: HTMLElement | null = null;
let toggleButton: HTMLElement | null = null;

function settingMarkup(settingKey: keyof Settings, title: string, copy: string): string {
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

export function ensureUi(): void {
  ensureUiStyle();

  if (!document.body || document.getElementById(UI_ROOT_ID)) return;

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

  toggleButton = document.getElementById(`${UI_ROOT_ID}-button`);
  overlayEl = document.getElementById(`${UI_ROOT_ID}-overlay`);
  const closeButton = document.getElementById(`${UI_ROOT_ID}-close`);

  function openModal(): void {
    if (!overlayEl || !toggleButton) return;
    overlayEl.classList.add(`${SCRIPT_ID}-open`);
    overlayEl.setAttribute('aria-hidden', 'false');
    toggleButton.setAttribute('aria-expanded', 'true');
    void refreshWatchlistEntries({ force: true });
  }

  function closeModal(): void {
    if (!overlayEl || !toggleButton) return;
    overlayEl.classList.remove(`${SCRIPT_ID}-open`);
    overlayEl.setAttribute('aria-hidden', 'true');
    toggleButton.setAttribute('aria-expanded', 'false');
  }

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      if (!overlayEl) return;
      if (overlayEl.classList.contains(`${SCRIPT_ID}-open`)) {
        closeModal();
      } else {
        openModal();
      }
    });
  }

  closeButton?.addEventListener('click', closeModal);
  if (overlayEl) {
    overlayEl.addEventListener('click', (event) => {
      if (event.target === overlayEl) closeModal();
    });
  }

  document.querySelectorAll<HTMLInputElement>(`#${UI_ROOT_ID} input[data-setting]`).forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      saveSettings({
        ...settings,
        [checkbox.dataset.setting!]: checkbox.checked,
      });
    });
  });

  root.addEventListener('click', (event) => {
    const actionTarget = (event.target as HTMLElement).closest('[data-watchlist-action]');
    if (!actionTarget) return;

    const action = (actionTarget as HTMLElement).dataset.watchlistAction;
    const slug = (actionTarget as HTMLElement).dataset.slug || '';

    if (action === 'refresh') {
      void refreshWatchlistEntries({ force: true });
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
    if (event.key === 'Escape') closeModal();
  });

  syncModalState();
  renderWatchlist();
  syncLauncherState(countUnwatchedLatestEpisodes());
}

// ---------------------------------------------------------------------------
// Launcher / badge
// ---------------------------------------------------------------------------
// Watchlist rendering
// ---------------------------------------------------------------------------

function buildWatchlistItemMarkup(entry: WatchlistEntry): string {
  const state = entry.latestEpisode ? (isLatestWatched(entry) ? 'watched' : 'new') : 'pending';
  const latestCopy = entry.latestEpisode ? `Latest ${formatEpisodeLabel(entry.latestEpisode)}` : 'Latest episode not synced yet';
  const watchedCopy = entry.lastWatched
    ? `Watched through ${formatEpisodeLabel(entry.lastWatched)}`
    : 'Nothing marked watched yet';
  const errorCopy = entry.lastSyncError ? `Sync issue: ${entry.lastSyncError}` : '';
  const statusLabel = state === 'new' ? 'New episode' : (state === 'watched' ? 'Up to date' : 'Pending sync');
  const openHref = buildShowViewUrl(entry.slug, entry.latestEpisode);
  const toggleLabel = isLatestWatched(entry) ? 'Unwatch latest' : 'Mark latest watched';
  const toggleDisabled = entry.latestEpisode ? '' : 'disabled';
  const yearCopy = entry.year ? ` (${escapeHtml(entry.year)})` : '';
  const posterUrl = entry.poster || '';
  const summaryPieces = [latestCopy, watchedCopy];

  if (errorCopy) summaryPieces.push(errorCopy);

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

export function renderWatchlist(): void {
  const summary = document.getElementById(`${UI_ROOT_ID}-watchlist-summary`);
  const status = document.getElementById(`${UI_ROOT_ID}-watchlist-status`);
  const list = document.getElementById(`${UI_ROOT_ID}-watchlist-list`);
  const refreshButton = document.getElementById(`${UI_ROOT_ID}-watchlist-refresh`);

  if (!summary || !status || !list || !refreshButton) return;

  const entries = sortWatchlistEntries(getWatchlistEntries());
  const newCount = entries.filter((entry) => entry.latestEpisode && !isLatestWatched(entry)).length;
  summary.textContent = entries.length
    ? `${entries.length} tracked ${entries.length === 1 ? 'show' : 'shows'}${newCount ? ` | ${newCount} with a newer latest episode` : ''}`
    : 'Add shows from the latest episodes page to start tracking them.';

  status.dataset.tone = getWatchlistMessageTone();
  status.textContent = isWatchlistBusy()
    ? (getWatchlistMessage() || 'Refreshing watchlist...')
    : (getWatchlistMessage() || '');

  (refreshButton as HTMLButtonElement).disabled = isWatchlistBusy();

  if (!entries.length) {
    list.innerHTML = `<div class="${SCRIPT_ID}-watch-empty">On the <code>/shows</code> page, use the overlay button on any episode card to add that show to your personal watchlist.</div>`;
    return;
  }

  list.innerHTML = entries.map(buildWatchlistItemMarkup).join('');
}

export function syncLauncherState(count: number): void {
  const button = document.getElementById(`${UI_ROOT_ID}-button`);
  const badge = document.getElementById(`${UI_ROOT_ID}-button-badge`);
  const label = document.getElementById(`${UI_ROOT_ID}-button-label`);
  if (!button || !badge || !label) {
    return;
  }

  label.textContent = 'LM Tools';

  if (count > 0) {
    badge.hidden = false;
    badge.textContent = String(count);
    button.dataset.hasNew = 'true';
  } else {
    badge.hidden = true;
    badge.textContent = '0';
    button.dataset.hasNew = 'false';
  }
}

// ---------------------------------------------------------------------------
// Initialization
// ---------------------------------------------------------------------------

export function getSettings(): Settings {
  return { ...settings };
}
