import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    ElementPlus({})
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // 多页面（MPA）：
  //  Vite 会把 HTML 输出到 dist/ 下、与源 HTML 相对项目根的路径一致的位置。
  //  因此 HTML 物理放在哪，dist 就落在哪：
  //    *.html（根）            → dist/*.html
  //    projects/index.html     → dist/projects/index.html
  //    members/index.html      → dist/members/index.html
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./index.html', import.meta.url)),
        member: fileURLToPath(new URL('./member.html', import.meta.url)),
        about: fileURLToPath(new URL('./about.html', import.meta.url)),
        contact: fileURLToPath(new URL('./contact.html', import.meta.url)),
        404: fileURLToPath(new URL('./404.html', import.meta.url)),
        'projects/index': fileURLToPath(new URL('./projects/index.html', import.meta.url)),
        'members/index': fileURLToPath(new URL('./members/index.html', import.meta.url)),
      }
    }
  }
})
