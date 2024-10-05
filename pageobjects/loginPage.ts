import { APIRequestContext, expect, Locator, Page } from "@playwright/test"
import { HelperBase } from "./helperBase"
import testdata from '../test-data/data.json'

export class LoginPage extends HelperBase {

  readonly loginContainer: Locator
  readonly usernameField: Locator
  readonly passwordField: Locator
  readonly loginButton: Locator
  readonly logoutButton: Locator

  constructor(page: Page, requestContext: APIRequestContext) {
    super(page, requestContext)
    this.loginContainer = page.locator('.login-container')
    this.usernameField = page.locator('#username')
    this.passwordField = page.locator('#password')
    this.loginButton = page.locator('[type="submit"]')
    this.logoutButton = page.getByRole('button', {name: 'Logout'})
  }

  /**
   * This method perform login using username and password.
   * We expect to use encrypted passwords
   * @param username - username of our test user
   * @param encryptedPassword - encrypted password
   */
  async usingCredentials(username: string, encryptedPassword: string) {
    await expect(this.loginContainer).toBeVisible()
    // fill credentials and perform login
    await this.usernameField.fill(username)
    const decryptedPassword = this.decryptString(encryptedPassword, testdata.secret_key.toString())
    await this.passwordField.fill(decryptedPassword)
    await this.loginButton.click()
  }
}