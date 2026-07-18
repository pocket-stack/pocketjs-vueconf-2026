# pocketjs-vueconf-2026

VueConf 2026 闪电分享 **《PocketJS 与 Vue Vapor 的嵌入式 GUI 探索》** 的幻灯片，基于 [Slidev](https://sli.dev)。

视频素材全部本地播放，字体不走远程 provider——依赖装好之后离线可放映。

## 放映

```sh
bun install
bun scripts/fetch-assets.ts   # 首次：拉取真机视频（~115 MB，git 不追踪）
bun run dev                   # 启动并自动打开浏览器
```

- 键位：`←` `→` / 空格翻页，`f` 全屏，`o` 总览
- 演讲者视图：地址栏访问 `/presenter`
- 静态构建：`bun run build`（输出 `dist/`）

## 素材（public/）

| 文件 | 内容 | 来源 |
|---|---|---|
| `videos/hero-psp.mp4` | 基础 UI，PSP 真机 | pocketjs.dev 博客 |
| `videos/pocket-figma-psp.mp4` | Pocket Figma，PSP 真机 | R2 |
| `videos/vita-openstrike.mp4` | 全量 demo + OpenStrike，PS Vita 真机 | R2 |
| `videos/pocket-youtube-psp.mp4` | Pocket YouTube，PSP 真机 | R2 |
| `videos/openstrike-psp.mp4` | OpenStrike + DevTools 组件树，PSP 真机 | 本地实拍，`bun scripts/import-local-assets.ts` 转码 |
| `videos/ti-nspire.mp4` | Notifications demo，TI-Nspire CX II 计算器 | 本地实拍，同上 |
| `motions.gif` | motions 动效画廊（已随仓库提交） | pocketjs 仓库 assets/screenshots/motions-53.gif |
| `determinism-models.svg` `determinism-histogram.svg` | 确定性页两张图 | pocketjs.dev 博文 *The UI Runtime That Can't Flake* 内联 SVG |
| `bench-vapor-psp.svg` | 实测页数据原图（备查，slide 上是重画的条形图） | pocketjs PR #6 |
| `vue.svg` | Vue 官方 logo | github.com/vuejs/art |
| `pocketjs.svg` | PocketJS logo | pocketjs 仓库 site/assets/favicon.svg |

可选升级：开场 hero 素材是 Solid 构建，用 `bun scripts/psp.ts hero-vue-vapor --framework=vue-vapor --release` 重录一版，"跑的就是 Vue"这句话就字面为真。

## 结构（14 页 · 目标 15 分钟）

| # | 页 | 时间点 |
|---|---|---|
| 1 | 标题 | 0:00 |
| 2 | 真机视频（Modern Web on PSP） | 0:30 |
| 3 | PocketJS 是什么 | 1:30 |
| 4 | 掌机上的 Vue 应用（代码） | 2:45 |
| 5 | 为什么是 Vapor（每帧一次 FFI） | 4:00 |
| 6 | 一次 count.value++ 的旅程 | 5:30 |
| 7 | 实测：Vapor vs Vue vs Solid | 7:00 |
| 8 | 动效 | 8:15 |
| 9 | Pocket Figma | 9:15 |
| 10 | Pocket YouTube | 10:15 |
| 11 | OpenStrike | 11:15 |
| 12 | 计算器上的 PocketJS | 12:15 |
| 13 | 基于帧的确定性时钟 | 13:15 |
| 14 | 掌机之外 | 14:30 |

超时先砍第 9 页（Pocket Figma），再压缩第 8 页（动效）。

实测数据来自 pocketjs PR #6（2026-07-04 修正 feature parity 后的 PPSSPP 基准）。
