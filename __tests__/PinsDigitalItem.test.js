import React from "react"
import renderer from "react-test-renderer"
import PinsDigitalItem from "../src/components/PinsDigitalItem"

describe("PinsDigitalItem", () => {
  test("Rendering 1", () => {
    const tree = renderer
      .create(<PinsDigitalItem pinNumber={0} isEnabled={false} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("Rendering 2", () => {
    const tree = renderer
      .create(<PinsDigitalItem pinNumber={0} isEnabled={true} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
