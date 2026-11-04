import type { NtfyStatus } from '@userscripts/core';
import { SCRIPT_ID, type BooleanSettingKey, type StringSettingKey } from '../config/constants';
import { saveSettings } from '../core/settings';
import { state } from '../core/state';
import { playNextEpisode } from '../features/episodes';
import { publishPlayerNotification } from '../features/remote';
import { injectStyles } from './styles';

export function setStatus(status: NtfyStatus, message = ''): void {
  state.status = status;
  state.statusMessage = message;
  renderPanel();
}

function createToggle(
  settingKey: BooleanSettingKey,
  title: string,
  copy: string
): HTMLLabelElement {
  const row = document.createElement('label');
  row.className = `${SCRIPT_ID}-row`;
  row.innerHTML = `
    <span class="${SCRIPT_ID}-label">
      <strong>${title}</strong>
      <span>${copy}</span>
    </span>
    <span class="${SCRIPT_ID}-switch">
      <input type="checkbox" ${state.settings[settingKey] ? 'checked' : ''}>
      <span class="${SCRIPT_ID}-slider"></span>
    </span>
  `;

  // The input comes from the markup above.
  const input = row.querySelector('input')!;
  input.addEventListener('change', () => {
    saveSettings({
      ...state.settings,
      [settingKey]: input.checked,
    });
  });

  return row;
}

function createInput(
  settingKey: StringSettingKey,
  placeholder: string,
  type = 'text'
): HTMLInputElement {
  const input = document.createElement('input');
  input.className = `${SCRIPT_ID}-input`;
  input.type = type;
  input.placeholder = placeholder;
  input.value = state.settings[settingKey] || '';
  input.addEventListener('change', () => {
    saveSettings({
      ...state.settings,
      [settingKey]: input.value,
    });
  });
  return input;
}

export function renderPanel(): void {
  // `document.body` is typed non-null but is null at `document-start`.
  const pageBody = document.body as HTMLElement | null;
  if (!pageBody) return;

  injectStyles();

  document.getElementById(`${SCRIPT_ID}-launcher`)?.remove();
  document.getElementById(`${SCRIPT_ID}-panel`)?.remove();

  const launcher = document.createElement('button');
  launcher.id = `${SCRIPT_ID}-launcher`;
  launcher.type = 'button';
  launcher.title = state.panelOpen ? 'Hide Cineby settings' : 'Show Cineby settings';
  launcher.setAttribute('aria-label', launcher.title);
  launcher.innerHTML = state.panelOpen
    ? `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 6 6 18" fill="none" stroke="currentColor" stroke-linecap="round" />
        <path d="m6 6 12 12" fill="none" stroke="currentColor" stroke-linecap="round" />
      </svg>
    `
    : `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15 6 9 12l6 6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `;
  launcher.addEventListener('click', () => {
    state.panelOpen = !state.panelOpen;
    renderPanel();
  });
  pageBody.appendChild(launcher);

  if (!state.panelOpen) return;

  const panel = document.createElement('section');
  panel.id = `${SCRIPT_ID}-panel`;

  const head = document.createElement('div');
  head.className = `${SCRIPT_ID}-head`;
  head.innerHTML = `
    <p class="${SCRIPT_ID}-title">Cineby</p>
    <button type="button" class="${SCRIPT_ID}-button ${SCRIPT_ID}-icon-button" title="Close" aria-label="Close Cineby settings">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 6 6 18" fill="none" stroke="currentColor" stroke-linecap="round" />
        <path d="m6 6 12 12" fill="none" stroke="currentColor" stroke-linecap="round" />
      </svg>
    </button>
  `;
  // The button comes from the markup above.
  head.querySelector('button')!.addEventListener('click', () => {
    state.panelOpen = false;
    renderPanel();
  });

  const body = document.createElement('div');
  body.className = `${SCRIPT_ID}-body`;
  body.appendChild(
    createToggle('autoNext', 'Auto next', 'Go to the next episode when playback ends.')
  );
  body.appendChild(
    createToggle(
      'ntfyRemoteEnabled',
      'ntfy remote',
      'Publish player notifications and accept commands.'
    )
  );
  body.appendChild(createInput('ntfyTopic', 'Display topic'));
  body.appendChild(createInput('ntfyControlTopic', 'Control topic (defaults to display-controls)'));
  body.appendChild(createInput('ntfyCommandSecret', 'Optional command secret', 'password'));

  const controls = document.createElement('div');
  controls.className = `${SCRIPT_ID}-row`;
  controls.innerHTML = `
    <button type="button" class="${SCRIPT_ID}-button">Notify</button>
    <button type="button" class="${SCRIPT_ID}-button">Next</button>
    <span class="${SCRIPT_ID}-status">${state.status}${state.statusMessage ? `: ${state.statusMessage}` : ''}</span>
  `;
  const [notifyButton, nextButton] = Array.from(controls.querySelectorAll('button'));
  notifyButton?.addEventListener('click', () => publishPlayerNotification('manual'));
  nextButton?.addEventListener('click', () => playNextEpisode());
  body.appendChild(controls);

  panel.appendChild(head);
  panel.appendChild(body);
  pageBody.appendChild(panel);
}
