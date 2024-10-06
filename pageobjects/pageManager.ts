import { APIRequestContext, Page } from "@playwright/test"
import { HelperBase } from "./helperBase"
import { NavigationPage } from './navigationPage'
import { HomePage } from "./homePage"
import { LoginPage } from "./loginPage"
import { GitHubPullRequestsPage } from "./gitHubPullRequests"

// manage page classes in one place to simplify imports in tests
export class PageManager {

  private readonly page: Page
  private readonly requestContext: APIRequestContext
  private readonly helperBase: HelperBase
  private readonly homePage: HomePage
  private readonly navigationPage: NavigationPage
  private readonly loginPage: LoginPage
  private readonly pullRequestsPage: GitHubPullRequestsPage

  constructor(page: Page, requestContext: APIRequestContext) {
    this.page = page
    this.requestContext = requestContext
    this.helperBase = new HelperBase(this.page, this.requestContext)
    this.navigationPage = new NavigationPage(this.page, this.requestContext)
    this.homePage = new HomePage(this.page, this.requestContext)
    this.loginPage = new LoginPage(this.page, this.requestContext)
    this.pullRequestsPage = new GitHubPullRequestsPage(this.page, this.requestContext)
  }

  helper() {
    return this.helperBase
  }

  navigateTo() {
    return this.navigationPage
  }

  home() {
    return this.homePage
  }

  login() {
    return this.loginPage
  }

  gitHubPullRequests() {
    return this.pullRequestsPage
  }
}