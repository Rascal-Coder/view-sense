import { describe, it, expect } from 'vitest';
import Registry from '../src/registry';

const opts = {
    offset: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    threshold: 0
};

describe('Registry', () => {
  it('returns a registry', () => {
    let registry = Registry([document.body], opts);
    expect(registry).toEqual({
        options: opts,
        current: [],
        elements: [document.body],
        handlers: { enter: [], exit: [] },
        singles: { enter: [], exit: [] }
    });
  });
});
