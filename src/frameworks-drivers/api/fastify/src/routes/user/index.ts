import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { createUserRoute } from './user'

export const userRouter: FastifyPluginAsync = async (app: FastifyInstance) => {
  const { controller } = app.userModule
  await app.register(createUserRoute(controller))
}
