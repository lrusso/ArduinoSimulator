import React from "react"
import renderer from "react-test-renderer"
import CodeEditor from "../src/components/CodeEditor"

jest.mock("../src/utils/editor", () => {
  return {
    ...jest.requireActual("../src/utils/editor"),
    editorInit: jest.fn(),
  }
})

describe("CodeEditor", () => {
  test("Rendering 1", () => {
    const tree = renderer.create(<CodeEditor />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
