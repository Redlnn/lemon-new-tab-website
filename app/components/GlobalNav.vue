<script setup lang="ts">
import { useTranslation } from 'i18next-vue'
import { useRoute, useRouter } from 'vue-router'

import ThemeToggle from '@/components/ThemeToggle.vue'
import { DEFAULT_LANG, SUPPORTED_LANGS } from '@/routes'

const { t } = useTranslation()
const route = useRoute()
const router = useRouter()

const props = withDefaults(
  defineProps<{
    showBg?: boolean
  }>(),
  {
    showBg: false,
  },
)

const currentLang = computed(() => (route.params.lang as string) || DEFAULT_LANG)
const pagePath = computed(() => {
  const langPattern = SUPPORTED_LANGS.join('|')
  return route.path.replace(new RegExp(`^/(${langPattern})`), '') || '/'
})

function getLocalizedPath(lang: string) {
  if (pagePath.value === '/') return `/${lang}/`
  return `/${lang}${pagePath.value.replace(/\/$/, '')}`
}

async function switchLang() {
  const nextLang = currentLang.value === 'zh-CN' ? 'en' : 'zh-CN'
  await router.push(getLocalizedPath(nextLang))
}
</script>

<template>
  <header class="site-nav" :class="{ 'site-nav--visible': props.showBg }">
    <RouterLink :to="`/${currentLang}/`" class="site-nav__brand" aria-label="Lemon New Tab">
      <img src="/icon.svg" alt="" width="30" height="30" />
      <span>Lemon New Tab</span>
    </RouterLink>

    <nav class="site-nav__links" :aria-label="t('nav.primary')">
      <RouterLink :to="`/${currentLang}/privacy`">{{ t('privacy') }}</RouterLink>
      <RouterLink :to="`/${currentLang}/tos`">{{ t('tos') }}</RouterLink>
      <a href="https://github.com/Redlnn/lemon-new-tab-page" target="_blank" rel="noreferrer">
        GitHub
      </a>
      <button
        class="site-nav__icon-btn"
        type="button"
        :aria-label="t('nav.switchLang')"
        @click="switchLang"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 5h8M8 3v2m1.5 0c-.8 3-2.7 5.5-5.5 7.1m2.6-4.5c1.1 1.8 2.8 3.3 5.1 4.4M14 19l4-9 4 9m-6.6-3h5.2"
          />
        </svg>
      </button>
      <ThemeToggle />
    </nav>
  </header>
</template>

<style scoped>
.site-nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: 68px;
  padding: 0 var(--page-inline);
  color: var(--color-text);
  border-bottom: 1px solid transparent;
  transition:
    background-color 180ms ease,
    border-color 180ms ease,
    backdrop-filter 180ms ease;
}

.site-nav--visible {
  background: color-mix(in srgb, var(--color-bg) 86%, transparent);
  border-bottom-color: var(--color-border);
  backdrop-filter: blur(18px);
}

.site-nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  font-size: 14px;
  font-weight: 650;
  color: inherit;
  text-decoration: none;
}

.site-nav__brand img {
  display: block;
  flex: 0 0 auto;
}

.site-nav__links {
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: 13px;
  color: var(--color-text-muted);
}

.site-nav__links a {
  color: inherit;
  text-decoration: none;
  transition: color 160ms ease;
}

.site-nav__links a:hover {
  color: var(--color-text);
}

.site-nav__icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  color: var(--color-text-muted);
  cursor: pointer;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  transition:
    color 160ms ease,
    background-color 160ms ease,
    border-color 160ms ease;
}

.site-nav__icon-btn:hover {
  color: var(--color-text);
  background: var(--color-bg-soft);
  border-color: var(--color-border);
}

.site-nav__icon-btn svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

@media (width <= 760px) {
  .site-nav {
    height: 62px;
    gap: 12px;
  }

  .site-nav__brand span {
    display: none;
  }

  .site-nav__links {
    gap: 10px;
    font-size: 12px;
  }
}
</style>
