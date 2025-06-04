/**
 * 视口检测模块
 * 提供判断元素是否在视口内可见的功能
 */

/**
 * 视口检测接口选项
 */
export interface ViewportOptions {
  /**
   * 阈值，范围0-1，表示元素可见比例
   * 0表示任何部分可见即可，1表示必须完全可见
   */
  threshold: number;
  /**
   * 视口偏移量，用于调整视口的实际检测边界
   * 正值会缩小视口检测范围，负值会扩大视口检测范围
   */
  offset: {
    /**
     * 顶部偏移量（像素）
     */
    top?: number;
    /**
     * 右侧偏移量（像素）
     */
    right?: number;
    /**
     * 底部偏移量（像素）
     */
    bottom?: number;
    /**
     * 左侧偏移量（像素）
     */
    left?: number;
  };
}

/**
 * 检查元素是否在视口中可见
 * 并且可见部分超过指定的阈值和偏移量
 *
 * @param element - 需要检测的DOM元素
 * @param options - 检测选项配置
 * @returns 元素是否在视口中可见
 */
export function ViewSenseport(
  element: Element,
  options: ViewportOptions
): boolean {
  // 获取元素的边界矩形
  const { top, right, bottom, left, width, height } =
    element.getBoundingClientRect();

  // 获取视口宽高
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  // 计算元素与视口边界的交叉区域
  const intersection = {
    t: bottom, // 元素底部到视口顶部的距离
    r: windowWidth - left, // 元素左侧到视口右侧的距离
    b: windowHeight - top, // 元素顶部到视口底部的距离
    l: right, // 元素右侧到视口左侧的距离
  };

  // 根据阈值计算最小可见尺寸
  const threshold = {
    x: options.threshold * width, // 水平方向最小可见宽度
    y: options.threshold * height, // 垂直方向最小可见高度
  };

  // 获取偏移量，默认为0
  const offsetTop = options.offset.top || 0;
  const offsetRight = options.offset.right || 0;
  const offsetBottom = options.offset.bottom || 0;
  const offsetLeft = options.offset.left || 0;

  // 检查元素是否在视口中，考虑阈值和偏移量
  return (
    intersection.t > offsetTop + threshold.y &&
    intersection.r > offsetRight + threshold.x &&
    intersection.b > offsetBottom + threshold.y &&
    intersection.l > offsetLeft + threshold.x
  );
}
