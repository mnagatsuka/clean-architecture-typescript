import type { Email } from "@entities/user/email";
import type { User } from "@entities/user/user";

export interface CreateUserDataAccessInterface {
  existsByEmail(email: Email): Promise<boolean>
  save(user: User): Promise<void>
}