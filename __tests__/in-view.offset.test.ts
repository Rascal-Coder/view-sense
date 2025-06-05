import { describe, it, expect } from 'vitest';
import viewSense from '../src/index';

describe('viewSense.offset', () => {
  it('returns the offset', () => {
    const stub = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    expect(viewSense.offset(0)).toEqual(stub);
    expect(viewSense.offset()).toEqual(stub);
  });

  it('accepts a number', () => {
    expect(viewSense.offset(10)).toEqual({
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    });
  });

  it('accepts an object', () => {
    expect(viewSense.offset({
        top: 25,
        right: 50,
        bottom: 75,
        left: 100
    })).toEqual({
        top: 25,
        right: 50,
        bottom: 75,
        left: 100
    });
  });
});
