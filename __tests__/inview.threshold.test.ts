import { describe, it, expect } from 'vitest';
import viewSense from '../src/index';

describe('viewSense.threshold', () => {
  it('returns the threshold', () => {
    expect(viewSense.threshold()).toBe(0);
    expect(viewSense.threshold(0.5)).toBe(0.5);
  });

  it('accepts a number', () => {
    expect(viewSense.threshold(1)).toBe(1);
  });

  it('validates the number', () => {
    expect(viewSense.threshold(0)).toBe(0);
    expect(viewSense.threshold(5)).toBe(0);
    expect(viewSense.threshold(-1)).toBe(0);
  });
});
