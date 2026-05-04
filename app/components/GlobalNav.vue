<script setup lang="ts">
import { Github, Language } from '@vicons/fa'
import { useTranslation } from 'i18next-vue'

import ThemeToggle from '@/components/ThemeToggle.vue'

const { t, i18next } = useTranslation()

const props = withDefaults(
  defineProps<{
    showBg?: boolean
  }>(),
  {
    showBg: false,
  },
)
</script>

<template>
  <nav class="nav" :class="{ 'bg-visible': props.showBg }">
    <div class="px-[10dvw] py-4 h-full flex justify-between items-center">
      <RouterLink to="/" class="flex items-center">
        <el-icon size="30">
          <img src="/icon.svg" />
        </el-icon>
      </RouterLink>
      <div class="flex items-center gap-3">
        <RouterLink to="/tos" class="nav-btn">{{ t('tos') }}</RouterLink>
        <RouterLink to="/privacy" class="nav-btn">{{ t('privacy') }}</RouterLink>
        <button
          class="nav-btn"
          @click="i18next.changeLanguage(i18next.language === 'en' ? 'zh-CN' : 'en')"
        >
          <el-icon>
            <Language />
          </el-icon>
        </button>
        <a
          class="nav-btn"
          href="https://github.com/Redlnn/lemon-new-tab-page"
          target="_blank"
          rel="noopener noreferrer"
        >
          <el-icon>
            <Github />
          </el-icon>
        </a>
        <theme-toggle />
      </div>
    </div>
  </nav>
</template>

<style lang="css">
.nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 65px;
  z-index: 1;
  transition:
    background-color var(--el-transition-duration),
    backdrop-filter var(--el-transition-duration),
    color var(--el-transition-duration);

  &.bg-visible {
    background-color: rgb(from var(--el-text-color-primary) r g b / 0.4);
    backdrop-filter: blur(10px);
    color: var(--el-fill-color-extra-light);
  }

  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    line-height: 1;

    &:hover {
      color: var(--el-color-primary);
    }

    .el-icon {
      width: 30px;
      height: 30px;
      font-size: 20px;
      border-radius: 50%;
    }
  }
}
</style>
