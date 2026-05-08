<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import { useTranslation } from 'i18next-vue'
import '@/assets/styles/github-markdown.css'

import { useRoute } from 'vue-router'

import { useI18nHead } from '@/composables/useI18nHead'

const { t } = useTranslation()
const route = useRoute()

useHead({ title: computed(() => t('title.privacy')) })
useI18nHead()

const PrivacyPolicy = computed(() =>
  (route.params.lang as string).startsWith('zh')
    ? defineAsyncComponent(() => import('@/assets/PRIVACY_POLICY.md'))
    : defineAsyncComponent(() => import('@/assets/PRIVACY_POLICY_en.md')),
)
</script>

<template>
  <section class="md-container">
    <PrivacyPolicy />
  </section>
</template>
