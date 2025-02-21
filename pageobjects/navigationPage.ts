import { APIRequestContext, Locator, Page } from "@playwright/test"
import { HelperBase } from "./helperBase"

// class for the navigation bar
export class NavigationPage extends HelperBase {

  // 'readonly' is the same as 'final' in Java
  readonly account: Locator


  // accept 'page' attribute with type 'Page' from the tests to be sure that we use same browser instance as test
  constructor(page: Page, requestContext: APIRequestContext) {
    // assign 'page' and 'requestContext' from the parent constructor of HelperBase class
    super(page, requestContext)
    this.account = page.getByText('Account')
  }

  /**
   * This method allows to navigate to "Account" page from the navbar
   */
  async accountPage() {
    await this.account.click()
  }
}