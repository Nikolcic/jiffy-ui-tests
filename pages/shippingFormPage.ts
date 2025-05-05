import { Locator, Page } from "@playwright/test"
import { TestContext } from "../state/TestContext"
import { BasePage } from "./basePage"
import { getFiveRandomZipDigits, getRandomChars } from "../utils/helperMethods"

export class ShippingFormPage extends BasePage {
  readonly page: Page
  readonly btn_registerNewCustomer: Locator
  readonly btn_confirmAddress: Locator
  readonly btn_confirmDeliveryOptions: Locator
  readonly btn_placeOrder: Locator
  readonly inp_firstName: Locator
  readonly inp_lastName: Locator
  readonly inp_email: Locator
  readonly inp_address: Locator
  readonly inp_zip: Locator
  readonly inp_city: Locator
  readonly inp_shippingMessage: Locator
  readonly cb_termsAndConditions: Locator
  readonly cb_customDataPrivacy: Locator
  readonly cb_paymentTermsAndConditions: Locator
  readonly rb_gender: Locator
  readonly rb_paymentOption: Locator
  readonly dd_country: Locator

  constructor(page: Page, ctx: TestContext) {
    super(page, ctx)
    this.page = page
    this.ctx = ctx
    this.btn_registerNewCustomer = this.mainIframe.locator("//button[@data-link-action='register-new-customer']")
    this.btn_confirmAddress = this.mainIframe.locator("//button[@name='confirm-addresses']")
    this.btn_confirmDeliveryOptions = this.mainIframe.locator("//button[@name='confirmDeliveryOption']")
    this.btn_placeOrder = this.mainIframe.locator("//button[text()[contains(.,'order')]]")
    this.rb_gender = this.mainIframe.locator("#field-id_gender-1")
    this.inp_firstName = this.mainIframe.locator("#field-firstname")
    this.inp_lastName = this.mainIframe.locator("#field-lastname")
    this.inp_email = this.mainIframe.locator("#field-email").first()
    this.inp_address = this.mainIframe.locator("#field-address1")
    this.inp_zip = this.mainIframe.locator("#field-postcode")
    this.inp_city = this.mainIframe.locator("#field-city")
    this.inp_shippingMessage = this.mainIframe.locator("#delivery textarea")
    this.cb_termsAndConditions = this.mainIframe.locator("//label[text()[contains(.,'terms and conditions')]]")
    this.cb_customDataPrivacy = this.mainIframe.locator("//label[text()[contains(.,'Customer data privacy')]]")
    this.cb_paymentTermsAndConditions = this.mainIframe.locator("//input[@id='conditions_to_approve[terms-and-conditions]']")
    this.rb_paymentOption = this.mainIframe.locator("#payment-option-1")
    this.dd_country = this.mainIframe.locator("#field-id_country")
  }

  /**
   * Fills in the personal information form with randomized user data and submits the registration
   */
  async fillUpPersonalInfo() {
    console.log("fillUpPersonalInfo()")

    this.ctx.user.firstName = `First${getRandomChars(4)}`
    this.ctx.user.lastName = `Last${getRandomChars(4)}`
    this.ctx.user.email = `${this.ctx.user.firstName}@mail.com`

    await this.sendText(this.inp_firstName, this.ctx.user.firstName)
    await this.sendText(this.inp_lastName, this.ctx.user.lastName)
    await this.sendText(this.inp_email, this.ctx.user.email)

    await this.cb_termsAndConditions.click()
    await this.cb_customDataPrivacy.click()
    await this.btn_registerNewCustomer.click()
  }

  /**
   * Fills in the address information form with randomized user address data
   *
   * Value for dd_country is hard coded just for testing purpose
   */
  async fillUpAdressInfo() {
    console.log("fillUpAdressInfo()")
    this.ctx.user.address = `Address${getRandomChars(3)}`
    this.ctx.user.zip = getFiveRandomZipDigits()

    await this.assertInputValue(this.inp_firstName.last(), String(this.ctx.user.firstName))
    await this.assertInputValue(this.inp_lastName.last(), String(this.ctx.user.lastName))
    await this.sendText(this.inp_address, this.ctx.user.address)
    await this.sendText(this.inp_zip, this.ctx.user.zip)
    await this.dd_country.selectOption("France")
    await this.sendText(this.inp_city, String(this.ctx.user.city))

    await this.page.waitForTimeout(1500)
    await this.btn_confirmAddress.click()
  }

  /**
   * Fills in the shipping comment form with randomized  data and proceed to next step
   */
  async fillUpShippingInfo() {
    console.log("fillUpShippingInfo()")
    await this.sendText(this.inp_shippingMessage, String(getRandomChars(10)))
    await this.btn_confirmDeliveryOptions.click()
  }

  async finishPayment() {
    console.log("finishPayment()")
    await this.rb_paymentOption.click()
    await this.cb_paymentTermsAndConditions.click()
    await this.btn_placeOrder.click()
  }
}
