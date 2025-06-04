# view-sense

一个轻量级的视口元素检测库，当DOM元素进入或离开视口时获得通知。

## 特点

- 🔍 轻松检测元素进入或离开视口
- 🎯 可配置的检测阈值和偏移量
- ⚡ 高性能，使用节流优化滚动事件
- 📦 轻量级，无依赖
- 🔄 支持链式调用
- 📱 响应式，支持所有现代浏览器

## 安装

```bash
npm install view-sense
import viewSense from  "view-sense"
```

或者通过CDN：

```html
<script src="https://unpkg.com/view-sense/dist/index.js"></script>
```

## 基本用法

使用EyeDOM，您可以注册当元素**进入**或**离开**视口时调用的处理函数。每个处理函数接收一个参数，即进入或离开视口的元素。

```js
viewSense('.someSelector')
    .on('enter', doSomething)
    .on('exit', el => {
        el.style.opacity = 0.5;
    });
```

## API

EyeDOM为每组通过`viewSense(<selector>)`获取的元素维护一个单独的处理函数注册表。每个注册表都提供相同的四种方法。EyeDOM还提供四种顶层方法（`is`、`offset`、`threshold`和`test`）。

### viewSense(\<selector>).on(\<event>, \<handler>)
> 为由`selector`选择的元素注册`event`事件的处理函数。EyeDOM只发出`'enter'`和`'exit'`两种事件。

> ```js
> viewSense('.someSelector').on('enter', doSomething);
> ```

### viewSense(\<selector>).once(\<event>, \<handler>)
> 为由`selector`选择的元素注册`event`事件的处理函数。通过`once`注册的处理函数只会被调用一次。

> ```js
> viewSense('.someSelector').once('enter', doSomething);
> ```

### viewSense.is(\<element>)
> 检查`element`是否在视口中。

> ```js
> viewSense.is(document.querySelector('.someSelector'));
> // => true
> ```

### viewSense.offset(\<offset>)
> 默认情况下，EyeDOM认为元素只要触及视口的任何边缘就被视为在视口中。您可以设置一个与边缘的偏移量。例如，偏移量为`100`将考虑元素至少突破视口任何边缘`100`像素才会被视为在视口中。`offset`可以是正数或负数。

> ```js
> viewSense.offset(100);
> viewSense.offset(-50);
> ```

> 也可以通过传递一个对象来为每个方向单独设置偏移量。

> ```js
> viewSense.offset({
>     top: 100,
>     right: 75,
>     bottom: 50,
>     left: 25
> });
> ```

### viewSense.threshold(\<threshold>)
> 设置元素的高度**和**宽度需要可见的比例才能被视为在视口中。默认值为`0`，表示任何可见量都算。阈值为`0.5`或`1`将分别要求元素的高度和宽度的一半或全部可见。`threshold`必须是介于`0`和`1`之间的数字。

> ```js
> viewSense.threshold(0);
> viewSense.threshold(0.5);
> viewSense.threshold(1);
> ```

### viewSense.test(\<test>)
> 用自定义函数覆盖EyeDOM的默认可见性标准。该函数将接收元素和选项对象作为唯一的两个参数。当元素应该被视为可见时返回`true`，否则返回`false`。

> ```js
> viewSense.test((el, options) => {
>     // ...
> });
> ```

### viewSense(\<selector>).check()
> 手动检查由`selector`选择的元素的状态。默认情况下，所有注册表都会在`window`的`scroll`、`resize`和`load`事件上进行检查。

> ```js
> viewSense('.someSelector').check();
> ```

### viewSense(\<selector>).emit(\<event>, \<element>)
> 手动为任何单个元素触发`event`事件。

> ```js
> viewSense('.someSelector').emit('exit', document.querySelectorAll('.someSelector')[0]);
> ```

## 浏览器支持

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)
- IE 11+

## 许可证

MIT 