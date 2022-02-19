import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        netflix: resolve(__dirname, 'app/netflix.js'),
      },
      output: {
        assetFileNames: "[name].[ext]",
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        manualChunks: undefined
      }
    }
  },
  resolve: {
    alias: {
      'css': resolve(__dirname, 'css'),
      'components': resolve(__dirname, 'app/components')
    }
  },
  plugins: [vue()],
})