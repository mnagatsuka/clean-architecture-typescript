import { beforeAll, beforeEach, describe, expect, it } from "vitest"
import { Email } from "@entities/user/email"
import { User } from "@entities/user/user"
import { PostgresUserDataAccess } from "@interface-adapters/gateways/user/postgres-user-data-access"
import { user as userTable } from "@frameworks-drivers/db/postgres/schema"
import { eq } from "drizzle-orm"
import type { PostgresDBClient } from "@frameworks-drivers/db/postgres/client"

// テスト対象インスタンス
let db: PostgresDBClient
let dataAccess: PostgresUserDataAccess
const dbUrl = process.env.DB_URL ?? ''

describe("PostgresUserDataAccess", () => {

  beforeAll(async () => {
    const { getDb } = await import("@frameworks-drivers/db/postgres/client")
    db = getDb(dbUrl)
  })

  beforeEach(async () => {
    // テーブル内容を初期化
    await db.delete(userTable)
    dataAccess = new PostgresUserDataAccess(db)
  })

  it("should return false if email does not exist", async () => {
    const email = new Email("nonexistent@example.com")
    const exists = await dataAccess.existsByEmail(email)
    expect(exists).toBe(false)
  })

  it("should return true if email exists", async () => {
    const user = new User({
      id: "1",
      email: new Email("test@example.com"),
      name: "Alice",
    })
    await dataAccess.save(user)

    const exists = await dataAccess.existsByEmail(new Email("test@example.com"))
    expect(exists).toBe(true)
  })

  it("should not match different emails", async () => {
    const user = new User({
      id: "1",
      email: new Email("test@example.com"),
      name: "Alice",
    })
    await dataAccess.save(user)

    const exists = await dataAccess.existsByEmail(new Email("other@example.com"))
    expect(exists).toBe(false)
  })

  it("should save multiple users", async () => {
    const users = [
      new User({ id: "1", email: new Email("a@example.com"), name: "A" }),
      new User({ id: "2", email: new Email("b@example.com"), name: "B" }),
      new User({ id: "3", email: new Email("c@example.com"), name: "C" }),
    ]

    for (const user of users) {
      await dataAccess.save(user)
    }

    expect(await dataAccess.existsByEmail(new Email("a@example.com"))).toBe(true)
    expect(await dataAccess.existsByEmail(new Email("b@example.com"))).toBe(true)
    expect(await dataAccess.existsByEmail(new Email("c@example.com"))).toBe(true)
    expect(await dataAccess.existsByEmail(new Email("d@example.com"))).toBe(false)
  })

  it("should persist to actual database", async () => {
    const user = new User({
      id: "5",
      email: new Email("persist@example.com"),
      name: "Persistent User",
    })
    await dataAccess.save(user)

    const results = await db.select().from(userTable).where(eq(userTable.email, "persist@example.com"))
    expect(results.length).toBe(1)
    expect(results[0].name).toBe("Persistent User")
  })
})
