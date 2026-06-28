<script setup lang="ts">
// 包裹只应在客户端渲染的内容，避免 SSG 期间依赖浏览器 API 导致水合错误。

const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <slot v-if="isMounted" />
  <slot v-else name="placeholder" />
</template>
