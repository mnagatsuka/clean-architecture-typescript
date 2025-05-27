import { describe, it, expect, beforeEach } from "vitest"
import { Hono } from "hono"
import { createUserModule } from "@src/frameworks-drivers/di/user"
import { createUserRoute } from "@src/frameworks-drivers/api/hono/routes/user/create-user"
import type { CreateUserViewModel } from "@src/interface-adapters/presenters/user/create-user-web-presenter"
import { fetchHonoJson } from "@test/utils/fetch-hono-json"


let app: Hono

beforeEach(() => {
  const { controller } = createUserModule()
  app = new Hono().route("/", createUserRoute(controller))
})

describe("POST /users", () => {
  it("should create a new user successfully", async () => {
    const { status, body } = await fetchHonoJson<CreateUserViewModel>(app, "/", {
      method: "POST",
      body: {
        email: "test@example.com",
        name: "Alice",
      },
    })

    expect(status).toBe(201)
    expect(body.message).toBe("User created successfully")
    expect(body.id).toBeDefined()
  })

  it("should return 400 if the email already exists", async () => {
    // 1回目：正常登録
    await fetchHonoJson<CreateUserViewModel>(app, "/", {
      method: "POST",
      body: {
        email: "test@example.com",
        name: "Alice",
      },
    })

    // 2回目：重複エラー
    const { status, body } = await fetchHonoJson<{ message: string }>(app, "/", {
      method: "POST",
      body: {
        email: "test@example.com",
        name: "Bob",
      },
    })

    expect(status).toBe(400)
    expect(body.message).toBe("Email already exists")
  })

  it("should return 400 if the email format is invalid", async () => {
    const { status, body } = await fetchHonoJson<{ message: string }>(app, "/", {
      method: "POST",
      body: {
        email: "invalid-email",
        name: "Charlie",
      },
    })

    expect(status).toBe(400)
    expect(body.message).toBe("Invalid email format: invalid-email")
  })

  it("should return 400 if email is missing", async () => {
    const { status, body } = await fetchHonoJson<{ message: string }>(app, "/", {
      method: "POST",
      body: {
        name: "NoEmail",
      },
    })

    expect(status).toBe(400)
    expect(body.message).toContain("email")
  })
})