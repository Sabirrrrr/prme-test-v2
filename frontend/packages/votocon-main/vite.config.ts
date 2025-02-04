import { defineConfig } from 'vite';
import path from 'path';
import litCss from 'vite-plugin-lit-css';

export default defineConfig({
  plugins: [litCss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@services': path.resolve(__dirname, './src/services'),
      '@models': path.resolve(__dirname, './src/models'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@config': path.resolve(__dirname, './src/config')
    }
  },
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
  }
});