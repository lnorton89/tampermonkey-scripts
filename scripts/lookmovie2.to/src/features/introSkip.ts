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

function showToast(message) {
  if (!controls) {
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
  const showKey = getShowKey();
  if (!showKey) {
    return;
  }

  getIntroTimes()[showKey] = { start, end, updatedAt: Date.now() };
  persistIntroTimes(getIntroTimes());
}

function clearIntro() {
  const showKey = getShowKey();
  if (!showKey) {
    return;
  }

  delete getIntroTimes()[showKey];
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

function renderManage() {
  const manage = controls.querySelector(`.${INTRO_CLASS}-manage`);
  manage.replaceChildren();
  const saved = getSavedIntro();
  const pillClass = `${INTRO_CLASS}-pill`;

  if (markingStart !== null) {
    manage.append(
      makeButton(`Mark intro end (from ${formatClock(markingStart)})`, pillClass, () => {
        const video = getVideo();
        const end = video ? video.currentTime : 0;
        if (end - markingStart < MIN_INTRO_SECONDS) {
          showToast(`Play past the intro first (at least ${MIN_INTRO_SECONDS}s).`);
          return;
        }

        saveIntro(markingStart, end);
        markingStart = null;
        skippedOnHash = location.hash;
        renderManage();
        showToast(`Intro saved: ${formatClock(getSavedIntro().start)}–${formatClock(end)}`);
      }),
      makeButton('×', `${pillClass} ${INTRO_CLASS}-cancel`, () => {
        markingStart = null;
        renderManage();
      })
    );
    return;
  }

  if (saved) {
    const label = document.createElement('span');
    label.className = pillClass;
    label.textContent = `Intro ${formatClock(saved.start)}–${formatClock(saved.end)}`;
    manage.append(
      label,
      makeButton('Clear', `${pillClass} ${INTRO_CLASS}-cancel`, () => {
        clearIntro();
        renderManage();
        updateSkipButton(getVideo());
        showToast('Intro cleared for this show.');
      })
    );
    return;
  }

  manage.append(
    makeButton('Mark intro start', pillClass, () => {
      const video = getVideo();
      markingStart = video ? video.currentTime : 0;
      renderManage();
    })
  );
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
  if (!playerContainer || !getShowKey()) {
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

  const manage = document.createElement('div');
  manage.className = `${INTRO_CLASS}-manage`;

  const toast = document.createElement('p');
  toast.className = `${INTRO_CLASS}-toast`;
  toast.hidden = true;

  controls.append(skip, manage, toast);
  playerContainer.appendChild(controls);
  renderManage();
  return controls;
}

export function handleIntroTimeUpdate(video) {
  if (!location.pathname.startsWith('/shows/play/') || !ensureControls()) {
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
    showToast('Skipped intro');
  }

  updateSkipButton(video);
}
