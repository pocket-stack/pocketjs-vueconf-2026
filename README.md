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

## 结构（13 页 · 目标 15 分钟）

| # | 页 | 时间点 |
|---|---|---|
| 1 | 冷开场（真机视频） | 0:00 |
| 2 | 标题 | 1:00 |
| 3 | PocketJS 是什么 | 1:30 |
| 4 | 掌机上的 Vue 应用（代码） | 3:00 |
| 5 | 为什么是 Vapor | 4:30 |
| 6 | 一次 count.value++ 的旅程 | 6:30 |
| 7 | 关键句 | 8:00 |
| 8 | 薄框架，厚运行时 | 8:30 |
| 9 | 动效 | 10:00 |
| 10 | Pocket Figma | 11:00 |
| 11 | Vita + OpenStrike | 12:00 |
| 12 | Pocket YouTube | 13:00 |
| 13 | 谢谢 | 14:30 |

超时先砍第 10 页（Pocket Figma），再压缩第 9 页（动效）。
