import { appState } from '../core/state';
import { removeLoadedSiteAdScript } from '../features/adBlock';
import { installBannerHider } from '../features/hideBanner';
import { watchCommunityLinks } from '../features/hideCommunityLinks';
import { watchPlaybackMenu } from '../features/playbackMenu';
import { watchSkipSegments } from '../features/skipSegments';

export function bootstrapDomFeatures(): void {
  if (appState.domBootstrapped) {
    return;
  }

  appState.domBootstrapped = true;
  removeLoadedSiteAdScript();
  installBannerHider();
  watchCommunityLinks();
  watchSkipSegments();
  watchPlaybackMenu();
}
