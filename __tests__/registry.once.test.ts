import { describe, it, expect } from 'vitest';
import Registry from '../src/registry';

describe('Registry.once', () => {
  it('registers one handler to singles', () => {
    let registry = Registry([]);

    registry.once('enter', () => {});
    expect(registry.singles.enter.length).toBe(1);

    registry.once('exit', () => {});
    expect(registry.singles.exit.length).toBe(1);

    registry.once('enter', () => {});
    expect(registry.singles.enter.length).toBe(2);
  });

  it('returns the registry', () => {
    let registry = Registry([]);
    expect(registry.once('enter', () => {})).toEqual(registry);
  });
});
