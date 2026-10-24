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
  // 多页面（MPA）：每个页面一个独立入口，构建产物为多个 .html 文件
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./index.html', import.meta.url)),
        projects: fileURLToPath(new URL('./projects.html', import.meta.url)),
        members: fileURLToPath(new URL('./members.html', import.meta.url)),
        member: fileURLToPath(new URL('./member.html', import.meta.url)),
        about: fileURLToPath(new URL('./about.html', import.meta.url)),
        contact: fileURLToPath(new URL('./contact.html', import.meta.url)),
        notfound: fileURLToPath(new URL('./404.html', import.meta.url)),
      }
    }
  },
})
