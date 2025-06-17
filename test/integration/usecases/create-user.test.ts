import { describe, it, expect, beforeEach, vi } from "vitest"
import { CreateUserInteractor } from "@usecases/user/create-user/usecase-interactor"
import { InMemoryUserDataAccess } from "@interface-adapters/gateways/user/in-memory-user-data-access"
import { Email } from "@entities/user/email"
import type { IdGenerator } from "@usecases/shared/id-generator/id-generator"
import type { OutputBoundary } from "@usecases/shared/output-boundary"
import type { CreateUserOutputData } from "@usecases/user/create-user/output-data"
import type { CreateUserViewModel } from "@interface-adapters/presenters/user/create-user-web-presenter"
import { InMemoryDatabase } from "@frameworks-drivers/db/inmemory/in-memory-database"

class MockPresenter implements OutputBoundary<CreateUserOutputData, CreateUserViewModel> {
  private response!: CreateUserViewModel

  getResponse(): CreateUserViewModel {
    return this.response
  }

  present(output: CreateUserOutputData): void {
    this.response = {
      id: output.id,
      message: "User created successfully",
    }
  }
}

describe("CreateUserInteractor (UseCase + InMemory DB)", () => {
  let dataAccess: InMemoryUserDataAccess
  let presenter: MockPresenter
  let usecase: CreateUserInteractor<CreateUserViewModel>
  let mockIdGenerator: IdGenerator

  beforeEach(() => {
    const db = InMemoryDatabase.getInstance()
    db.clearAll()
    dataAccess = new InMemoryUserDataAccess(db)
    presenter = new MockPresenter()
    mockIdGenerator = {
      generate: vi.fn().mockReturnValue("user_123456"),
    }
    usecase = new CreateUserInteractor(dataAccess, presenter, mockIdGenerator)
  })


  it("should create a user and save it in the in-memory DB", async () => {
    const input = { email: "test@example.com", name: "Alice" }

    await usecase.execute(input)

    const exists = await dataAccess.existsByEmail(new Email(input.email))
    expect(exists).toBe(true)

    // IDが生成されたことを確認
    expect(mockIdGenerator.generate).toHaveBeenCalled()

    // Presenterに正しいレスポンスが渡されたことを確認
    expect(presenter.getResponse()).toEqual({
      id: "user_123456",
      message: "User created successfully",
    })
  })

  it("should throw if email already exists", async () => {
    const input = { email: "test@example.com", name: "Alice" }

    await usecase.execute(input)

    await expect(usecase.execute(input)).rejects.toThrowError(/Email already exists/i)
    // 2回目は例外でID生成されないので1回だけ
    expect(mockIdGenerator.generate).toHaveBeenCalledTimes(1)
  })
  
  it("should handle unexpected errors gracefully", async () => {
      const input = { email: "error@example.com", name: "ErrorCase" }

      // save メソッドを強制的にエラーにする
      vi.spyOn(dataAccess, "save").mockImplementationOnce(() => {
        throw new Error("Unexpected DB error")
      })

      await expect(usecase.execute(input)).rejects.toThrow("Unexpected DB error")

      // IDは生成されたが、保存時にエラーで停止しているはず
      expect(mockIdGenerator.generate).toHaveBeenCalledTimes(1)
  })
})
