import { readStore, writeStore } from './storage';
import { asRecord, type UnknownRecord } from './values';

export interface SettingsStore<T> {
  load(): T;
  persist(settings: T): void;
  normalize(raw: unknown): T;
}

export interface SettingsStoreOptions<T> {
  /** Used as the console prefix for load and save failures. */
  scriptId: string;
  storageKey: string;
  defaults: Readonly<T>;
  /** Builds a complete settings object from whatever was stored. Defaults to `normalizeByDefaults`. */
  normalize?: (raw: UnknownRecord, defaults: Readonly<T>) => T;
}

/**
 * Keeps every key from `defaults`, taking the stored value only when it has the same type as the
 * default. Unknown stored keys are dropped.
 */
export function normalizeByDefaults<T extends object>(
  raw: UnknownRecord,
  defaults: Readonly<T>
): T {
  const result: UnknownRecord = {};
  for (const [key, defaultValue] of Object.entries(defaults)) {
    const value = raw[key];
    result[key] = typeof value === typeof defaultValue ? value : defaultValue;
  }
  return result as T;
}

export function createSettingsStore<T extends object>(
  options: SettingsStoreOptions<T>
): SettingsStore<T> {
  const { scriptId, storageKey, defaults } = options;
  const normalizeRecord = options.normalize ?? normalizeByDefaults;

  function normalize(raw: unknown): T {
    return normalizeRecord(asRecord(raw), defaults);
  }

  return {
    normalize,
    load(): T {
      try {
        return normalize(JSON.parse(readStore(storageKey) || '{}'));
      } catch (error) {
        console.warn(`[${scriptId}] Failed to load saved settings.`, error);
        return { ...defaults };
      }
    },
    persist(settings: T): void {
      try {
        writeStore(storageKey, JSON.stringify(settings));
      } catch (error) {
        console.warn(`[${scriptId}] Failed to save settings.`, error);
      }
    },
  };
}
