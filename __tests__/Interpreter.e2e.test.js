import React from "react"
import renderer from "react-test-renderer"
import puppeteer from "puppeteer"

const sleep = (milliseconds) => {
  const timestamp = Date.now() + milliseconds
  while (timestamp > Date.now()) {
    //
  }
}

const runIcon = "#arduino_simulator_start_icon"
const stopIcon = "#arduino_simulator_stop_icon"
const serialInput =
  "#root > div:nth-child(4) > div:nth-child(3) > div:nth-child(2) > input:nth-child(1)"
const serialSubmit =
  "#root > div:nth-child(4) > div:nth-child(3) > div:nth-child(2) > input:nth-child(2)"
const serialOutputData =
  "#root > div:nth-child(4) > div:nth-child(3) > div:nth-child(3) > div:nth-child(1)"

describe("Interpreter End-To-End", () => {
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
      window.DEFAULT_SKETCH =
        '/*\n\nArduino Simulator developed by LRusso.com\n\n*/\n\nchar charOne[] = "Char 1 example.";\nString stringOne = "String 1 example.";\nString stringTwo = String("String 2 example.");\nString stringThree = String(15);\nString stringFour = String(15.50);\n\nvoid setup()\n\t{\n\tSerial.begin(9600);\n\tSerial.println(charOne);\n\tSerial.println(stringOne);\n\tSerial.println(stringTwo);\n\tSerial.println(stringThree);\n\tSerial.println(stringFour);\n\tSerial.println("------------------");\n\tSerial.println("Write something in the textbox above to test that this sketch sends the serial data to the Arduino board and back to the Serial Monitor.");\n\t}\n\nvoid loop()\n\t{\n\twhile(Serial.available()>0)\n\t\t{\n\t\tchar receivedChar = Serial.read();\n\t\tSerial.print(receivedChar);\n\t\t}\n\t}'
    })
    try {
      await page.goto("http://localhost:3000")
    } catch (err) {
      throw Error("Please run 'npm run start' first.")
    }
  })

  test("Running a Sketch and reading the Serial data", async () => {
    await page.waitForSelector(runIcon)

    sleep(5000)

    await page.click(runIcon)

    await page.waitForSelector(stopIcon)

    sleep(5000)

    const serialData = await page.$eval(serialOutputData, (el) => el.innerText)

    sleep(200)

    const tree = renderer.create(<>{serialData}</>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test("Inputting Serial data, sending the data to the Interpreter and reading it back on the Serial Monitor", async () => {
    sleep(200)

    await page.focus(serialInput)
    await page.keyboard.type("This is a test")

    sleep(2000)

    await page.click(serialSubmit)

    sleep(5000)

    const serialData = await page.$eval(serialOutputData, (el) => el.innerText)

    sleep(200)

    expect(serialData).toContain("This is a test")
  })

  afterAll(() => browser.close())
})
