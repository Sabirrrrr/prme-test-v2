import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  build: {
    lib: {
      entry: 'src/main.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit/
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
