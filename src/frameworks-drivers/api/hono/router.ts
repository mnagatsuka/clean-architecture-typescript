import { Hono } from "hono"
import { userRouter } from "./routes/user"

export const appRouter = new Hono()

appRouter.route("/users", userRouter)
