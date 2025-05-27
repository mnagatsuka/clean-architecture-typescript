import type { Email } from "@src/entities/user/email";
import type { User } from "@src/entities/user/user";
import type { CreateUserDataAccessInterface } from "@src/usecases/user/create-user/data-access-interface";

/**
 * メモリ上でユーザー情報を管理するデータアクセスの実装
 */
export class InMemoryCreateUserDataAccess implements CreateUserDataAccessInterface {
  private users: User[] = [];

  async existsByEmail(email: Email): Promise<boolean> {
    return this.users.some((user) => user.email.equals(email));
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}

