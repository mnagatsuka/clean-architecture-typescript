import { describe, it, expect, beforeEach } from "vitest"
import { InMemoryDatabase } from "@frameworks-drivers/db/inmemory/in-memory-database"
import { InMemoryTestDataAccess } from "@interface-adapters/gateways/test/in-memory-test-data-access"

describe("InMemoryTestDataAccess", () => {
  let db: InMemoryDatabase
  let dataAccess: InMemoryTestDataAccess

  beforeEach(() => {
    db = InMemoryDatabase.getInstance() // シングルトンから取得
    db.clearAll() // テスト前に状態リセット
    dataAccess = new InMemoryTestDataAccess(db)
  })

  it("should truncate all test data", async () => {

    db.userForTest.set("1", { id: "1", email: "a@example.com", name: "A", status: "active" })
    db.userForTest.set("2", { id: "2", email: "b@example.com", name: "B", status: "inactive" })
    db.userForTest.set("3", { id: "3", email: "c@example.com", name: "C", status: "pending" })

    expect(db.userForTest.size).toBe(3)

    await dataAccess.truncateAll()

    expect(db.userForTest.size).toBe(0)
  })
})
