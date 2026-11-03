/* eslint-disable */
// @ts-nocheck
import './meta';
import { bootstrapDomFeatures } from './app/bootstrap';
import { installAdTimerBypass } from './features/adTimerBypass';
import { startResumePointSync } from './features/resumePoints';
import { syncSiteTheme } from './features/siteTheme';

installAdTimerBypass();
syncSiteTheme();
// Before the site's player reads its resume positions, so missing ones are restored first.
startResumePointSync();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapDomFeatures, { once: true });
} else {
  bootstrapDomFeatures();
}
