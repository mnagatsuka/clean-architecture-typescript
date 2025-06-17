import { eq } from "drizzle-orm"
import { user as userTable } from "@frameworks-drivers/db/postgres/schema"
import type { Email } from "@entities/user/email"
import type { User } from "@entities/user/user"
import type { CreateUserDataAccessInterface } from "@usecases/user/create-user/data-access-interface"
import type { PostgresDBClient } from "@frameworks-drivers/db/postgres/client"

export class PostgresUserDataAccess implements CreateUserDataAccessInterface {
  constructor(private readonly db: PostgresDBClient) {}

  async existsByEmail(email: Email): Promise<boolean> {
    const result = await this.db.select().from(userTable).where(eq(userTable.email, email.getValue()))
    return result.length > 0
  }

  async save(user: User): Promise<void> {
    await this.db.insert(userTable).values({
      id: user.id,
      name: user.name,
      email: user.email.getValue(),
      status: user.status,
    })
  }
}
