import { createItems } from "./Items"
import { createUser } from "./User"

export class TestContext {
  public user = createUser()
  public items = createItems()
}
