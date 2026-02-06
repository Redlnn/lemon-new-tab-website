<script setup lang="ts">
import { Chrome, Edge, FirefoxBrowser, Github } from '@vicons/fa'
import { CaretDown24Filled } from '@vicons/fluent'

const mainRef = useTemplateRef('mainRef')

useScrollMotion(mainRef, {
  selector: '.fade-up'
})

const storeUrlMap = {
  chrome: 'https://chromewebstore.google.com/detail/bhbpmpflnpnkjanfgbjjhldccbckjohb',
  edge: 'https://microsoftedge.microsoft.com/addons/detail/keikkgfgidagjlicckkangkfgnbdjdnh',
  firefox: 'https://addons.mozilla.org/firefox/addon/lemon-new-tab/',
  github: 'https://github.com/Redlnn/lemon-new-tab-page/releases/latest'
} as const

type StoreBrowser = keyof typeof storeUrlMap // "chrome" | "edge" | "firefox" | "github"

function detectBrowser() {
  const ua = navigator.userAgent.toLowerCase()

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
  install(browser as StoreBrowser)
}

function install(browser: StoreBrowser) {
  const url = storeUrlMap[browser] ?? storeUrlMap.chrome
  window.open(url, '_black')
}
</script>

<template>
  <main ref="mainRef" class="landing">
    <section class="section section-full gradient-hero">
      <div class="container hero fade-up">
        <h2 class="hero-title">
          <span class="name">柠檬</span>
          <span>起始页</span>
        </h2>
        <h2 class="hero-title">重新定义你的<br />新标签页</h2>
        <p class="hero-subtitle">
          极简 · 开源 · 可定制
          <br />
          一个真正「好看且开源」的浏览器起始页
        </p>
        <el-dropdown size="large" type="primary" class="hero-btn" popper-class="hero-btn-popper">
          <el-button round size="large" type="primary" dark class="btn" @click="installAuto">
            立即安装
            <el-icon class="el-icon--right"><CaretDown24Filled /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="install('chrome')">
                <el-icon><Chrome /></el-icon>
                Chrome
              </el-dropdown-item>
              <el-dropdown-item @click="install('edge')">
                <el-icon><Edge /></el-icon>
                Microsoft Edge
              </el-dropdown-item>
              <el-dropdown-item @click="install('firefox')">
                <el-icon><FirefoxBrowser /></el-icon>
                Firefox
              </el-dropdown-item>
              <el-dropdown-item @click="install('firefox')">
                <el-icon><Github /></el-icon>
                GitHub
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <p class="hero-compatibility">Chrome / Edge 116+ | Firefox 128+</p>
      </div>
    </section>

    <!-- 屏 1 — 速度 -->
    <section class="section section-light">
      <div class="container grid-2 fade-up">
        <div>
          <h3 class="section-title">快到不像话</h3>
          <p class="section-text">
            绝大部分功能纯本地+缓存，无过多网络负担。打开新标签页，秒速呈现。
          </p>
        </div>
        <NuxtImg src="/1.webp" class="media-card" />
      </div>
    </section>

    <!-- 屏 2 — 最常访问 -->
    <section class="section section-dark">
      <div class="container grid-2 fade-up">
        <NuxtImg src="/2.webp" class="media-card" />
        <div>
          <h3 class="section-title">常用的，自然在眼前</h3>
          <p class="section-text">
            为你呈现最常访问网站，添加个人常用链接，让每一次开始都更高效、更从容。
          </p>
        </div>
      </div>
    </section>

    <!-- 屏 3 — 壁纸能力 -->
    <section class="section gradient-soft">
      <div class="container center narrow fade-up">
        <h3 class="section-title">不止一种样子</h3>
        <p class="section-text">
          根据你的偏好调整布局与视觉风格，让界面以更自然的方式融入你的浏览节奏。
        </p>
        <NuxtImg src="/3.webp" class="media-card large" />
      </div>
    </section>

    <!-- 屏 4 — 动态主题（莫奈取色） -->
    <section class="section section-light">
      <div class="container grid-2 fade-up">
        <div>
          <h3 class="section-title">界面，会呼吸</h3>
          <p class="section-text">
            基于壁纸的莫奈动态取色系统<sup>1</sup>。每一次打开，都是全新的氛围<sup>2</sup>。
          </p>
        </div>
        <NuxtImg src="/4.webp" class="media-card" />
        <div class="session-note">
          <ol>
            <li>注1：不支持视频壁纸及纯色背景</li>
            <li>注2：只有使用在线 API 时才会每次打开跟随壁纸切换而改变主题色</li>
          </ol>
        </div>
      </div>
    </section>

    <!-- 屏 5 — 国际化 -->
    <section class="section section-muted">
      <div class="container center narrow fade-up">
        <h3 class="section-title">为不同语言而生</h3>
        <p class="section-text">
          支持简体中文 · 繁体中文（港台）· English
          <br />
          UI 用于为地区习惯优化，而非机械翻译
        </p>
      </div>
    </section>

    <!-- 结尾 CTA -->
    <section class="section section-dark center">
      <div class="fade-up">
        <h3 class="section-title xl">让新标签页，回归简洁</h3>
        <NuxtLink to="#">
          <ElButton round size="large" type="primary" dark class="btn"> 立即安装 </ElButton>
        </NuxtLink>
      </div>
    </section>

    <ElBacktop></ElBacktop>
  </main>
</template>

<style>
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
  transform: translateY(5px);
  transition:
    opacity var(--el-transition-duration-fast) ease,
    transform var(--el-transition-duration-fast) ease;
}

/* .hero-btn:hover + .hero-compatibility {
  opacity: 1;
  transform: translateY(0);
} */

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
    border-radius: 10px;
  }
}

.btn.el-button--large.is-round {
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
