import { describe, it, expect, beforeAll, beforeEach } from "vitest"
import type { CreateUserViewModel } from "@interface-adapters/presenters/user/create-user-web-presenter"
import { PostgresTestDataAccess } from "@interface-adapters/gateways/test/postgres-test-data-access"

const dbUrl = process.env.DB_URL ?? ''
let dataAccess: PostgresTestDataAccess
const BASE_URL = 'http://localhost:3031/users'

beforeAll(async () => {
  // Postgresのインスタンスを遅延ロード（副作用のない import）
  const { getDb } = await import("@frameworks-drivers/db/postgres/client")
  dataAccess =  new PostgresTestDataAccess(getDb(dbUrl))
})

beforeEach(async () => {
  // テスト実行前にDBをクリーンアップ
  await dataAccess.truncateAll()
})

describe("POST /users (DB integration)", () => {
  it("should create a new user successfully", async () => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        name: "Alice",
      }),
    })

    const body = await res.json() as CreateUserViewModel

    expect(res.status).toBe(201)
    expect(body.message).toBe("User created successfully")
    expect(body.id).toBeDefined()
  })

  it("should return 400 if the email already exists", async () => {
    await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        name: "Alice",
      }),
    })

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        name: "Bob",
      }),
    })

    const body = await res.json() as { message: string }

    expect(res.status).toBe(400)
    expect(body.message).toBe("Email already exists")
  })

  it("should return 400 if the email format is invalid", async () => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "invalid-email",
        name: "Charlie",
      }),
    })

    const body = await res.json() as { message: string }

    expect(res.status).toBe(400)
    expect(body.message).toBe("Invalid email format: invalid-email")
  })

  it("should return 400 if email is missing", async () => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "NoEmail",
      }),
    })

    const body = await res.json() as { message: string }

    expect(res.status).toBe(400)
    expect(body.message.toLowerCase()).toContain("email")
  })
})
