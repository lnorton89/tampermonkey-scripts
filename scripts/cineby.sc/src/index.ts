import './meta';
import { waitForBody } from '@userscripts/core';
import { ROUTE_POLL_MS } from './config/constants';
import { state } from './core/state';
import { scanVideos, watchVideos } from './features/player';
import { publishPlayerNotification, startNtfyRemote } from './features/remote';
import { renderPanel } from './ui/panel';

function watchNavigation(): void {
  window.setInterval(() => {
    if (location.href === state.lastKnownUrl) return;

    state.lastKnownUrl = location.href;
    scanVideos();
    renderPanel();

    if (state.settings.ntfyRemoteEnabled) {
      window.setTimeout(() => publishPlayerNotification('navigation'), 500);
    }
  }, ROUTE_POLL_MS);
}

// The remote's focus/visibility/pagehide tab-claim listeners are installed by core's
// createNtfyRemote when it starts.
function bootstrap(): void {
  if (state.bootstrapped) return;

  state.bootstrapped = true;
  watchVideos();
  watchNavigation();
  waitForBody(() => {
    renderPanel();
    startNtfyRemote();
    window.setTimeout(() => publishPlayerNotification('ready'), 1500);
  });
}

bootstrap();
