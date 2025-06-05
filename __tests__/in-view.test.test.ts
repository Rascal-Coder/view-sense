import { describe, it, expect } from 'vitest';
import viewSense from '../src/index';
import { ViewSenseport } from '../src/viewport';

describe('viewSense.test', () => {
  it('defaults to ViewSenseport', () => {
    expect(viewSense.test()).toBe(ViewSenseport);
  });

  it('returns the test option', () => {
    const fn = (element: Element, options: any) => true;
    expect(viewSense.test()).toBe(ViewSenseport);
    expect(viewSense.test(fn)).toBe(fn);
  });

  it('validates and returns default for invalid inputs', () => {
    // 有效输入
    expect(viewSense.test(ViewSenseport)).toBe(ViewSenseport);
    
    // 以下是故意传入无效类型以测试健壮性
    type TestFn = (element: Element, options: any) => boolean;
    expect(viewSense.test('foo' as unknown as TestFn)).toBe(ViewSenseport);
    expect(viewSense.test({} as unknown as TestFn)).toBe(ViewSenseport);
    expect(viewSense.test(5 as unknown as TestFn)).toBe(ViewSenseport);
  });
});
