<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useTranslation } from 'i18next-vue'
import { A11y, Keyboard, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useRoute } from 'vue-router'
import 'swiper/css'
import 'swiper/css/navigation'

import { useI18nHead } from '@/composables/useI18nHead'

const route = useRoute()
const currentLang = computed(() => route.params.lang as 'zh-CN' | 'en')
const { t } = useTranslation()
const swiperModules = [Navigation, Keyboard, A11y]

interface HomeFeature {
  title: string
  text: string
}

interface HomeScreenshot {
  label: string
  src: string
}

const homeFeatureRows = computed(
  () => t('home.featureRows', { returnObjects: true }) as HomeFeature[],
)
const homeScreenshots = computed(
  () => t('home.screenshots', { returnObjects: true }) as HomeScreenshot[],
)

const storeLinks = [
  {
    key: 'chrome',
    label: 'Chrome Web Store',
    href: 'https://chromewebstore.google.com/detail/bhbpmpflnpnkjanfgbjjhldccbckjohb',
  },
  {
    key: 'edge',
    label: 'Microsoft Edge Add-ons',
    href: 'https://microsoftedge.microsoft.com/addons/detail/keikkgfgidagjlicckkangkfgnbdjdnh',
  },
  {
    key: 'firefox',
    label: 'Firefox Add-ons',
    href: 'https://addons.mozilla.org/firefox/addon/lemon-new-tab/',
  },
  {
    key: 'github',
    label: 'GitHub Releases',
    href: 'https://github.com/Redlnn/lemon-new-tab-page/releases/latest',
  },
] as const

const jsonLd = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Lemon New Tab',
    alternateName: '柠檬起始页',
    applicationCategory: 'BrowserApplication',
    operatingSystem: 'Chrome, Microsoft Edge, Firefox',
    description: t('home.description'),
    url: `https://lemon.redlnn.top/${currentLang.value}/`,
    softwareHelp: `https://lemon.redlnn.top/${currentLang.value}/privacy`,
    license: 'https://www.gnu.org/licenses/agpl-3.0.html',
    codeRepository: 'https://github.com/Redlnn/lemon-new-tab-page',
  }),
)

useHead({
  title: computed(() => t('title.index')),
  meta: computed(() => [
    { name: 'description', content: t('home.description') },
    { name: 'robots', content: 'index,follow,max-image-preview:large' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: t('title.index') },
    { property: 'og:description', content: t('home.description') },
    { property: 'og:image', content: 'https://lemon.redlnn.top/preview-home.webp' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ]),
  script: computed(() => [
    {
      type: 'application/ld+json',
      innerHTML: jsonLd.value,
    },
  ]),
})
useI18nHead()
</script>

<template>
  <main class="home">
    <section class="hero">
      <div class="hero__copy">
        <h1>{{ t('home.title') }}</h1>
        <p class="hero__lead">{{ t('home.lead') }}</p>
        <p class="hero__intro">{{ t('home.intro') }}</p>
        <div class="hero__actions">
          <a class="button button--primary" href="#install">{{ t('home.primaryCta') }}</a>
          <a
            class="button button--ghost"
            href="https://github.com/Redlnn/lemon-new-tab-page"
            target="_blank"
            rel="noreferrer"
          >
            {{ t('home.secondaryCta') }}
          </a>
        </div>
        <p class="hero__support">{{ t('home.support') }}</p>
      </div>

      <figure class="product-preview">
        <img src="/preview-home.webp" :alt="t('home.previewAlt')" />
      </figure>
    </section>

    <section id="features" class="section features" aria-labelledby="features-title">
      <div class="section__heading">
        <h2 id="features-title">{{ t('home.featuresTitle') }}</h2>
        <p>{{ t('home.featuresIntro') }}</p>
      </div>
      <div class="feature-list">
        <article
          v-for="(feature, index) in homeFeatureRows"
          :key="feature.title"
          class="feature-row"
        >
          <span class="feature-row__index">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.text }}</p>
        </article>
      </div>
    </section>

    <section class="section screenshots" aria-labelledby="screenshots-title">
      <div class="section__heading section__heading--compact">
        <h2 id="screenshots-title">{{ t('home.screenshotsTitle') }}</h2>
      </div>
      <Swiper
        class="screenshot-carousel"
        :modules="swiperModules"
        :slides-per-view="'auto'"
        :space-between="32"
        :navigation="{
          prevEl: '.screenshot-carousel__prev',
          nextEl: '.screenshot-carousel__next',
        }"
        :watch-overflow="true"
        autoplay
        :a11y="{ enabled: true }"
      >
        <SwiperSlide
          v-for="screenshot in homeScreenshots"
          :key="screenshot.src"
          class="screenshot-slide"
        >
          <figure class="screenshot-item">
            <img :src="screenshot.src" :alt="screenshot.label" loading="lazy" />
            <figcaption>{{ screenshot.label }}</figcaption>
          </figure>
        </SwiperSlide>
        <button
          class="screenshot-carousel__nav screenshot-carousel__prev swiper-button-prev"
          type="button"
          :aria-label="t('home.previousScreenshot')"
        />
        <button
          class="screenshot-carousel__nav screenshot-carousel__next swiper-button-next"
          type="button"
          :aria-label="t('home.nextScreenshot')"
        />
      </Swiper>
    </section>

    <section class="section privacy-note" aria-labelledby="privacy-title">
      <div>
        <h2 id="privacy-title">{{ t('home.privacyTitle') }}</h2>
        <p>{{ t('home.privacyText') }}</p>
      </div>
      <div class="privacy-note__links">
        <RouterLink class="text-link" :to="`/${currentLang}/privacy`">
          {{ t('home.privacyLink') }}
        </RouterLink>
        <RouterLink class="text-link" :to="`/${currentLang}/tos`">
          {{ t('home.termsLink') }}
        </RouterLink>
      </div>
    </section>

    <section id="install" class="section install" aria-labelledby="install-title">
      <div class="section__heading">
        <h2 id="install-title">{{ t('home.installTitle') }}</h2>
        <p>{{ t('home.installText') }}</p>
      </div>
      <div class="store-list">
        <a
          v-for="item in storeLinks"
          :key="item.key"
          :href="item.href"
          target="_blank"
          rel="noreferrer"
          class="store-link"
        >
          <span>{{ item.label }}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17 17 7m0 0H8m9 0v9" />
          </svg>
        </a>
      </div>
    </section>

    <footer class="site-footer">
      <span>{{ t('home.footerNote') }}</span>
      <div>
        <RouterLink :to="`/${currentLang}/privacy`">{{ t('home.privacyLink') }}</RouterLink>
        <RouterLink :to="`/${currentLang}/tos`">{{ t('home.termsLink') }}</RouterLink>
        <a href="https://github.com/Redlnn/lemon-new-tab-page" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.home {
  overflow: clip;
}

