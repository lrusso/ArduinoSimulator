import React from "react"
import renderer from "react-test-renderer"
import SerialMonitorData from "../src/components/SerialMonitorData"

describe("SerialMonitorData", () => {
  test("Rendering 1", () => {
    const tree = renderer.create(<SerialMonitorData />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
