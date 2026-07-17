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
| `N` | 讲者备注（含每页时间点） |
| `Home` / `End` | 首页 / 末页 |

## 素材

| 文件（assets/videos/） | 内容 | 来源 |
|---|---|---|
| `hero-psp.mp4` | 基础 UI，PSP 真机 | pocketjs.dev 博客 |
| `pocket-figma-psp.mp4` | Pocket Figma，PSP 真机 | R2 |
| `vita-openstrike.mp4` | 全量 demo + OpenStrike，PS Vita 真机 | R2 |
| `pocket-youtube-psp.mp4` | Pocket YouTube，PSP 真机 | R2 |
| `motions-psp.mp4` | motions 动效画廊 | **需自录**，缺失时该页显示占位提示 |

两个可选升级：

- **开场视频**：现有 hero 素材是 Solid 构建。用 `bun scripts/psp.ts hero-vue-vapor --framework=vue-vapor --release` 重录一版，"跑的就是 Vue"这句话就字面为真。
- **motions**：真机录一段 motions 画廊（demos/motions），替换占位。

## 结构（14 页 · 目标 15 分钟）

| # | 页 | 时间点 |
|---|---|---|
| 1 | 冷开场 · 真机视频 | 0:00 |
| 2 | 标题 | 1:00 |
| 3 | PocketJS 是什么 | 1:30 |
| 4 | 掌机上的 Vue 应用（代码） | 3:00 |
| 5 | 为什么是 Vapor（244 行） | 4:30 |
| 6 | 一次 count.value++ 的旅程 | 6:30 |
| 7 | 关键句 | 8:00 |
| 8 | 薄框架，厚运行时 | 8:30 |
| 9 | 案例 · 动效 | 10:00 |
| 10 | 案例 · Pocket Figma | 11:00 |
| 11 | 案例 · Vita + OpenStrike | 12:00 |
| 12 | 案例 · Pocket YouTube | 13:00 |
| 13 | 为什么做这个（收尾） | 14:00 |
| 14 | 谢谢 | 15:00 |

超时保险丝：先砍第 10 页（Pocket Figma，论点可并进第 11 页一句话讲完），再压缩第 9 页；第 5、6 页是全场核心，不可砍。
