import { describe, expect, it, vi } from "vitest"
import type { TruncateTestDataAccessInterface } from "@usecases/test/truncate-test-data/data-access-interface"
import type { OutputBoundary } from "@usecases/shared/output-boundary"
import { TruncateTestDataInteractor } from "@usecases/test/truncate-test-data/usecase-interactor"
import type { TruncateTestDataOutputData } from "@usecases/test/truncate-test-data/output-data"

describe("TruncateTestDataInteractor", () => {

  it("should truncate all test data and call presenter with output", async () => {
    const mockDataAccess: TruncateTestDataAccessInterface = {
      truncateAll: vi.fn(),
    }

    const mockPresenter: OutputBoundary<TruncateTestDataOutputData, unknown> = {
      present: vi.fn(),
      getResponse: vi.fn().mockReturnValue({ success: true }),
    }

    const interactor = new TruncateTestDataInteractor(mockDataAccess, mockPresenter)
    await interactor.execute()

    expect(mockDataAccess.truncateAll).toHaveBeenCalled()
    expect(mockPresenter.present).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
      }),
    )
  })

  it("should call presenter with error message if truncateAll fails", async () => {
    const mockDataAccess: TruncateTestDataAccessInterface = {
      truncateAll: vi.fn().mockRejectedValue(new Error("Server Error")),
    }

    const mockPresenter: OutputBoundary<TruncateTestDataOutputData, unknown> = {
      present: vi.fn(),
      getResponse: vi.fn(),
    }

    const interactor = new TruncateTestDataInteractor(mockDataAccess, mockPresenter)
    await interactor.execute()

    expect(mockDataAccess.truncateAll).toHaveBeenCalled()
    expect(mockPresenter.present).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        errorMessage: "Server Error",
      })
    )
  })
})
