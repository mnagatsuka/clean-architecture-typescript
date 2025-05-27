// src/frameworks-drivers/api/hono/routes/user/index.ts
import { Hono } from "hono"
import { createUserRoute } from "./create-user"
import { createUserModule } from "@src/frameworks-drivers/di/user"

export const userRouter = new Hono()

// ドメイン単位で依存性を注入
const { controller } = createUserModule()
userRouter.route("/", createUserRoute(controller))