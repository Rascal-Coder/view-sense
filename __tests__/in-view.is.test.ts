import { describe, it, expect } from 'vitest';
import viewSense from '../src/index';

const stub = {
    getBoundingClientRect() {
        return {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
            width: 100,
            height: 100
        };
    }
} as Element;

describe('viewSense.is', () => {
  it('returns a boolean', () => {
    expect(typeof viewSense.is(stub)).toBe('boolean');
    expect(viewSense.is(stub)).toBe(true);
  });
});
