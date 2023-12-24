import React from "react"
import renderer from "react-test-renderer"
import Toolbar from "../src/components/Toolbar"

describe("Toolbar", () => {
  test("Rendering 1", () => {
    const tree = renderer.create(<Toolbar />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
