import type { App } from 'vue'

import i18next, { type InitOptions } from 'i18next'
import I18NextVue from 'i18next-vue'
import resources from 'virtual:i18next-loader'

export const getLang = () => i18next.language

function changeDocument() {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = i18next.language
  }
}

const i18nOptions: InitOptions = {
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
}

export async function initI18n(lang: string = 'en') {
  if (i18next.isInitialized) {
    if (lang !== i18next.language) {
      await i18next.changeLanguage(lang)
    }
    changeDocument()
    return
  }

  await i18next.init({ ...i18nOptions, lng: lang })

  changeDocument()

  i18next.off('languageChanged')
  i18next.on('languageChanged', changeDocument)
}

export function i18n<T extends App>(app: T) {
  app.use(I18NextVue, { i18next })
  return app
}
