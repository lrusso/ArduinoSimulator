import React from "react"
import renderer from "react-test-renderer"
import SerialMonitorInput from "../src/components/SerialMonitorInput"

describe("SerialMonitorInput", () => {
  test("Rendering 1", () => {
    const tree = renderer.create(<SerialMonitorInput />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
