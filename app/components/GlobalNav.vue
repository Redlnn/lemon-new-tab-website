<script setup lang="ts">
import { Github } from '@vicons/fa'
</script>

<template>
  <nav class="nav absolute top-0 h-[68px] w-full z-[1]">
    <div class="px-[10dvw] py-4 h-full flex justify-between items-center">
      <nuxt-link to="/" class="flex items-center">
        <el-icon size="30">
          <nuxt-img src="/icon.svg"></nuxt-img>
        </el-icon>
      </nuxt-link>
      <div class="flex items-center gap-2">
        <nuxt-link
          class="nav-btn"
          to="https://github.com/Redlnn/lemon-new-tab-page"
          target="_blank"
        >
          <el-icon>
            <Github />
          </el-icon>
        </nuxt-link>
        <theme-toggle />
      </div>
    </div>
  </nav>
</template>

<style lang="css" scoped>
.nav {
  backdrop-filter: blur(10px);

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
