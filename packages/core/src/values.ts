// Small coercion helpers for normalizing data read back from storage or the network.

export type UnknownRecord = Record<string, unknown>;

export function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function asRecord(value: unknown): UnknownRecord {
  return isRecord(value) ? value : {};
}

export function asBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

/** Returns the trimmed string, or `fallback` when the value isn't a non-empty string. */
export function asTrimmedString(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

/** Accepts numbers and numeric strings. */
export function asFiniteNumber(value: unknown, fallback: number): number {
  const number = typeof value === 'string' && value.trim() ? Number(value) : value;
  return typeof number === 'number' && Number.isFinite(number) ? number : fallback;
}

export function asPositiveInteger(value: unknown): number | null {
  const number = asFiniteNumber(value, Number.NaN);
  return Number.isInteger(number) && number > 0 ? number : null;
}

export function asOneOf<T>(value: unknown, options: readonly T[], fallback: T): T {
  return options.includes(value as T) ? (value as T) : fallback;
}

export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
