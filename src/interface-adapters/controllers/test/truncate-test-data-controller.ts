import type { InputBoundary } from "@usecases/shared/input-boundary"
import type { OutputBoundary } from "@usecases/shared/output-boundary"
import type { TruncateTestDataViewModel } from "@interface-adapters/presenters/test/truncate-test-data-web-presenter"
import type { TruncateTestDataOutputData } from "@usecases/test/truncate-test-data/output-data"

export class TruncateTestDataController {
  constructor(
    private readonly usecase: InputBoundary<void>,
    private readonly presenter: OutputBoundary<TruncateTestDataOutputData,TruncateTestDataViewModel>
  ) {}

  async handle(): Promise<TruncateTestDataViewModel> {
    await this.usecase.execute()
    return this.presenter.getResponse()
  }
}