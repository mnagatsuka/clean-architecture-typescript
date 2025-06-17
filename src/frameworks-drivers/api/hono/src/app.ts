import { Hono } from "hono"
import { logger } from "hono/logger"
import { cors } from "hono/cors"
import { appRouter } from "./router"

const app = new Hono()
app.use("*", logger())
app.use("*", cors())

// ルーティング
app.route("/", appRouter)

export default app
