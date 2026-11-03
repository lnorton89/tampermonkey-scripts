/* eslint-disable */
// @ts-nocheck
import { UI_ROOT_ID } from '../config/constants';
import { appState } from '../core/state';
import { watchSkipIntro } from '../features/skipIntro';
import { ensureUi } from '../ui';

export function bootstrapDomFeatures() {
  if (appState.domBootstrapped) {
    return;
  }

  appState.domBootstrapped = true;
  watchSkipIntro();

  const uiBootstrapper = window.setInterval(() => {
    appState.uiBootAttempts += 1;
    ensureUi();

    if (document.getElementById(UI_ROOT_ID) || appState.uiBootAttempts > 100) {
      window.clearInterval(uiBootstrapper);
    }
  }, 100);
}
