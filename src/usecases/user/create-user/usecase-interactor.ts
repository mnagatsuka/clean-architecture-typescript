import { User } from "../../../entities/user/user";
import { CreateUserInputBoundary } from "./input-boundary";
import { CreateUserInputData } from "./input-data";
import { CreateUserOutputBoundary } from "./output-boundary";
import { CreateUserOutputData } from "./output-data";
import { UserDataAccessInterface } from "./data-access-interface";

export class CreateUserInteractor implements CreateUserInteractor {
  constructor(
    private readonly userDataAccess: UserDataAccessInterface,
    private readonly presenter: CreateUserOutputBoundary,
  ) {}

  public async execute(input: CreateUserInputData): Promise<void> {
    const exists = await this.userDataAccess.existsByEmail(input.email);
    if (exists) {
      throw new Error("Email already exists");
    }

    const user = new User({
      id: input.id,
      email: input.email,
      name: input.name,
    });

    await this.userDataAccess.save(user);

    const output: CreateUserOutputData = {
      id: user["id"],
      email: user["email"].getValue(),
      name: user["name"],
      status: user["status"],
    };

    this.presenter.present(output);
  }
}
