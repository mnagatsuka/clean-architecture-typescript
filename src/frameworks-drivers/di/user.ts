import { type CreateUserViewModel, CreateUserWebPresenter } from "@interface-adapters/presenters/user/create-user-web-presenter"
import { CreateUserController } from "@interface-adapters/controllers/user/create-user-controller"
import { CreateUserInteractor } from "@usecases/user/create-user/usecase-interactor"
import { UserIdGenerator } from "@usecases/shared/id-generator/user-id-generator"
import { UuidGenerator } from "@frameworks-drivers/id-generator/uuid-generator"

import { InMemoryUserDataAccess } from "@interface-adapters/gateways/user/in-memory-user-data-access"
import { PostgresUserDataAccess } from "@interface-adapters/gateways/user/postgres-user-data-access"
import type { CreateUserDataAccessInterface } from "@usecases/user/create-user/data-access-interface"
import { createDataAccess } from "./utils/createDataAccess"
import { InMemoryDatabase } from "@frameworks-drivers/db/inmemory/in-memory-database"

export async function createUserModule(dbType = "inmemory", dbUrl = "") {
  const dataAccess = await createDataAccess<CreateUserDataAccessInterface, []>(
    dbType,
    {
      "inmemory": () => {
        const db = InMemoryDatabase.getInstance()
        return new InMemoryUserDataAccess(db)
      },
      "postgres": async () => {
        const { getDb } = await import("@frameworks-drivers/db/postgres/client")
        return new PostgresUserDataAccess(getDb(dbUrl))
      },
    }
  )

  const presenter = new CreateUserWebPresenter()
  const idGenerator = new UserIdGenerator(new UuidGenerator())
  const usecase = new CreateUserInteractor<CreateUserViewModel>(dataAccess, presenter, idGenerator)
  const controller = new CreateUserController(usecase, presenter)

  return { controller }
}
