import type { Email } from "@src/entities/user/email";
import type { User } from "@src/entities/user/user";

export interface CreateUserDataAccessInterface {
  save(user: User): Promise<void>
  existsByEmail(email: Email): Promise<boolean>
}