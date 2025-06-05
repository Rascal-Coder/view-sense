import viewSense from "view-sense";
import "./style.css";
document.addEventListener("DOMContentLoaded", () => {
  // 创建UI结构
  const app = document.querySelector("#app")!;
  app.innerHTML = `
    <div class="container py-5">
      <header class="text-center mb-5 py-5">
        <h1 class="display-4 fw-bold">ViewSense <span class="text-primary">示例展示</span></h1>
        <p class="lead text-muted mb-0">滚动页面查看各种元素检测效果</p>
      </header>
      
      <!-- 右侧菜单 -->
      <nav class="side-menu">
        <div class="side-menu-inner">
          <h5 class="side-menu-title">目录导航</h5>
          <ul class="side-menu-list">
            <li><a href="#basic" class="side-menu-link">基础检测</a></li>
            <li><a href="#offset" class="side-menu-link">偏移量设置</a></li>
            <li><a href="#threshold" class="side-menu-link">阈值检测</a></li>
            <li><a href="#once" class="side-menu-link">一次性事件</a></li>
            <li><a href="#lazy" class="side-menu-link">延迟加载图片</a></li>
            <li><a href="#api-test" class="side-menu-link">API测试</a></li>
          </ul>
        </div>
      </nav>
      
      <section id="basic" class="card mb-5">
        <div class="card-body p-4">
          <h2 class="card-title h3">基础检测</h2>
          <p class="card-text text-muted mb-4">基础的进入/离开视口检测，元素变为彩色表示在视口中</p>
          <div class="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-4">
            ${Array(10).fill(0).map((_, i) => 
              `<div class="col">
                <div class="box basic-box d-flex justify-content-center align-items-center" data-id="${i+1}">${i+1}</div>
              </div>`).join('')}
          </div>
        </div>
      </section>
      
      <section id="offset" class="card mb-5">
        <div class="card-body p-4">
          <h2 class="card-title h3">偏移量设置</h2>
          <p class="card-text text-muted mb-4">使用偏移量提前/延迟检测，这些元素在进入视口前100px就会被检测到</p>
          <div class="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-4">
            ${Array(10).fill(0).map((_, i) => 
              `<div class="col">
                <div class="box offset-box d-flex justify-content-center align-items-center" data-id="${i+1}">${i+1}</div>
              </div>`).join('')}
          </div>
        </div>
      </section>
      
      <section id="threshold" class="card mb-5">
        <div class="card-body p-4">
          <h2 class="card-title h3">阈值检测</h2>
          <p class="card-text text-muted mb-4">使用阈值，只有元素完全进入视口(100%)才会被检测到</p>
          <div class="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-4">
            ${Array(10).fill(0).map((_, i) => 
              `<div class="col">
                <div class="box threshold-box d-flex justify-content-center align-items-center" data-id="${i+1}">${i+1}</div>
              </div>`).join('')}
          </div>
        </div>
      </section>
      
      <section id="once" class="card mb-5">
        <div class="card-body p-4">
          <h2 class="card-title h3">一次性事件</h2>
          <p class="card-text text-muted mb-4">使用once方法，事件只会触发一次（元素只会变色一次）</p>
          <div class="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-4">
            ${Array(10).fill(0).map((_, i) => 
              `<div class="col">
                <div class="box once-box d-flex justify-content-center align-items-center" data-id="${i+1}">${i+1}</div>
              </div>`).join('')}
          </div>
        </div>
      </section>
      
      <section id="lazy" class="card mb-5">
        <div class="card-body p-4">
          <h2 class="card-title h3">延迟加载图片</h2>
          <p class="card-text text-muted mb-4">使用ViewSense实现图片的延迟加载</p>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            ${Array(6).fill(0).map((_, i) => `
              <div class="col">
                <div class="image-container">
                  <div class="lazy-image d-flex justify-content-center align-items-center" data-src="https://picsum.photos/800/600?random=${i+1}">
                    <div class="placeholder">图片加载中...</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <footer class="text-center text-muted py-4 mt-5">
        <p class="mb-0">ViewSense Demo · <span class="text-primary">观察元素进入视口</span></p>
      </footer>
    </div>
  `;

  // 应用基础检测示例
  const basicObserver = viewSense(".basic-box");
  basicObserver
    ?.on("enter", (el) => {
      el.classList.add("in-view");
      console.log(`Box ${el.getAttribute("data-id")} 进入视口`);
    })
    ?.on("exit", (el) => {
      el.classList.remove("in-view");
      console.log(`Box ${el.getAttribute("data-id")} 离开视口`);
    });

  // 应用偏移量示例
  viewSense.offset(100);
  const offsetObserver = viewSense(".offset-box");
  offsetObserver
    ?.on("enter", (el) => {
      el.classList.add("in-view");
      console.log(`Offset box ${el.getAttribute("data-id")} 进入视口(提前100px)`);
    })
    ?.on("exit", (el) => {
      el.classList.remove("in-view");
      console.log(`Offset box ${el.getAttribute("data-id")} 离开视口(滞后100px)`);
    });
  
  // 恢复默认偏移量，设置阈值示例
  viewSense.offset(0);
  viewSense.threshold(1.0); // 100%可见度
  const thresholdObserver = viewSense(".threshold-box");
  thresholdObserver
    ?.on("enter", (el) => {
      el.classList.add("in-view");
      console.log(`Threshold box ${el.getAttribute("data-id")} 完全进入视口`);
    })
    ?.on("exit", (el) => {
      el.classList.remove("in-view");
      console.log(`Threshold box ${el.getAttribute("data-id")} 不再完全在视口中`);
    });
  
  // 恢复默认阈值，应用一次性事件示例
  viewSense.threshold(0);
  const onceObserver = viewSense(".once-box");
  onceObserver
    ?.once("enter", (el) => {
      el.classList.add("in-view");
      el.textContent += " ✓";
      console.log(`Once box ${el.getAttribute("data-id")} 进入视口 (只触发一次)`);
    });
  
  // 延迟加载图片示例
  const lazyObserver = viewSense(".lazy-image");
  lazyObserver
    ?.on("enter", (el) => {
      const src = el.getAttribute("data-src");
      if (src) {
        const img = new Image();
        img.onload = () => {
          el.classList.add("loaded");
          (el as HTMLElement).style.backgroundImage = `url(${src})`;
          el.querySelector(".placeholder")?.remove();
        };
        img.src = src;
        el.removeAttribute("data-src"); // 防止重复加载
      }
    });

  // 演示 viewSense.is() 方法
  const header = document.querySelector("header");
  if (header && viewSense.is(header)) {
    console.log("页面头部在视口中");
  }

  // 演示使用对象设置偏移量
  viewSense.offset({
    top: 50,
    right: 25,
    bottom: 50,
    left: 25
  });
  console.log("已设置自定义偏移量");
  // 注意：此设置会影响之后的所有调用

  // 演示自定义测试函数
  const originalTest = viewSense.test(); // 保存原始测试函数以便稍后还原
  viewSense.test((el, options) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    // 自定义逻辑：仅检测元素是否在视口中央区域
    return rect.top > windowHeight * 0.25 && rect.bottom < windowHeight * 0.75;
  });
  console.log("已设置自定义测试函数");

  // 创建测试按钮
  const buttonSection = document.createElement("section");
  buttonSection.className = "card mb-5";
  buttonSection.id = "api-test";
  buttonSection.innerHTML = `
    <div class="card-body p-4">
      <h2 class="card-title h3">API测试按钮</h2>
      <p class="card-text text-muted mb-4">点击按钮测试其他API功能</p>
      <div class="d-flex gap-2 mb-4">
        <button id="check-btn" class="btn btn-primary">手动检查元素</button>
        <button id="emit-btn" class="btn btn-success">手动触发事件</button>
        <button id="reset-btn" class="btn btn-secondary">重置设置</button>
      </div>
      <div id="test-element" class="box mt-3 d-flex justify-content-center align-items-center">测试元素</div>
    </div>
  `;
  document.querySelector(".container")?.appendChild(buttonSection);

  // 为按钮添加事件
  document.getElementById("check-btn")?.addEventListener("click", () => {
    console.log("手动检查所有basic-box元素");
    basicObserver?.check();
  });

  document.getElementById("emit-btn")?.addEventListener("click", () => {
    const testEl = document.getElementById("test-element");
    if (testEl) {
      console.log("手动触发测试元素的enter事件");
      basicObserver?.emit("enter", testEl);
      testEl.classList.add("in-view");
    }
  });
  
  document.getElementById("reset-btn")?.addEventListener("click", () => {
    // 恢复原始设置
    viewSense.offset(0);
    viewSense.threshold(0);
    if (originalTest) viewSense.test(originalTest);
    console.log("已重置所有设置");
  });

  // 处理菜单激活状态
  const links = document.querySelectorAll(".side-menu-link");
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY + 200; // 添加一些偏移量

    document.querySelectorAll("section[id]").forEach((section) => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        links.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
}); 