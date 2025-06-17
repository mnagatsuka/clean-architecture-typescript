import { describe, it, expect, vi } from "vitest"
import { TruncateTestDataController } from "@interface-adapters/controllers/test/truncate-test-data-controller"
import type { InputBoundary } from "@usecases/shared/input-boundary"
import type { OutputBoundary } from "@usecases/shared/output-boundary"
import type { TruncateTestDataOutputData } from "@/src/usecases/test/truncate-test-data/output-data"
import type { TruncateTestDataViewModel } from "@interface-adapters/presenters/test/truncate-test-data-web-presenter"

describe("TruncateTestDataController", () => {
  it("should convert request and pass it to usecase.execute", async () => {
    const mockUsecase: InputBoundary<void> = {
      execute: vi.fn()
    }

    const mockPresenter: OutputBoundary<TruncateTestDataOutputData,TruncateTestDataViewModel> = {
      present: vi.fn(),
      getResponse: vi.fn().mockReturnValue({
        success: true,
        message: "Test data truncated successfully"
      })
    }

    const controller = new TruncateTestDataController(mockUsecase, mockPresenter)

    const response = await controller.handle()

    expect(mockUsecase.execute).toHaveBeenCalledOnce()
    expect(mockPresenter.getResponse).toHaveBeenCalledOnce()
    expect(response).toEqual({
      success: true,
      message: "Test data truncated successfully"
    })
  })

  it("should handle failure in usecase.execute and present error", async () => {
    const mockUsecase: InputBoundary<void> = {
      execute: vi.fn()
    }

    const mockPresenter: OutputBoundary<TruncateTestDataOutputData, TruncateTestDataViewModel> = {
      present: vi.fn(),
      getResponse: vi.fn().mockReturnValue({
        success: false,
        message: "Failed to truncate test data"
      })
    }

    const controller = new TruncateTestDataController(mockUsecase, mockPresenter)

    const response = await controller.handle()

    expect(mockUsecase.execute).toHaveBeenCalledOnce()
    expect(mockPresenter.getResponse).toHaveBeenCalledOnce()
    expect(response).toEqual({
      success: false,
      message: "Failed to truncate test data"
    })
  })
})