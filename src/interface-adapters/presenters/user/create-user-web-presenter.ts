import type { CreateUserOutputData } from "@usecases/user/create-user/output-data"
import type { OutputBoundary } from "@usecases/shared/output-boundary"

export type CreateUserViewModel = {
  id: string
  message: string
}

export class CreateUserWebPresenter implements OutputBoundary<CreateUserOutputData, CreateUserViewModel> {
  private viewModel!: CreateUserViewModel

  present(data: CreateUserOutputData): void {
    this.viewModel = {
      id: data.id,
      message: "User created successfully",
    }
  }

  getResponse(): CreateUserViewModel {
    if (!this.viewModel) {
      throw new Error("getResponse() called before present().")
    }
    return this.viewModel
  }
}