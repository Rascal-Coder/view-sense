/**
 * - Registry 注册表 -
 *
 * 维护一个元素列表，其中包含当前通过给定条件的子集，
 * 并在元素进入或离开时触发事件。
 */

import type { ViewportOptions } from './viewport';

/**
 * 视口内元素监控配置接口
 * 继承自视口配置，并添加测试函数
 */
export interface ViewSenseOptions extends ViewportOptions {
  /**
   * 测试函数，用于判断元素是否满足可见性条件
   */
  test: (element: Element, options: ViewSenseOptions) => boolean;
  /**
   * 其他可选属性
   */
  [key: string]: unknown;
}

/**
 * 事件名称类型
 * - enter: 元素进入可见区域
 * - exit: 元素离开可见区域
 */
export type EventName = 'enter' | 'exit';

/**
 * 事件处理函数类型
 * 当元素状态变化时被调用
 */
export type EventHandler = (element: Element) => void;

/**
 * 视口内元素注册表类
 * 跟踪元素的可见性状态并触发相应事件
 */
export class ViewSenseRegistry {
  /**
   * 配置选项
   */
  options: ViewSenseOptions;

  /**
   * 所有被监控的元素列表
   */
  elements: Element[];

  /**
   * 当前在视口内的元素列表
   */
  current: Element[];

  /**
   * 事件处理函数映射
   */
  handlers: Record<EventName, EventHandler[]>;

  /**
   * 一次性事件处理函数映射
   */
  singles: Record<EventName, EventHandler[]>;

  /**
   * 构造函数
   * @param elements - 要监视的元素数组
   * @param options - 配置选项
   */
  constructor(elements: Element[], options: ViewSenseOptions) {
    this.options = options;
    this.elements = elements;
    this.current = [];
    this.handlers = { enter: [], exit: [] };
    this.singles = { enter: [], exit: [] };
  }

  /**
   * 检查注册表中的每个元素，如果元素状态发生变化，
   * 则触发事件并对当前元素进行操作。
   *
   * @returns 当前实例，支持链式调用
   */
  check(): this {
    this.elements.forEach((el) => {
      const passes = this.options.test(el, this.options);
      const index = this.current.indexOf(el);
      const current = index > -1;
      const entered = passes && !current;
      const exited = !passes && current;

      if (entered) {
        this.current.push(el);
        this.emit('enter', el);
      }

      if (exited) {
        this.current.splice(index, 1);
        this.emit('exit', el);
      }
    });
    return this;
  }

  /**
   * 为事件注册处理函数，将为每个事件触发。
   *
   * @param event - 要监听的事件名称 ('enter' 或 'exit')
   * @param handler - 事件处理函数
   * @returns 当前实例，支持链式调用
   */
  on(event: EventName, handler: EventHandler): this {
    this.handlers[event].push(handler);
    return this;
  }

  /**
   * 为事件注册一次性处理函数，触发一次后将被移除。
   *
   * @param event - 要监听的事件名称 ('enter' 或 'exit')
   * @param handler - 事件处理函数
   * @returns 当前实例，支持链式调用
   */
  once(event: EventName, handler: EventHandler): this {
    this.singles[event].unshift(handler);
    return this;
  }

  /**
   * 在给定元素上触发事件。主要在内部使用，
   * 但对用户也可能有用。
   *
   * @param event - 要触发的事件名称 ('enter' 或 'exit')
   * @param element - 要触发事件的元素
   * @returns 当前实例，支持链式调用
   */
  emit(event: EventName, element: Element): this {
    while (this.singles[event].length) {
      this.singles[event].pop()!(element);
    }
    let length = this.handlers[event].length;
    while (--length > -1) {
      this.handlers[event][length](element);
    }
    return this;
  }
}

/**
 * 创建一个新的InViewRegistry实例
 *
 * @param elements - 要监视的元素数组
 * @param options - 配置选项
 * @returns InViewRegistry实例
 */
export default (
  elements: Element[],
  options: ViewSenseOptions
): ViewSenseRegistry => new ViewSenseRegistry(elements, options);
