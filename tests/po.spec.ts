import { test } from '@playwright/test'
import { PageManager } from '../pageobjects/pageManager'
import data from '../test-data/data.json'

test.afterEach(async ({ page }) => {
  page.close()
})

test.describe('As a product owner,', () => {
  test('I want to see how many open pull requests are there for our product', async ({ page, request }) => {
    const pm = new PageManager(page, request)
    // Initialize an array of objects to store all pull requests
    let allPullRequests: { prName: string, createdDate: string, author: string }[] = []

    // Open pull requests web page to identify how many pages we have in pagination block
    await page.goto(pm.gitHubPullRequests().url)
    const lastPageText = await pm.gitHubPullRequests().lastPageText.textContent()
    const num = Number(lastPageText)

    // Start from 1 to match the pagination
    for (let i = 1; i <= num; i++) {
      const resp = await pm.helper().getListOfOpenPullRequests(data.encrypted_git_token, 'appwrite', 'appwrite', i)
      const responseBody = await resp.json()

      // If responseBody isn't empty, map values with array for current page
      if (responseBody.length > 0) {
        const pullRequests = responseBody.map((pr: any) => ({
          prName: pr.title,
          createdDate: pr.created_at,
          author: pr.user.login,
        }))

        // Add the pullRequests of the current page to the overall array
        allPullRequests = allPullRequests.concat(pullRequests)
      }
    }

    // prepare data for CSV file row by row using reduce()
    const dataCSV = allPullRequests.reduce((row, pr) => {
      row += `${pr.prName}, ${pr.createdDate}, ${pr.author}\n`;
      return row
    }, `PR Name, Created Date, Author\n`) // column names for csv file

    // generate CSV based on collected data
    pm.helper().generateCSVFile('./test-results/open_pull_requests', dataCSV)
  })
})