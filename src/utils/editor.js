import { t } from "./languages"
import isMobileDevice from "./isMobileDevice"

let editor = null
let mobileDevice = isMobileDevice()

const editorInit = () => {
  global.ace.config.set("basePath", ".")

  editor = global.ace.edit("arduinosimulator_textcode")
  editor.setOptions({
    fontSize: "14px",
    showPrintMargin: false,
    showInvisibles: false,
    tabSize: 4,
    useSoftTabs: false,
    highlightActiveLine: false,
  })
  editor.commands.removeCommand("gotoline")
  editor.session.setMode("ace/mode/arduino")
  editor.setTheme("ace/theme/arduino_light")
  editor.session.setUseWorker(false)
  editor.setValue(global.DEFAULT_SKETCH ? global.DEFAULT_SKETCH : t("EMPTY_SKETCH"))
  editor.clearSelection()
  editor.selection.moveTo(0, 0)
  editor.session.getUndoManager().reset()
  editor.session.bgTokenizer.tokenizer.$setMaxTokenCount(999999)

  editorFocus()
}

const editorNew = () => {
  editor.session.setMode("ace/mode/arduino")
  editor.setTheme("ace/theme/arduino_light")
  editor.setValue("")
  editor.clearSelection()
  editor.selection.moveTo(0, 0)
  editor.session.getUndoManager().reset()
  editor.setOptions({ readOnly: false, highlightGutterLine: true })
  editor.renderer.$cursorLayer.element.style.display = "block"

  try {
    editor.searchBox.hide()
  } catch (err) {
    //
  }

  editorFocus()
}

const editorSetValue = (newContent) => {
  editor.setValue(newContent)
  editor.clearSelection()
  editor.selection.moveTo(0, 0)
  editor.session.getUndoManager().reset()
}

const editorGetValue = () => {
  return editor.getValue()
}

const editorSave = (filename) => {
  try {
    const blobValue = new Blob([editor.getValue()], { type: "text/plain" })

    const link = document.createElement("a")
    link.style.display = "none"
    document.body.appendChild(link)
    link.href = URL.createObjectURL(blobValue)
    link.download = filename || t("FILENAME")
    link.click()
    link.remove()
  } catch (err) {
    //
  }

  editor.session.getUndoManager().reset()

  try {
    editor.searchBox.hide()
  } catch (err) {
    //
  }

  editorFocus()
}

const editorUndo = () => {
  try {
    editor.undo()
    editor.focus()
    editor.clearSelection()
  } catch (err) {
    //
  }
}

const editorRedo = () => {
  try {
    editor.redo()
    editor.focus()
    editor.clearSelection()
  } catch (err) {
    //
  }
}

const editorSearch = () => {
  try {
    editor.execCommand("find")
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}

const editorIsDirty = () => {
  try {
    return !editor.session.getUndoManager().isClean()
  } catch (err) {
    return false
  }
}

const editorEnable = () => {
  editor.setOptions({ readOnly: false, highlightGutterLine: true })
  editor.renderer.$cursorLayer.element.style.display = "block"
}

const editorDisable = () => {
  editor.setOptions({ readOnly: true, highlightGutterLine: false })
  editor.renderer.$cursorLayer.element.style.display = "none"
}

const editorFocus = () => {
  if (!mobileDevice) {
    setTimeout(() => {
      editor.focus()
    }, 100)
  }
}

export {
  editorInit,
  editorNew,
  editorSetValue,
  editorGetValue,
  editorSave,
  editorUndo,
  editorRedo,
  editorSearch,
  editorIsDirty,
  editorEnable,
  editorDisable,
  editorFocus,
}
