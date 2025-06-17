import { describe, it, expect, vi } from "vitest"
import { CreateUserController } from "@interface-adapters/controllers/user/create-user-controller"
import type { InputBoundary } from "@usecases/shared/input-boundary"
import type { CreateUserInputData } from "@/src/usecases/user/create-user/input-data"
import type { OutputBoundary } from "@usecases/shared/output-boundary"
import type { CreateUserOutputData } from "@/src/usecases/user/create-user/output-data"
import type { CreateUserViewModel } from "@interface-adapters/presenters/user/create-user-web-presenter"

describe("CreateUserController", () => {
  it("should convert request and pass it to usecase.execute", async () => {
    const mockUsecase: InputBoundary<CreateUserInputData> = {
      execute: vi.fn()
    }

    const mockPresenter: OutputBoundary<CreateUserOutputData,CreateUserViewModel> = {
      present: vi.fn(),
      getResponse: vi.fn().mockReturnValue({
        id: "1",
        message: "User created successfully"
      })
    }

    const controller = new CreateUserController(mockUsecase, mockPresenter)

    const request = { email: "test@example.com", name: "Alice" }
    const response = await controller.handle(request)

    expect(mockUsecase.execute).toHaveBeenCalledWith({
      email: "test@example.com",
      name: "Alice"
    })

    expect(response).toEqual({
      id: "1",
      message: "User created successfully"
    })
  })
})