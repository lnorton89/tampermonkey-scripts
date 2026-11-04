import { ensureStyle, onDomChange } from '@userscripts/core';
import {
  AUDIO_OFFSET_LIMIT_MS,
  AUDIO_OFFSET_STEP_MS,
  SCRIPT_ID,
  SKIP_SEGMENTS,
  type SkipSegmentSetting,
} from '../config/constants';
import { saveSettings } from '../core/settings';
import { appState } from '../core/state';
import { normalizeAudioOffset } from '../core/storage';
import {
  AUDIO_OFFSET_EVENT,
  getAppliedAudioOffset,
  getAudioOffsetSupport,
  reloadWithAudioOffset,
} from './audioOffset';

const SETTING_ROW_ATTR = `data-${SCRIPT_ID}-setting`;
const AUDIO_OFFSET_ATTR = `data-${SCRIPT_ID}-audio-offset`;
const audioOffsetRows = new WeakMap<Element, () => void>();

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

function createAudioOffsetSection(): HTMLDivElement {
  const section = document.createElement('div');
  section.setAttribute(AUDIO_OFFSET_ATTR, '');
  section.className = 'pt-4 space-y-1';
  const inputId = `${SCRIPT_ID}-audio-offset`;
  section.innerHTML = `
    <div class="space-y-4 mt-3">
      <div class="flex items-center justify-between">
        <label class="font-medium" for="${inputId}">Audio offset</label>
        <button type="button" data-reset class="text-sm rounded px-1 hover:text-white disabled:opacity-50">Reset</button>
      </div>
      <div class="flex items-center space-x-3">
        <input id="${inputId}" type="range" min="-${AUDIO_OFFSET_LIMIT_MS}" max="${AUDIO_OFFSET_LIMIT_MS}" step="${AUDIO_OFFSET_STEP_MS}"
          aria-describedby="${inputId}-hint ${inputId}-status"
          class="styled-slider slider-progress w-full text-video-context-sliderFilled" style="min-width: 0; flex: 1">
        <div class="flex items-center shrink-0 text-sm" style="gap: 0.25rem">
          <input type="number" aria-label="Audio offset in milliseconds" min="-${AUDIO_OFFSET_LIMIT_MS}" max="${AUDIO_OFFSET_LIMIT_MS}" step="${AUDIO_OFFSET_STEP_MS}"
            aria-describedby="${inputId}-hint ${inputId}-status"
            class="bg-transparent text-right tabular-nums rounded hover:bg-white/10" style="width: 4.5rem">
          <span>ms</span>
        </div>
      </div>
      <p id="${inputId}-hint" class="text-sm">Negative = earlier audio. Try −200 ms for Bluetooth.</p>
      <p id="${inputId}-status" role="status" class="text-sm"></p>
      <button type="button" data-apply class="text-sm rounded px-3 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50">Apply &amp; reload</button>
    </div>
  `;
  const slider = section.querySelector<HTMLInputElement>('input[type="range"]')!;
  const number = section.querySelector<HTMLInputElement>('input[type="number"]')!;
  const reset = section.querySelector<HTMLButtonElement>('[data-reset]')!;
  const apply = section.querySelector<HTMLButtonElement>('[data-apply]')!;
  const status = section.querySelector<HTMLElement>('[role="status"]')!;
  let draft = appState.settings.audioOffsetMs;

  const syncStatus = (): void => {
    const support = getAudioOffsetSupport();
    const changed = draft !== getAppliedAudioOffset();
    const messages = {
      waiting: 'Start a video to adjust audio sync.',
      unsupported:
        'Audio offset needs an HLS stream with a separate audio track. Try another source.',
      reopen:
        'Reopen the video from Aether’s home page to enable audio offset. The script loaded after this stream.',
      supported: changed
        ? 'Applying reloads this page and resumes at your current position.'
        : `Current offset: ${draft > 0 ? '+' : ''}${draft} ms.`,
    };
    const message = messages[support];
    if (status.textContent !== message) status.textContent = message;
    apply.disabled = support !== 'supported' || !changed;
    reset.disabled = draft === 0;
  };
  const syncInputs = (): void => {
    slider.value = String(draft);
    number.value = String(draft);
    slider.style.setProperty('--value', String(draft));
    slider.style.setProperty('--min', String(-AUDIO_OFFSET_LIMIT_MS));
    slider.style.setProperty('--max', String(AUDIO_OFFSET_LIMIT_MS));
    slider.setAttribute(
      'aria-valuetext',
      `${draft} milliseconds${draft < 0 ? ', earlier audio' : draft > 0 ? ', later audio' : ''}`
    );
    syncStatus();
  };
  slider.addEventListener('input', () => {
    draft = normalizeAudioOffset(slider.valueAsNumber);
    syncInputs();
  });
  number.addEventListener('input', () => {
    if (!Number.isFinite(number.valueAsNumber)) return;
    draft = normalizeAudioOffset(number.valueAsNumber);
    // Keep the editable text intact until change/blur, including a partially typed minus sign.
    slider.value = String(draft);
    slider.style.setProperty('--value', String(draft));
    syncStatus();
  });
  number.addEventListener('change', () => {
    draft = normalizeAudioOffset(number.valueAsNumber);
    syncInputs();
  });
  reset.addEventListener('click', () => {
    draft = 0;
    syncInputs();
  });
  apply.addEventListener('click', () => {
    if (!reloadWithAudioOffset(draft)) {
      status.textContent =
        'Could not save your playback position. Try again after the video loads.';
    }
  });
  // Aether's global keyboard shortcuts must not seek/change volume while editing the offset.
  for (const event of ['click', 'pointerdown', 'keydown', 'keyup']) {
    section.addEventListener(event, (event) => event.stopPropagation());
  }
  audioOffsetRows.set(section, syncStatus);
  syncInputs();
  return section;
}

// Adds the rows next to Aether's Autoplay / thumbnail toggles, or as a new section when the
// site hides both of those.
function ensurePlaybackMenuSettings(): void {
  const content = findPlaybackMenuContent();
  if (!content) return;

  if (!content.querySelector(`[${AUDIO_OFFSET_ATTR}]`)) {
    const boosterSection = Array.from(content.children).find((section) =>
      Array.from(section.querySelectorAll('p.font-medium')).some(
        (label) => label.textContent?.trim() === 'Audio Booster'
      )
    );
    boosterSection?.after(createAudioOffsetSection());
  }
  if (content.querySelector(`[${SETTING_ROW_ATTR}]`)) return;

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
  ensureStyle(
    `${SCRIPT_ID}-audio-offset-style`,
    `
    [${AUDIO_OFFSET_ATTR}] :is(input, button):focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 3px;
    }
    [${AUDIO_OFFSET_ATTR}] button:disabled { cursor: default; }
    [${AUDIO_OFFSET_ATTR}] input[type="number"] { color: inherit; }
  `
  );
  window.addEventListener(AUDIO_OFFSET_EVENT, () => {
    document
      .querySelectorAll(`[${AUDIO_OFFSET_ATTR}]`)
      .forEach((row) => audioOffsetRows.get(row)?.());
  });
  onDomChange(ensurePlaybackMenuSettings);
}
