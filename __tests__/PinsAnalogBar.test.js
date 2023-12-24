import React from "react"
import renderer from "react-test-renderer"
import PinsAnalogBar from "../src/components/PinsAnalogBar"

describe("PinsAnalogBar", () => {
  test("Rendering 1", () => {
    const tree = renderer.create(<PinsAnalogBar />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
