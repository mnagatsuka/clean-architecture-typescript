import type { OutputBoundary } from "@usecases/shared/output-boundary"
import type { TruncateTestDataOutputData } from "@usecases/test/truncate-test-data/output-data"

export type TruncateTestDataViewModel = {
  success: boolean
  message: string
}

export class TruncateTestDataWebPresenter
  implements OutputBoundary<TruncateTestDataOutputData,TruncateTestDataViewModel>
{
  private viewModel!: TruncateTestDataViewModel

  present(data: TruncateTestDataOutputData): void {
    this.viewModel = {
      success: data.success,
      message: data.success
        ? "Test data truncated successfully"
        : "Failed to truncate test data",
    }
  }

  getResponse(): TruncateTestDataViewModel {
    if (!this.viewModel) {
      throw new Error("getResponse() called before present().")
    }
    return this.viewModel
  }
}
