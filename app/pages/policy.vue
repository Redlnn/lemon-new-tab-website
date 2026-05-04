<script lang="ts" setup>
import { useTranslation } from 'i18next-vue'
import '@/assets/styles/github-markdown.css'

const { i18next } = useTranslation()

const PrivacyPolicy = computed(() =>
  i18next.language.startsWith('zh')
    ? defineAsyncComponent(() => import('@/assets/PRIVACY_POLICY.md'))
    : defineAsyncComponent(() => import('@/assets/PRIVACY_POLICY_en.md')),
)
</script>

<template>
  <section class="md-container">
    <PrivacyPolicy />
  </section>
</template>
