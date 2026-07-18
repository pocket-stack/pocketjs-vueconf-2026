#!/usr/bin/env bun
// 把手机实拍的本地素材转码进 public/videos/（体积大，git 不追踪）。用法：bun scripts/import-local-assets.ts
import { $ } from "bun";
import { existsSync } from "node:fs";

const HOME = process.env.HOME ?? "~";

const JOBS = [
  { src: `${HOME}/Downloads/IMG_4901.mov`, dest: "openstrike-psp.mp4", scale: "1280:-2", crf: "23" },
  { src: `${HOME}/Downloads/IMG_3105.MOV`, dest: "ti-nspire.mp4", scale: "1080:-2", crf: "22" },
];

const outDir = new URL("../public/videos/", import.meta.url).pathname;

for (const { src, dest, scale, crf } of JOBS) {
  const out = `${outDir}${dest}`;
  if (existsSync(out)) {
    console.log(`skip  ${dest}（已存在）`);
    continue;
  }
  if (!existsSync(src)) {
    console.log(`miss  ${dest}：找不到源文件 ${src}`);
    continue;
  }
  console.log(`code  ${dest}`);
  await $`ffmpeg -v error -i ${src} -an -c:v libx264 -crf ${crf} -preset medium -vf scale=${scale} -pix_fmt yuv420p -movflags +faststart ${out}`;
  console.log(`  ok  ${(Bun.file(out).size / 1e6).toFixed(1)} MB`);
}
