import { describe, expect, it } from "vitest"
import { UserIdGenerator } from "@src/usecases/shared/id-generator/user-id-generator"

describe("UserIdGenerator", () => {
  it("should prefix generated ID with 'user_'", () => {
    const base = { generate: () => "abc123" }
    const generator = new UserIdGenerator(base)
    expect(generator.generate()).toBe("user_abc123")
  })
})
