<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { Chrome, Edge, FirefoxBrowser, Github } from '@vicons/fa'
import { CaretDown24Filled } from '@vicons/fluent'
import { useTranslation } from 'i18next-vue'

import ClientOnly from '@/components/ClientOnly.vue'
import { useI18nHead } from '@/composables/useI18nHead'
import { useScrollMotion } from '@/composables/useScrollMotion'

const { t } = useTranslation()

useHead({ title: computed(() => t('title.index')) })
useI18nHead()

const mainRef = useTemplateRef('mainRef')

useScrollMotion(mainRef, {
  selector: '.fade-up',
})

const storeUrlMap = {
  chrome: 'https://chromewebstore.google.com/detail/bhbpmpflnpnkjanfgbjjhldccbckjohb',
  edge: 'https://microsoftedge.microsoft.com/addons/detail/keikkgfgidagjlicckkangkfgnbdjdnh',
  firefox: 'https://addons.mozilla.org/firefox/addon/lemon-new-tab/',
  github: 'https://github.com/Redlnn/lemon-new-tab-page/releases/latest',
} as const

type StoreBrowser = keyof typeof storeUrlMap // "chrome" | "edge" | "firefox" | "github"

function detectBrowser() {
  const ua = navigator.userAgent.toLowerCase()

  // iOS
  if (
    /ipad|iphone|ipod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  ) {
    return 'iOS'
  }

  // Harmony
  if (/OpenHarmony/i.test(ua)) {
    return 'HarmonyOS Next'
  }

  // Android
  if (/Android/.test(ua)) {
    return 'Android'
  }

  // Firefox 先判断（它不属于 chromium）
  if (ua.includes('firefox')) return 'firefox'

  // Chromium 系（现代方式）
  if (navigator.userAgentData?.brands) {
    const brands = navigator.userAgentData.brands.map((b) => b.brand.toLowerCase())

    if (brands.some((b) => b.includes('edge'))) return 'edge'
    if (brands.some((b) => b.includes('chrome'))) return 'chrome'
    if (brands.some((b) => b.includes('chromium'))) return 'chromium'
  }

  // 回退 UA 方案
  if (ua.includes('edg/')) return 'edge'
  if (ua.includes('chrome/')) return 'chrome'

  return 'other'
}

function installAuto() {
  const browser = detectBrowser()
  console.log(browser)
  if (['iOS', 'Android', 'HarmonyOS Next'].includes(browser)) {
    ElMessageBox.confirm(t('index.mobileWarning'), t('index.mobileWarningTitle'), {
      type: 'warning',
    }).then(() => install('github'))
    return
  }
  install(browser as StoreBrowser)
}

function install(browser: StoreBrowser) {
  const url = storeUrlMap[browser] ?? storeUrlMap.chrome
  window.open(url, '_blank')
}

function scrollToTop() {
  window.scrollTo(0, 0)
}
</script>

