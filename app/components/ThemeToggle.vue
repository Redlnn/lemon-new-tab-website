<script lang="ts" setup>
import { DarkModeOutlined, LightModeOutlined } from '@vicons/material'
import { useDark } from '@vueuse/core'

const isDark = useDark()

function toggleDark() {
  isDark.value = !isDark.value
}

function toggleTheme() {
  if (!document.startViewTransition) {
    toggleDark()
    return
  }
  document.startViewTransition.bind(document)(toggleDark)
}
</script>

<template>
  <button class="nav-btn" @click="toggleTheme">
    <el-icon>
      <template v-if="isDark">
        <dark-mode-outlined />
      </template>
      <template v-else>
        <light-mode-outlined />
      </template>
    </el-icon>
  </button>
</template>
