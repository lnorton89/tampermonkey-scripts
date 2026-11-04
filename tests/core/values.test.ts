import { describe, expect, it } from 'vitest';
import {
  asBoolean,
  asFiniteNumber,
  asOneOf,
  asPositiveInteger,
  asTrimmedString,
  getControlText,
  normalizeByDefaults,
} from '@userscripts/core';

describe('value helpers', () => {
  it('coerces values with fallbacks', () => {
    expect(asBoolean(false, true)).toBe(false);
    expect(asBoolean('false', true)).toBe(true);
    expect(asTrimmedString('  hi ', 'x')).toBe('hi');
    expect(asTrimmedString('   ', 'x')).toBe('x');
    expect(asFiniteNumber('1.5', 0)).toBe(1.5);
    expect(asFiniteNumber('', 7)).toBe(7);
    expect(asFiniteNumber(Infinity, 7)).toBe(7);
    expect(asPositiveInteger('12')).toBe(12);
    expect(asPositiveInteger(0)).toBeNull();
    expect(asPositiveInteger(1.5)).toBeNull();
    expect(asOneOf(2, [1, 2, 3], 1)).toBe(2);
    expect(asOneOf(4, [1, 2, 3], 1)).toBe(1);
  });

  it('normalizes records against defaults', () => {
    expect(normalizeByDefaults({ a: false, b: 'x', c: 1 }, { a: true, b: 2 })).toEqual({
      a: false,
      b: 2,
    });
  });
});

describe('getControlText', () => {
  it('joins text, aria-label and title with whitespace collapsed', () => {
    const button = document.createElement('button');
    button.innerHTML = '  Next\n  <span>episode</span> ';
    button.setAttribute('aria-label', 'Go');
    expect(getControlText(button)).toBe('Next episode Go');
  });
});
