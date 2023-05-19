import React from "react"
import renderer from "react-test-renderer"
import ToolbarFilename from "../src/components/ToolbarFilename"

describe("ToolbarFilename", () => {
  test("Rendering 1", () => {
    const tree = renderer.create(<ToolbarFilename />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
