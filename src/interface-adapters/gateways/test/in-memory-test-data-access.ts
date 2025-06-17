import type { InMemoryDatabase } from "@frameworks-drivers/db/inmemory/in-memory-database";
import type { TruncateTestDataAccessInterface } from "@usecases/test/truncate-test-data/data-access-interface";

export class InMemoryTestDataAccess implements TruncateTestDataAccessInterface {
  private readonly db: InMemoryDatabase

  constructor(db: InMemoryDatabase) {
    this.db = db
  }
  
  async truncateAll(): Promise<void> {
    this.db.clearAll()
  }
}
