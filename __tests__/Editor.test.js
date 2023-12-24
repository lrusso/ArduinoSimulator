import React from "react"
import renderer from "react-test-renderer"
import Editor from "../src/screens/Editor"

jest.mock("../src/utils/editor", () => {
  return {
    ...jest.requireActual("../src/utils/editor"),
    editorInit: jest.fn(),
  }
})

describe("Editor", () => {
  test("Rendering 1", () => {
    const tree = renderer.create(<Editor />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
