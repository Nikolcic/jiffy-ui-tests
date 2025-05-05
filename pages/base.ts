import { expect, Locator, Page } from "@playwright/test"
import { config } from "dotenv"
import { resolve } from "path"
import { Global } from "../state/Global"
import { TestContext } from "../state/TestContext"

export class Base {
  readonly page: Page
  protected ctx: TestContext

  constructor(page: Page, ctx: TestContext) {
    this.page = page
    this.ctx = ctx
  }

  private static getEnvFile(): string {
    switch (process.env.NODE_ENV) {
      case "web":
        return ".env.web"
      case "mobile":
        return ".env.mobile"
      default:
        throw new Error("Invalid NODE_ENV")
    }
  }

  static initializeEnvironmentPresta() {
    console.log("initializeEnvironmentPresta()")
    const envFile = this.getEnvFile()
    config({ path: resolve(__dirname, "..", envFile) })

    switch (process.env.environment) {
      case "web":
        Global.presta_URL = process.env.PRESTA_TEST_URL || ""
        break
      case "mobile":
        Global.presta_URL = process.env.PRESTA_TEST_URL || ""
        break
      default:
        throw new Error("Invalid NODE_ENV")
    }
  }

  async assertInputValue(selector: Locator, value: string) {
    const innerValue = await selector.inputValue()
    expect(innerValue).toBe(value)
  }

  async assertInnerText(selector: Locator, value: string) {
    const elementInnerText = await selector.innerText()
    expect(elementInnerText).toBe(value)
  }

  async fixedWait(seconds: number) {
    await this.page.waitForTimeout(seconds * 1000)
  }

  async sendText(element: Locator, text: string) {
    await element.waitFor()
    await element.fill(text)
  }
}
