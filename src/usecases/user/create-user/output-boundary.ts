import type { CreateUserOutputData } from "./output-data"

export interface CreateUserOutputBoundary<T = unknown> {
  present(data: CreateUserOutputData): void
  getResponse(): T
}