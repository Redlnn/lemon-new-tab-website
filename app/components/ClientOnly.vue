<script setup lang="ts">
// 包裹内部含 Teleport 的 Element Plus 组件（如 ElBacktop、ElDropdown 等），
// 避免 SSR/SSG 期间 Teleport 目标节点不存在导致的水合错误。
// 参考：https://element-plus.org/zh-CN/guide/ssr#teleports

const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <slot v-if="isMounted" />
  <slot v-else name="placeholder" />
</template>
