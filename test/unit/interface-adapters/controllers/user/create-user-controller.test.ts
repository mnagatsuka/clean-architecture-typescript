import { describe, it, expect, vi } from "vitest"
import { CreateUserController } from "@/interface-adapters/controllers/user/create-user-controller"
import type { CreateUserInputBoundary } from "@/usecases/user/create-user/input-boundary"
import type { CreateUserOutputBoundary } from "@/usecases/user/create-user/output-boundary"
import type { CreateUserViewModel } from "@/interface-adapters/presenters/user/create-user-web-presenter"

describe("CreateUserController", () => {
  it("should convert request and pass it to usecase.execute", async () => {
    const mockUsecase: CreateUserInputBoundary = {
      execute: vi.fn()
    }

    const mockPresenter: CreateUserOutputBoundary<CreateUserViewModel> = {
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