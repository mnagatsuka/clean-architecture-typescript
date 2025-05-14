import { describe, it, expect } from "vitest";
import { User } from "../../../../src/entities/user/user";
import { UserStatus } from "../../../../src/entities/user/user-status";

describe("User Entity", () => {
  it('should default name to "user"', () => {
    const user = new User({ id: "1", email: "test@example.com" });
    expect(user.name).toBe("user");
  });

  it("should default status to INACTIVE", () => {
    const user = new User({ id: "1", email: "test@example.com" });
    expect(user.status).toBe(UserStatus.INACTIVE);
  });

  it("should accept custom name and email", () => {
    const user = new User({
      id: "1",
      name: "Alice",
      email: "alice@example.com",
    });

    expect(user.name).toBe("Alice");
    expect(user.email.getValue()).toBe("alice@example.com");
    expect(user.status).toBe(UserStatus.INACTIVE);
  });
});
