import { defineConfig } from 'vite'
import qiankun from 'vite-plugin-qiankun'
import reactRefresh from '@vitejs/plugin-react-refresh'
// useDevMode 开启时与热更新插件冲突
const useDevMode = true
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const __DEV__ = mode === 'development'
  console.log(mode, __DEV__, 'mode')
  return {
    plugins: [
      ...(useDevMode ? [] : [reactRefresh()]),
      qiankun('sub-react', {
        useDevMode: true,
      }),
    ],
    server: {
      port: 5002,
      // 设置源是因为图片资源会找错位置所以通过这个让图片等资源不会找错
      origin: '//localhost:5002',
      cors: true,
    },
    base: __DEV__ ? '/' : '//localhost:5002',
  }
})