import React from "react"
import renderer from "react-test-renderer"
import Spinner from "../src/components/Spinner"

describe("Spinner", () => {
  test("Rendering 1", () => {
    const tree = renderer.create(<Spinner />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
