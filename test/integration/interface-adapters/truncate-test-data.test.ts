import { describe, it, expect, beforeEach, vi } from 'vitest'
import { TruncateTestDataController } from '@interface-adapters/controllers/test/truncate-test-data-controller'
import { TruncateTestDataWebPresenter } from '@interface-adapters/presenters/test/truncate-test-data-web-presenter'
import { TruncateTestDataInteractor } from '@usecases/test/truncate-test-data/usecase-interactor'
import { InMemoryTestDataAccess } from '@interface-adapters/gateways/test/in-memory-test-data-access'
import { InMemoryDatabase } from '@frameworks-drivers/db/inmemory/in-memory-database'
import type { UserForTest } from '@shared/types/user-for-test'

describe('TruncateTestDataController Integration (Controller + Presenter + UseCase + InMemoryDB)', () => {
  let db: InMemoryDatabase
  let controller: TruncateTestDataController

  beforeEach(() => {
    // 毎テストでDBインスタンスを初期化
    db = InMemoryDatabase.getInstance()
    db.clearAll()

    const dataAccess = new InMemoryTestDataAccess(db)
    const presenter = new TruncateTestDataWebPresenter()

    const usecase = new TruncateTestDataInteractor(dataAccess, presenter)
    controller = new TruncateTestDataController(usecase, presenter)
  })

  it('should truncate all test data and return correct view model via presenter', async () => {
    const users: UserForTest[] = [
      {
        id: "user_1",
        name: "Alice",
        email: "alice@example.com",
        status: "active",
      },
      {
        id: "user_2",
        name: "Bob",
        email: "bob@example.com",
        status: "active",
      }
    ]
    for (const user of users) {
      db.userForTest.set(user.id, user)
    }

    expect(db.userForTest.size).toBe(2)
    
    const response = await controller.handle()

    expect(db.userForTest.size).toBe(0)
    expect(response).toEqual({
      success: true,
      message: "Test data truncated successfully",
    })
  })

  it('should fail to truncate test data and return correct view model via presenter if exceptions happened', async () => {
    const erroringDataAccess = {
      truncateAll: vi.fn().mockRejectedValue(new Error("Mocked error during truncation")),
    }
    const presenter = new TruncateTestDataWebPresenter()
    const usecase = new TruncateTestDataInteractor(erroringDataAccess, presenter)
    const erroringController = new TruncateTestDataController(usecase, presenter)

    const users: UserForTest[] = [
      {
        id: "user_1",
        name: "Alice",
        email: "alice@example.com",
        status: "active",
      },
      {
        id: "user_2",
        name: "Bob",
        email: "bob@example.com",
        status: "active",
      }
    ]
    for (const user of users) {
      db.userForTest.set(user.id, user)
    }
    
    expect(db.userForTest.size).toBe(2)

    const response = await erroringController.handle()

    expect(db.userForTest.size).toBe(2)
    expect(response).toEqual({
      success: false,
      message: "Failed to truncate test data",
    })
  })
})
