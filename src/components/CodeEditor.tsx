import React from "react"
import { editorInit } from "../utils/editor"

const CodeEditor = () => {
  React.useEffect(() => {
    const styleNode: HTMLStyleElement = document.createElement("style")
    const styleText = `
      .ace-arduino-light{background-color:#1f1f1f;color:#ccc;}
      .ace-arduino-light .ace_gutter{background-color:#1f1f1f;color:#434f54}
      .ace-arduino-light .ace_gutter-active-line{background:#1f1f1f;color:#ccc}
      .ace-arduino-light .ace_cursor{border-left:2px solid #555}
      .ace-arduino-light .ace_overwrite-cursors .ace_cursor{background:#re;border:1px solid #ffe300}
      .ace-arduino-light .ace_marker-layer .ace_selection{background:#264f78;opacity:1.14}
      .ace-arduino-light .ace_marker-layer .ace_selected-word{background:#c9d2d2;opacity:.5;z-index:6}
      .ace-arduino-light .ace_marker-layer .ace_step{background:#1f1f1f}
      .ace-arduino-light .ace_marker-layer .ace_bracket{border:1px solid #333;margin:-1px 0 0 -1px}
      .ace-arduino-light .ace_marker-layer .ace_active-line{background:#b5c8c9}
      .ace-arduino-light .ace_invisible,.ace-arduino-light .ace_paren{color:#ffd700}
      .ace-arduino-light .ace_invisible,.ace-arduino-light .ace_function ~ .ace_paren  {color:#da70d6}
      .ace-arduino-light .ace_indent-guide{border-right:1px dotted #aabbbc;margin-right:-1px}
      .ace-arduino-light .ace_link_marker{border-bottom:1px solid #00979c}
      .ace-arduino-light .ace_identifier{color:#CCCCCC}
      .ace-arduino-light .ace_comment{color:#6a9955}
      .ace-arduino-light .ace_string{color:#ce9178}
      .ace-arduino-light .ace_keyword.ace_control,.ace-arduino-light .ace_support.ace_type.ace_arduino{color:#dcdcaa}
      .ace-arduino-light .ace_constant.ace_language,.ace-arduino-light .ace_constant.ace_language.ace_arduino,.ace-arduino-light .ace_storage.ace_modifier,.ace-arduino-light .ace_storage.ace_type{color:#569cd6}
      .ace-arduino-light .ace_support.ace_function,.ace-arduino-light .ace_support.ace_function.ace_arduino{color:#DCDCAA}
      .ace-arduino-light .ace_keyword{color:#569cd6}
      .ace-arduino-light .ace_numeric{color:#b5cea8}
    `
    const styleTextNode: Text = document.createTextNode(styleText)
    styleNode.appendChild(styleTextNode)
    document.getElementsByTagName("head")[0].appendChild(styleNode)

    editorInit()
  }, [])

  return (
    <div style={styles.container}>
      <div style={styles.editor} id="arduinosimulator_textcode"></div>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "fixed",
    padding: 0,
    margin: 0,
    left: 0,
    top: "41px",
    bottom: "252px",
    right: 0,
  },
  editor: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
}

export default CodeEditor
