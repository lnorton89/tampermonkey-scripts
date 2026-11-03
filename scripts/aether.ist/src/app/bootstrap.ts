/* eslint-disable */
// @ts-nocheck
import { appState } from '../core/state';
import { installBannerHider } from '../features/hideBanner';
import { watchPlaybackMenu } from '../features/playbackMenu';
import { watchSkipIntro } from '../features/skipIntro';

export function bootstrapDomFeatures() {
  if (appState.domBootstrapped) {
    return;
  }

  appState.domBootstrapped = true;
  installBannerHider();
  watchSkipIntro();
  watchPlaybackMenu();
}
