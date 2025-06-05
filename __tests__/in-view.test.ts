import { describe, it, expect, afterAll, beforeEach } from 'vitest';
import viewSense from '../src/index';
import Registry from '../src/registry';

// 模拟DOM环境
beforeEach(() => {
  // 确保每个测试前DOM被重置
  document.body.innerHTML = '';
});

describe('viewSense', () => {
  it('is a function', () => {
    expect(typeof viewSense).toBe('function');
  });

  it('returns a registry', () => {
    const registry = viewSense('body');
    const emptyRegistry = Registry([]);
    expect(registry).toBeTruthy();
    expect(Object.getPrototypeOf(registry)).toEqual(Object.getPrototypeOf(emptyRegistry));
  });

  it('returns existing registries', () => {
    let registry = viewSense('body');
    expect(registry).toBe(viewSense('body'));
  });

  it('updates existing registry elements', () => {
    const addDiv = () => {
      document.body.appendChild(
        document.createElement('div')
      );
    };

    const divRegistry = viewSense('div');
    expect(divRegistry?.elements.length).toBe(0);

    addDiv();
    expect(viewSense('div')?.elements.length).toBe(1);
  });
});
