import type { CreateUserOutputData } from "@src/usecases/user/create-user/output-data"
import type { CreateUserOutputBoundary } from "@src/usecases/user/create-user/output-boundary"

export type CreateUserViewModel = {
  id: string
  message: string
}

export class CreateUserWebPresenter implements CreateUserOutputBoundary<CreateUserViewModel> {
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