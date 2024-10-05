import { test } from '@playwright/test'
import { PageManager } from '../pageobjects/pageManager'
import { getBaseUrl}  from '../config.ts'

test.afterEach(async ({ page }) => {
  page.close()
})

test.describe('As a tester, ', () => {
  test('I want to make sure there are no console errors when I visit home page', async ({ page, request }) => {
    const pm = new PageManager(page, request)

    // set page listener, which fail the test if there is any error in console
    pm.helper().consoleErrorsListener()

    await page.goto(getBaseUrl() + '/fashionhub/')
  })

  test('I want to check if an each link from the home page return expected source code', async ({ page, request, baseURL }) => {
    const pm = new PageManager(page, request)

    // navigate to "Home page"
    await page.goto(getBaseUrl() + '/fashionhub/')

    // collect all links listed on "Home page" and validate their accessibility
    await pm.helper().checkPageLinksAccessible(pm.home().links, getBaseUrl(), /200|^30\d/)
  })
})
