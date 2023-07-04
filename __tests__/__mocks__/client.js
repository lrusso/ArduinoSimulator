import { JSDOM } from "jsdom"

const dom = new JSDOM()

global.document = dom.window.document
global.window = dom.window
global.console = {
  log: jest.fn(),
  warn: (message) => {
    throw Error(message)
  },
  error: (message) => {
    throw Error(message)
  },
}
global.Date = class MockDate extends Date {
  constructor() {
    super("2023-01-01T08:30:50")
  }
}

Object.defineProperty(
  window.navigator,
  "userAgent",
  ((value) => ({
    get() {
      return value
    },
    set(v) {
      value = v
    },
  }))(window.navigator.userAgent)
)

let __cookies
Object.defineProperty(window.document, "cookie", {
  get: () => __cookies,
  set: (v) => {
    __cookies = v
  },
  split: (s) => __cookies.split(s),
})

const createElement = document.createElement.bind(document)
document.createElement = (tagName) => {
  if (tagName === "canvas") {
    return {
      getContext: () => ({
        translate: () => {},
        rotate: () => {},
        fillText: () => {},
        beginPath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        stroke: () => {},
      }),
      measureText: () => 0,
      toDataURL: () => "",
    }
  }
  return createElement(tagName)
}
