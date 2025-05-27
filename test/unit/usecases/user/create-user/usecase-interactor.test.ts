import { describe, expect, it, vi } from "vitest"
import { Email } from "@src/entities/user/email"
import type { CreateUserDataAccessInterface } from "@src/usecases/user/create-user/data-access-interface"
import type { CreateUserInputData } from "@src/usecases/user/create-user/input-data"
import type { CreateUserOutputBoundary } from "@src/usecases/user/create-user/output-boundary"
import { CreateUserInteractor } from "@src/usecases/user/create-user/usecase-interactor"
import type { IdGenerator } from "@src/usecases/shared/id-generator/id-generator"

describe("CreateUserInteractor", () => {
  const input: CreateUserInputData = {
    email: "test@example.com",
    name: "Test User",
  }

  const fakeId = "user_123456"

  const mockIdGenerator: IdGenerator = {
    generate: vi.fn().mockReturnValue(fakeId),
  }

  it("should create a user and call presenter with output", async () => {
    const mockDataAccess: CreateUserDataAccessInterface = {
      save: vi.fn(),
      existsByEmail: vi.fn().mockResolvedValue(false),
    }

    const mockPresenter: CreateUserOutputBoundary = {
      present: vi.fn(),
      getResponse: vi.fn().mockReturnValue({ id: "1", message: "User created successfully" }),
    }

    const interactor = new CreateUserInteractor(mockDataAccess, mockPresenter, mockIdGenerator)
    await interactor.execute(input)

    expect(mockIdGenerator.generate).toHaveBeenCalled()
    expect(mockDataAccess.existsByEmail).toHaveBeenCalledWith(expect.any(Email))
    expect(mockDataAccess.save).toHaveBeenCalled()
    expect(mockPresenter.present).toHaveBeenCalledWith(
      expect.objectContaining({
        id: fakeId,
        email: "test@example.com",
        name: "Test User",
        status: "INACTIVE",
      }),
    )
  })

  it("should throw if email already exists", async () => {
    const mockDataAccess: CreateUserDataAccessInterface = {
      save: vi.fn(),
      existsByEmail: vi.fn().mockResolvedValue(true),
    }

    const mockPresenter: CreateUserOutputBoundary = {
      present: vi.fn(),
      getResponse: vi.fn(),
    }

    const interactor = new CreateUserInteractor(mockDataAccess, mockPresenter, mockIdGenerator)

    await expect(() => interactor.execute(input)).rejects.toThrow("Email already exists")
    expect(mockDataAccess.save).not.toHaveBeenCalled()
    expect(mockPresenter.present).not.toHaveBeenCalled()
  })
})
