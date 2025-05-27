import { randomUUID } from "node:crypto"
import type { IdGenerator } from "@src/usecases/shared/id-generator/id-generator"

export class UuidGenerator implements IdGenerator {
  generate(): string {
    return randomUUID()
  }
}
