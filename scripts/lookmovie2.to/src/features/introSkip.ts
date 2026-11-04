import type { UnknownRecord } from '@userscripts/core';
import { SCRIPT_ID } from '../config/constants';
import { appState } from '../core/state';
import {
  loadIntroTimes,
  persistIntroTimes,
  type IntroTime,
  type IntroTimes,
} from '../core/storage';
import { startAutoNextCountdown } from './autoNext';

const INTRO_CLASS = `${SCRIPT_ID}-intro`;
// Leave the last moment of the intro alone so a skip never lands past the end of it.
const SKIP_END_MARGIN_SECONDS = 1;
const MIN_INTRO_SECONDS = 5;

/** Saved times with an intro range. `start` and `end` are always saved together. */
type SavedIntro = IntroTime & { start: number; end: number };

let introTimes: IntroTimes | null = null;
let markingStart: number | null = null;
let skippedOnHash = '';
let creditsTriggeredOnHash = '';
let controls: HTMLDivElement | null = null;
let toastTimer = 0;

function getIntroTimes(): IntroTimes {
  if (!introTimes) {
    introTimes = loadIntroTimes();
  }

  return introTimes;
}

// Play and view pages use different numeric prefixes for the same show, so the name is the key.
function getShowKey(): string {
  const match = /^\/shows\/play\/(?:\d+-)?([^/?#]+)/i.exec(location.pathname);
  return match ? (match[1] ?? '').toLowerCase() : '';
}

function getSavedTimes(): IntroTime | null {
  const showKey = getShowKey();
  return showKey ? getIntroTimes()[showKey] || null : null;
}

function getSavedIntro(): SavedIntro | null {
  const saved = getSavedTimes();
  return saved && Number.isFinite(saved.start) ? (saved as SavedIntro) : null;
}

function updateSavedTimes(changes: Partial<IntroTime>): void {
  const showKey = getShowKey();
  const next: UnknownRecord = { ...(getSavedTimes() || {}), ...changes, updatedAt: Date.now() };
  Object.keys(next).forEach((key) => {
    if (next[key] === undefined) {
      delete next[key];
    }
  });
  if (Number.isFinite(next.start) || Number.isFinite(next.creditsFromEnd)) {
    getIntroTimes()[showKey] = next as unknown as IntroTime;
  } else {
    delete getIntroTimes()[showKey];
  }

  persistIntroTimes(getIntroTimes());
}

export function formatClock(seconds: number): string {
  const total = Math.max(0, Math.round(seconds));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

function getVideo(): HTMLVideoElement | null {
  return document.querySelector('#video_player video');
}

function isInIntro(saved: SavedIntro | null, time: number): saved is SavedIntro {
  return !!saved && time >= saved.start && time < saved.end - SKIP_END_MARGIN_SECONDS;
}

export function showPlayerToast(message: string): void {
  const container = ensureControls();
  if (!container) {
    return;
  }

  const toast = container.querySelector<HTMLElement>(`.${INTRO_CLASS}-toast`);
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.hidden = true;
  }, 2500);
}

// Jumps past the saved intro if playback is inside it. Used by the S shortcut.
export function skipIntroNow(): boolean {
  const video = getVideo();
  const saved = getSavedIntro();
  if (!video || !isInIntro(saved, video.currentTime)) {
    return false;
  }

  skippedOnHash = location.hash;
  video.currentTime = saved.end;
  showPlayerToast('Skipped intro');
  return true;
}

function makeButton(label: string, className: string, onClick: () => void): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.textContent = label;
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    onClick();
  });
  return button;
}

function buildIntroRow(buttonClass: string, onChange: () => void): HTMLDivElement {
  const row = document.createElement('div');
  row.className = `${SCRIPT_ID}-player-menu-row`;
  const label = document.createElement('span');
  label.textContent = 'Intro';
  row.append(label);
  const saved = getSavedIntro();

  if (markingStart !== null) {
    const start = markingStart;
    row.append(
      makeButton(`Mark end (from ${formatClock(start)})`, buttonClass, () => {
        const video = getVideo();
        const end = video ? video.currentTime : 0;
        if (end - start < MIN_INTRO_SECONDS) {
          showPlayerToast(`Play past the intro first (at least ${MIN_INTRO_SECONDS}s).`);
          return;
        }

        updateSavedTimes({ start, end });
        markingStart = null;
        skippedOnHash = location.hash;
        showPlayerToast(`Intro saved: ${formatClock(start)}–${formatClock(end)}`);
        onChange();
      }),
      makeButton('Cancel', buttonClass, () => {
        markingStart = null;
        onChange();
      })
    );
  } else if (saved) {
    const range = document.createElement('em');
    range.textContent = `${formatClock(saved.start)}–${formatClock(saved.end)}`;
    row.append(
      range,
      makeButton('Clear', buttonClass, () => {
        updateSavedTimes({ start: undefined, end: undefined });
        updateSkipButton(getVideo());
        showPlayerToast('Intro cleared for this show.');
        onChange();
      })
    );
  } else {
    row.append(
      makeButton('Mark start here', buttonClass, () => {
        const video = getVideo();
        markingStart = video ? video.currentTime : 0;
        showPlayerToast('Now play to the end of the intro and mark it.');
        onChange();
      })
    );
  }

  return row;
}

