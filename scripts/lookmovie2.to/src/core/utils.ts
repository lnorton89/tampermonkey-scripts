/* eslint-disable */
// @ts-nocheck
import { SCRIPT_ID } from '../config/constants';

export function toPositiveInteger(value) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
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
  const value = typeof url === 'string' ? url.trim() : '';
  if (!value || value.startsWith('data:image/')) return '';

  const base =
    typeof window !== 'undefined' && window.location
      ? window.location.href
      : 'https://www.lookmovie2.to/';

  try {
    return new URL(value, base).href;
  } catch (error) {
    if (value.startsWith('//')) {
      return `https:${value}`;
    }

    return value;
  }
}

export function getElementImageUrl(element) {
  if (!element) {
    return '';
  }

  const style = element.getAttribute('style') || '';
  const styleMatch = style.match(/background-image:\s*url\((['"]?)(.*?)\1\)/i);
  const candidates = [
    element.getAttribute('content'),
    element.getAttribute('data-lazy-background'),
    element.getAttribute('data-src-portrait'),
    element.getAttribute('data-background-image'),
    element.getAttribute('data-src'),
    styleMatch?.[2],
    element.getAttribute('src'),
  ];

  return normalizeImageUrl(
    candidates.find(
      (candidate) =>
        typeof candidate === 'string' &&
        candidate.trim() &&
        !candidate.trim().startsWith('data:image/')
    ) || ''
  );
}

export function isVisibleElement(element) {
  if (!element || typeof element.getBoundingClientRect !== 'function') {
    return false;
  }

  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

export function getControlText(element) {
  return `${element.textContent || ''} ${element.getAttribute('aria-label') || ''} ${
    element.getAttribute('title') || ''
  }`.trim();
}
