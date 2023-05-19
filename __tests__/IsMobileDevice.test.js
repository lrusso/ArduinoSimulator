import isMobileDevice from "../src/utils/isMobileDevice"

describe("isMobileDevice", () => {
  test("Desktop", () => {
    window.navigator.userAgent =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0"
    expect(isMobileDevice()).toBeFalsy()
  })

  test("Android", () => {
    window.navigator.userAgent =
      "Mozilla/5.0 (Linux; Android 12; SM-S906N Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.119 Mobile Safari/537.36"
    expect(isMobileDevice()).toBeTruthy()
  })

  test("iOS", () => {
    window.navigator.userAgent =
      "Mozilla/5.0 (iPhone14,3; U; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19A346 Safari/602.1"
    expect(isMobileDevice()).toBeTruthy()
  })
})
