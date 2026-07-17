---
theme: default
title: PocketJS 与 Vue Vapor 的嵌入式 GUI 探索
titleTemplate: '%s'
info: VueConf 2026 · PocketJS × Vue Vapor
colorSchema: dark
transition: fade
mdc: true
canvasWidth: 1280
lineNumbers: false
drawings:
  persist: false
fonts:
  provider: none
class: bleed
---

<div class="bleed-video">
  <video autoplay muted loop playsinline>
    <source src="/videos/hero-psp.mp4" type="video/mp4" />
  </video>
</div>
<div class="caption">
  <b>JSX + 细粒度响应式，跑在 2004 年的 PSP 上</b>
  <span>真机实拍</span>
</div>

---

<img class="vue-logo" src="/vue.svg" alt="Vue" />

<p class="kicker">VueConf 2026</p>

<h1>PocketJS 与 <span class="accent">Vue Vapor</span> 的<br/>嵌入式 GUI 探索</h1>

<p class="sub">雪碧 from PaperboyAI<br/>GitHub @doodlewind<br/>X@ewind_dev</p>

---

<p class="kicker">PocketJS 是什么</p>

<h2>一个跑在游戏掌机上的 UI 框架</h2>

<div class="cards">
  <div class="card"><b>写法是前端的</b><p>JSX + Tailwind 子集，样式、字体、动画全部在编译期烘焙成二进制。</p></div>
  <div class="card"><b>运行时是系统级的</b><p>Rust core 负责布局与渲染，直接生成 GPU 显示列表。</p></div>
  <div class="card"><b>框架层可插拔</b><p>Solid 与 <span class="accent">Vue Vapor</span> 是两个一等公民，驱动同一棵原生树。</p></div>
</div>

<p class="sub">目标机器只有 333 MHz 和 32 MB 内存，但要跑满 60 fps。</p>

---

<p class="kicker">掌机上的 Vue 应用</p>

```tsx {1}
import { onMounted, ref } from "vue";
import { mount } from "@pocketjs/framework/vue-vapor";
import { View, Text } from "@pocketjs/framework/vue-vapor/components";

export default function App() {
  const count = ref(0);
  onMounted(() => console.log("mounted on a real PSP"));

  return (
    <View class="p-4 flex-col gap-2">
      <View focusable onPress={() => count.value++}>
        <Text class="text-sm text-blue-600">Count: {count.value}</Text>
      </View>
      {count.value > 2 ? <Text>Vue Vapor, native tree.</Text> : null}
    </View>
  );
}
mount(App);
```

<p class="sub">不是"像 Vue"—— <span class="accent">import 的就是 vue</span>：真的 ref，真的 onMounted，真的 Vapor 编译。</p>

---

<p class="kicker">为什么是 Vapor</p>

<div class="compare">
  <div class="lane">
    <h3>vdom 时代：自定义渲染器</h3>
    <div class="node">组件</div>
    <div class="arrow">↓</div>
    <div class="node heavy">虚拟 DOM 树</div>
    <div class="arrow">↓</div>
    <div class="node heavy">diff / patch 协调运行时</div>
    <div class="arrow">↓</div>
    <div class="node">宿主节点接口</div>
  </div>
  <div class="lane win">
    <h3>Vapor：编译产物直达节点</h3>
    <div class="node">组件</div>
    <div class="arrow">↓ 编译期展开</div>
    <div class="node green">createElement / insert / setProp</div>
    <div class="arrow">↓</div>
    <div class="node green">PocketJS 原生树</div>
  </div>
</div>

<p class="stat-line">把 Vue 接上 PSP 的渲染绑定：<b>244 行</b>&nbsp;&nbsp;<span class="sub-inline">（渲染器 108 + DOM 门面 136；整个 Vue 适配层 &lt; 1200 行）</span></p>

---

<p class="kicker">一次 count.value++ 的旅程</p>

<div class="journey">
  <div class="chain">
    <div class="zone js">
      <div class="zlabel">JAVASCRIPT</div>
      <div class="node">ref 变更 → Vapor effect 触发</div>
      <div class="node">setProp(节点镜像, "text", …)</div>
    </div>
    <div class="zone rust">
      <div class="zlabel">RUST CORE</div>
      <div class="node">指令流 ops → 布局 / 二进制样式表</div>
    </div>
    <div class="zone gpu">
      <div class="zlabel">GPU</div>
      <div class="node">sceGu 显示列表 → 屏幕</div>
    </div>
  </div>
  <aside>
    <div class="no">没有 <s>虚拟 DOM</s></div>
    <div class="no">没有 <s>diff</s></div>
    <div class="no">没有 <s>DOM 本身</s></div>
    <p class="sub">一次状态变更 = 一条精确的写指令。<br/>这就是它塞得进 32 MB 的原因。</p>
  </aside>
</div>

---

