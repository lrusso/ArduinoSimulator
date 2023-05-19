import React from "react"
import renderer from "react-test-renderer"
import BottomPanel from "../src/components/BottomPanel"

describe("BottomPanel", () => {
  test("Rendering 1", () => {
    const tree = renderer
      .create(
        <BottomPanel>
          <></>
        </BottomPanel>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
