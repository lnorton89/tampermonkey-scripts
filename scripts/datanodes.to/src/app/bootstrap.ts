import { getActive } from '../core/storage';
import { automateDownloadPage, handleFilePage } from '../features/automation';
import { buildUI } from '../ui/panel';

let domBootstrapped = false;

export function bootstrapDomFeatures(): void {
  if (domBootstrapped) {
    return;
  }

  domBootstrapped = true;
  buildUI();

  const path = window.location.pathname;

  if (path === '/download' && getActive()) {
    window.setTimeout(automateDownloadPage, 2000);
    return;
  }

  if (/^\/[a-z0-9]{8,}\//.test(path) && getActive()) {
    handleFilePage(path);
  }
}
