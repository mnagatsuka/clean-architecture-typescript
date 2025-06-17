import type { TruncateTestDataOutputData } from "./output-data"
import type { TruncateTestDataAccessInterface } from "./data-access-interface"
import type { OutputBoundary } from "@usecases/shared/output-boundary"
import type { InputBoundary } from "@usecases/shared/input-boundary"

export class TruncateTestDataInteractor<TViewModel> implements InputBoundary<void> {
  constructor(
    private readonly dataAccess: TruncateTestDataAccessInterface,
    private readonly presenter: OutputBoundary<TruncateTestDataOutputData, TViewModel>
  ) {}

  async execute(): Promise<void> {
    try {
      await this.dataAccess.truncateAll()

      this.presenter.present({
        success: true,
      })
    } catch (error) {
      this.presenter.present({
        success: false,
        errorMessage: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }
}
