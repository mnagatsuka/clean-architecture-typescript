import { createTestModule } from '@frameworks-drivers/di/test'
import { createUserModule } from '@frameworks-drivers/di/user'
import type { EnvConfig } from './env-schema'
import type { FastifyInstance } from 'fastify'

export async function injectDependencies(app: FastifyInstance, env: EnvConfig) {
  const testModule = await createTestModule(env.DB_TYPE, env.DB_URL)
  const userModule = await createUserModule(env.DB_TYPE, env.DB_URL)

  app.decorate('testModule', testModule)
  app.decorate('userModule', userModule)
}
