import { CreateUserOutputData } from "./output-data";

export interface CreateUserOutputBoundary {
  present(output: CreateUserOutputData): void;
}
