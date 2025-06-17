import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CreateUserController } from '@interface-adapters/controllers/user/create-user-controller'
import { CreateUserWebPresenter } from '@interface-adapters/presenters/user/create-user-web-presenter'
import { CreateUserInteractor } from '@usecases/user/create-user/usecase-interactor'
import { InMemoryUserDataAccess } from '@interface-adapters/gateways/user/in-memory-user-data-access'
import { InMemoryDatabase } from '@frameworks-drivers/db/inmemory/in-memory-database'
import type { IdGenerator } from '@usecases/shared/id-generator/id-generator'

describe('CreateUserController Integration (Controller + Presenter + UseCase + InMemoryDB)', () => {
  let controller: CreateUserController

  beforeEach(() => {
    // 毎テストでDBインスタンスを初期化
    const db = InMemoryDatabase.getInstance()
    db.clearAll()

    const dataAccess = new InMemoryUserDataAccess(db)
    const presenter = new CreateUserWebPresenter()
    const idGenerator: IdGenerator = {
      generate: vi.fn().mockReturnValue('user_123456'),
    }

    const usecase = new CreateUserInteractor(dataAccess, presenter, idGenerator)
    controller = new CreateUserController(usecase, presenter)
  })
  it('should create a user and return correct view model via presenter', async () => {
    const request = { email: 'test@example.com', name: 'Alice' }

    const response = await controller.handle(request)

    expect(response).toEqual({
      id: 'user_123456',
      message: "User created successfully",
    })
  })

  it('should throw error if email already exists', async () => {
    const request = { email: 'duplicate@example.com', name: 'Bob' }

    await controller.handle(request)

    await expect(controller.handle(request)).rejects.toThrow(/already exists/i)
  })
})
