import { APIRequestContext, Locator, Page } from "@playwright/test"
import { HelperBase } from "./helperBase"

// class for the Home page /fashionhub/
export class HomePage extends HelperBase {

  // 'readonly' is the same as 'final' in Java
  readonly account: Locator
  readonly links: Locator


  // accept 'page' attribute with type 'Page' from the tests to be sure that we use same browser instance as test
  constructor(page: Page, requestContext: APIRequestContext) {
    // assign 'page' from the parent constructor of HelperBase
    super(page, requestContext)
    this.links = page.getByRole('link')
  }
}