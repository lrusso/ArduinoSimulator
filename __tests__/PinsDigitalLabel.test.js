import React from "react"
import renderer from "react-test-renderer"
import PinsDigitalLabel from "../src/components/PinsDigitalLabel"

describe("PinsDigitalLabel", () => {
  test("Rendering 1", () => {
    const tree = renderer.create(<PinsDigitalLabel />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
