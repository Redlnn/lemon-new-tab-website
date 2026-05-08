import { useNProgress } from '@vueuse/integrations/useNProgress'

import i18next from 'i18next'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/index.vue'),
      meta: {
        titleKey: 'title.index',
      },
    },
    {
      path: '/tos',
      component: () => import('@/pages/tos.vue'),
      meta: {
        titleKey: 'title.tos',
      },
    },
    {
      path: '/privacy',
      component: () => import('@/pages/policy.vue'),
      meta: {
        titleKey: 'title.privacy',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/pages/all.vue'),
      meta: {
        titleKey: 'title.notfound',
      },
    },
  ],
})
const { start, done } = useNProgress()

router.beforeEach(() => {
  start()
})

router.onError(() => {
  done()
})

router.afterEach((to) => {
  const key = to.meta.titleKey as string | undefined

  if (key) {
    document.title = i18next.t(key)
  } else {
    document.title = i18next.t('title.index')
  }
  done()
})

export default router
