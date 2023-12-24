import React from "react"
import renderer from "react-test-renderer"
import PinsDigitalBar from "../src/components/PinsDigitalBar"

describe("PinsDigitalBar", () => {
  test("Rendering 1", () => {
    const tree = renderer.create(<PinsDigitalBar />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
