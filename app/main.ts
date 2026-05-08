import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus'
import { ViteSSG } from 'vite-ssg'

import App from './app.vue'
import { i18n, initI18n } from './composables/useI18n'
import { routes } from './routes'

import '@/assets/styles/index.scss'
import '@/assets/styles/tailwind.css'
import '@/assets/styles/nprogress.css'

export const createApp = ViteSSG(App, { routes }, async ({ app, router }) => {
  // Element Plus SSR 需要提供 ID 与 Z-Index 注入器
  app.provide(ID_INJECTION_KEY, { prefix: 1024, current: 0 })
  app.provide(ZINDEX_INJECTION_KEY, { current: 0 })

  i18n(app)

  // 根据 URL 的 lang 参数初始化/切换 i18next 语言
  // 注意：必须在 beforeEach 而非 setup 中初始化，确保 SSG 渲染前语言已正确设置
  router.beforeEach(async (to) => {
    const lang = (to.params.lang as string | undefined) ?? 'en'
    await initI18n(lang)
  })

  if (!import.meta.env.SSR) {
    const { useNProgress } = await import('@vueuse/integrations/useNProgress')
    const { start, done } = useNProgress()

    router.beforeEach(() => {
      start()
    })

    router.onError(() => {
      done()
    })

    router.afterEach(() => {
      done()
    })
  }
})
