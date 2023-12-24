import React from "react"
import renderer from "react-test-renderer"
import Loading from "../src/components/Loading"

describe("Loading", () => {
  test("Rendering 1", () => {
    const tree = renderer.create(<Loading />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
