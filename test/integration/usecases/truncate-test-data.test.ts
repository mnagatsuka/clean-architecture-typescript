import { describe, it, expect, beforeEach, vi } from "vitest"
import { TruncateTestDataInteractor } from "@usecases/test/truncate-test-data/usecase-interactor"
import { InMemoryTestDataAccess } from "@interface-adapters/gateways/test/in-memory-test-data-access"
import type { OutputBoundary } from "@usecases/shared/output-boundary"
import type { TruncateTestDataOutputData } from "@usecases/test/truncate-test-data/output-data"
import type { TruncateTestDataViewModel } from "@interface-adapters/presenters/test/truncate-test-data-web-presenter"
import { InMemoryDatabase } from "@frameworks-drivers/db/inmemory/in-memory-database"
import type { UserForTest } from "@shared/types/user-for-test"

class MockPresenter implements OutputBoundary<TruncateTestDataOutputData, TruncateTestDataViewModel> {
  private response!: TruncateTestDataViewModel

  getResponse(): TruncateTestDataViewModel {
    return this.response
  }

  present(output: TruncateTestDataOutputData): void {
    this.response = {
      success: output.success,
      message: output.success
        ? "Test data truncated successfully"
        : "Failed to truncate test data",
    }
  }
}

describe("TruncateTestDataInteractor (UseCase + InMemory DB)", () => {
  let db: InMemoryDatabase
  let dataAccess: InMemoryTestDataAccess
  let presenter: MockPresenter
  let usecase: TruncateTestDataInteractor<TruncateTestDataViewModel>

  beforeEach(() => {
    db = InMemoryDatabase.getInstance()
    db.clearAll()
    dataAccess = new InMemoryTestDataAccess(db)
    presenter = new MockPresenter()
    usecase = new TruncateTestDataInteractor(dataAccess, presenter)
  })

  it("should truncate all test data in the in-memory DB", async () => {
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

    await usecase.execute()

    // DBがクリアされていることを確認
    expect(db.userForTest.size).toBe(0)

    // Presenterの確認
    expect(presenter.getResponse()).toEqual({
      success: true,
      message: "Test data truncated successfully",
    })
  })

  it("should fail truncate all test data in the in-memory DB", async () => {
    vi.spyOn(dataAccess, "truncateAll").mockImplementationOnce(() => {
      throw new Error("Unexpected DB error")
    })
    
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

    await usecase.execute()

    expect(db.userForTest.size).toBe(2)

    // Presenterに正しいレスポンスが渡されたことを確認
    expect(presenter.getResponse()).toEqual({
      success: false,
      message: "Failed to truncate test data",
    })
  })
})
