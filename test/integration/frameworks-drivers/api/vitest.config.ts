import { defineConfig, mergeConfig } from 'vitest/config'
import baseConfig from '../../../vitest.config.base'
import path from 'node:path'

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      name: 'integration-api',
      environment: 'node',
      setupFiles: path.resolve(__dirname, './setup.ts'),
      include: ['test/integration/frameworks-drivers/api/**/*.test.{ts,tsx}'],
      coverage: {
        provider: 'v8',
        reportsDirectory: path.resolve(__dirname, './coverage'),
        reporter: ['text', 'html'],
        exclude: ['**/node_modules/**']
      }
    }
  })
)
