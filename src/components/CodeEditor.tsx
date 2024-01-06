import React from "react"
import { editorInit } from "../utils/editor"

const CodeEditor = () => {
  React.useEffect(() => {
    const styleNode = document.createElement("style")
    const styleText = `
      .ace-arduino-light{background-color:#fff}
      .ace-arduino-light .ace_gutter{background-color:#dae3e3;color:#434f54}
      .ace-arduino-light .ace_gutter-active-line{background:#b5c8c9}
      .ace-arduino-light .ace_cursor{border-left:2px solid #555}
      .ace-arduino-light .ace_overwrite-cursors .ace_cursor{background:#766b13;border:1px solid #ffe300}
      .ace-arduino-light .ace_marker-layer .ace_selection{background:#fc0;opacity:.4}
      .ace-arduino-light .ace_marker-layer .ace_selected-word{background:#c9d2d2;opacity:.5;z-index:6}
      .ace-arduino-light .ace_marker-layer .ace_step{background:#dae3e3}
      .ace-arduino-light .ace_marker-layer .ace_bracket{border:1px solid #333;margin:-1px 0 0 -1px}
      .ace-arduino-light .ace_marker-layer .ace_active-line{background:#b5c8c9}
      .ace-arduino-light .ace_invisible,.ace-arduino-light .ace_paren{color:#333}
      .ace-arduino-light .ace_indent-guide{border-right:1px dotted #aabbbc;margin-right:-1px}
      .ace-arduino-light .ace_link_marker{border-bottom:1px solid #00979c}
      .ace-arduino-light .ace_identifier{color:#000}
      .ace-arduino-light .ace_comment{color:rgba(78,91,97,.8)}
      .ace-arduino-light .ace_string{color:#005c5f}
      .ace-arduino-light .ace_keyword.ace_control,.ace-arduino-light .ace_support.ace_type.ace_arduino{color:#728e00}
      .ace-arduino-light .ace_constant.ace_language,.ace-arduino-light .ace_constant.ace_language.ace_arduino,.ace-arduino-light .ace_storage.ace_modifier,.ace-arduino-light .ace_storage.ace_type{color:#00979d}
      .ace-arduino-light .ace_support.ace_function,.ace-arduino-light .ace_support.ace_function.ace_arduino{color:#d35400}
      .ace-arduino-light .ace_keyword{color:#728e00}
      .ace-arduino-light .ace_numeric{color:#8a7b52}
    `
    const styleTextNode = document.createTextNode(styleText)
    styleNode.appendChild(styleTextNode)
    document.getElementsByTagName("head")[0].appendChild(styleNode)

    editorInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
