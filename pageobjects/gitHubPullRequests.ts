import { APIRequestContext, Locator, Page } from "@playwright/test"
import { HelperBase } from "./helperBase"

// page class for our GitHub repository, page with pull requests
export class GitHubPullRequestsPage extends HelperBase {

  readonly url: string
  readonly lastPageText: Locator

  constructor(page: Page, requestContext: APIRequestContext) {
    super(page, requestContext)
    this.url = 'https://github.com/appwrite/appwrite/pulls'
    this.lastPageText = page.locator('[aria-label~="Page"]').last()
  }
}