<template>
  <main ref="mainRef" class="landing">
    <section class="section section-full gradient-hero">
      <div class="container hero fade-up">
        <h2 class="hero-title">
          <span class="name">{{ t('index.heroName') }}</span>
          <span>{{ t('index.heroTagline') }}</span>
        </h2>
        <h2 class="hero-title">
          <i18next :translation="t('index.heroTitle')">
            <template #br><br /></template>
          </i18next>
        </h2>
        <p class="hero-subtitle">
          <i18next :translation="t('index.heroSubtitle')">
            <template #br><br /></template>
          </i18next>
        </p>
        <client-only>
          <el-dropdown size="large" type="primary" class="hero-btn" popper-class="hero-btn-popper">
            <el-button round size="large" type="primary" dark class="btn" @click="installAuto">
              {{ t('index.installBtn') }}
              <el-icon class="el-icon--right"><caret-down24-filled /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <a
                    :href="storeUrlMap.chrome"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="store-link"
                  >
                    <el-icon><Chrome /></el-icon>
                    Chrome
                  </a>
                </el-dropdown-item>
                <el-dropdown-item>
                  <a
                    :href="storeUrlMap.edge"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="store-link"
                  >
                    <el-icon><Edge /></el-icon>
                    Microsoft Edge
                  </a>
                </el-dropdown-item>
                <el-dropdown-item>
                  <a
                    :href="storeUrlMap.firefox"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="store-link"
                  >
                    <el-icon><FirefoxBrowser /></el-icon>
                    Firefox
                  </a>
                </el-dropdown-item>
                <el-dropdown-item>
                  <a
                    :href="storeUrlMap.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="store-link"
                  >
                    <el-icon><Github /></el-icon>
                    GitHub
                  </a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <template #placeholder>
            <a
              :href="storeUrlMap.chrome"
              target="_blank"
              rel="noopener noreferrer"
              class="el-button el-button--primary el-button--large is-round btn hero-btn"
            >
              {{ t('index.installBtn') }}
            </a>
          </template>
        </client-only>
        <div class="hero-compatibility">Chrome / Edge 116+ | Firefox 128+</div>
      </div>
    </section>

    <!-- 屏 1 — 速度 -->
    <section class="section section-light">
      <div class="container grid-2 fade-up">
        <div>
          <h3 class="section-title">{{ t('index.speed.title') }}</h3>
          <p class="section-text">{{ t('index.speed.text') }}</p>
        </div>
        <img src="/1.webp" class="media-card" :alt="t('index.speed.title')" />
      </div>
    </section>

    <!-- 屏 2 — 最常访问 -->
    <section class="section section-dark">
      <div class="container grid-2 fade-up">
        <img src="/2.webp" class="media-card" :alt="t('index.favorites.title')" />
        <div>
          <h3 class="section-title">{{ t('index.favorites.title') }}</h3>
          <p class="section-text">{{ t('index.favorites.text') }}</p>
        </div>
      </div>
    </section>

    <!-- 屏 3 — 壁纸能力 -->
    <section class="section gradient-soft">
      <div class="container center narrow fade-up">
        <h3 class="section-title">{{ t('index.themes.title') }}</h3>
        <p class="section-text">{{ t('index.themes.text') }}</p>
        <img src="/3.webp" class="media-card large" :alt="t('index.themes.title')" />
      </div>
    </section>

    <!-- 屏 4 — 动态主题（莫奈取色） -->
    <section class="section section-light">
      <div class="container grid-2 fade-up">
        <div>
          <h3 class="section-title">{{ t('index.monet.title') }}</h3>
          <p class="section-text">
            <i18next :translation="t('index.monet.text')">
              <template #sup1><sup>1</sup></template>
              <template #sup2><sup>2</sup></template>
            </i18next>
          </p>
        </div>
        <img src="/4.webp" class="media-card" :alt="t('index.monet.title')" />
        <div class="session-note">
          <ol>
            <li>{{ t('index.monet.note1') }}</li>
            <li>{{ t('index.monet.note2') }}</li>
          </ol>
        </div>
      </div>
    </section>

    <!-- 屏 5 — 国际化 -->
    <section class="section section-muted">
      <div class="container center narrow fade-up">
        <h3 class="section-title">{{ t('index.i18n.title') }}</h3>
        <p class="section-text">
          <i18next :translation="t('index.i18n.text')">
            <template #br><br /></template>
          </i18next>
        </p>
      </div>
    </section>

    <!-- 结尾 CTA -->
    <section class="section section-dark center">
      <div class="fade-up">
        <h3 class="section-title">{{ t('index.ctaTitle') }}</h3>
        <el-button round size="large" type="primary" dark class="btn" @click="scrollToTop">
          {{ t('index.installBtn') }}
        </el-button>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
.landing {
  --bg: var(--el-bg-color);
  --bg-soft: var(--el-bg-color-page);
  --bg-dark: var(--el-color-black);

  html.dark & {
    --bg: var(--el-bg-color-page);
    --bg-soft: var(--el-bg-color);
  }
}

