import { describe, it, expect, beforeEach } from 'vitest';
import Registry from '../src/registry';
import { ViewSenseport } from '../src/viewport';

beforeEach(() => {
  window.innerWidth = 1280;
  window.innerHeight = 700;
});

const opts = {
    offset: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    threshold: 0,
    test: ViewSenseport
};

describe('Registry.check', () => {
  it('updates current', () => {
    let registry = Registry([{
        getBoundingClientRect() {
            return {
                bottom: 1,
                left: 1,
                right: 1,
                top: 1,
                width: 100,
                height: 100
            };
        }
    }  as Element, {
        getBoundingClientRect() {
            return {
                bottom: -1,
                left: -1,
                right: -1,
                top: -1,
                width: 100,
                height: 100
            };
        }
    }  as Element], opts);

    expect(registry.current.length).toBe(0);

    registry.check();
    expect(registry.current.length).toBe(1);
  });

  it('emits enter events', () => {
    let stub = {
        getBoundingClientRect() {
            return {
                bottom: 1,
                left: 1,
                right: 1,
                top: 1,
                width: 100,
                height: 100
            };
        }
    }  as Element;

    let registry = Registry([stub], opts);
    
    let called = false;
    registry.on('enter', el => {
      expect(el).toEqual(stub);
      called = true;
    });
    
    registry.check();
    expect(called).toBe(true);
  });

  it('emits exit events', () => {
    let stub = {
        getBoundingClientRect() {
            return {
                bottom: -1,
                left: -1,
                right: -1,
                top: -1,
                width: 100,
                height: 100
            };
        }
    }  as Element;

    let registry = Registry([stub], opts);
    
    registry.current.push(stub);
    
    let called = false;
    registry.on('exit', el => {
      expect(el).toEqual(stub);
      called = true;
    });
    
    registry.check();
    expect(called).toBe(true);
  });

  it('returns the registry', () => {
    let registry = Registry([], opts);
    expect(registry.check()).toEqual(registry);
  });
});
