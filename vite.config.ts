import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { defineConfig, type Plugin } from 'vite'
import i18nextLoader from 'vite-plugin-i18next-loader'
import type { ViteSSGOptions } from 'vite-ssg'
import svgLoader from 'vite-svg-loader'

declare module 'vite' {
  interface UserConfig {
    ssgOptions?: Partial<ViteSSGOptions>
  }
}

const elementPlusResolver = ElementPlusResolver({
  importStyle: 'sass',
})

// 站点域名，可通过环境变量 VITE_HOSTNAME 覆盖
const hostname = process.env.VITE_HOSTNAME || 'https://lemon.redlnn.top'

const routes = ['/zh-CN/', '/zh-CN/tos', '/zh-CN/privacy', '/en/', '/en/tos', '/en/privacy']

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function seoFilesPlugin(): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      const lastmod = new Date().toISOString()
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${escapeXml(`${hostname}${route}`)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: sitemap,
      })

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *
Allow: /

Sitemap: ${hostname}/sitemap.xml
`,
      })
    },
  }
}

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
    seoFilesPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./app', import.meta.url)),
    },
  },
  ssgOptions: {
    // 明确列出所有要生成的页面路径（避免 /:lang(...) 正则路由被当作字面路径处理）
    includedRoutes: () => ['/', ...routes],
    // i18next 是单例，并发渲染会导致多页面语言冲突，必须串行
    concurrency: 1,
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
