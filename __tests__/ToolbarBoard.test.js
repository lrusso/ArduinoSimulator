import React from "react"
import renderer from "react-test-renderer"
import ToolbarBoard from "../src/components/ToolbarBoard"
import { getBoards } from "../src/utils/service"

describe("ToolbarBoard", () => {
  const boardList = getBoards()

  test("Rendering 1", () => {
    const tree = renderer.create(<ToolbarBoard boardType={null} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("Rendering 2", () => {
    const tree = renderer.create(<ToolbarBoard boardType={boardList[0]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("Rendering 3", () => {
    const tree = renderer.create(<ToolbarBoard boardType={boardList[1]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("Rendering 4", () => {
    const tree = renderer.create(<ToolbarBoard boardType={boardList[2]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("Rendering 5", () => {
    const tree = renderer.create(<ToolbarBoard boardType={boardList[3]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
