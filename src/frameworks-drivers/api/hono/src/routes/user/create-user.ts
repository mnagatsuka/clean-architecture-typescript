import { Hono } from "hono"
import type { CreateUserController } from "@interface-adapters/controllers/user/create-user-controller"

export const createUserRoute = (controller: CreateUserController) => {
  const route = new Hono()

  route.post("/", async (c) => {
    try {
      const body = await c.req.json()
      const response = await controller.handle({ email: body.email, name: body.name })
      return c.json(response, 201)
    } catch (err) {
      return c.json({ message: err instanceof Error ? err.message : "Unknown error" }, 400)
    }
  })

  return route
}