import { InMemoryCreateUserDataAccess } from "@src/interface-adapters/gateways/user/in-memory-user-data-access"
import { CreateUserWebPresenter } from "@src/interface-adapters/presenters/user/create-user-web-presenter"
import { CreateUserController } from "@src/interface-adapters/controllers/user/create-user-controller"
import { CreateUserInteractor } from "@src/usecases/user/create-user/usecase-interactor"
import { UserIdGenerator } from "@src/usecases/shared/id-generator/user-id-generator"
import { UuidGenerator } from "@src/frameworks-drivers/id-generator/uuid-generator"
import type { CreateUserDataAccessInterface } from "@src/usecases/user/create-user/data-access-interface"

// 1. データアクセスファクトリマップ
const userDataAccessFactoryMap: Record<string, () => CreateUserDataAccessInterface> = {
  inmemory: () => new InMemoryCreateUserDataAccess(),
}

// 2. ファクトリからインスタンスを生成
function createUserDataAccess(): CreateUserDataAccessInterface {
  const dbType = process.env.DB_TYPE ?? "inmemory"
  const factory = userDataAccessFactoryMap[dbType]
  if (!factory) throw new Error(`Unsupported DB_TYPE: ${dbType}`)
  return factory()
}

// 3. モジュール組み立て（Controller単位で返す）
export function createUserModule() {
  const dataAccess = createUserDataAccess()
  const presenter = new CreateUserWebPresenter()
  const idGenerator = new UserIdGenerator(new UuidGenerator())
  const usecase = new CreateUserInteractor(dataAccess, presenter, idGenerator)
  const controller = new CreateUserController(usecase, presenter)
  return { controller }
}