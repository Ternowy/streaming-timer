import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        netflix: resolve(__dirname, 'netflix.js'),
        popup: resolve(__dirname, 'popup.html')
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
      'app': resolve(__dirname, 'app')
    }
  },
  plugins: [vue()],
})