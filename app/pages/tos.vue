<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import { useTranslation } from 'i18next-vue'
import '@/assets/styles/github-markdown.css'

import { useRoute } from 'vue-router'

import { useI18nHead } from '@/composables/useI18nHead'

const { t } = useTranslation()
const route = useRoute()

useHead({ title: computed(() => t('title.tos')) })
useI18nHead()

const TOS = computed(() =>
  (route.params.lang as string).startsWith('zh')
    ? defineAsyncComponent(() => import('@/assets/TERMS_OF_SERVICE.md'))
    : defineAsyncComponent(() => import('@/assets/TERMS_OF_SERVICE_en.md')),
)
</script>

<template>
  <section class="md-container">
    <TOS />
  </section>
</template>
