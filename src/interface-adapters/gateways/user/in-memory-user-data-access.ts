import type { Email } from "@entities/user/email"
import type { User } from "@entities/user/user"
import type { CreateUserDataAccessInterface } from "@usecases/user/create-user/data-access-interface"
import type { InMemoryDatabase } from "@frameworks-drivers/db/inmemory/in-memory-database"

/**
 * メモリ上でユーザー情報を管理するデータアクセスの実装
 */
export class InMemoryUserDataAccess implements CreateUserDataAccessInterface {
  private readonly user: Map<string, User>

  constructor(db: InMemoryDatabase) {
    this.user = db.user
  }

  async existsByEmail(email: Email): Promise<boolean> {
    for (const user of this.user.values()) {
      if (user.email.equals(email)) {
        return true
      }
    }
    return false
  }

  async save(user: User): Promise<void> {
    this.user.set(user.id, user)
  }
}
