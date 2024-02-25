import puppeteer from "puppeteer"

const EXTENSION_PATH = "/home/iain/Code/bdsally/wix-blocker/"
const EXTENSION_ID = "magonlldabmcapdghdfchinlfgcgjnha"
const timeout = 5000

let browser

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
    args: [`--disable-extensions-except=${EXTENSION_PATH}`, `--load-extension=${EXTENSION_PATH}`],
  })
})

afterEach(async () => {
  await browser.close()
  browser = undefined
})

test(
  "popup renders correctly",
  async () => {
    const page = await browser.newPage()
    await page.goto(`chrome-extension://${EXTENSION_ID}/src/notice.html`)

    const heading = await page.$("h1")
    const title = await heading.evaluate((el) => el.textContent)

    expect(title).toMatch(/This site is/)
  },
  timeout,
)
