<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main class="flex items-center justify-center flex-col h-[100dvh]">
    <h1 class="text-9xl font-black">404</h1>
    <h2 class="text-2xl font-bold mt-6">Oops… Page Not Found</h2>
    <ElButton class="back shadow" round size="large" type="primary" @click="router.back()">
      Back
    </ElButton>
  </main>
</template>

<style lang="css" scoped>
h1 {
  color: var(--el-color-primary);
}
.back.el-button--large.is-round {
  font-weight: 600;
  font-size: 18px;
  height: 50px;
  padding: 0 30px;
  margin-top: 30px;
  border-radius: 25px;
  color: var(--el-color-black);
  transition:
    transform var(--el-transition-duration-fast) ease,
    background-color var(--el-transition-duration) ease;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
