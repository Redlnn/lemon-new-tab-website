<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

import { useRoute } from 'vue-router'

import GlobalNav from '@/components/GlobalNav.vue'

const route = useRoute()
const { height } = useWindowSize()
const showNavBg = ref(false)

function handleScroll({ scrollTop }: { scrollTop: number }) {
  showNavBg.value = scrollTop > (route.path === '/' ? height.value : 0)
}
</script>

<template>
  <global-nav :showBg="showNavBg" />
  <div class="main-container">
    <el-scrollbar ref="scrollbar" @scroll="handleScroll">
      <router-view />
    </el-scrollbar>
    <el-backtop target=".main-container .el-scrollbar__wrap"></el-backtop>
  </div>
</template>

<style lang="css">
.main-container {
  height: 100dvh;
}

.main-container > .el-scrollbar > .el-scrollbar__wrap {
  padding-top: 65px;

  &:has(.landing),
  &:has(.not-found) {
    padding-top: 0;
  }
}
</style>
