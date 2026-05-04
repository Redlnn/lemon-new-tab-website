import type { App } from 'vue'

import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import I18NextVue from 'i18next-vue'
import resources from 'virtual:i18next-loader'

export const getLang = () => i18next.language

function changeDocument() {
  document.documentElement.lang = i18next.language
}

export async function initI18n() {
  // 检测用户语言
  // 参考: https://github.com/i18next/i18next-browser-languageDetector
  await i18next.use(LanguageDetector).init({
    resources,
    fallbackLng: {
      zh: ['zh-CN'],
      default: ['en'],
    },
    load: 'currentOnly',
    nonExplicitSupportedLngs: true,
    ns: ['foo'],
    defaultNS: 'foo',
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false,
    },
  })

  changeDocument()

  i18next.off('languageChanged') // 避免重复绑定事件
  i18next.on('languageChanged', changeDocument) // 同步 UI：当语言变化时，更新 <html lang> 与标题
}

export function i18n<T extends App>(app: T) {
  app.use(I18NextVue, { i18next })
  return app
}
