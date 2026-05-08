import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'

import { SUPPORTED_LANGS } from '@/routes'

const HOSTNAME = (import.meta.env.VITE_HOSTNAME as string | undefined) || 'https://lemon.redlnn.top'

/**
 * 为当前页面注入 hreflang alternate 和 canonical 链接，有利于多语言 SEO。
 * 需在 /:lang(zh-CN|en) 路由下的页面中调用。
 */
export function useI18nHead() {
  const route = useRoute()

  // 去掉 /:lang 前缀，得到页面路径（如 /tos 或 ''）
  const pagePath = computed(() => {
    const lang = route.params.lang as string
    return route.path.replace(`/${lang}`, '') // e.g. '' | '/tos' | '/privacy'
  })

  useHead({
    htmlAttrs: { lang: computed(() => route.params.lang as string) },
    link: computed(() => [
      { rel: 'canonical', href: `${HOSTNAME}${route.path}` },
      ...SUPPORTED_LANGS.map((lang) => ({
        rel: 'alternate',
        hreflang: lang,
        href: `${HOSTNAME}/${lang}${pagePath.value}`,
      })),
      {
        rel: 'alternate',
        hreflang: 'x-default',
        href: `${HOSTNAME}/${SUPPORTED_LANGS[0]}${pagePath.value}`,
      },
    ]),
  })
}
