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
---

<div class="logo-pair">
  <img src="/pocketjs.svg" alt="PocketJS" />
  <span>×</span>
  <img src="/vue.svg" alt="Vue" />
</div>

<p class="kicker">VueConf 2026</p>

<h1>PocketJS 与 <span class="accent">Vue Vapor</span> 的<br/>嵌入式 GUI 探索</h1>

<p class="sub byline">雪碧 from PaperboyAI<br/>GitHub @doodlewind<br/>X @ewind_dev / @pocket_js</p>

---
title: Modern Web on PSP
---

<div class="bleed-video">
  <video autoplay muted loop playsinline>
    <source src="/videos/hero-psp.mp4" type="video/mp4" />
  </video>
</div>
<div class="caption">
  <b>Modern Web on PSP</b>
</div>

---
title: PocketJS 是什么
---

<p class="kicker">PocketJS 是什么</p>

<h2>一个追求 Modern Web DX 最低性能开销的 JS runtime</h2>

<div class="cards">
  <div class="card"><b>Modern Web DX</b><p>JSX + Tailwind 子集。秘诀：屏幕尺寸和应用数据在编译期已知，样式、字体、动画尽量全部提前烘焙好。</p></div>
  <div class="card"><b>完全接管图形绘制</b><p>Rust core 负责布局与渲染，不走 OpenGL，直接裸接平台图形 API。</p></div>
  <div class="card"><b>UI 框架层可插拔</b><p>Solid 与 <span class="accent">Vue Vapor</span> 无删减接入，走官方自定义渲染器接口，驱动同一棵 Rust UI 节点树。</p></div>
</div>

<p class="sub">目标机器只有 333 MHz 和 32 MB 内存，但要跑满 60 fps。</p>

---
title: 在 PSP 上写 Vue
---

<p class="kicker">在 PSP 上写 Vue</p>

