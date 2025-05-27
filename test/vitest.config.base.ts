// test/vitest.config.base.ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../'),
      '@src': path.resolve(__dirname, '../src'),
      '@test': path.resolve(__dirname, '../test'),
      '@react': path.resolve(__dirname, '../src/frameworks-drivers/web/react/src')
    }
  },
  test: {
    globals: true,
    // include / exclude / environment / coverage は各設定で上書き
  }
})
