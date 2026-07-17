<!-- 每页左上角的 PocketJS 角标；标题页（第 1 页）已有大 logo，跳过 -->
<template>
  <img
    v-if="$slidev.nav.currentPage !== 1"
    class="corner-logo"
    src="/pocketjs.svg"
    alt="PocketJS"
  />
</template>
