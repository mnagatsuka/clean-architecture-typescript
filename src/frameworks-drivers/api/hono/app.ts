import { Hono } from "hono"
import { logger } from "hono/logger"
import { cors } from "hono/cors"
import { appRouter } from "./router"

// import { InMemoryUserDataAccess } from "@/interface-adapters/gateways/user/in-memory-user-data-access"
// import { UuidGenerator } from "@/frameworks-drivers/id-generator/uuid-generator"

// type CustomContext = {
//   Variables: {
//     userDataAccess: InMemoryUserDataAccess
//     uuidGenerator: UuidGenerator
//   }
// }

// const app = new Hono<CustomContext>()
const app = new Hono()

// 共通インスタンス
// const userDataAccess = new InMemoryUserDataAccess()
// const uuidGenerator = new UuidGenerator()

// ミドルウェアで context に登録
// app.use("*", async (c, next) => {
//   c.set("userDataAccess", userDataAccess)
//   c.set("uuidGenerator", uuidGenerator)
//   await next()
// })

app.use("*", logger())
app.use("*", cors())

// ルーティング
app.route("/", appRouter)

export { app }
