import type { RouteRecordRaw } from 'vue-router'

export const SUPPORTED_LANGS = ['zh-CN', 'en'] as const
export type SupportedLang = (typeof SUPPORTED_LANGS)[number]
export const DEFAULT_LANG: SupportedLang = 'zh-CN'

export const routes: RouteRecordRaw[] = [
  // Root: auto-detect browser language and redirect
  {
    path: '/',
    component: () => import('@/pages/LangRedirect.vue'),
  },
  // Language-prefixed routes
  {
    path: `/:lang(${SUPPORTED_LANGS.join('|')})`,
    children: [
      {
        path: '',
        component: () => import('@/pages/index.vue'),
      },
      {
        path: 'tos',
        component: () => import('@/pages/tos.vue'),
      },
      {
        path: 'privacy',
        component: () => import('@/pages/policy.vue'),
      },
    ],
  },
  // /zh/* → /zh-CN/*
  { path: '/zh', redirect: `/${DEFAULT_LANG}` },
  { path: '/zh/:rest(.*)', redirect: (to) => `/${DEFAULT_LANG}/${to.params.rest}` },
  // 404
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/all.vue'),
  },
]
