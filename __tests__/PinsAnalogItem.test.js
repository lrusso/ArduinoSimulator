import React from "react"
import renderer from "react-test-renderer"
import PinsAnalogItem from "../src/components/PinsAnalogItem"

describe("PinsAnalogItem", () => {
  test("Rendering 1", () => {
    const tree = renderer.create(<PinsAnalogItem />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
