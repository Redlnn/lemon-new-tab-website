<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import { useTranslation } from 'i18next-vue'
import '@/assets/styles/github-markdown.css'

import { useRoute } from 'vue-router'

import { useI18nHead } from '@/composables/useI18nHead'

const { t } = useTranslation()
const route = useRoute()

useHead({
  title: computed(() => t('title.privacy')),
  meta: computed(() => [
    { name: 'description', content: t('seo.privacyDescription') },
    { name: 'robots', content: 'index,follow' },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: t('title.privacy') },
    { property: 'og:description', content: t('seo.privacyDescription') },
  ]),
})
useI18nHead()

const PrivacyPolicy = computed(() =>
  (route.params.lang as string).startsWith('zh')
    ? defineAsyncComponent(() => import('@/assets/PRIVACY_POLICY.md'))
    : defineAsyncComponent(() => import('@/assets/PRIVACY_POLICY_en.md')),
)
</script>

<template>
  <main class="legal-page">
    <section class="md-container markdown-body">
      <PrivacyPolicy />
    </section>
  </main>
</template>
