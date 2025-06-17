import { createTestModule } from "./test"
import { createUserModule } from "./user"

export const di = {
  user: createUserModule(),
  test: createTestModule(),
}
