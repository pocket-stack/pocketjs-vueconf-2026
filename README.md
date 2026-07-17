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
| `motions.gif` | motions 动效画廊（已随仓库提交） | pocketjs 仓库 assets/screenshots/motions-53.gif |
| `flake-time-models.svg` `flake-histogram.svg` | 确定性页两张图 | pocketjs.dev 博文 *The UI Runtime That Can't Flake* 内联 SVG |
| `bench-vapor-psp.svg` | 实测页数据原图（备查，slide 上是重画的条形图） | pocketjs PR #6 |
| `vue.svg` | Vue 官方 logo | github.com/vuejs/art |
| `pocketjs.svg` | PocketJS logo | pocketjs 仓库 site/assets/favicon.svg |

可选升级：开场 hero 素材是 Solid 构建，用 `bun scripts/psp.ts hero-vue-vapor --framework=vue-vapor --release` 重录一版，"跑的就是 Vue"这句话就字面为真。

## 结构（13 页 · 目标 15 分钟）

| # | 页 | 时间点 |
|---|---|---|
| 1 | 冷开场（真机视频） | 0:00 |
| 2 | 标题 | 1:00 |
| 3 | PocketJS 是什么 | 1:30 |
| 4 | 掌机上的 Vue 应用（代码） | 3:00 |
| 5 | 为什么是 Vapor（每帧一次 FFI） | 4:30 |
| 6 | 一次 count.value++ 的旅程 | 6:30 |
| 7 | 实测：Vapor vs Vue vs Solid | 8:00 |
| 8 | 动效 | 9:30 |
| 9 | Pocket Figma | 10:30 |
| 10 | PSP 和 PS Vita（capability） | 11:30 |
| 11 | Pocket YouTube | 12:30 |
| 12 | 虚拟时钟与输入磁带 | 13:30 |
| 13 | 掌机之外 | 14:30 |

超时先砍第 9 页（Pocket Figma），再压缩第 8 页（动效）。

实测数据来自 pocketjs PR #6（2026-07-04 修正 feature parity 后的 PPSSPP 基准）。
