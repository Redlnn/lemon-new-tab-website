<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import { useTranslation } from 'i18next-vue'
import '@/assets/styles/github-markdown.css'

import { useRoute } from 'vue-router'

import { useI18nHead } from '@/composables/useI18nHead'

const { t } = useTranslation()
const route = useRoute()

useHead({
  title: computed(() => t('title.tos')),
  meta: computed(() => [
    { name: 'description', content: t('seo.tosDescription') },
    { name: 'robots', content: 'index,follow' },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: t('title.tos') },
    { property: 'og:description', content: t('seo.tosDescription') },
  ]),
})
useI18nHead()

const TOS = computed(() =>
  (route.params.lang as string).startsWith('zh')
    ? defineAsyncComponent(() => import('@/assets/TERMS_OF_SERVICE.md'))
    : defineAsyncComponent(() => import('@/assets/TERMS_OF_SERVICE_en.md')),
)
</script>

<template>
  <main class="legal-page">
    <section class="md-container markdown-body">
      <TOS />
    </section>
  </main>
</template>
