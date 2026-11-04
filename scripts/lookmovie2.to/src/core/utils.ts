import type { UnknownRecord } from '@userscripts/core';

/**
 * True for any non-null object, arrays included. Stored data is checked this loosely (rather than
 * with core's `isRecord`) so that what was accepted before keeps being accepted.
 */
export function isObjectLike(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null;
}

/** `value && value[key]` for data of unknown shape. */
export function readProp(value: unknown, key: string): unknown {
  return value ? (value as UnknownRecord)[key] : undefined;
}

/** `Object.entries(value || {})` for data of unknown shape. */
export function entriesOf(value: unknown): [string, unknown][] {
  return Object.entries((value || {}) as UnknownRecord);
}

/** A page global such as `show_storage`, which isn't declared on `Window`. */
export function readWindowValue(name: string): unknown {
  return (window as unknown as UnknownRecord)[name];
}

/** The first truthy page global of `names`, e.g. `window.movie_storage || window.movie || {}`. */
export function readWindowRecord(...names: string[]): UnknownRecord {
  for (const name of names) {
    const value = readWindowValue(name);
    if (value) {
      return value as UnknownRecord;
    }
  }

  return {};
}

export function toPositiveInteger(value: unknown): number {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, { credentials: 'same-origin' });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return response.text();
}

export async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url, { credentials: 'same-origin' });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return (await response.json()) as unknown;
}

export function decodeInlineJsString(value: string | null | undefined): string {
  if (!value) return '';
  return value.replaceAll("\\'", "'").replaceAll('\\\\', '\\');
}

export function normalizeImageUrl(url: unknown): string {
  const value = typeof url === 'string' ? url.trim() : '';
  if (!value || value.startsWith('data:image/')) return '';

  const base =
    typeof window !== 'undefined' && window.location
      ? window.location.href
      : 'https://www.lookmovie2.to/';

  try {
    return new URL(value, base).href;
  } catch {
    if (value.startsWith('//')) {
      return `https:${value}`;
    }

    return value;
  }
}

export function getElementImageUrl(element: Element | null | undefined): string {
  if (!element) {
    return '';
  }

  const style = element.getAttribute('style') || '';
  const styleMatch = /background-image:\s*url\((['"]?)(.*?)\1\)/i.exec(style);
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

/** `String(value)` for page data of unknown shape, where objects are not expected. */
export function toText(value: unknown): string {
  return String(value);
}
