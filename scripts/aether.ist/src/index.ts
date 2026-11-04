import './meta';
import { bootstrapDomFeatures } from './app/bootstrap';
import { installAdBlock } from './features/adBlock';
import { installAudioOffset } from './features/audioOffset';
import { installSkipTimesCapture } from './features/skipTimes';

installAdBlock();
installAudioOffset();
installSkipTimesCapture();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapDomFeatures, { once: true });
} else {
  bootstrapDomFeatures();
}