function buildCreditsRow(buttonClass: string, onChange: () => void): HTMLDivElement {
  const row = document.createElement('div');
  row.className = `${SCRIPT_ID}-player-menu-row`;
  const label = document.createElement('span');
  label.textContent = 'Credits';
  row.append(label);
  const saved = getSavedTimes();

  if (saved?.creditsFromEnd !== undefined && Number.isFinite(saved.creditsFromEnd)) {
    const offset = document.createElement('em');
    offset.textContent = `last ${formatClock(saved.creditsFromEnd)}`;
    row.append(
      offset,
      makeButton('Clear', buttonClass, () => {
        updateSavedTimes({ creditsFromEnd: undefined });
        showPlayerToast('Credits cleared for this show.');
        onChange();
      })
    );
  } else {
    row.append(
      makeButton('Mark credits start here', buttonClass, () => {
        const video = getVideo();
        if (!video || !Number.isFinite(video.duration)) {
          return;
        }

        const creditsFromEnd = video.duration - video.currentTime;
        updateSavedTimes({ creditsFromEnd });
        creditsTriggeredOnHash = location.hash;
        showPlayerToast(`Credits saved: last ${formatClock(creditsFromEnd)} of each episode.`);
        onChange();
      })
    );
  }

  return row;
}

// The intro/credits part of the player settings menu; onChange re-renders the menu.
export function buildIntroMenuSection(
  buttonClass: string,
  onChange: () => void
): HTMLDivElement | null {
  if (!getShowKey()) {
    return null;
  }

  const section = document.createElement('div');
  section.className = `${SCRIPT_ID}-player-menu-section`;
  const heading = document.createElement('p');
  heading.className = `${SCRIPT_ID}-player-menu-heading`;
  heading.textContent = 'This show';
  section.append(
    heading,
    buildIntroRow(buttonClass, onChange),
    buildCreditsRow(buttonClass, onChange)
  );
  return section;
}

function updateSkipButton(video: HTMLVideoElement | null): void {
  if (!controls) {
    return;
  }

  const skip = controls.querySelector<HTMLElement>(`.${INTRO_CLASS}-skip`);
  if (!skip) {
    return;
  }

  skip.hidden = !(
    !appState.settings.autoSkipIntro && isInIntro(getSavedIntro(), video ? video.currentTime : -1)
  );
}

function ensureControls(): HTMLDivElement | null {
  const playerContainer = document.getElementById('video_player');
  if (!playerContainer) {
    return null;
  }

  if (controls?.parentElement === playerContainer) {
    return controls;
  }

  controls = document.createElement('div');
  controls.className = INTRO_CLASS;

  const skip = makeButton('Skip intro', `${INTRO_CLASS}-skip`, skipIntroNow);
  skip.hidden = true;

  const toast = document.createElement('p');
  toast.className = `${INTRO_CLASS}-toast`;
  toast.hidden = true;

  controls.append(skip, toast);
  playerContainer.appendChild(controls);
  return controls;
}

export function handleIntroTimeUpdate(video: HTMLVideoElement): void {
  if (!getShowKey() || !ensureControls()) {
    return;
  }

  const saved = getSavedTimes();
  const time = video.currentTime;
  if (
    appState.settings.autoSkipIntro &&
    skippedOnHash !== location.hash &&
    markingStart === null &&
    isInIntro(getSavedIntro(), time)
  ) {
    skipIntroNow();
  }

  // Reaching the credits starts the next-episode countdown instead of waiting for the end.
  if (
    saved?.creditsFromEnd !== undefined &&
    Number.isFinite(saved.creditsFromEnd) &&
    appState.settings.autoSkipCredits &&
    creditsTriggeredOnHash !== location.hash &&
    Number.isFinite(video.duration) &&
    !video.paused &&
    video.duration - time <= saved.creditsFromEnd
  ) {
    creditsTriggeredOnHash = location.hash;
    void startAutoNextCountdown({ force: true });
  }

  updateSkipButton(video);
}
