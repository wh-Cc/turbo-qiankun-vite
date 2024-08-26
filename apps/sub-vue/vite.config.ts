import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun';


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5001,
    cors: true,
    origin: 'http://localhost:5001'
  },
  plugins: [
    vue(),
    qiankun('sub-vue', { // 配置qiankun插件
      useDevMode: true
    })
  ],
})
