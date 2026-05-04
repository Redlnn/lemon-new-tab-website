<script lang="ts" setup>
import { useTranslation } from 'i18next-vue'
import '@/assets/styles/github-markdown.css'

const { i18next } = useTranslation()

const TOS = computed(() =>
  i18next.language.startsWith('zh')
    ? defineAsyncComponent(() => import('@/assets/TERMS_OF_SERVICE.md'))
    : defineAsyncComponent(() => import('@/assets/TERMS_OF_SERVICE_en.md')),
)
</script>

<template>
  <section class="md-container">
    <TOS />
  </section>
</template>
