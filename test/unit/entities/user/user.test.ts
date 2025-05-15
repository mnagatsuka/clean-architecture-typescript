import { Email } from "@/entities/user/email";
import { User } from "@/entities/user/user";
import { UserStatus } from "@/entities/user/user-status";
import { describe, expect, it } from "vitest";

describe("User Entity", () => {
  it('should default name to "user"', () => {
    const user = new User({ id: "1", email: new Email("test@example.com") });
    expect(user.name).toBe("user");
  });

  it("should default status to INACTIVE", () => {
    const user = new User({ id: "1", email: new Email("test@example.com") });
    expect(user.status).toBe(UserStatus.INACTIVE);
  });

  it("should accept custom name and email", () => {
    const email = new Email("alice@example.com");
    const user = new User({
      id: "1",
      name: "Alice",
      email,
    });

    expect(user.name).toBe("Alice");
    expect(user.email.getValue()).toBe("alice@example.com");
    expect(user.status).toBe(UserStatus.INACTIVE);
  });
});
