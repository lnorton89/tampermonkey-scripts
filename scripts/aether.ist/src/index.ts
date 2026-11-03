/* eslint-disable */
// @ts-nocheck
import './meta';
import { bootstrapDomFeatures } from './app/bootstrap';
import { installIntroTimesCapture } from './features/introTimes';

installIntroTimesCapture();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapDomFeatures, { once: true });
} else {
  bootstrapDomFeatures();
}
