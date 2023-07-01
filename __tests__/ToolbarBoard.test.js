import React from "react"
import renderer from "react-test-renderer"
import ToolbarBoard from "../src/components/ToolbarBoard"
import {
  BOARD_UNO,
  BOARD_MEGA1280,
  BOARD_MEGA2560,
  BOARD_NANO,
} from "../src/utils/service"

describe("ToolbarBoard", () => {
  test("Rendering 1", () => {
    const tree = renderer.create(<ToolbarBoard boardType={null} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("Rendering 2", () => {
    const tree = renderer.create(<ToolbarBoard boardType={BOARD_UNO} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("Rendering 3", () => {
    const tree = renderer
      .create(<ToolbarBoard boardType={BOARD_MEGA1280} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("Rendering 4", () => {
    const tree = renderer
      .create(<ToolbarBoard boardType={BOARD_MEGA2560} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("Rendering 5", () => {
    const tree = renderer.create(<ToolbarBoard boardType={BOARD_NANO} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
