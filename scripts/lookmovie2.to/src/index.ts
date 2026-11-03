/* eslint-disable */
// @ts-nocheck
import './meta';
import { bootstrapDomFeatures } from './app/bootstrap';
import { installAdTimerBypass } from './features/adTimerBypass';

installAdTimerBypass();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapDomFeatures, { once: true });
} else {
  bootstrapDomFeatures();
}
