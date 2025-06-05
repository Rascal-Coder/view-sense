import { throttle } from 'lodash';
import { dimensions, interval, triggers } from './constants';
import Registry, {
  type ViewSenseOptions,
  type ViewSenseRegistry,
} from './registry';
import { ViewSenseport } from './viewport';
/**
 * ViewSense控制接口
 * 定义了ViewSense函数返回的控制对象的结构和方法
 */
export interface ViewSenseControl {
  /**
   * 主函数，根据选择器返回相应的注册表实例
   */
  (selector: string): ViewSenseRegistry | undefined;
  /**
   * 设置或获取偏移量配置
   */
  offset: (o?: number | { [key: string]: number }) => { [key: string]: number };
  /**
   * 设置或获取可见性阈值
   */
  threshold: (n?: number) => number;
  /**
   * 设置或获取元素可见性测试函数
   */
  test: (
    fn?: (element: Element, options: ViewSenseOptions) => boolean
  ) => (element: Element, options: ViewSenseOptions) => boolean;
  /**
   * 测试元素是否在视口中可见
   */
  is: (el: Element) => boolean;
}

/**
 * 创建并返回ViewSense函数
 * 这是库的主要入口点
 */
const viewSense = (): ViewSenseControl => {
  /**
   * 如果window未定义，提前返回
   */
  if (typeof window === 'undefined') return {} as ViewSenseControl;
  /**
   * 维护所有注册表的哈希映射，
   * 选择器的历史记录，以及选项对象
   */
  type SelectorsMap = {
    history: string[];
    [key: string]: ViewSenseRegistry | string[];
  };

  const selectors: SelectorsMap = { history: [] };
  const options: ViewSenseOptions = {
    offset: {},
    threshold: 0,
    test: ViewSenseport,
  };

  /**
   * 检查选择器历史中的每个注册表，
   * 使用throttle函数限制检查频率
   */
  const check = throttle(() => {
    selectors.history.forEach((selector) => {
      (selectors[selector] as ViewSenseRegistry).check();
    });
  }, interval);

  /**
   * 为window的每个触发事件添加监听器，
   * 每次触发时检查所有注册表
   */
  triggers.forEach((event) => {
    window.addEventListener(event, check);
  });

  /**
   * 如果支持，使用MutationObserver监视DOM变化
   * 并在变化时运行检查
   */
  if (window.MutationObserver) {
    window.addEventListener('DOMContentLoaded', () => {
      new MutationObserver(check).observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    });
  }

  /**
   * 主接口，接受一个选择器并返回关联的注册表
   * 如果注册表不存在，则创建一个新的
   */
  const control = ((selector: string): ViewSenseRegistry | undefined => {
    if (typeof selector !== 'string') return undefined;

    // 获取最新的元素列表
    const elements: Element[] = Array.from(document.querySelectorAll(selector));

    // 如果注册表存在，更新其元素
    if (selectors.history.indexOf(selector) > -1) {
      (selectors[selector] as ViewSenseRegistry).elements = elements;
    }
    // 如果不存在，创建一个新的注册表
    else {
      selectors[selector] = Registry(elements, options);
      selectors.history.push(selector);
    }

    return selectors[selector] as ViewSenseRegistry;
  }) as ViewSenseControl;

  /**
   * 检查给定值是否为数字
   * @param n - 要检查的值
   * @returns 如果n是数字，则返回true，否则返回false
   */
  const isNum = (n: any): n is number => typeof n === 'number';
  /**
   * 使用对象或数字修改偏移量对象
   */
  control.offset = (o?: number | { [key: string]: number }) => {
    if (o === undefined) return options.offset;

    if (isNum(o)) {
      dimensions.forEach((dim) => {
        options.offset[dim] = o;
      });
    } else {
      dimensions.forEach((dim) => {
        if (o && isNum(o[dim])) {
          options.offset[dim] = o[dim];
        }
      });
    }

    return options.offset;
  };

  /**
   * 设置可见性阈值，值范围0-1
   */
  control.threshold = (n?: number): number => {
    if (isNum(n) && n >= 0 && n <= 1) {
      options.threshold = n;
    }
    return options.threshold;
  };

  /**
   * 使用自定义测试函数，覆盖默认的ViewSenseport函数
   * 用于确定元素可见性
   */
  control.test = (
    fn?: (element: Element, options: ViewSenseOptions) => boolean
  ) => {
    if (typeof fn === 'function') {
      options.test = fn;
    }
    // 确保总是返回一个函数，永远不会是undefined
    return options.test || ViewSenseport;
  };

  /**
   * 添加测试函数的代理，设置默认值，
   * 并返回接口对象
   */
  control.is = (el: Element): boolean =>
    (options.test || ViewSenseport)(el, options);
  control.offset(0);
  return control;
};

// 导出单例
const viewSenseInstance = viewSense();
export default viewSenseInstance;
