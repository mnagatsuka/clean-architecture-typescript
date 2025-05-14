// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,         // describe, it, expect をグローバルに使用可
    environment: 'node',   // Node.js 環境でテスト
    include: ['test/**/*.test.ts'],
  },
})
