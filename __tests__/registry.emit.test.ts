import { describe, it, expect } from 'vitest';
import Registry from '../src/registry';

describe('Registry.emit', () => {
  it('calls each handler', () => {
    let registry = Registry([]);
    let enterChecks = 0;
    let exitChecks = 0;

    registry.on('enter', x => { expect(x).toBe('a'); enterChecks++; });
    registry.on('enter', y => { expect(y).toBe('a'); enterChecks++; });

    registry.on('exit', x => { expect(x).toBe('b'); exitChecks++; });
    registry.on('exit', y => { expect(y).toBe('b'); exitChecks++; });

    registry.once('enter', x => { expect(x).toBe('a'); enterChecks++; });
    registry.once('enter', y => { expect(y).toBe('a'); enterChecks++; });

    registry.once('exit', x => { expect(x).toBe('b'); exitChecks++; });
    registry.once('exit', y => { expect(y).toBe('b'); exitChecks++; });

    registry.emit('enter', 'a' as unknown as Element);
    registry.emit('exit', 'b' as unknown as Element);
    
    expect(enterChecks).toBe(4);
    expect(exitChecks).toBe(4);
  });

  it('removes once handlers', () => {
    let registry = Registry([]);

    registry.once('enter', () => {});
    expect(registry.singles.enter.length).toBe(1);

    registry.emit('enter', {} as unknown as Element);
    expect(registry.singles.enter.length).toBe(0);
  });

  it('returns the registry', () => {
    let registry = Registry([]);
    expect(registry.emit('enter', {} as unknown as Element)).toEqual(registry);
  });
});
