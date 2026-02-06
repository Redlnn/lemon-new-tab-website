<script setup lang="ts">
import { Github } from '@vicons/fa'
</script>

<template>
  <nav class="nav absolute top-0 h-[68px] w-[100dvw] z-50">
    <div class="px-[10dvw] py-4 h-full flex justify-between items-center">
      <NuxtLink to="/" class="flex items-center">
        <ElIcon size="30">
          <NuxtImg src="/icon.svg"></NuxtImg>
        </ElIcon>
      </NuxtLink>
      <div class="flex items-center gap-2">
        <NuxtLink class="nav-btn" to="https://github.com/Redlnn/lemon-new-tab-page" target="_blank">
          <ElIcon>
            <Github />
          </ElIcon>
        </NuxtLink>
        <ThemeToogle />
      </div>
    </div>
  </nav>
</template>

<style lang="css" scoped>
.nav {
  .nav-btn {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color var(--el-transition-duration);
    font-size: 20px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);

      html.dark & {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
}
</style>
