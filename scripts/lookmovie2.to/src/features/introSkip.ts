/* eslint-disable */
// @ts-nocheck
import { SCRIPT_ID } from '../config/constants';
import { appState } from '../core/state';
import { loadIntroTimes, persistIntroTimes } from '../core/storage';

const INTRO_CLASS = `${SCRIPT_ID}-intro`;
// Leave the last moment of the intro alone so a skip never lands past the end of it.
const SKIP_END_MARGIN_SECONDS = 1;
const MIN_INTRO_SECONDS = 5;

let introTimes = null;
let markingStart = null;
let skippedOnHash = '';
let controls = null;
let toastTimer = 0;

function getIntroTimes() {
  if (!introTimes) {
    introTimes = loadIntroTimes();
  }

  return introTimes;
}

// Play and view pages use different numeric prefixes for the same show, so the name is the key.
function getShowKey() {
  const match = location.pathname.match(/^\/shows\/play\/(?:\d+-)?([^/?#]+)/i);
  return match ? match[1].toLowerCase() : '';
}

function getSavedIntro() {
  const showKey = getShowKey();
  return showKey ? getIntroTimes()[showKey] || null : null;
}

function formatClock(seconds) {
  const total = Math.max(0, Math.round(seconds));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

function getVideo() {
  return document.querySelector('#video_player video');
}

export function showPlayerToast(message) {
  if (!ensureControls()) {
    return;
  }

  const toast = controls.querySelector(`.${INTRO_CLASS}-toast`);
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.hidden = true;
  }, 2500);
}

function saveIntro(start, end) {
  getIntroTimes()[getShowKey()] = { start, end, updatedAt: Date.now() };
  persistIntroTimes(getIntroTimes());
}

function clearIntro() {
  delete getIntroTimes()[getShowKey()];
  persistIntroTimes(getIntroTimes());
}

function makeButton(label, className, onClick) {
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

// The intro part of the player menu; onChange re-renders the menu after an action.
export function buildIntroMenuSection(onChange) {
  if (!getShowKey()) {
    return null;
  }

  const section = document.createElement('div');
  section.className = `${SCRIPT_ID}-player-menu-section`;
  const heading = document.createElement('p');
  heading.className = `${SCRIPT_ID}-player-menu-heading`;
  heading.textContent = 'Intro for this show';
  const row = document.createElement('div');
  row.className = `${SCRIPT_ID}-player-menu-row`;
  section.append(heading, row);

  const saved = getSavedIntro();
  const buttonClass = `${SCRIPT_ID}-player-menu-button`;

  if (markingStart !== null) {
    row.append(
      makeButton(`Mark end (from ${formatClock(markingStart)})`, buttonClass, () => {
        const video = getVideo();
        const end = video ? video.currentTime : 0;
        if (end - markingStart < MIN_INTRO_SECONDS) {
          showPlayerToast(`Play past the intro first (at least ${MIN_INTRO_SECONDS}s).`);
          return;
        }

        saveIntro(markingStart, end);
        markingStart = null;
        skippedOnHash = location.hash;
        showPlayerToast(`Intro saved: ${formatClock(getSavedIntro().start)}–${formatClock(end)}`);
        onChange();
      }),
      makeButton('Cancel', buttonClass, () => {
        markingStart = null;
        onChange();
      })
    );
    return section;
  }

  if (saved) {
    const range = document.createElement('span');
    range.textContent = `${formatClock(saved.start)}–${formatClock(saved.end)}`;
    row.append(
      range,
      makeButton('Clear', buttonClass, () => {
        clearIntro();
        updateSkipButton(getVideo());
        showPlayerToast('Intro cleared for this show.');
        onChange();
      })
    );
    return section;
  }

  row.append(
    makeButton('Mark intro start here', buttonClass, () => {
      const video = getVideo();
      markingStart = video ? video.currentTime : 0;
      showPlayerToast('Now play to the end of the intro and mark it.');
      onChange();
    })
  );
  return section;
}

function updateSkipButton(video) {
  if (!controls) {
    return;
  }

  const skip = controls.querySelector(`.${INTRO_CLASS}-skip`);
  const saved = getSavedIntro();
  const time = video ? video.currentTime : -1;
  skip.hidden = !(
    saved &&
    !appState.settings.autoSkipIntro &&
    time >= saved.start &&
    time < saved.end - SKIP_END_MARGIN_SECONDS
  );
}

function ensureControls() {
  const playerContainer = document.getElementById('video_player');
  if (!playerContainer) {
    return null;
  }

  if (controls && controls.parentElement === playerContainer) {
    return controls;
  }

  controls = document.createElement('div');
  controls.className = INTRO_CLASS;

  const skip = makeButton('Skip intro', `${INTRO_CLASS}-skip`, () => {
    const video = getVideo();
    const saved = getSavedIntro();
    if (video && saved) {
      video.currentTime = saved.end;
    }
  });
  skip.hidden = true;

  const toast = document.createElement('p');
  toast.className = `${INTRO_CLASS}-toast`;
  toast.hidden = true;

  controls.append(skip, toast);
  playerContainer.appendChild(controls);
  return controls;
}

export function handleIntroTimeUpdate(video) {
  if (!getShowKey() || !ensureControls()) {
    return;
  }

  const saved = getSavedIntro();
  const time = video.currentTime;
  if (
    saved &&
    appState.settings.autoSkipIntro &&
    skippedOnHash !== location.hash &&
    markingStart === null &&
    time >= saved.start &&
    time < saved.end - SKIP_END_MARGIN_SECONDS
  ) {
    skippedOnHash = location.hash;
    video.currentTime = saved.end;
    showPlayerToast('Skipped intro');
  }

  updateSkipButton(video);
}
