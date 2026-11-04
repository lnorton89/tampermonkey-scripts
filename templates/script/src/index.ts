import './meta';
import { createSettingsStore, ensureStyle, onDomChange, waitForBody } from '@userscripts/core';

const SCRIPT_ID = '__ID__';

const DEFAULT_SETTINGS = {
  hideBanner: true,
};

const settingsStore = createSettingsStore({
  scriptId: SCRIPT_ID,
  storageKey: `${SCRIPT_ID}:settings`,
  defaults: DEFAULT_SETTINGS,
});
const settings = settingsStore.load();

function hideBanner(): void {
  document.querySelectorAll<HTMLElement>('[class*="banner" i]').forEach((element) => {
    element.hidden = true;
  });
}

waitForBody(() => {
  ensureStyle(`${SCRIPT_ID}-style`, '');

  if (settings.hideBanner) {
    onDomChange(hideBanner);
  }
});
