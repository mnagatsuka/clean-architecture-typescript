// import { Hono } from "hono"
// import { di } from "@/frameworks-drivers/di"
// import type { CreateUserRequest } from "@/interface-adapters/controllers/user/create-user-controller"

// export const createUserRoute = new Hono()

// createUserRoute.post("/", async (c) => {
//   try {
//     const body = await c.req.json()

//     const request: CreateUserRequest = {
//       email: body.email,
//       name: body.name,
//     }

//     const response = await di.user.controller.handle(request)

//     return c.json(response, 201) // 成功時: 201 Created
//   } catch (err) {
//     return c.json(
//       {
//         message:
//           err instanceof Error
//             ? err.message
//             : "Unknown error",
//       },
//       400
//     )
//   }
// })


import { Hono } from "hono"
import type { CreateUserController } from "@/interface-adapters/controllers/user/create-user-controller"

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