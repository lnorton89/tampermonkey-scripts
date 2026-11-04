import { ensureStyle, onDomChange } from '@userscripts/core';
import { SCRIPT_ID, SUBTITLE_RESYNC_INTERVAL_MS } from '../config/constants';
import { saveSettings } from '../core/settings';
import { connectSiteStores, getSiteStores, type SiteStores } from '../core/siteStores';
import { appState } from '../core/state';

const ROW_ATTR = `data-${SCRIPT_ID}-subtitle-resync`;
const rowUpdates = new WeakMap<Element, () => void>();

/** Aether resets its matcher on caption identity changes, not on autoSyncEnabled changes.
 * Clear and restore selection synchronously so its store subscriber resets the analysis;
 * React receives the original selection in the same task. Keep subtitle text/delay and any
 * translation task intact (calling setCaption(null) would cancel an in-flight translation).
 */
export function restartSubtitleAnalysis(stores: SiteStores): boolean {
  const { player, subtitles } = stores;
  const state = player.getState();
  const caption = state.caption;
  if (
    !subtitles.getState().autoSyncEnabled ||
    !caption.selected?.srtData ||
    caption.asTrack ||
    state.display?.getType() !== 'web'
  )
    return false;
  try {
    player.setState({ caption: { ...caption, selected: null } });
  } finally {
    const current = player.getState();
    // Do not resurrect a track if another subscriber changed the source or selected a track.
    if (current.source === state.source && current.caption.selected === null) {
      player.setState({ caption: { ...current.caption, selected: caption.selected } });
    }
  }
  if (player.getState().caption.selected !== caption.selected) return false;
  subtitles.getState().setAutoSyncResult({ status: 'listening', at: Date.now() });
  return true;
}

/** Time only actual playback; pauses, buffering, seeks and track/source changes cannot
 * schedule a burst of scans. The scheduler continues while the settings menu is closed.
 */
export function createSubtitleResyncTick(stores: SiteStores): () => void {
  let elapsed = 0;
  let previousNow = performance.now();
  let previousTime = 0;
  let previousVideo: HTMLVideoElement | null = null;
  let previousSrc = '';
  let previousCaption: unknown;
  let previousActive = false;
  let previousPlaying = false;
  let previousDelay = stores.subtitles.getState().delay;
  return () => {
    const now = performance.now();
    const delta = Math.max(0, now - previousNow);
    previousNow = now;
    const video =
      document.querySelector<HTMLVideoElement>('#video-element') || document.querySelector('video');
    const player = stores.player.getState();
    const subtitles = stores.subtitles.getState();
    const captionKey = player.caption.selected?.id ?? player.caption.selected?.srtData;
    const active =
      appState.settings.subtitleResyncEnabled &&
      subtitles.autoSyncEnabled &&
      !!player.caption.selected?.srtData &&
      !player.caption.asTrack &&
      player.display?.getType() === 'web';
    const src = video?.currentSrc || video?.src || '';
    const time = video?.currentTime ?? 0;
    const playing =
      active && !!video && !video.paused && !video.ended && !video.seeking && video.readyState >= 3;
    const jumped =
      !!video &&
      Math.abs(time - previousTime) > Math.max(2, (delta / 1000) * video.playbackRate + 1);
    if (
      !active ||
      active !== previousActive ||
      video !== previousVideo ||
      src !== previousSrc ||
      captionKey !== previousCaption ||
      jumped ||
      video?.seeking ||
      subtitles.delay !== previousDelay
    ) {
      elapsed = 0;
    } else if (playing && previousPlaying && delta <= 5000 && time > previousTime) {
      elapsed += delta;
    }
    previousVideo = video;
    previousSrc = src;
    previousTime = time;
    previousCaption = captionKey;
    previousActive = active;
    previousPlaying = playing;
    previousDelay = subtitles.delay;
    if (elapsed >= SUBTITLE_RESYNC_INTERVAL_MS) {
      elapsed = 0;
      restartSubtitleAnalysis(stores);
    }
  };
}

