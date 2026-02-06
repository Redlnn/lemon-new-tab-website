// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: true,

  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ],

  devtools: {
    enabled: false
  },

  app: {
    head: {
      title: '柠檬起始页',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: '一个真正「好看且开源」的浏览器起始页'
        }
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }]
    }
  },

  // css
  css: ['~/assets/scss/index.scss'],

  // vueuse
  vueuse: {
    ssrHandlers: true
  },

  // colorMode
  colorMode: {
    classSuffix: ''
  },

  future: {
    compatibilityVersion: 4
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: true,
    renderJsonPayloads: true,
    typedPages: true,
    viewTransition: true
  },

  compatibilityDate: 'latest',

  nitro: {
    prerender: {
      autoSubfolderIndex: false
    },
    esbuild: {
      options: {
        target: 'esnext'
      }
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/element/index.scss" as element;`
        }
      }
    }
  },

  elementPlus: {
    icon: 'el-icon',
    importStyle: 'scss',
    themes: ['dark'],
    defaultLocale: 'zh-cn'
  },

  tailwindcss: {
    config: {
      theme: {
        fontFamily: {
          sans: []
        }
      }
    }
  }
})
