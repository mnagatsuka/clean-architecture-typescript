import type { PostgresDBClient } from "@frameworks-drivers/db/postgres/client"
import * as schema from "@frameworks-drivers/db/postgres/schema"
import type { TruncateTestDataAccessInterface } from "@usecases/test/truncate-test-data/data-access-interface"


export class PostgresTestDataAccess implements TruncateTestDataAccessInterface {
  constructor(private readonly db: PostgresDBClient) {}

  async truncateAll(): Promise<void> {
    const tableInstances = Object.values(schema)
    const tableNames = Object.keys(schema)

    if (tableInstances.length === 0) {
      console.warn("No tables to truncate.")
      return
    }

    console.log("Truncating tables:", tableNames)
    const sql = `TRUNCATE TABLE ${tableNames.map((name) => `"${name}"`).join(", ")} RESTART IDENTITY CASCADE`
    console.log(sql)
    
    await this.db.execute(sql)
  }
}
