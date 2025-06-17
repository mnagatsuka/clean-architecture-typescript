import { describe, expect, it } from "vitest"
import { UuidGenerator } from "@frameworks-drivers/id-generator/uuid-generator"

describe("UuidGenerator", () => {
  it("should generate a non-empty string", () => {
    const generator = new UuidGenerator()
    const id = generator.generate()
    expect(typeof id).toBe("string")
    expect(id).not.toBe("")
  })
})
