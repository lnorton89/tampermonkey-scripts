import { appState } from '../core/state';
import { removeLoadedSiteAdScript } from '../features/adBlock';
import { watchAudioOffsetPlayback } from '../features/audioOffset';
import { installBannerHider } from '../features/hideBanner';
import { watchCommunityLinks } from '../features/hideCommunityLinks';
import { watchPlaybackMenu } from '../features/playbackMenu';
import { watchSkipSegments } from '../features/skipSegments';
import { watchSubtitleResync } from '../features/subtitleResync';

export function bootstrapDomFeatures(): void {
  if (appState.domBootstrapped) {
    return;
  }

  appState.domBootstrapped = true;
  removeLoadedSiteAdScript();
  installBannerHider();
  watchCommunityLinks();
  watchSkipSegments();
  watchAudioOffsetPlayback();
  watchPlaybackMenu();
  watchSubtitleResync();
}
