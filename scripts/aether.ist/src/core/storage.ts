/* eslint-disable */
// @ts-nocheck
import { DEFAULT_SETTINGS, SCRIPT_ID, STORAGE_KEY } from '../config/constants';

function hasGmStorage() {
  return typeof GM_getValue === 'function' && typeof GM_setValue === 'function';
}

// Tampermonkey storage is the source of truth because it survives the site's localStorage
// being cleared. localStorage is kept as a fallback when GM storage isn't available.
function readStoreSource(key) {
  if (hasGmStorage()) {
    const saved = GM_getValue(key, null);
    if (typeof saved === 'string') {
      return saved;
    }
  }

  return localStorage.getItem(key);
}

function writeStoreSource(key, value) {
  if (hasGmStorage()) {
    GM_setValue(key, value);
  }

  try {
    localStorage.setItem(key, value);
  } catch (error) {
    if (!hasGmStorage()) {
      throw error;
    }
  }
}

export function normalizeSettings(settings) {
  return Object.fromEntries(
    Object.entries(DEFAULT_SETTINGS).map(([key, defaultValue]) => [
      key,
      typeof settings[key] === 'boolean' ? settings[key] : defaultValue,
    ])
  );
}

export function loadSettings() {
  try {
    const saved = readStoreSource(STORAGE_KEY);
    const parsed = JSON.parse(saved || '{}');
    return normalizeSettings(parsed);
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to load saved settings.`, error);
    return { ...DEFAULT_SETTINGS };
  }
}

export function persistSettings(settings) {
  try {
    writeStoreSource(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] Failed to save settings.`, error);
  }
}
