import type { Settings, WatchlistEntry } from './types';
import { SCRIPT_ID, UI_STYLE_ID, UI_ROOT_ID, escapeHtml, log, buildShowViewUrl } from './utils';
import {
  getWatchlistEntries,
  isLatestWatched,
  countUnwatchedLatestEpisodes,
  sortWatchlistEntries,
  getWatchlistMessage,
  getWatchlistMessageTone,
  isWatchlistBusy,
  refreshWatchlistEntries,
  removeShowFromWatchlist,
  toggleLatestEpisodeWatched,
} from './watchlist';

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
    box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.6), 0 4px 12px rgba(249, 115, 22, 0.15);
  }

  .${SCRIPT_ID}-watch-item[data-state="new"]:hover {
    box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.8), 0 20px 40px rgba(249, 115, 22, 0.25);
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
      rgba(0, 0, 0, 0.5) 30%,
      transparent 60%
    );
    pointer-events: none;
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
    padding: 12px 10px 10px;
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
    adTimerBypass: nextSettings.adTimerBypass,
    autoPlay: nextSettings.autoPlay,
    autoFullscreen: nextSettings.autoFullscreen,
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
  document
    .querySelectorAll<HTMLInputElement>(`#${UI_ROOT_ID} input[data-setting]`)
    .forEach((checkbox) => {
      const settingKey = checkbox.dataset.setting as keyof Settings | undefined;
      if (settingKey) {
        checkbox.checked = settings[settingKey];
      }
    });
}

// ---------------------------------------------------------------------------
// UI style injection
// ---------------------------------------------------------------------------

export function ensureUiStyle(): void {
  if (document.getElementById(UI_STYLE_ID)) return;

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

  if (document.getElementById(UI_ROOT_ID)) return;

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
      if (event.target === event.currentTarget) closeModal();
    });
  }

  document
    .querySelectorAll<HTMLInputElement>(`#${UI_ROOT_ID} input[data-setting]`)
    .forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        const settingKey = checkbox.dataset.setting as keyof Settings | undefined;
        if (settingKey) {
          saveSettings({
            ...settings,
            [settingKey]: checkbox.checked,
          });
        }
      });
    });

  root.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const actionTarget = target.closest<HTMLElement>('[data-watchlist-action]');
    if (!actionTarget) return;

    const { watchlistAction: action, slug = '' } = actionTarget.dataset;

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
  const statusLabel = state === 'new' ? 'New' : state === 'watched' ? 'Current' : 'Pending';
  const openHref = buildShowViewUrl(entry.slug, entry.latestEpisode);
  const posterUrl = entry.poster || '';
  const yearDisplay = entry.year ? escapeHtml(entry.year) : '';
  const metaText = entry.latestEpisode
    ? `Latest: S${String(entry.latestEpisode.season).padStart(2, '0')}E${String(entry.latestEpisode.episode).padStart(2, '0')}`
    : 'Not synced';

  const posterHtml = posterUrl
    ? `<img src="${escapeHtml(posterUrl)}" alt="${escapeHtml(entry.title)}" loading="lazy">`
    : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#475569;font-size:32px;">📺</div>`;

  const progressPercent = calculateProgress(entry);

  return `
    <article class="${SCRIPT_ID}-watch-item" data-state="${state}">
      <div class="${SCRIPT_ID}-watch-item-poster">
        ${posterHtml}
        <div class="${SCRIPT_ID}-watch-item-gradient"></div>
        <span class="${SCRIPT_ID}-watch-item-badge" data-state="${state}">${escapeHtml(statusLabel)}</span>
        <div class="${SCRIPT_ID}-watch-item-actions">
          <button class="${SCRIPT_ID}-watch-action-btn" type="button" data-watchlist-action="toggle-latest-watched" data-slug="${escapeHtml(entry.slug)}" title="${isLatestWatched(entry) ? 'Mark unwatched' : 'Mark watched'}">${isLatestWatched(entry) ? '✓' : '⊙'}</button>
          <button class="${SCRIPT_ID}-watch-action-btn" type="button" data-action="remove" data-watchlist-action="remove" data-slug="${escapeHtml(entry.slug)}" title="Remove">✕</button>
        </div>
        ${
          progressPercent !== null
            ? `
        <div class="${SCRIPT_ID}-watch-item-progress">
          <div class="${SCRIPT_ID}-watch-item-progress-fill" style="width: ${String(progressPercent)}%"></div>
        </div>
        `
            : ''
        }
        <div class="${SCRIPT_ID}-watch-item-info">
          <a class="${SCRIPT_ID}-watch-item-title" href="${escapeHtml(openHref)}">${escapeHtml(entry.title)}${yearDisplay ? ` <span style="opacity:0.6">(${yearDisplay})</span>` : ''}</a>
          <span class="${SCRIPT_ID}-watch-item-meta">${escapeHtml(metaText)}</span>
        </div>
      </div>
    </article>
  `;
}

function calculateProgress(entry: WatchlistEntry): number | null {
  if (!entry.latestEpisode || !entry.lastWatched) return null;
  if (entry.lastWatched.season !== entry.latestEpisode.season) return null;
  const totalEpisodes = entry.latestEpisode.episode;
  if (totalEpisodes === 0) return null;
  const watched = Math.min(entry.lastWatched.episode, totalEpisodes);
  return Math.round((watched / totalEpisodes) * 100);
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
    ? `${String(entries.length)} tracked ${entries.length === 1 ? 'show' : 'shows'}${newCount ? ` | ${String(newCount)} with a newer latest episode` : ''}`
    : 'Add shows from the latest episodes page to start tracking them.';

  status.dataset.tone = getWatchlistMessageTone();
  status.textContent = isWatchlistBusy()
    ? getWatchlistMessage() || 'Refreshing watchlist...'
    : getWatchlistMessage() || '';

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
