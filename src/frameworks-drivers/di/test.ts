import { TruncateTestDataWebPresenter } from "@interface-adapters/presenters/test/truncate-test-data-web-presenter"
import { TruncateTestDataController } from "@interface-adapters/controllers/test/truncate-test-data-controller"
import { TruncateTestDataInteractor } from "@usecases/test/truncate-test-data/usecase-interactor"
import type { TruncateTestDataAccessInterface } from "@usecases/test/truncate-test-data/data-access-interface"

import { InMemoryTestDataAccess } from "@interface-adapters/gateways/test/in-memory-test-data-access"
import { PostgresTestDataAccess } from "@interface-adapters/gateways/test/postgres-test-data-access"

import { createDataAccess } from "./utils/createDataAccess"
import { InMemoryDatabase } from "@frameworks-drivers/db/inmemory/in-memory-database"

export async function createTestModule(dbType = "inmemory", dbUrl = "") {
  const dataAccess = await createDataAccess<TruncateTestDataAccessInterface, []>(
    dbType,
    {
      "inmemory": () => {
        const db = InMemoryDatabase.getInstance()
        return new InMemoryTestDataAccess(db)
      },
      "postgres": async () => {
        const { getDb } = await import("@frameworks-drivers/db/postgres/client")
        return new PostgresTestDataAccess(getDb(dbUrl))
      },
    }
  )

  const presenter = new TruncateTestDataWebPresenter()
  const usecase = new TruncateTestDataInteractor(dataAccess, presenter)
  const controller = new TruncateTestDataController(usecase, presenter)

  return { controller }
}
