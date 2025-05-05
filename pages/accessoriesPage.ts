import { Page } from "@playwright/test"
import { TestContext } from "../state/TestContext"
import { BasePage } from "./basePage"
import { parsePrice } from "../utils/helperMethods"

export class AccessoriesPage extends BasePage {
  readonly page: Page

  constructor(page: Page, ctx: TestContext) {
    super(page, ctx)
    this.page = page
    this.ctx = ctx
  }

  /**
   * Obtain Product Price
   * Open Product Details for desired product @param name
   *
   * Store product name in testContext
   * Store formated product price in testContext
   */
  async openProductDetails(name: string) {
    console.log("openProductDetails()")

    const lbl_productName = this.mainIframe.locator(`//a[text()='${name}']`)
    const lbl_productPrice = lbl_productName.locator("xpath=/ancestor::div[@class='product-description']//span[@aria-label='Price']")

    const productPrice = await lbl_productPrice.innerText()
    const formatPrice = parsePrice(productPrice)

    this.ctx.items.name = name
    this.ctx.items.price = formatPrice

    await lbl_productName.click()
    await this.fixedWait(3)
  }
}
