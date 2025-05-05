import { Locator, Page, expect } from "@playwright/test"
import { TestContext } from "../state/TestContext"
import { BasePage } from "./basePage"
import { parsePrice } from "../utils/helperMethods"

export class ShoppingCartPage extends BasePage {
  readonly page: Page
  readonly btn_continueShopping: Locator
  readonly lbl_shoppingCart: Locator
  readonly lbl_totalPrice: Locator

  constructor(page: Page, ctx: TestContext) {
    super(page, ctx)
    this.page = page
    this.ctx = ctx
    this.btn_continueShopping = this.mainIframe.locator("//a[text()[contains(.,'Continue shopping')]]")
    this.lbl_shoppingCart = this.mainIframe.locator(".h1")
    this.lbl_totalPrice = this.mainIframe.locator("//div[@class='cart-summary-line cart-total']//span[@class='value']")
  }

  /**
   * Asserts that the shopping cart label (or section) is visible, ensuring the cart is open or displayed
   * Verifies the shopping cart's total price matches the expected total from the test context
   * Retrieves and parses the total price displayed in the shopping cart
   * Compares the parsed total price with the expected total stored in this.ctx.items.totalPrice
   **/
  async verifyShoppingCartDetails() {
    console.log("verifyShoppingCartDetails()")

    await expect(this.lbl_shoppingCart).toBeVisible()

    const totalPrice = await this.lbl_totalPrice.innerText()
    const formatTotalPrice = parsePrice(totalPrice)

    expect(this.ctx.items.totalPrice).toBe(formatTotalPrice)
  }

  async continueShopping() {
    console.log("continueShopping()")
    await this.btn_continueShopping.click()
  }
}