```tsx
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

<p class="sub">UI 的第一性原理：只需要 View Text Image 加上 Reactivity</p>

---
title: 为什么是 Vapor
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

<p class="stat-line">每帧只有 1 次 JS → Rust 的 FFI 机会</p>

---
title: count.value++ 的旅程
---

<p class="kicker">一次 count.value++ 的旅程</p>

<div class="pipeline">
  <div class="zone js">
    <div class="zlabel">JAVASCRIPT —— 帧回调 + microtask flush</div>
    <div class="flow-row">
      <div class="node">count.value++ ×N</div>
      <div class="arrow-h">调度器合并 →</div>
      <div class="node">Vapor effect 跑一次</div>
      <div class="arrow-h">写两处 →</div>
      <div class="node">JS 节点镜像<span class="hint">读操作全在 JS 侧</span></div>
      <div class="node green">ui.setText(7, "Count: 3")<span class="hint">同步 C 调用，只递标量</span></div>
    </div>
  </div>
  <div class="boundary">JS → Rust 边界：写入 = 同一帧内多次廉价小调用；读取 = 0 次；Rust 进入 JS = 每帧仅 1 次</div>
  <div class="zone rust">
    <div class="zlabel">RUST CORE —— 每帧只跑一次，与写入次数无关</div>
    <div class="flow-row">
      <div class="node">原生节点树</div>
      <div class="arrow-h">→</div>
      <div class="node">tick：布局 + 动画<span class="hint">样式查编译期烘焙的 styles.bin</span></div>
      <div class="arrow-h">→</div>
      <div class="node green">DrawList：扁平 u32 指令流<span class="hint">RECT / GLYPH_RUN / TEX_QUAD / SCISSOR，CPU 侧已完成裁剪</span></div>
    </div>
  </div>
  <div class="zone gpu">
    <div class="zlabel">GPU —— 每帧一次</div>
    <div class="flow-row">
      <div class="node">ge.rs 逐 word 译成 sceGu 调用</div>
      <div class="arrow-h">→</div>
      <div class="node">GE 显示列表<span class="hint">GPU 的命令缓冲，DMA 直接消费</span></div>
      <div class="arrow-h">→</div>
      <div class="node">屏幕</div>
    </div>
  </div>
</div>

---
title: 实测
---

<p class="kicker">实测</p>

<h2>PSP 上每帧 JS 侧开销：Vapor、Vue、Solid</h2>

<div class="bench">
  <div class="bench-row"><span class="bench-name">Vue Vapor</span><span class="bench-track"><span class="bench-bar vapor-js" style="width:1.5%"></span><span class="bench-bar vapor-flush" style="width:6.3%"></span><span class="bench-mark"></span></span><span class="bench-val">2.1 ms</span></div>
  <div class="bench-row"><span class="bench-name">Vue</span><span class="bench-track"><span class="bench-bar vue" style="width:100%"></span><span class="bench-mark"></span></span><span class="bench-val">26.9 ms</span></div>
  <div class="bench-row"><span class="bench-name">Solid</span><span class="bench-track"><span class="bench-bar solid" style="width:1%"></span><span class="bench-mark"></span></span><span class="bench-val">0.3 ms</span></div>
</div>

<div class="bench-legend">
  <span class="chip vapor-js"></span>帧回调逻辑 0.4 ms
  <span class="chip vapor-flush"></span>microtask flush 1.7 ms
</div>

<p class="sub">
Vapor 相对 Solid 开销在于每帧的 microtask flush，但已可满足嵌入式无 JIT 设备的实时 UI 需求
<br>
React 在 PSP 上甚至无法加载
</p>

---
title: 动效
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
title: Pocket Figma
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
title: Pocket YouTube
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
title: OpenStrike
---

<div class="split">
  <div class="left">
    <p class="kicker">OpenStrike</p>
    <h2>3D 射击游戏，PSP 真机 60 fps</h2>
    <p class="sub">pocket3d 渲染 BSP 关卡，直接生成 sceGu 显示列表；HUD 是 PocketJS 组件——后面的 Mac 连着 DevTools，实时查看真机上的组件树。</p>
  </div>
  <div class="right">
    <div class="video-frame ratio">
      <video autoplay muted loop playsinline>
        <source src="/videos/openstrike-psp.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</div>

---
title: 计算器上的 PocketJS
---

<div class="split">
  <div class="left">
    <p class="kicker">还能再小</p>
    <h2>计算器上的 PocketJS</h2>
    <p class="sub">同一个 Notifications demo，跑在 TI-Nspire CX II 图形计算器上：320 × 240 屏幕，方向键移动焦点，ENTER 消除通知。</p>
  </div>
  <div class="right">
    <div class="video-frame square">
      <video autoplay muted loop playsinline>
        <source src="/videos/ti-nspire.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</div>

---
title: 基于帧的确定性时钟
---

<p class="kicker">同一个运行时的另一面</p>

<h2>基于帧的确定性时钟</h2>

<p class="sub">PocketJS 类似游戏引擎，强制每帧仅跑一次 JS 回调——<span class="accent">What if agent 不需要 60fps UI，只需要 2fps 呢？</span></p>

<div class="diagrams">
  <img class="diagram" src="/determinism-models.svg" alt="sampled-time 与 frame-fold 两种运行时模型" />
  <img class="diagram" src="/determinism-histogram.svg" alt="墙钟与虚拟时钟各 60 次运行的直方图对比" />
</div>

<p class="sub">每帧一次事务：<code>state[n+1] = F(state[n], input[n])</code>，易于确定性模拟测试。<br/>同个异步业务各跑 60 次：浏览器 rAF 调度停止帧 22 种；帧虚拟时钟始终 1 种。</p>

---
title: 潜在场景
---

<!-- <img class="vue-logo-sm" src="/vue.svg" alt="Vue" /> -->

<p class="kicker">Possibilities</p>

<h2>PocketJS 还可能用在哪</h2>

<div class="cards">
  <div class="card"><b>桌面嵌入 UI</b><p>无需 WebView 即可用现代 DX 渲染带动画的桌面 widget</p></div>
  <div class="card"><b>离屏内容渲染</b><p>可逐帧离屏渲染帧序列，作为类 Remotion 场景下无 Chromium 的视频合成器。</p></div>
  <div class="card"><b>确定性测试</b><p>帧虚拟时钟加输入录制，大幅加速 E2E 并消除 flaky。</p></div>
</div>

<p class="sub"><span class="accent">pocketjs.dev</span><br/>github.com/pocket-stack/pocketjs</p>

---
title: One more thing
---

<div class="split">
  <div class="left">
    <p class="kicker">One more thing</p>
    <h2>PocketJS 本身是 AI native 开发的</h2>
    <p class="sub">单人加一群 coding agent，从零到 release 的全部真实开发 session 均转录留档，正在整理成 deep wiki 站点单独分享</p>
    <p class="thanks">Thanks!</p>
  </div>
  <div class="right">
    <div class="qr-card">
      <img src="/group-qr.png" alt="Pocket & AI Session 分享群二维码" />
    </div>
    <p class="sub qr-cap">扫码进「Pocket &amp; AI Session 分享群」<br/>站点上线后在群里分享</p>
  </div>
</div>
