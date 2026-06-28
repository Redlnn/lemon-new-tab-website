<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useRouter } from 'vue-router'

import { SUPPORTED_LANGS } from '@/routes'

const router = useRouter()
const FALLBACK_LANG = 'en'

function detectLang(): string {
  if (typeof navigator === 'undefined') return FALLBACK_LANG

  const langs = [...(navigator.languages?.length ? navigator.languages : [navigator.language])]

  for (const lang of langs) {
    const lower = lang.toLowerCase()
    if (lower.startsWith('zh')) return 'zh-CN'
  }

  return FALLBACK_LANG
}

useHead({
  meta: [
    { name: 'robots', content: 'noindex,follow' },
  ],
  link: SUPPORTED_LANGS.map((lang) => ({
    rel: 'alternate',
    hreflang: lang,
    href: `/${lang}/`,
  })).concat({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `/${FALLBACK_LANG}/`,
  }),
})

onMounted(() => {
  router.replace(`/${detectLang()}/`)
})
</script>

<template>
  <div></div>
  <!-- Redirecting to language-specific page... -->
</template>