.hero,
.section,
.site-footer {
  width: min(calc(100% - var(--page-inline) * 2), var(--content-width));
  margin: 0 auto;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 0.7fr) minmax(540px, 1.3fr);
  gap: clamp(36px, 4.5vw, 84px);
  align-items: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 118px 0 76px;
}

.hero__copy {
  max-width: 550px;
}

.hero h1 {
  margin: 0;
  font-size: clamp(42px, 5.5vw, 68px);
  font-weight: 720;
  line-height: 1.04;
}

.hero__lead {
  margin: 28px 0 0;
  font-size: clamp(22px, 2.35vw, 30px);
  font-weight: 610;
  line-height: 1.24;
}

.hero__intro {
  max-width: 520px;
  margin: 18px 0 0;
  font-size: 17px;
  line-height: 1.75;
  color: var(--color-text-muted);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  font-size: 14px;
  font-weight: 650;
  text-decoration: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition:
    transform 160ms ease,
    background-color 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.button:hover {
  transform: translateY(-1px);
}

.button--primary {
  color: #171713;
  background: var(--color-accent);
  border-color: color-mix(in srgb, var(--color-accent-strong) 34%, transparent);
  box-shadow: 0 10px 26px rgb(245 184 0 / 0.22);
}

.button--ghost {
  background: color-mix(in srgb, var(--color-surface) 80%, transparent);
}

.button--ghost:hover {
  background: var(--color-bg-soft);
  border-color: var(--color-border-strong);
}

.hero__support {
  margin: 18px 0 0;
  font-size: 13px;
  color: var(--color-text-soft);
}

.product-preview {
  align-self: stretch;
  display: flex;
  align-items: center;
  margin: 0;
}

.product-preview img,
.screenshot-item img {
  display: block;
  width: 100%;
  height: auto;
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
}

.product-preview img {
  height: auto;
  max-height: min(68dvh, 680px);
  object-fit: cover;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lift);
}

.section {
  padding: 96px 0;
  border-top: 1px solid var(--color-border);
}

.section__heading {
  display: grid;
  grid-template-columns: minmax(0, 0.75fr) minmax(320px, 1fr);
  gap: 42px;
  align-items: end;
  margin-bottom: 38px;
}

.section__heading--compact {
  display: block;
  max-width: 620px;
}

.section h2 {
  margin: 0;
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 700;
  line-height: 1.08;
}

.section__heading p,
.privacy-note p,
.site-footer {
  color: var(--color-text-muted);
}

.section__heading p,
.privacy-note p {
  margin: 0;
  font-size: 16px;
  line-height: 1.75;
}

.features .section__heading,
.install .section__heading {
  grid-template-columns: minmax(360px, 0.9fr) minmax(360px, 1fr);
  align-items: start;
}