function createResyncRow(): HTMLDivElement {
  const row = document.createElement('div');
  row.setAttribute(ROW_ATTR, '');
  row.className = 'space-y-2';
  row.innerHTML = `
    <div class="flex justify-between items-center" style="gap: 0.75rem">
      <p class="font-medium">Re-sync every minute</p>
      <button type="button" role="switch" aria-label="Re-sync subtitles every minute"
        class="w-11 h-6 p-1 rounded-full grid shrink-0 transition-colors duration-100 group/toggle tabbable">
        <span class="relative w-full h-full"><span data-knob class="h-full aspect-square rounded-full bg-white absolute" style="top: 0"></span></span>
      </button>
    </div>
    <p class="text-xs" data-description></p>
  `;
  const button = row.querySelector('button')!;
  const knob = row.querySelector<HTMLElement>('[data-knob]')!;
  const description = row.querySelector<HTMLElement>('[data-description]')!;
  const sync = (): void => {
    const stores = getSiteStores();
    const parentEnabled = !!stores?.subtitles.getState().autoSyncEnabled;
    const enabled = appState.settings.subtitleResyncEnabled;
    button.setAttribute('aria-checked', String(enabled));
    button.disabled = !parentEnabled;
    button.classList.toggle('bg-buttons-toggle', enabled);
    button.classList.toggle('bg-buttons-toggleDisabled', !enabled);
    knob.style.left = enabled ? '100%' : '0';
    knob.style.transform = enabled ? 'translateX(-100%)' : '';
    row.style.opacity = parentEnabled ? '1' : '0.6';
    const text = !stores
      ? 'Waiting for Aether’s subtitle controls…'
      : !parentEnabled
        ? 'Turn on Auto-sync with audio to enable periodic re-sync.'
        : enabled
          ? 'Starts a fresh audio scan every minute of playback to correct drift.'
          : 'Periodic re-sync is off. Auto-sync with audio still works normally.';
    if (description.textContent !== text) description.textContent = text;
  };
  button.addEventListener('click', () => {
    saveSettings({
      ...appState.settings,
      subtitleResyncEnabled: !appState.settings.subtitleResyncEnabled,
    });
    sync();
  });
  for (const event of ['click', 'pointerdown', 'keydown', 'keyup'])
    row.addEventListener(event, (event) => event.stopPropagation());
  rowUpdates.set(row, sync);
  sync();
  return row;
}

export function ensureSubtitleResyncSetting(): void {
  for (const label of document.querySelectorAll('p.font-medium')) {
    if (label.textContent?.trim() !== 'Auto-sync with audio') continue;
    const toggleRow = label.parentElement;
    const section = toggleRow?.parentElement;
    if (!toggleRow?.querySelector('button') || !section) continue;
    // Keep the site's description/status with its toggle; place our setting before diagnostics.
    const existing = section.querySelector(`[${ROW_ATTR}]`);
    let anchor: Element = toggleRow;
    let next = anchor.nextElementSibling;
    while (next && (next.tagName === 'SPAN' || next === existing)) {
      if (next.tagName === 'SPAN') anchor = next;
      next = next.nextElementSibling;
    }
    // React inserts/removes its status span when auto-sync is toggled. Keep that span with
    // the native setting even when it was inserted after our unmanaged row.
    if (!existing) anchor.after(createResyncRow());
    else if (anchor.nextElementSibling !== existing) anchor.after(existing);
  }
}

export function watchSubtitleResync(): void {
  ensureStyle(
    `${SCRIPT_ID}-subtitle-resync-style`,
    `
    [${ROW_ATTR}] button:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
    [${ROW_ATTR}] button:disabled { cursor: default; }
  `
  );
  let tick: (() => void) | null = null;
  const updateRows = (): void =>
    document.querySelectorAll(`[${ROW_ATTR}]`).forEach((row) => rowUpdates.get(row)?.());
  const connect = async (): Promise<void> => {
    if (tick) return;
    const stores = await connectSiteStores();
    if (!stores || tick) return;
    tick = createSubtitleResyncTick(stores);
    stores.subtitles.subscribe(updateRows);
    updateRows();
  };
  onDomChange(ensureSubtitleResyncSetting);
  void connect();
  window.setInterval(() => {
    if (tick) tick();
    else void connect();
  }, 1000);
}
