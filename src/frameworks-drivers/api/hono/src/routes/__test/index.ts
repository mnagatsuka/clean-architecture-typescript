import { Hono } from "hono"
import { truncateTestDataRoute } from "./truncate"
import { createTestModule } from "@frameworks-drivers/di/test"

export const testRouter = new Hono()

// ドメイン単位で依存性を注入
const dbType = process.env.DB_TYPE ?? "inmemory"
const { controller } = await createTestModule(dbType)
testRouter.route("/", truncateTestDataRoute(controller))