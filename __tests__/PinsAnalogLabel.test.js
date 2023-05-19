import React from "react"
import renderer from "react-test-renderer"
import PinsAnalogLabel from "../src/components/PinsAnalogLabel"

describe("PinsAnalogLabel", () => {
  test("Rendering 1", () => {
    const tree = renderer.create(<PinsAnalogLabel />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