/* 动画 */
.fade-up {
  opacity: 0;
  transition: none;
  transform: translateY(0);
}

.fade-up.from-bottom {
  transform: translateY(20px);
}

.fade-up.from-top {
  transform: translateY(-20px);
}

.fade-up.show {
  opacity: 1;
  transform: translateY(0);
  transition:
    transform 0.8s ease,
    opacity 0.8s ease;
}

/* Layout */
.section {
  padding: 150px 10dvw;

  &.center {
    text-align: center;
  }
}

.section-full {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 1100px;
  margin: 0 auto;

  &.center {
    text-align: center;
  }
}

.grid-2 {
  display: grid;
  gap: 30px 48px;
  align-items: center;

  @media (width >= 800px) {
    & {
      grid-template-columns: 1fr 1fr;
    }
  }
}

.hero {
  text-align: center;
}

.hero-title {
  font-size: clamp(48px, 5vw, 64px);
  font-weight: 700;
  margin-bottom: 24px;
  line-height: 1.2em;

  .name {
    color: var(--el-color-primary);
    letter-spacing: initial;
  }
}

.hero-subtitle {
  font-size: 20px;
  color: var(--el-text-color-regular);
  margin-bottom: 40px;
}

.hero-compatibility {
  margin-top: 1em;
  color: var(--el-text-color-placeholder);
  font-size: var(--el-font-size-extra-small);
}

.section-title {
  font-size: clamp(36px, 4vw, 48px);
  font-weight: bolder;
  margin-bottom: 8px;

  &.xl {
    font-size: 56px;
    line-height: 1.25;
    margin-bottom: 30px;
  }
}

.section-text {
  font-size: 17px;
  line-height: 1.7;
  color: var(--el-text-color-regular);

  .section-dark & {
    color: var(--el-text-color-secondary);
  }

  .container:not(.grid-2) & {
    margin-bottom: 30px;
  }
}

.session-note {
  height: 0;

  li {
    font-size: var(--el-font-size-extra-small);
    color: var(--el-text-color-regular);
  }
}

.section-light {
  background: var(--bg);
}

.section-dark {
  background: var(--bg-dark);
  color: var(--el-bg-color);

  html.dark & {
    color: inherit;
  }
}

.section-muted {
  background: var(--bg-soft);
}

.gradient-hero {
  background: linear-gradient(to bottom, var(--el-color-primary-light-8), var(--el-bg-color));

  html.dark & {
    background: linear-gradient(
      to bottom,
      var(--el-color-primary-light-9),
      var(--el-bg-color-page)
    );
  }
}

.gradient-soft {
  background: linear-gradient(to bottom, var(--bg-soft), var(--bg));
}

.hero-btn {
  .btn.el-button--large.is-round {
    padding: 0 14px 0 30px;
  }

  .el-icon--right {
    margin-left: 10px;
  }

  &.el-dropdown .el-dropdown__caret-button {
    width: 40px;
    padding: 0 20px;

    &::before {
      display: none;
    }
  }
}

.hero-btn-popper.el-popper {
  --el-popper-border-radius: 15px;
  --el-dropdown-menuItem-hover-color: var(--el-color-primary);
  padding: 5px;

  .el-dropdown-menu {
    padding: 0;
  }

  .el-dropdown-menu__item {
    padding: 0;
    border-radius: 10px;
  }

  .store-link {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 16px;
    color: inherit;
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;
  }
}

.btn.el-button--large.is-round {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
  height: 50px;
  padding: 0 30px;
  border-radius: 25px;
  color: var(--el-color-black);
  transition:
    transform var(--el-transition-duration-fast) ease,
    background-color var(--el-transition-duration) ease;
  box-shadow: var(--el-box-shadow-light);

  &:hover {
    transform: scale(1.05);
  }
}

.media-card {
  border-radius: 16px;
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  max-width: 100%;
  margin: auto;

  .large {
    height: 400px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
