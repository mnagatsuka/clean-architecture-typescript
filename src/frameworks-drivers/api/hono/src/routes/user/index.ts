import { Hono } from "hono"
import { createUserRoute } from "./create-user"
import { createUserModule } from "@frameworks-drivers/di/user"

export const userRouter = new Hono()

// ドメイン単位で依存性を注入
const { controller } = await createUserModule()
userRouter.route("/", createUserRoute(controller))