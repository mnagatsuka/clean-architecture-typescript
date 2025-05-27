// test/unit/vitest.config.ts
import { defineConfig, mergeConfig } from 'vitest/config'
import baseConfig from '../vitest.config.base'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [react()],
    test: {
      name: 'unit',
      environment: 'jsdom',
      setupFiles: path.resolve(__dirname, './setup.ts'),
      include: ['test/unit/**/*.test.{ts,tsx}'],
      coverage: {
        provider: 'v8',
        reportsDirectory: path.resolve(__dirname, './coverage'),
        reporter: ['text', 'html', 'json-summary'],
        exclude: [
          '**/*.test.*',
          '**/test/**',
          '**/*.stories.*',
          '**/.storybook/**',
          '**/node_modules/**'
        ]
      }
    }
  })
)
