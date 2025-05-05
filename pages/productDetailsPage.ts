import { Locator, Page, expect } from "@playwright/test"
import { TestContext } from "../state/TestContext"
import { BasePage } from "./basePage"
import { parsePrice } from "../utils/helperMethods"

export class ProductDetailsPage extends BasePage {
  readonly page: Page
  readonly btn_addToCart: Locator
  readonly btn_increaseQuantity: Locator
  readonly inp_wantedQuantity: Locator
  readonly lbl_productName: Locator
  readonly lbl_productPrice: Locator
  readonly lbl_modalProductName: Locator
  readonly lbl_modalProductPrice: Locator
  readonly lbl_modalProductQuantity: Locator
  readonly lbl_modalProductTotalPrice: Locator
  readonly lbl_modalTotalPrice: Locator

  constructor(page: Page, ctx: TestContext) {
    super(page, ctx)
    this.page = page
    this.ctx = ctx
    this.btn_addToCart = this.mainIframe.locator("[data-button-action='add-to-cart']")
    this.btn_increaseQuantity = this.mainIframe.locator("//button[@class='btn btn-touchspin js-touchspin bootstrap-touchspin-up']")
    this.inp_wantedQuantity = this.mainIframe.locator("#quantity_wanted")
    this.lbl_productName = this.mainIframe.locator(".h1")
    this.lbl_productPrice = this.mainIframe.locator(".current-price-value")
    this.lbl_modalProductName = this.mainIframe.locator("//h6[@class='h6 product-name']")
    this.lbl_modalProductPrice = this.mainIframe.locator("//p[@class='product-price']")
    this.lbl_modalProductQuantity = this.mainIframe.locator(".product-quantity strong")
    this.lbl_modalTotalPrice = this.mainIframe.locator("//p[@class='product-total']/span[@class='value']")
  }

  /**
   * Verify that details on product page are same as details in previos screens
   */
  async verifyProductDetails() {
    console.log("verifyProductDetails()")

    const productName = await this.lbl_productName.innerText()
    const productPrice = await this.lbl_productPrice.innerText()
    const formatPrice = parsePrice(productPrice)

    expect(productName).toBe(this.ctx.items.name?.toUpperCase())
    expect(formatPrice).toBe(this.ctx.items.price)
  }

  /**
   * Set expected @param quantity for item before adding it to a cart
   */
  async setQuantityWithButtons(quantity: number) {
    console.log("setQuantity()")
    this.ctx.items.quantity = quantity

    for (let i = 1; i < quantity; i++) {
      await this.btn_increaseQuantity.click()
    }
  }

  /**
   * Verify that set quanty is reflected appropriately on the page
   */
  async verifyWantedQuantity() {
    console.log("verifyItemQuantity()")
    const wantedQuantity = Number(await this.inp_wantedQuantity.inputValue())
    expect(this.ctx.items.quantity).toBe(wantedQuantity)
  }

  async addItemToCart() {
    console.log("addItemToCart()")
    await this.btn_addToCart.click()
  }

  /**
   * Verify that all product details are dispalyed appropriately on Product Modal Screen
   * Verify name, price, quantity
   *
   * Calculates the expected total price by adding the current item total (quantity × unit price) to the running total
   * Verifies that the calculated total price matches the total shown in the modal
   */
  async verifyProductModalDetails() {
    console.log("verifyProductModalDetails()")

    const productName = await this.lbl_modalProductName.innerText()
    const productQuantity = Number(await this.lbl_modalProductQuantity.innerText())
    const productPrice = await this.lbl_modalProductPrice.innerText()
    const formatPrice = Number(parsePrice(productPrice))

    expect(this.ctx.items.name).toBe(productName)
    expect(this.ctx.items.price).toBe(formatPrice)
    expect(this.ctx.items.quantity).toBe(Number(productQuantity))

    const totalPrice = await this.lbl_modalTotalPrice.innerText()
    const formatTotalPrice = parsePrice(totalPrice)

    this.ctx.items.totalPrice = Number(this.ctx.items.totalPrice) + productQuantity * formatPrice
    expect(this.ctx.items.totalPrice).toBe(formatTotalPrice)
  }
}
