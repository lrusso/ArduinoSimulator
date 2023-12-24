import React from "react"
import renderer from "react-test-renderer"
import SerialMonitorButton from "../src/components/SerialMonitorButton"

describe("SerialMonitorButton", () => {
  test("Rendering 1", () => {
    const tree = renderer.create(<SerialMonitorButton />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
