import { Locator, Page, expect } from "@playwright/test"
import { TestContext } from "../state/TestContext"
import { BasePage } from "./basePage"
import { parsePrice } from "../utils/helperMethods"

export class OrderConfirmationPage extends BasePage {
  readonly page: Page
  readonly lbl_confirmedOrder: Locator
  readonly lbl_totalPrice: Locator

  constructor(page: Page, ctx: TestContext) {
    super(page, ctx)
    this.page = page
    this.ctx = ctx
    this.lbl_confirmedOrder = this.mainIframe.locator("//h3[@class='h1 card-title']")
    this.lbl_totalPrice = this.mainIframe.locator("//dt[text()='Amount']/following-sibling::dd").first()
  }

  /**
   * Verify that Completed Transaction label is visible with appropriate text
   * Verify that Total Price is equal to total price of all bought products combined
   */
  async verifyCompletedTransaction() {
    console.log("verifyCompletedTransaction()")
    await this.assertInnerText(this.lbl_confirmedOrder, "YOUR ORDER IS CONFIRMED")

    const totalPrice = await this.lbl_totalPrice.innerText()
    const formatTotalPrice = parsePrice(totalPrice)

    expect(this.ctx.items.totalPrice).toBe(formatTotalPrice)
  }
}
