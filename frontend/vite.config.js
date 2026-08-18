import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 6711,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:6710',
        changeOrigin: true
      },
      '/uploads': {
        target: 'http://127.0.0.1:6710',
        changeOrigin: true
      }
    }
  },
  preview: {
    allowedHosts: true
  }
})
