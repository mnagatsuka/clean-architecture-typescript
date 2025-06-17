import type { UserForTest } from "@shared/types/user-for-test"
import type { User } from "@entities/user/user"

export class InMemoryDatabase {
  private static instance: InMemoryDatabase
  public readonly userForTest: Map<string, UserForTest> = new Map()
  public readonly user: Map<string, User> = new Map()

  private constructor() {}

  static getInstance(): InMemoryDatabase {
    if (!InMemoryDatabase.instance) {
      InMemoryDatabase.instance = new InMemoryDatabase()
    }
    return InMemoryDatabase.instance
  }

  clearAll() {
    this.userForTest.clear()
    this.user.clear()
  }
}