import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Icons from 'unplugin-icons/vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/vue-office/' : '/',
  
  plugins: [
    vue(),
    vueDevTools(),
    Icons({
      autoInstall: true,
      compiler: 'vue3'
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: true, // 或者使用 '0.0.0.0'，允许通过本机IP访问
    port: 5174, // 可选：指定端口号
  },
})
