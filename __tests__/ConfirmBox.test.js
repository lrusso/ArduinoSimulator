import React from "react"
import renderer from "react-test-renderer"
import ConfirmBox from "../src/components/ConfirmBox"

describe("ConfirmBox", () => {
  test("Rendering 1", () => {
    const tree = renderer
      .create(
        <ConfirmBox
          title="Test Title"
          message="Test Message"
          accept={"Test Accept"}
          acceptCallback={() => {}}
          cancel={"Test Cancel"}
          cancelCallback={() => {}}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
