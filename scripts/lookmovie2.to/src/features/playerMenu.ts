/* eslint-disable */
// @ts-nocheck
import { SCRIPT_ID } from '../config/constants';
import { saveSettings } from '../core/settings';
import { appState } from '../core/state';
import { buildIntroMenuSection } from './introSkip';

const MENU_CLASS = `${SCRIPT_ID}-player-menu`;
const GEAR_PATH =
  'M19.4 13a7.6 7.6 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a7.7 7.7 0 0 0-1.7-1L15 3.3h-4l-.4 2.6a7.7 7.7 0 0 0-1.7 1l-2.5-1-2 3.5L6.6 11a7.6 7.6 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1a7.7 7.7 0 0 0 1.7 1l.4 2.6h4l.4-2.6a7.7 7.7 0 0 0 1.7-1l2.5 1 2-3.5L19.4 13zM13 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z';

// Settings that matter while watching. showsOnly ones are hidden on movie pages.
const QUICK_SETTINGS = [
  { key: 'autoPlay', label: 'Auto play' },
  { key: 'autoNextEpisode', label: 'Auto next episode', showsOnly: true },
  { key: 'autoSkipIntro', label: 'Auto skip intros', showsOnly: true },
  { key: 'autoFullscreen', label: 'Auto fullscreen' },
  { key: 'windowedFullscreen', label: 'Windowed fullscreen' },
];

let menu = null;
let outsideClickInstalled = false;

function isShowPlayPage() {
  return location.pathname.startsWith('/shows/play/');
}

function renderPanel() {
  const panel = menu.querySelector(`.${MENU_CLASS}-panel`);
  panel.replaceChildren();

  const settingsSection = document.createElement('div');
  settingsSection.className = `${MENU_CLASS}-section`;
  QUICK_SETTINGS.filter((setting) => !setting.showsOnly || isShowPlayPage()).forEach((setting) => {
    const label = document.createElement('label');
    label.className = `${MENU_CLASS}-toggle`;
    const text = document.createElement('span');
    text.textContent = setting.label;
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = !!appState.settings[setting.key];
    input.addEventListener('change', () => {
      saveSettings({ ...appState.settings, [setting.key]: input.checked });
    });
    input.addEventListener('click', (event) => event.stopPropagation());
    label.append(text, input);
    settingsSection.append(label);
  });
  panel.append(settingsSection);

  const introSection = buildIntroMenuSection(renderPanel);
  if (introSection) {
    panel.append(introSection);
  }
}

function setOpen(open) {
  if (!menu) {
    return;
  }

  menu.dataset.open = open ? 'true' : 'false';
  menu.querySelector(`.${MENU_CLASS}-gear`).setAttribute('aria-expanded', String(open));
  if (open) {
    renderPanel();
  }
}

function buildMenu() {
  const element = document.createElement('div');
  element.className = MENU_CLASS;
  element.dataset.open = 'false';
  // Keep clicks inside the menu from reaching the player (which would toggle playback).
  element.addEventListener('click', (event) => event.stopPropagation());

  const gear = document.createElement('button');
  gear.type = 'button';
  gear.className = `${MENU_CLASS}-gear`;
  gear.title = 'Enhancer settings';
  gear.setAttribute('aria-label', 'Enhancer settings');
  gear.setAttribute('aria-expanded', 'false');
  gear.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${GEAR_PATH}"/></svg>`;
  gear.addEventListener('click', () => setOpen(element.dataset.open !== 'true'));

  const panel = document.createElement('div');
  panel.className = `${MENU_CLASS}-panel`;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Enhancer settings');

  element.append(gear, panel);
  return element;
}

// Lives inside the player element so it stays usable in fullscreen.
export function ensurePlayerMenu() {
  const playerContainer = document.getElementById('video_player');
  if (!playerContainer) {
    return;
  }

  if (!menu) {
    menu = buildMenu();
  }

  if (menu.parentElement !== playerContainer) {
    playerContainer.appendChild(menu);
  }

  if (!outsideClickInstalled) {
    outsideClickInstalled = true;
    document.addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    });
  }
}
