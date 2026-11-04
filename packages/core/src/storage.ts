// Tampermonkey storage is the source of truth because it survives the site's localStorage being
// cleared (Chrome wipes a site's whole localStorage when it detects corruption). localStorage is
// kept as a mirror, as the fallback when GM storage isn't granted, and as the migration source for
// data saved before a script used GM storage.

function hasGmStorage(): boolean {
  return typeof GM_getValue === 'function' && typeof GM_setValue === 'function';
}

function readLocalStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Reads a raw string value, copying a legacy localStorage value into GM storage on first read. */
export function readStore(key: string): string | null {
  if (hasGmStorage()) {
    const saved: unknown = GM_getValue(key, null);
    if (typeof saved === 'string') {
      return saved;
    }
  }

  const legacy = readLocalStorage(key);
  if (legacy !== null && hasGmStorage()) {
    GM_setValue(key, legacy);
  }

  return legacy;
}

/** Writes a raw string value to GM storage and mirrors it to localStorage. `null` removes it. */
export function writeStore(key: string, value: string | null): void {
  if (hasGmStorage()) {
    GM_setValue(key, value);
  }

  try {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  } catch (error) {
    // The mirror is best effort when GM storage holds the real copy.
    if (!hasGmStorage()) {
      throw error;
    }
  }
}

/** Reads and parses a JSON value. Returns `fallback` when it is missing or unparsable. */
export function readJson(key: string, fallback: unknown = null): unknown {
  const raw = readStore(key);
  if (raw === null || raw === '') {
    return fallback;
  }

  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown): void {
  writeStore(key, JSON.stringify(value));
}
