import type { FastifyInstance } from 'fastify'
import { testRouter } from './__test'
import { userRouter } from './user'

export async function registerRoutes(app: FastifyInstance) {
  await app.register(testRouter, { prefix: '/__test' })
  await app.register(userRouter, { prefix: '/users' })
}
