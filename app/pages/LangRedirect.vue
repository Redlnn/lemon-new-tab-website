<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useRouter } from 'vue-router'

import { DEFAULT_LANG, SUPPORTED_LANGS } from '@/routes'

const router = useRouter()

function detectLang(): string {
  if (typeof navigator === 'undefined') return DEFAULT_LANG

  const langs = [...(navigator.languages?.length ? navigator.languages : [navigator.language])]

  for (const lang of langs) {
    const lower = lang.toLowerCase()
    // zh-TW / zh-HK 不在支持列表内，跳过继续检测
    if (lower === 'zh-tw' || lower === 'zh-hk') continue
    if (lower.startsWith('zh')) return 'zh-CN'
    if (lower.startsWith('en')) return 'en'
  }

  return DEFAULT_LANG
}

// 静态 HTML 降级：meta refresh 重定向到默认语言
useHead({
  meta: [
    { name: 'robots', content: 'noindex,follow' },
    { 'http-equiv': 'refresh', content: `0; url=/${DEFAULT_LANG}/` },
  ],
  link: SUPPORTED_LANGS.map((lang) => ({
    rel: 'alternate',
    hreflang: lang,
    href: `/${lang}/`,
  })),
})

onMounted(() => {
  router.replace(`/${detectLang()}/`)
})
</script>

<template>
  <div></div>
  <!-- Redirecting to language-specific page... -->
</template>
