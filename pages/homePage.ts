import { Page } from "@playwright/test"
import { TestContext } from "../state/TestContext"
import { BasePage } from "./basePage"

export class HomePage extends BasePage {
  readonly page: Page

  constructor(page: Page, ctx: TestContext) {
    super(page, ctx)
    this.page = page
    this.ctx = ctx
  }
}
