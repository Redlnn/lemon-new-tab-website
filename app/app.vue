<script setup lang="ts">
import { useRoute } from 'vue-router'

import GlobalNav from '@/components/GlobalNav.vue'

const route = useRoute()
const showNavBg = ref(false)

function handleScroll() {
  showNavBg.value = window.scrollY > (route.path.endsWith('/') ? 24 : 0)
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <global-nav :showBg="showNavBg" />
  <router-view />
</template>
