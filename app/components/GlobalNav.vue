<script setup lang="ts">
import { Github, Language } from '@vicons/fa'
import { useTranslation } from 'i18next-vue'
import { useRoute, useRouter } from 'vue-router'

import ThemeToggle from '@/components/ThemeToggle.vue'
import { DEFAULT_LANG } from '@/routes'

const { t } = useTranslation()
const route = useRoute()
const router = useRouter()

const props = withDefaults(
  defineProps<{
    showBg?: boolean
  }>(),
  {
    showBg: false,
  },
)

const currentLang = computed(() => (route.params.lang as string) || DEFAULT_LANG)

async function switchLang() {
  const nextLang = currentLang.value === 'zh-CN' ? 'en' : 'zh-CN'
  const newPath = route.path.replace(`/${currentLang.value}`, `/${nextLang}`)
  router.push(newPath || `/${nextLang}`)
}
</script>

<template>
  <nav class="nav" :class="{ 'bg-visible': props.showBg }">
    <div class="px-[10dvw] py-4 h-full flex justify-between items-center">
      <RouterLink :to="`/${currentLang}`" class="flex items-center">
        <el-icon size="30">
          <img src="/icon.svg" alt="柠檬起始页" />
        </el-icon>
      </RouterLink>
      <div class="flex items-center gap-3">
        <RouterLink :to="`/${currentLang}/tos`" class="nav-btn">{{ t('tos') }}</RouterLink>
        <RouterLink :to="`/${currentLang}/privacy`" class="nav-btn">{{ t('privacy') }}</RouterLink>
        <button class="nav-btn" @click="switchLang">
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
