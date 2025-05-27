import type { CreateUserInputBoundary } from "@src/usecases/user/create-user/input-boundary"
import type { CreateUserInputData } from "@src/usecases/user/create-user/input-data"
import type { CreateUserOutputBoundary } from "@src/usecases/user/create-user/output-boundary"
import type { CreateUserViewModel } from "@src/interface-adapters/presenters/user/create-user-web-presenter"

export type CreateUserRequest = {
  email: string
  name?: string
}

export class CreateUserController {
  constructor(
    private readonly usecase: CreateUserInputBoundary,
    private readonly presenter: CreateUserOutputBoundary<CreateUserViewModel>
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