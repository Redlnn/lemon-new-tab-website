import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { defineConfig } from 'vite'
import i18nextLoader from 'vite-plugin-i18next-loader'
import svgLoader from 'vite-svg-loader'

const elementPlusResolver = ElementPlusResolver({
  importStyle: 'sass',
})

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    tailwindcss(),
    i18nextLoader({
      paths: ['./locales'],
      namespaceResolution: 'basename',
    }),
    svgLoader(),
    Markdown({
      include: [/\.md$/],
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
      ],
      imports: ['vue'],
      resolvers: [elementPlusResolver],
      viteOptimizeDeps: true,
      dts: 'app/types/auto-imports.d.ts',
    }),
    Components({
      resolvers: [elementPlusResolver],
      dts: 'app/types/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./app', import.meta.url)),
    },
  },
  ssr: {
    noExternal: ['element-plus'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/element/index.scss" as *;`,
      },
    },
  },
})
