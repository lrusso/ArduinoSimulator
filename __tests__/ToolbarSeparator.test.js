import React from "react"
import renderer from "react-test-renderer"
import ToolbarSeparator from "../src/components/ToolbarSeparator"

describe("ToolbarSeparator", () => {
  test("Rendering 1", () => {
    const tree = renderer.create(<ToolbarSeparator />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
