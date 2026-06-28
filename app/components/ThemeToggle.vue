<script lang="ts" setup>
import { useDark } from '@vueuse/core'

import { useRoute } from 'vue-router'

const isDark = useDark()
const route = useRoute()

const label = computed(() =>
  (route.params.lang as string | undefined) === 'en' ? 'Toggle color theme' : '切换明暗主题',
)

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
  <button class="theme-toggle" type="button" :aria-label="label" @click="toggleTheme">
    <svg v-if="isDark" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 14.5A7.7 7.7 0 0 1 9.5 4 8.2 8.2 0 1 0 20 14.5Z" />
    </svg>
    <svg v-else viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.7-5.7 1.4-1.4M4.9 19.1l1.4-1.4m0-11.4L4.9 4.9m14.2 14.2-1.4-1.4M12 16.5A4.5 4.5 0 1 0 12 7.5a4.5 4.5 0 0 0 0 9Z"
      />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  color: var(--color-text-muted);
  cursor: pointer;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  transition:
    color 160ms ease,
    background-color 160ms ease,
    border-color 160ms ease;
}

.theme-toggle:hover {
  color: var(--color-text);
  background: var(--color-bg-soft);
  border-color: var(--color-border);
}

.theme-toggle svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}
</style>