.features .section__heading p,
.install .section__heading p {
  justify-self: end;
  max-width: 720px;
  text-align: right;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.feature-row {
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 16px;
  min-height: 238px;
  padding: 22px;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.feature-row:hover {
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-card);
  transform: translateY(-2px);
}

.feature-row__index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 28px;
  font-size: 12px;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  color: color-mix(in srgb, var(--color-text) 82%, var(--color-accent));
  background: color-mix(in srgb, var(--color-accent) 18%, transparent);
  border-radius: var(--radius-sm);
}

.feature-row h3 {
  margin: 0;
  font-size: 17px;
  font-weight: 680;
}

.feature-row p {
  margin: 0;
  line-height: 1.7;
  color: var(--color-text-muted);
}

.screenshot-carousel {
  --swiper-theme-color: var(--color-text);
  --swiper-navigation-size: 40px;

  overflow: visible;
}

.screenshot-slide {
  width: min(600px, 38%);
}

.screenshot-item {
  position: relative;
  margin: 0;
}

.screenshot-item img {
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: var(--radius-md);
}

.screenshot-item figcaption {
  text-align: center;
  margin-top: 10px;
  font-size: 13px;
  color: var(--color-text-muted);
  vertical-align: middle;
}

.screenshot-carousel :deep(.swiper-button-prev),
.screenshot-carousel :deep(.swiper-button-next) {
  width: var(--swiper-navigation-size);
  height: var(--swiper-navigation-size);
  color: var(--color-text);
  background: color-mix(in srgb, var(--color-surface) 88%, transparent);
  border-radius: 50%;
  box-shadow: var(--shadow-card);
  padding: 10px;
}

.screenshot-carousel :deep(.swiper-button-disabled) {
  opacity: 0;
}

.privacy-note {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 32px;
  align-items: center;
  padding: 46px;
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.privacy-note h2 {
  margin-bottom: 14px;
  font-size: clamp(24px, 3vw, 36px);
}

.privacy-note__links {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.text-link {
  font-size: 14px;
  font-weight: 650;
  color: var(--color-text);
  text-decoration-color: color-mix(in srgb, var(--color-accent) 60%, transparent);
  text-decoration-thickness: 2px;
  text-underline-offset: 5px;
}

.store-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.store-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 88px;
  padding: 22px;
  font-size: 14px;
  font-weight: 650;
  text-decoration: none;
  border-right: 1px solid var(--color-border);
  transition:
    background-color 160ms ease,
    color 160ms ease;
}

.store-link:last-child {
  border-right: 0;
}

.store-link:hover {
  background: var(--color-bg-soft);
}

.store-link svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.site-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 42px 0 56px;
  font-size: 13px;
  border-top: 1px solid var(--color-border);
}

.site-footer div {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.site-footer a {
  color: inherit;
  text-decoration: none;
}

.site-footer a:hover {
  color: var(--color-text);
}

@media (width <= 980px) {
  .hero {
    grid-template-columns: 1fr;
    min-height: auto;
    padding-top: 116px;
    padding-bottom: 64px;
  }

  .hero__copy {
    max-width: 720px;
  }

  .product-preview {
    min-height: auto;
  }

  .product-preview img {
    height: clamp(280px, 42vh, 440px);
    max-height: none;
    object-fit: cover;
  }

  .section__heading,
  .privacy-note {
    grid-template-columns: 1fr;
  }

  .features .section__heading,
  .install .section__heading {
    grid-template-columns: 1fr;
  }

  .features .section__heading p,
  .install .section__heading p {
    justify-self: start;
    margin-top: 0;
    text-align: left;
  }

  .feature-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .store-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .store-link:nth-child(2n) {
    border-right: 0;
  }

  .store-link:nth-child(-n + 2) {
    border-bottom: 1px solid var(--color-border);
  }
}

@media (width <= 640px) {
  .hero,
  .section,
  .site-footer {
    width: min(calc(100% - 40px), var(--content-width));
  }

  .hero h1 {
    font-size: 46px;
  }

  .hero {
    gap: 28px;
  }

  .section {
    padding: 72px 0;
  }

  .feature-row {
    min-height: 0;
  }

  .feature-list,
  .store-list {
    grid-template-columns: 1fr;
  }

  .screenshot-carousel {
    padding-bottom: 38px;
  }

  .screenshot-slide {
    width: min(430px, 86%);
  }

  .screenshot-carousel :deep(.swiper-button-prev),
  .screenshot-carousel :deep(.swiper-button-next) {
    display: none;
  }

  .product-preview img {
    height: clamp(260px, 44vh, 380px);
  }

  .store-link,
  .store-link:nth-child(2n),
  .store-link:nth-child(-n + 2) {
    border-right: 0;
    border-bottom: 1px solid var(--color-border);
  }

  .store-link:last-child {
    border-bottom: 0;
  }

  .privacy-note {
    padding: 28px;
  }

  .site-footer {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>
