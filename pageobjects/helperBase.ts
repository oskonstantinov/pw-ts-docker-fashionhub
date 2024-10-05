import { Locator, Page, expect, APIRequestContext } from "@playwright/test"
import CryptoJS from 'crypto-js'
import testdata from '../test-data/data.json'
import fs from 'fs'

export class HelperBase {

  readonly page: Page
  readonly requestContext: APIRequestContext

  constructor(page: Page, requestContext: APIRequestContext) {
    this.page = page
    this.requestContext = requestContext
  }

  /**
   * This method encrypt the input string to store it in secure way.
   * Result will be printed into console, where you need to copy that into data source
   * @param inputString - string to encrypt
   * @param secretKey - secret key to perform encryption
   */
  public encryptString(inputString: string, secretKey: string) {
    const encryptedString = CryptoJS.AES.encrypt(inputString, secretKey).toString();
    console.log(encryptedString)
  }

  /**
   * This method decrypt string, previously encrypted.
   * Decrypted string you may use as usual
   * @param encryptedString - string to decrypt
   * @param secretKey - secret key to perform decryption, should be the same as for encryption
   * @returns return decrypted string
   */
  public decryptString(encryptedString: string, secretKey: string) {
    const bytes = CryptoJS.AES.decrypt(encryptedString, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8)
  }

  /**
   * This listener is checking, does we have any errors in the browser console.
   * If yes, we save that failure, but continue the test to ensure about other assertions.
   * Assertion is a part of page object method based on KISS principle.
   * If we would like to make assertion in test, then there is no sense to have universal method
   */
  public consoleErrorsListener() {
    this.page.on('console', (msg) => {
      expect.soft(msg.type() == 'error').toBeFalsy()
    })
  }

  /**
   * This method allows to check accessibility of links, listed on the page, via API GET request.
   * Assume that all links on our pages will be within the same domain, otherwise method should looks differently.
   * Assertion is a part of page object method based on KISS principle.
   * If we move out assertion to test, we will require to add "return" for the array of status codes and increase complexity of the test itself
   * @param links - locator for all links on the required page
   * @param domain - domain part of URL 
   * @param regex - regular expression pattern for matching status code
   */
  public async checkPageLinksAccessible(links: Locator, domain: string, regex: RegExp) {
    for (let link of await links.all()) {
      let endpoint = await link.getAttribute('href')
      let url = `${domain}${endpoint}`
      let response = await this.requestContext.get(url, {})
      // using "soft" assertion to be sure that we iterate through whole array of links
      expect.soft(response.status().toString()).toMatch(regex)
      console.log(url, response.status())
    }
  }

  /**
   * This method allows to collect all open pull request in a specific GitHub repository.
   * Used default value for quantity of PRs for 1 request - 30, which is same as visible in UI
   * @param encryptedGitToken - encrypted Git token with rights to work with repositories
   * @param owner - repository owner's username
   * @param repo - repository name
   * @param pageNum - page number if we expect quantity of pull requests > 100
   * @returns return Playwright APIResponse
   */
  public async getListOfOpenPullRequests(encryptedGitToken: string, owner: string, repo: string, pageNum: number) {
    const decryptedToken = this.decryptString(encryptedGitToken, testdata.secret_key)
    const response = await this.requestContext.get(`https://api.github.com/repos/${owner}/${repo}/pulls?state=open&page=${pageNum}`, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${decryptedToken}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    expect(response.status()).toEqual(200)
    return response
  }

  /**
   * This method generate CSV file from previously collected data
   * @param filePath - path to file including filename without extension
   * @param inputData - data to write into file
   */
  public generateCSVFile(filePath: string, inputData: string) {
    fs.writeFile(`${filePath}.csv`, inputData, 'utf8', (err) => {
      if (err) { throw err } else {
        console.log('CSV file generated successfully')
      }
    })
  }
}