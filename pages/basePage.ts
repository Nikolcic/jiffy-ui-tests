import { FrameLocator, Locator, Page } from "@playwright/test"
import { Base } from "./base"
import { TestContext } from "../state/TestContext"

export class BasePage extends Base {
  readonly page: Page
  readonly mainIframe: FrameLocator
  readonly btn_accessories: Locator
  readonly btn_proceedToCheckout: Locator

  constructor(page: Page, ctx: TestContext) {
    super(page, ctx)
    this.page = page
    this.ctx = ctx
    this.mainIframe = page.frameLocator("iframe[id='framelive']")
    this.btn_accessories = this.mainIframe.locator("//li[@id='category-6']/a[contains(@href, 'accessories')]")
    this.btn_proceedToCheckout = this.mainIframe.locator("//a[text()='Proceed to checkout']")
  }

  /**
   * Navigate to Accessories Page
   */
  async goToAccessories() {
    console.log("goToAccessories()")
    await this.btn_accessories.click()
  }

  /**
   * Proceed to Checkout
   */
  async proceedToCheckout() {
    console.log("proceedToCheckout()")
    await this.btn_proceedToCheckout.click()
    await this.fixedWait(2)
  }
}
