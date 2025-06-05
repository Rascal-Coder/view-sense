import { describe, it, expect, beforeEach } from 'vitest';
import { ViewSenseport } from '../src/viewport';

// 设置全局window尺寸
beforeEach(() => {
  window.innerWidth = 1280;
  window.innerHeight = 700;
});

const stub = {
    getBoundingClientRect() {
        return {
            bottom: 232,
            height: 108,
            left: 196,
            right: 1084,
            top: 124,
            width: 888
        };
    }
}  as Element;

const opts = {
    offset: {
        top: 250,
        right: 250,
        bottom: 250,
        left: 250
    },
    threshold: 0
};

describe('ViewSenseport', () => {
  it('returns a boolean', () => {
    expect(typeof ViewSenseport(stub, opts)).toBe('boolean');
  });

  it('accepts an offset', () => {
    expect(ViewSenseport(stub, opts)).toBe(false);
  });
});
