import { describe, it, expect } from "vitest";
import { Email } from "../../../../src/entities/user/email";

describe("Email Value Object", () => {
  it("should create with valid email", () => {
    const email = new Email("test@example.com");
    expect(email.getValue()).toBe("test@example.com");
  });

  it("should throw error on invalid email", () => {
    expect(() => new Email("invalid-email")).toThrow();
  });

  it("should compare two equal emails as equal", () => {
    const a = new Email("a@example.com");
    const b = new Email("a@example.com");
    expect(a.equals(b)).toBe(true);
  });

  it("should compare two different emails as not equal", () => {
    const a = new Email("a@example.com");
    const b = new Email("b@example.com");
    expect(a.equals(b)).toBe(false);
  });
});
