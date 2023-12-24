import React from "react"
import renderer from "react-test-renderer"
import SerialMonitor from "../src/components/SerialMonitor"

describe("SerialMonitor", () => {
  test("Rendering 1", () => {
    const tree = renderer.create(<SerialMonitor />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
