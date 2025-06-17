import type { IdGenerator } from "@usecases/shared/id-generator/id-generator"

export class UuidGenerator implements IdGenerator {
  generate(): string {
    return crypto.randomUUID()
  }
}
