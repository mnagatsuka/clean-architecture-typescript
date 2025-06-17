import { Hono } from "hono"
import type { TruncateTestDataController } from "@interface-adapters/controllers/test/truncate-test-data-controller"

declare const NODE_ENV: string

export const truncateTestDataRoute = (controller: TruncateTestDataController) => {
  const route = new Hono()

  route.post("/truncate", async (c) => {
    // if (process.env.NODE_ENV !== 'test') {
    if (NODE_ENV !== 'test') {
      return c.text('Forbidden', 403)
    }

    try {
      const response = await controller.handle()
      return c.json(response, 200)
    } catch (err) {
      return c.json({ message: err instanceof Error ? err.message : "Unknown error" }, 500)
    }
  })

  return route
}