/* eslint-disable */
// @ts-nocheck
import './meta';
import { bootstrapDomFeatures } from './bootstrap';

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapDomFeatures, { once: true });
} else {
  bootstrapDomFeatures();
}
