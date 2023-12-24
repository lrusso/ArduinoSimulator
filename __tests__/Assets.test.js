import React from "react"
import renderer from "react-test-renderer"
import IconBoard from "../src/assets/IconBoard"
import IconNew from "../src/assets/IconNew"
import IconOpen from "../src/assets/IconOpen"
import IconRedo from "../src/assets/IconRedo"
import IconStart from "../src/assets/IconStart"
import IconSave from "../src/assets/IconSave"
import IconSearch from "../src/assets/IconSearch"
import IconStop from "../src/assets/IconStop"
import IconUndo from "../src/assets/IconUndo"

describe("Assets", () => {
  test("IconBoard Enabled", () => {
    const tree = renderer
      .create(<IconBoard width={16} height={16} enabled />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("IconBoard Disabled", () => {
    const tree = renderer.create(<IconBoard width={16} height={16} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("IconNew", () => {
    const tree = renderer.create(<IconNew width={16} height={16} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("IconOpen", () => {
    const tree = renderer.create(<IconOpen width={16} height={16} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("IconRedo", () => {
    const tree = renderer.create(<IconRedo width={16} height={16} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("IconStart", () => {
    const tree = renderer.create(<IconStart width={16} height={16} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("IconSave", () => {
    const tree = renderer.create(<IconSave width={16} height={16} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("IconSearch", () => {
    const tree = renderer.create(<IconSearch width={16} height={16} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("IconStop", () => {
    const tree = renderer.create(<IconStop width={16} height={16} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("IconUndo", () => {
    const tree = renderer.create(<IconUndo width={16} height={16} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
