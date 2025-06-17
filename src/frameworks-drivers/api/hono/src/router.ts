import { Hono } from "hono"
import { userRouter } from "./routes/user"
import { testRouter } from "./routes/__test"

export const appRouter = new Hono()

appRouter.route("/users", userRouter)
appRouter.route("/__test", testRouter)