<p class="kicker">帧预算</p>

<p class="bigsay">每帧只有一次<br/>JS → Rust 的 <span class="accent">FFI 机会</span>。</p>

<p class="sub">effect 的写操作先落在 JS 侧的节点镜像上，每帧合并成一条指令流，跨一次边界交给 Rust。跨界次数一多就掉帧——细粒度更新的意义就是让这条指令流足够短。</p>

---

<p class="kicker">实测</p>

<h2>每帧总工作量：Vapor、Vue、Solid</h2>

<div class="bench">
  <div class="bench-row"><span class="bench-name">Vue Vapor</span><span class="bench-track"><span class="bench-bar vapor" style="width:39%"></span></span><span class="bench-val">23.4 ms</span></div>
  <div class="bench-row"><span class="bench-name">Vue</span><span class="bench-track"><span class="bench-bar vue" style="width:100%"></span></span><span class="bench-val">59.6 ms</span></div>
  <div class="bench-row"><span class="bench-name">Solid</span><span class="bench-track"><span class="bench-bar solid" style="width:27%"></span></span><span class="bench-val">16.0 ms</span></div>
</div>

<p class="sub">7 个 demo 的几何均值，PPSSPP 口径，feature parity 修正后（pocketjs PR #6）。Vapor 的帧内工作量是 Vue 的 0.39 倍；代价同样如实：启动 eval 是 Solid 的 3.5 倍，bundle 3.7 倍。</p>

---

<div class="split">
  <div class="left">
    <p class="kicker">动效</p>
    <h2>动画也在编译期</h2>
    <p class="sub">关键帧在构建期烘焙成二进制时间轴，播放时零 JS 参与 —— 相当于把 CSS 动画的思路推到掌机上。</p>
  </div>
  <div class="right">
    <div class="video-frame ratio">
      <img src="/motions.gif" alt="motions 动效画廊" />
    </div>
  </div>
</div>

---

<div class="split">
  <div class="left">
    <p class="kicker">Pocket Figma</p>
    <h2>整份 Figma 设计稿，搬上掌机</h2>
    <p class="sub">设计稿在构建期烘焙成瓦片集，运行时按视口流式加载，CLUT8 调色板纹理控制显存占用。</p>
  </div>
  <div class="right">
    <div class="video-frame ratio">
      <video autoplay muted loop playsinline>
        <source src="/videos/pocket-figma-psp.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</div>

---

<div class="split">
  <div class="left">
    <p class="kicker">PSP 和 PS Vita</p>
    <h2>一份代码跑两台机器</h2>
    <p class="sub">应用在 pocket.json 里声明依赖的 capability，宿主装载时对照自己实现的列表校验。两台机器分辨率和输入不同，差异由各自的宿主消化，应用代码不改。</p>
  </div>
  <div class="right">
    <div class="video-frame ratio">
      <video autoplay muted loop playsinline>
        <source src="/videos/vita-openstrike.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</div>

---

<div class="split">
  <div class="left">
    <p class="kicker">Pocket YouTube</p>
    <h2>在 PSP 上看 YouTube</h2>
    <p class="sub">macOS 作为 host 负责视频加载与解码，像素流经 USB 传给 PSP 渲染。</p>
  </div>
  <div class="right">
    <div class="video-frame ratio">
      <video autoplay muted loop playsinline>
        <source src="/videos/pocket-youtube-psp.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</div>

---

<p class="kicker">同一个运行时的另一面</p>

<h2>虚拟时钟与输入磁带</h2>

<div class="diagrams">
  <img class="diagram" src="/flake-time-models.svg" alt="sampled-time 与 frame-fold 两种运行时模型" />
  <img class="diagram" src="/flake-histogram.svg" alt="墙钟与虚拟时钟各 60 次运行的直方图对比" />
</div>

<p class="sub">每帧一次事务：state[n+1] = F(state[n], input[n])，能改变世界的输入全部记在磁带上。同一个 UI 断言各跑 60 次：墙钟 22 种结果、通过 9 次；虚拟时钟 1 种结果、60/60。</p>

---

<img class="vue-logo-sm" src="/vue.svg" alt="Vue" />

<p class="kicker">掌机之外</p>

<h2>这个运行时还能用在哪</h2>

<div class="cards">
  <div class="card"><b>桌面嵌入 UI</b><p>同一个运行时已有 wgpu 桌面后端，可以作为 UI 层嵌进原生应用。</p></div>
  <div class="card"><b>离屏视频渲染</b><p>帧序列是确定的，可以逐帧离屏渲染，直接当视频合成器用。</p></div>
  <div class="card"><b>确定性测试</b><p>虚拟时钟加输入磁带，UI 测试跑在模拟世界里，重放逐字节一致。</p></div>
</div>

<p class="sub"><span class="accent">pocketjs.dev</span><br/>github.com/pocket-stack</p>
