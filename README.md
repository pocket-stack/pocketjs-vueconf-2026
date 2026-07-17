# pocketjs-vueconf-2026

VueConf 2026 闪电分享 **《PocketJS 与 Vue Vapor 的嵌入式 GUI 探索》** 的幻灯片。

单文件 HTML deck，deck 本身用 Vue 3 驱动（`vendor/` 内已 vendor，**完全离线可放映**）；视频素材全部本地播放，会场断网不影响。

## 放映

```sh
bun scripts/fetch-assets.ts   # 首次：拉取真机视频（~115 MB，git 不追踪）
open index.html               # file:// 直接放映，无需服务器
```

| 键位 | 作用 |
|---|---|
| `←` `→` / 空格 | 翻页 |
| `F` | 全屏 |
| `Home` / `End` | 首页 / 末页 |

## 素材

| 文件（assets/videos/） | 内容 | 来源 |
|---|---|---|
| `hero-psp.mp4` | 基础 UI，PSP 真机 | pocketjs.dev 博客 |
| `pocket-figma-psp.mp4` | Pocket Figma，PSP 真机 | R2 |
| `vita-openstrike.mp4` | 全量 demo + OpenStrike，PS Vita 真机 | R2 |
| `pocket-youtube-psp.mp4` | Pocket YouTube，PSP 真机 | R2 |
| `../motions.gif` | motions 动效画廊（gif，已随仓库提交） | pocketjs 仓库 assets/screenshots/motions-53.gif |

可选升级：开场 hero 素材是 Solid 构建，用 `bun scripts/psp.ts hero-vue-vapor --framework=vue-vapor --release` 重录一版，"跑的就是 Vue"这句话就字面为真。

## 结构（14 页 · 目标 15 分钟）

| # | 页 | 时间点 |
|---|---|---|
| 1 | 冷开场（真机视频） | 0:00 |
| 2 | 标题 | 1:00 |
| 3 | PocketJS 是什么 | 1:30 |
| 4 | 掌机上的 Vue 应用（代码） | 3:00 |
| 5 | 为什么是 Vapor | 4:30 |
| 6 | 一次 count.value++ 的旅程 | 6:00 |
| 7 | 帧预算：每帧一次 FFI | 7:00 |
| 8 | 实测：Vapor vs Vue vs Solid | 8:00 |
| 9 | 动效 | 9:30 |
| 10 | Pocket Figma | 10:30 |
| 11 | PSP 和 PS Vita（capability） | 11:30 |
| 12 | Pocket YouTube | 12:30 |
| 13 | 虚拟时钟与输入磁带 | 13:30 |
| 14 | 掌机之外 | 14:30 |

超时先砍第 10 页（Pocket Figma），再压缩第 9 页（动效）。

实测数据来自 pocketjs PR #6（2026-07-04 修正 feature parity 后的 PPSSPP 基准），原图存在 `assets/bench-vapor-psp.svg`；第 13 页两张 SVG 提取自 pocketjs.dev 博文 *The UI Runtime That Can't Flake*。
