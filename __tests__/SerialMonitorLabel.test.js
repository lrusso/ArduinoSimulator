import React from "react"
import renderer from "react-test-renderer"
import SerialMonitorLabel from "../src/components/SerialMonitorLabel"

describe("SerialMonitorLabel", () => {
  test("Rendering 1", () => {
    const tree = renderer.create(<SerialMonitorLabel />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
