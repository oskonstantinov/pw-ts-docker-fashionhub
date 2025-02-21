import { test, expect } from '@playwright/test';
import { PageManager } from '../pageobjects/pageManager';
import data from '../test-data/data.json'

test.afterEach(async ({ page }) => {
  page.close()
})

test.describe('As a customer, ', () => {
  test('I want to verify that I can log in to application', async ({ page, request }) => {
    const pm = new PageManager(page, request)

    // open browser on the Home page
    await page.goto(pm.helper().getBaseUrl() + '/fashionhub/')

    // navigate to "Account" page
    await pm.navigateTo().accountPage()

    // perform login
    await pm.login().usingCredentials(data.username.toString(), data.encrypted_password.toString())

    // assert that user successfully logged in
    await expect(pm.login().logoutButton).toBeVisible()
  })
})
