import { beforeAll, beforeEach, describe, expect, it } from "vitest"
import { PostgresTestDataAccess } from "@interface-adapters/gateways/test/postgres-test-data-access"
import { user_for_test as userForTestTable } from "@frameworks-drivers/db/postgres/schema"
import type { PostgresDBClient } from "@frameworks-drivers/db/postgres/client"

// テスト対象インスタンス
let db: PostgresDBClient
let dataAccess: PostgresTestDataAccess
const dbUrl = process.env.DB_URL ?? ''

describe("PostgresTestDataAccess", () => {

  beforeAll(async () => {
    const { getDb } = await import("@frameworks-drivers/db/postgres/client")
    db = getDb(dbUrl)
  })

  beforeEach(async () => {
    await db.delete(userForTestTable)
    dataAccess = new PostgresTestDataAccess(db)
  })

  it("should truncate all test data", async () => {
    await db.insert(userForTestTable).values([
      { id: "1", name: "A", email: "a@example.com", status: "active" },
      { id: "2", name: "B", email: "b@example.com", status: "active" },
      { id: "3", name: "C", email: "c@example.com", status: "active" },
    ])

    // 挿入結果を事前確認
    const countBefore = await db.select().from(userForTestTable)
    expect(countBefore.length).toBe(3)

    // 実行対象
    await dataAccess.truncateAll()

    // 検証：テーブルが空である
    const countAfter = await db.select().from(userForTestTable)
    expect(countAfter.length).toBe(0)
  })
})
