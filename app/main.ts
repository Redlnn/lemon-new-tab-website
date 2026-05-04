import { createApp } from 'vue'

import App from './app.vue'
import { i18n, initI18n } from './composables/useI18n'
import '@/assets/styles/index.scss'
import '@/assets/styles/tailwind.css'
import '@/assets/styles/nprogress.css'

import router from './router'

void (async () => {
  await initI18n()

  const app = createApp(App)

  app.use(router)
  i18n(app)

  app.mount('body')
})()
