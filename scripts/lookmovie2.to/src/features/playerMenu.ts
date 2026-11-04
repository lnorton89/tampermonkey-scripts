import { PLAYBACK_RATES, SCRIPT_ID, type BooleanSettingKey } from '../config/constants';
import { saveSettings } from '../core/settings';
import { appState } from '../core/state';
import { buildIntroMenuSection, showPlayerToast } from './introSkip';

// Extends the site's own player settings menu (the gear in the control bar, which otherwise
// only lists qualities) so everything is reachable in fullscreen.
const SECTIONS_CLASS = `${SCRIPT_ID}-player-menu`;
const BUTTON_CLASS = `${SCRIPT_ID}-player-menu-button`;
const SITE_MENU_SELECTOR = '#video_player .vjs-settings-quality-menu';

interface QuickSetting {
  key: BooleanSettingKey;
  label: string;
  showsOnly?: boolean;
}

// showsOnly settings are hidden on movie pages.
const QUICK_SETTINGS: readonly QuickSetting[] = [
  { key: 'autoPlay', label: 'Auto play' },
  { key: 'autoNextEpisode', label: 'Auto next episode', showsOnly: true },
  { key: 'autoSkipIntro', label: 'Auto skip intros', showsOnly: true },
  { key: 'autoSkipCredits', label: 'Skip credits to next episode', showsOnly: true },
  { key: 'autoFullscreen', label: 'Auto fullscreen' },
  { key: 'windowedFullscreen', label: 'Windowed fullscreen' },
];

function isShowPlayPage(): boolean {
  return location.pathname.startsWith('/shows/play/');
}

function getVideo(): HTMLVideoElement | null {
  return document.querySelector('#video_player video');
}

export function applyPlaybackRate(video = getVideo()): void {
  if (video && video.playbackRate !== appState.settings.playbackRate) {
    video.playbackRate = appState.settings.playbackRate;
  }
}

export function setPlaybackRate(rate: number): void {
  saveSettings({ ...appState.settings, playbackRate: rate });
  applyPlaybackRate();
  showPlayerToast(`Speed ${rate}×`);
  renderSections();
}

export function stepPlaybackRate(direction: number): void {
  const index = PLAYBACK_RATES.indexOf(appState.settings.playbackRate);
  const next = PLAYBACK_RATES[Math.max(0, Math.min(PLAYBACK_RATES.length - 1, index + direction))];
  if (next !== undefined && next !== appState.settings.playbackRate) {
    setPlaybackRate(next);
  }
}

export async function togglePictureInPicture(): Promise<boolean> {
  const video = getVideo();
  if (!video || !document.pictureInPictureEnabled) {
    return false;
  }

  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else {
      await video.requestPictureInPicture();
    }
    return true;
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Picture-in-picture failed.`, error);
    return false;
  }
}

function makeSection(title: string): HTMLDivElement {
  const section = document.createElement('div');
  section.className = `${SCRIPT_ID}-player-menu-section`;
  const heading = document.createElement('p');
  heading.className = `${SCRIPT_ID}-player-menu-heading`;
  heading.textContent = title;
  section.append(heading);
  return section;
}

function buildSpeedSection(): HTMLDivElement {
  const section = makeSection('Speed');
  const row = document.createElement('div');
  row.className = `${SCRIPT_ID}-player-menu-chips`;
  PLAYBACK_RATES.forEach((rate) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.textContent = `${rate}×`;
    chip.dataset.active = rate === appState.settings.playbackRate ? 'true' : 'false';
    chip.addEventListener('click', () => {
      setPlaybackRate(rate);
    });
    row.append(chip);
  });
  section.append(row);
  return section;
}

function buildSettingsSection(): HTMLDivElement {
  const section = makeSection('Enhancer');
  QUICK_SETTINGS.filter((setting) => !setting.showsOnly || isShowPlayPage()).forEach((setting) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = `${SCRIPT_ID}-player-menu-toggle`;
    item.setAttribute('role', 'menuitemcheckbox');
    item.setAttribute('aria-checked', appState.settings[setting.key] ? 'true' : 'false');
    item.textContent = setting.label;
    item.addEventListener('click', () => {
      saveSettings({ ...appState.settings, [setting.key]: !appState.settings[setting.key] });
      renderSections();
    });
    section.append(item);
  });

  if (document.pictureInPictureEnabled) {
    const pip = document.createElement('button');
    pip.type = 'button';
    pip.className = `${SCRIPT_ID}-player-menu-toggle`;
    pip.textContent = 'Picture-in-picture';
    pip.addEventListener('click', () => {
      void togglePictureInPicture();
    });
    section.append(pip);
  }

  return section;
}

function renderSections(): void {
  const container = document.querySelector(`${SITE_MENU_SELECTOR} .${SECTIONS_CLASS}`);
  if (!container) {
    return;
  }

  container.replaceChildren(buildSpeedSection(), buildSettingsSection());
  const showSection = buildIntroMenuSection(BUTTON_CLASS, renderSections);
  if (showSection) {
    container.append(showSection);
  }
}

// The site rebuilds its menu when qualities load, so this re-checks on every player update.
export function ensurePlayerMenu(): void {
  const siteMenu = document.querySelector(SITE_MENU_SELECTOR);
  const body = siteMenu?.querySelector('.vjs-settings-body');
  if (!siteMenu || !body || body.querySelector(`.${SECTIONS_CLASS}`)) {
    return;
  }

  const qualityList = body.querySelector('.vjs-menu');
  if (qualityList && !body.querySelector(`.${SCRIPT_ID}-quality-heading`)) {
    const heading = document.createElement('p');
    heading.className = `${SCRIPT_ID}-player-menu-heading ${SCRIPT_ID}-quality-heading`;
    heading.textContent = 'Quality';
    body.insertBefore(heading, qualityList);
  }

  const container = document.createElement('div');
  container.className = SECTIONS_CLASS;
  // Keep clicks inside our sections from reaching the player or closing the site's menu.
  container.addEventListener('click', (event) => {
    event.stopPropagation();
  });
  body.append(container);
  renderSections();

  // Refresh toggles each time the menu opens, in case settings changed elsewhere.
  const gearButton = siteMenu.parentElement?.querySelector('button');
  if (gearButton) {
    gearButton.addEventListener('click', renderSections);
  }
}
