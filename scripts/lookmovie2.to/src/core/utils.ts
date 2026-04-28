/* eslint-disable */
// @ts-nocheck
import { SCRIPT_ID } from '../config/constants';

export function toPositiveInteger(value) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function fetchText(url) {
  const response = await fetch(url, { credentials: 'same-origin' });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return response.text();
}

export async function fetchJson(url) {
  const response = await fetch(url, { credentials: 'same-origin' });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return response.json();
}

export function decodeInlineJsString(value) {
  if (!value) return '';
  return value.replaceAll("\\'", "'").replaceAll('\\\\', '\\');
}

export function normalizeImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('//')) {
    return window.location.protocol + url;
  }
  return url;
}
