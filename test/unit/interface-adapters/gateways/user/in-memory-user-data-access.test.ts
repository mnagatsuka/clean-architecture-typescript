import { describe, it, expect, beforeEach } from "vitest"
import { InMemoryCreateUserDataAccess } from "@/interface-adapters/gateways/user/in-memory-user-data-access"
import { Email } from "@/entities/user/email"
import { User } from "@/entities/user/user"

describe("InMemoryCreateUserDataAccess", () => {
  let dataAccess: InMemoryCreateUserDataAccess

  beforeEach(() => {
    dataAccess = new InMemoryCreateUserDataAccess()
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
      new User({ id: "1", email: new Email("a@example.com") }),
      new User({ id: "2", email: new Email("b@example.com") }),
      new User({ id: "3", email: new Email("c@example.com") }),
    ]

    for (const user of users) {
      await dataAccess.save(user)
    }

    expect(await dataAccess.existsByEmail(new Email("a@example.com"))).toBe(true)
    expect(await dataAccess.existsByEmail(new Email("b@example.com"))).toBe(true)
    expect(await dataAccess.existsByEmail(new Email("c@example.com"))).toBe(true)
    expect(await dataAccess.existsByEmail(new Email("d@example.com"))).toBe(false)
  })
})
