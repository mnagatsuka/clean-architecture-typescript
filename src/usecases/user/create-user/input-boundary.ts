import { CreateUserInputData } from "./input-data";

export interface CreateUserInputBoundary {
  execute(input: CreateUserInputData): Promise<void>;
}
