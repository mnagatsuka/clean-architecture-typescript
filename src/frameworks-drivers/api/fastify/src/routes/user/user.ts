import type { FastifyPluginAsync } from 'fastify'
import type { CreateUserController } from '@interface-adapters/controllers/user/create-user-controller'

export const createUserRoute = (controller: CreateUserController): FastifyPluginAsync => {
  return async (app) => {
    app.post('/', async (request, reply) => {
      try {
        const body = request.body as { email: string; name: string }
        const response = await controller.handle({ email: body.email, name: body.name })
        reply.code(201).send(response)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        reply.code(400).send({ message })
      }
    })
  }
}
