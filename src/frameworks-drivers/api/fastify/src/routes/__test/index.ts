import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { truncateTestDataRoute } from './truncate'

export const testRouter: FastifyPluginAsync = async (app: FastifyInstance) => {
  const { controller } = app.testModule
  await app.register(truncateTestDataRoute(controller))
}
