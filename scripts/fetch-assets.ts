#!/usr/bin/env bun
// 拉取演讲用的真机视频素材（体积大，git 不追踪）。用法：bun scripts/fetch-assets.ts

const R2 = "https://pub-ddde9ba138d04a9a9f922aa1fda6f855.r2.dev/pocketjs";

const ASSETS: Record<string, string> = {
  "hero-psp.mp4": "https://pocketjs.dev/assets/pocketjs-hardware-demo.mp4",
  "pocket-figma-psp.mp4": `${R2}/pocket-figma-real-psp-ba960367.mp4`,
  "pocket-youtube-psp.mp4": `${R2}/pocket-youtube-real-psp-7ae0b36c.mp4`,
  "vita-openstrike.mp4": `${R2}/pocketjs-real-ps-vita-bee7681c.mp4`,
};

const dir = new URL("../assets/videos/", import.meta.url);

for (const [name, url] of Object.entries(ASSETS)) {
  const dest = new URL(name, dir);
  if (await Bun.file(dest).exists()) {
    console.log(`skip  ${name}（已存在）`);
    continue;
  }
  console.log(`fetch ${name}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  await Bun.write(dest, res);
  console.log(`  ok  ${(Bun.file(dest).size / 1e6).toFixed(1)} MB`);
}

console.log("\n提示：motions-psp.mp4 需自录（真机 motions 画廊录屏），放入 assets/videos/ 后 deck 自动播放。");
