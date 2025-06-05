import { describe, it, expect } from 'vitest';
import Registry from '../src/registry';

describe('Registry.on', () => {
  it('registers one handler to handlers', () => {
    let registry = Registry([]);

    registry.on('enter', () => {});
    expect(registry.handlers.enter.length).toBe(1);

    registry.on('exit', () => {});
    expect(registry.handlers.exit.length).toBe(1);

    registry.on('enter', () => {});
    expect(registry.handlers.enter.length).toBe(2);
  });

  it('returns the registry', () => {
    let registry = Registry([]);
    expect(registry.on('enter', () => {})).toEqual(registry);
  });
});
