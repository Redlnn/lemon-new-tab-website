<script lang="ts" setup>
import { DarkModeOutlined, LightModeOutlined } from '@vicons/material'

const color = useColorMode()

const isDark = computed(() => color.value === 'dark')

function toggleDark() {
  color.preference = isDark.value ? 'light' : 'dark'
}

// 主题切换函数
function toggleTheme() {
  // 兼容性处理：如果浏览器不支持 View Transitions API，则直接切换主题
  if (!document.startViewTransition) {
    toggleDark()
    return
  }

  // 使用 View Transitions API 创建过渡效果
  document.startViewTransition.bind(document)(toggleDark)
}
</script>

<template>
  <button class="nav-btn" @click="toggleTheme">
    <ElIcon>
      <template v-if="isDark">
        <DarkModeOutlined />
      </template>
      <template v-else>
        <LightModeOutlined />
      </template>
    </ElIcon>
  </button>
</template>
