import { onDomChange } from '@userscripts/core';
import { SCRIPT_ID, SKIP_SEGMENTS, type SkipSegmentSetting } from '../config/constants';
import { saveSettings } from '../core/settings';
import { appState } from '../core/state';

const SETTING_ROW_ATTR = `data-${SCRIPT_ID}-setting`;

// "Audio Booster" is a hard-coded (untranslated) label that only appears in Aether's playback menu.
function findPlaybackMenuContent(): Element | null {
  const label = Array.from(document.querySelectorAll('p.font-medium')).find(
    (element) => (element.textContent ?? '').trim() === 'Audio Booster'
  );

  return label ? label.closest('.overflow-y-auto') : null;
}

// Mirrors the classes Aether's own menu toggles switch between.
function syncToggle(button: HTMLButtonElement, enabled: boolean): void {
  // The knob is part of the markup built in createSettingRow, so it is always present.
  const knob = button.querySelector('.bg-white')!;

  button.classList.toggle('bg-buttons-toggle', enabled);
  button.classList.toggle('bg-buttons-toggleDisabled', !enabled);
  knob.classList.toggle('left-full', enabled);
  knob.classList.toggle('transform', enabled);
  knob.classList.toggle('-translate-x-full', enabled);
  knob.classList.toggle('left-0', !enabled);
}

function createSettingRow({ settingKey, label }: SkipSegmentSetting): HTMLDivElement {
  const row = document.createElement('div');
  row.setAttribute(SETTING_ROW_ATTR, settingKey);
  row.className =
    'flex py-2 transition-colors duration-100 rounded-lg cursor-default -ml-3 px-3 w-full';
  row.style.width = 'calc(100% + 1.5rem)';
  row.innerHTML = `
    <div class="flex items-center flex-1 h-full min-w-0">
      <div class="flex-1 text-left flex h-full min-w-0 items-center"></div>
      <div class="flex shrink-0 ml-2 items-center">
        <button type="button" class="w-11 h-6 p-1 rounded-full grid transition-colors duration-100 group/toggle tabbable">
          <div class="relative w-full h-full">
            <div class="scale-90 group-hover/toggle:scale-100 h-full aspect-square rounded-full bg-white absolute transition-all duration-100"></div>
          </div>
        </button>
      </div>
    </div>
  `;
  // Both elements come from the markup above.
  row.querySelector('.text-left')!.textContent = label;

  const button = row.querySelector('button')!;
  syncToggle(button, appState.settings[settingKey]);
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    saveSettings({
      ...appState.settings,
      [settingKey]: !appState.settings[settingKey],
    });
    syncToggle(button, appState.settings[settingKey]);
  });

  return row;
}

// Adds the rows next to Aether's Autoplay / thumbnail toggles, or as a new section when the
// site hides both of those.
function ensurePlaybackMenuSettings(): void {
  const content = findPlaybackMenuContent();
  if (!content || content.querySelector(`[${SETTING_ROW_ATTR}]`)) {
    return;
  }

  let toggleList = Array.from(content.children)
    .reverse()
    .find((section) => section.querySelector('.group\\/toggle'))?.firstElementChild;

  if (!toggleList) {
    const section = document.createElement('div');
    section.className = 'pt-4 space-y-1';
    toggleList = document.createElement('div');
    toggleList.className = 'space-y-4 mt-3';
    section.appendChild(toggleList);
    content.appendChild(section);
  }

  const list = toggleList;
  SKIP_SEGMENTS.forEach((setting) => list.appendChild(createSettingRow(setting)));
}

export function watchPlaybackMenu(): void {
  onDomChange(ensurePlaybackMenuSettings);
}
