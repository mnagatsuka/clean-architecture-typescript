import type{ InputBoundary } from "@usecases/shared/input-boundary"
import type { CreateUserInputData } from "@usecases/user/create-user/input-data"
import type { OutputBoundary } from "@usecases/shared/output-boundary"
import type{ CreateUserOutputData } from "@usecases/user/create-user/output-data"
import type { CreateUserViewModel } from "@interface-adapters/presenters/user/create-user-web-presenter"

export type CreateUserRequest = {
  email: string
  name?: string
}

export class CreateUserController {
  constructor(
    private readonly usecase: InputBoundary<CreateUserInputData>,
    private readonly presenter: OutputBoundary<CreateUserOutputData, CreateUserViewModel>
  ) {}

  async handle(request: CreateUserRequest): Promise<CreateUserViewModel> {
    const inputData: CreateUserInputData = this.toInputData(request)
    await this.usecase.execute(inputData)
    return this.presenter.getResponse()
  }

  private toInputData(request: CreateUserRequest): CreateUserInputData {
    return {
      email: request.email,
      name: request.name,
    }
  }
}