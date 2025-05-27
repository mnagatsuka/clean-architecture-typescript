import { defineConfig, mergeConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import baseConfig from '../../../vitest.config.base'
import path from 'node:path'

export default mergeConfig(
  baseConfig,
  defineConfig({
      plugins: [react()],
      test: {
      name: 'integration-web',
      environment: 'jsdom',
      setupFiles: path.resolve(__dirname, './setup.ts'),
      include: ['test/integration/frameworks-drivers/web/**/*.test.{ts,tsx}'],
      coverage: {
        provider: 'v8',
        reportsDirectory: path.resolve(__dirname, './coverage'),
        reporter: ['text', 'html'],
        exclude: ['**/node_modules/**']
      }
    }
  })
)
