import 'fastify'
import type { TestModule } from './modules'
import type { UserModule } from './modules'

declare module 'fastify' {
  interface FastifyInstance {
    testModule: TestModule
    userModule: UserModule
  }
}
