import React from "react"
import renderer from "react-test-renderer"
import App from "../src/App"

jest.mock("../src/utils/service", () => {
  return {
    ...jest.requireActual("../src/utils/service"),
    editorInit: jest.fn(),
  }
})

describe("App", () => {
  test("Rendering 1", () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
