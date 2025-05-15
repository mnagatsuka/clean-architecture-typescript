import type { Email } from "@/entities/user/email";
import type { User } from "@/entities/user/user";

export interface CreateUserDataAccessInterface {
  save(user: User): Promise<void>
  existsByEmail(email: Email): Promise<boolean>
}