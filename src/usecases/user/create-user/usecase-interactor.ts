import { Email } from "@/entities/user/email"
import { User } from "@/entities/user/user"
import type { IdGenerator } from "@/usecases/shared/id-generator/id-generator"
import type { CreateUserInputBoundary } from "./input-boundary"
import type { CreateUserInputData } from "./input-data"
import type { CreateUserOutputBoundary } from "./output-boundary"
import type { CreateUserOutputData } from "./output-data"
import type { CreateUserDataAccessInterface } from "./data-access-interface"

export class CreateUserInteractor implements CreateUserInputBoundary {
  constructor(
    private readonly userDataAccess: CreateUserDataAccessInterface,
    private readonly presenter: CreateUserOutputBoundary,
    private readonly idGenerator: IdGenerator
  ) {}

  public async execute(input: CreateUserInputData): Promise<void> {
    const email = new Email(input.email)

    const exists = await this.userDataAccess.existsByEmail(email)
    if (exists) {
      throw new Error("Email already exists")
    }

    const user = new User({
      id: this.idGenerator.generate(),
      email,
      name: input.name,
    })

    await this.userDataAccess.save(user)

    const output: CreateUserOutputData = {
      id: user.id,
      email: user.email.getValue(),
      name: user.name,
      status: user.status,
    }

    this.presenter.present(output)
  }
}
