import type { FastifyPluginAsync } from 'fastify'
import type { TruncateTestDataController } from '@interface-adapters/controllers/test/truncate-test-data-controller'

export const truncateTestDataRoute = (
  controller: TruncateTestDataController
): FastifyPluginAsync => {
  return async (app) => {
    app.post('/truncate', async (request, reply) => {
      if (process.env.NODE_ENV !== 'test') {
        return reply.code(403).send('Forbidden')
      }

      try {
        const response = await controller.handle()
        reply.code(200).send(response)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        reply.code(500).send({ message })
      }
    })
  }
}
