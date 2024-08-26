import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000,
    cors: true,
    origin: 'http://localhost:5000'
  },
  plugins: [
    vue()
  ]
})
