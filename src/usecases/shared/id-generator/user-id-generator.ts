import type { IdGenerator } from "./id-generator"

export class UserIdGenerator implements IdGenerator {
  constructor(private readonly base: IdGenerator) {}

  generate(): string {
    return `user_${this.base.generate()}`
  }
}
