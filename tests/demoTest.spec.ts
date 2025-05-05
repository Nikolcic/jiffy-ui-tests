import { test } from "@playwright/test"
import { Base } from "../pages/base"
import { Global } from "../state/Global"
import { HomePage } from "../pages/homePage"
import { TestContext } from "../state/TestContext"
import { AccessoriesPage } from "../pages/accessoriesPage"
import { ProductDetailsPage } from "../pages/productDetailsPage"
import { ShoppingCartPage } from "../pages/shoppingCartPage"
import { ShippingFormPage } from "../pages/shippingFormPage"
import { OrderConfirmationPage } from "../pages/orderConfirmationPage"

let ctx: TestContext
let homePage: HomePage
let accessoriesPage: AccessoriesPage
let productDetailsPage: ProductDetailsPage
let shoppingCartPage: ShoppingCartPage
let shippingFormPage: ShippingFormPage
let orderConfirmationPage: OrderConfirmationPage

test.describe.configure({ mode: "parallel" })

test.beforeAll(async () => {
  Base.initializeEnvironmentPresta()
})

test.beforeEach(async ({ page }, testInfo) => {
  console.log("\n" + `[TEST STARTED] - ${testInfo.title}` + "\n")

  ctx = new TestContext()
  homePage = new HomePage(page, ctx)
  accessoriesPage = new AccessoriesPage(page, ctx)
  productDetailsPage = new ProductDetailsPage(page, ctx)
  shoppingCartPage = new ShoppingCartPage(page, ctx)
  shippingFormPage = new ShippingFormPage(page, ctx)
  orderConfirmationPage = new OrderConfirmationPage(page, ctx)

  await page.goto(Global.presta_URL)
})

test.afterEach(async ({page}, testInfo) => {
  console.log("\n" + `[TEST FINISHED] - with status [${testInfo.status}]` + "\n")
  await page.close()
})

test("Complete Checkout with 1 item", async () => {
  await homePage.goToAccessories()
  await accessoriesPage.openProductDetails(Global.items.item1)
  await productDetailsPage.verifyProductDetails()
  await productDetailsPage.setQuantityWithButtons(5)
  await productDetailsPage.verifyWantedQuantity()
  await productDetailsPage.addItemToCart()
  await productDetailsPage.verifyProductModalDetails()
  await productDetailsPage.proceedToCheckout()
  await shoppingCartPage.verifyShoppingCartDetails()
  await shoppingCartPage.proceedToCheckout()
  await shippingFormPage.fillUpPersonalInfo()
  await shippingFormPage.fillUpAdressInfo()
  await shippingFormPage.fillUpShippingInfo()
  await shippingFormPage.finishPayment()
  await orderConfirmationPage.verifyCompletedTransaction()
})

test("Complete Checkout with 2 items", async () => {
  await homePage.goToAccessories()
  await accessoriesPage.openProductDetails(Global.items.item2)
  await productDetailsPage.verifyProductDetails()
  await productDetailsPage.setQuantityWithButtons(5)
  await productDetailsPage.verifyWantedQuantity()
  await productDetailsPage.addItemToCart()
  await productDetailsPage.verifyProductModalDetails()
  await productDetailsPage.proceedToCheckout()
  await shoppingCartPage.verifyShoppingCartDetails()
  await shoppingCartPage.continueShopping()
  
  await homePage.goToAccessories()
  await accessoriesPage.openProductDetails(Global.items.item3)
  await productDetailsPage.verifyProductDetails()
  await productDetailsPage.setQuantityWithButtons(3)
  await productDetailsPage.verifyWantedQuantity()
  await productDetailsPage.addItemToCart()
  await productDetailsPage.verifyProductModalDetails()

  await productDetailsPage.proceedToCheckout()
  await shoppingCartPage.verifyShoppingCartDetails()
  await shoppingCartPage.proceedToCheckout()
  await shippingFormPage.fillUpPersonalInfo()
  await shippingFormPage.fillUpAdressInfo()
  await shippingFormPage.fillUpShippingInfo()
  await shippingFormPage.finishPayment()
  await orderConfirmationPage.verifyCompletedTransaction()
})