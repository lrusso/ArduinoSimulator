import puppeteer from "puppeteer"
import { t } from "../src/utils/service"

const sleep = (milliseconds) => {
  const timestamp = Date.now() + milliseconds
  while (timestamp > Date.now()) {
    //
  }
}

const searchIcon =
  "#root > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(8) > div:nth-child(1)"

describe("Editor End-To-End", () => {
  let browser
  let page

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: "new" })
    page = await browser.newPage()
    page.setUserAgent("test-agent")
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "language", {
        get: function () {
          return "en-US"
        },
      })
    })
    try {
      await page.goto("http://localhost:3000")
    } catch (err) {
      throw Error("Please run 'npm run start' first.")
    }
  })

  test("Checking if the Code Editor is mounted and working", async () => {
    await page.waitForSelector(searchIcon)

    sleep(5000)

    await page.click(searchIcon)

    sleep(5000)

    const bodyContent = await page.$eval(".ace_search_field", (el) => el.placeholder)

    sleep(200)

    expect(bodyContent).toContain(t("SEARCH_FOR"))
  })

  afterAll(() => browser.close())
})
