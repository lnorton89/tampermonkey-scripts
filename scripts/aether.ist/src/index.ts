import './meta';
import { bootstrapDomFeatures } from './app/bootstrap';
import { installAdBlock } from './features/adBlock';
import { installSkipTimesCapture } from './features/skipTimes';

installAdBlock();
installSkipTimesCapture();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapDomFeatures, { once: true });
} else {
  bootstrapDomFeatures();
}
