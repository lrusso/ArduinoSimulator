import React from "react"
import renderer from "react-test-renderer"
import ToolbarItem from "../src/components/ToolbarItem"

describe("ToolbarItem", () => {
  test("Rendering 1", () => {
    const tree = renderer
      .create(
        <ToolbarItem>
          <></>
        </ToolbarItem>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
