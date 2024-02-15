import React from "react"
import IconNew from "../assets/IconNew"
import IconOpen from "../assets/IconOpen"
import IconSave from "../assets/IconSave"
import IconUndo from "../assets/IconUndo"
import IconRedo from "../assets/IconRedo"
import IconSearch from "../assets/IconSearch"
import IconStart from "../assets/IconStart"
import IconStop from "../assets/IconStop"
import ToolbarItem from "./ToolbarItem"
import ToolbarBoard from "./ToolbarBoard"
import ToolbarFilename from "./ToolbarFilename"
import ToolbarSeparator from "./ToolbarSeparator"
import Loading from "./Loading"
import ConfirmBox from "./ConfirmBox"
import { useSimulatorContext } from "../contexts/SimulatorContext"
import {
  editorNew,
  editorSetValue,
  editorSave,
  editorUndo,
  editorRedo,
  editorSearch,
  editorIsDirty,
  editorEnable,
  editorDisable,
  editorFocus,
} from "../utils/editor"
import { startSimulator, stopSimulator } from "../utils/interpreter"
import { getBoards } from "../../src/utils/service"
import { t } from "../utils/languages"

const Toolbar = () => {
  const {
    simulatorRunning,
    setSimulatorRunning,
    filename,
    setFilename,
    boardType,
    setBoardType,
    handleSetPinMode,
    setDigitalPins,
    handleSetDigitalPins,
    setAnalogPins,
    handleSetAnalogPins,
    setOutputData,
  } = useSimulatorContext()

  const [showConfirmMessage, setShowConfirmMessage] = React.useState<number | null>(
    null
  )
  const [showLoading, setShowLoading] = React.useState<boolean>(false)
  const refUploader = React.useRef<HTMLInputElement>(null)
  const NEW_FILE = 1
  const OPEN_FILE = 2

  /* eslint-disable no-unused-vars */
  const initializeDigitalPins = Array(54)
    .fill(null)
    .map((_, index) => ({
      pinNumber: index,
      isInput: true,
      state: false,
    }))

  const initializeAnalogPins = Array(14)
    .fill(null)
    .map((_, index) => ({
      pinNumber: index,
      isInput: true,
      duty: 0,
    }))

  const newFile = () => {
    if (editorIsDirty()) {
      editorDisable()
      setShowConfirmMessage(NEW_FILE)
    } else {
      cleanEditor()
    }
  }

  const openFile = () => {
    if (editorIsDirty()) {
      editorDisable()
      setShowConfirmMessage(OPEN_FILE)
    } else {
      uploadFile()
    }
  }

  const openFileConfirmed = async (event) => {
    const selectedFileForUploading = event.target.files[0]
    const documentName = selectedFileForUploading.name
    setFilename(documentName)

    const filereader = new FileReader()
    filereader.onload = function () {
      editorSetValue(this.result)
      editorFocus()
      refUploader.current.value = null
    }
    filereader.readAsText(selectedFileForUploading)
  }

  const saveFile = () => {
    editorSave(filename)
  }

  const cleanEditor = () => {
    stopSimulator()
    setSimulatorRunning(false)
    setDigitalPins(initializeDigitalPins)
    setAnalogPins(initializeAnalogPins)
    setFilename(null)
    editorNew()
    setShowConfirmMessage(null)
  }

  const uploadFile = () => {
    stopSimulator()
    setDigitalPins(initializeDigitalPins)
    setAnalogPins(initializeAnalogPins)
    setSimulatorRunning(false)
    refUploader.current.click()
    setShowConfirmMessage(null)
  }

  const hideConfirmMessage = () => {
    editorEnable()
    setShowConfirmMessage(null)
    editorFocus()
  }

  const switchBoard = () => {
    const boardList = getBoards()

    const currentBoard = boardType ? boardType : boardList[0]
    let nextBoard = boardList[0]

    boardList.forEach((element: string, index: number) => {
      if (element === currentBoard && boardList.length - 1 > index) {
        nextBoard = boardList[index + 1]
      }
    })

    setBoardType(nextBoard)
  }

  const startSketch = () => {
    setShowLoading(true)
    editorDisable()
    startSimulator(
      setShowLoading,
      setSimulatorRunning,
      handleSetPinMode,
      handleSetDigitalPins,
      handleSetAnalogPins,
      setOutputData
    )
  }

  const stopSketch = () => {
    stopSimulator()
    setDigitalPins(initializeDigitalPins)
    setAnalogPins(initializeAnalogPins)
    setSimulatorRunning(false)
  }

  React.useEffect(() => {
    const styleNode = document.createElement("style")
    const styleText = `
      .arduinosimulator_menu_item:hover{background-color:#E3E3E3 !important;border:thin solid #D3D3D3 !important;cursor:pointer !important}
      @media (pointer: coarse) { .arduinosimulator_menu_item:hover{background-color:#F2F2F2 !important;border:thin solid #F2F2F2 !important}
    `
    const styleTextNode = document.createTextNode(styleText)
    styleNode.appendChild(styleTextNode)
    document.getElementsByTagName("head")[0].appendChild(styleNode)
  }, [])

  return (
    <>
      <div style={styles.container}>
        <div style={styles.menu_scroll}>
          <div style={styles.menu_wrapper}>
            <ToolbarItem onClick={newFile}>
              <IconNew width={16} height={16} />
            </ToolbarItem>
            <ToolbarItem onClick={openFile}>
              <IconOpen width={16} height={16} />
            </ToolbarItem>
            <ToolbarItem onClick={saveFile}>
              <IconSave width={16} height={16} />
            </ToolbarItem>
            <ToolbarSeparator />
            <ToolbarItem onClick={editorUndo}>
              <IconUndo width={16} height={16} />
            </ToolbarItem>
            <ToolbarItem onClick={editorRedo}>
              <IconRedo width={16} height={16} />
            </ToolbarItem>
            <ToolbarSeparator />
            <ToolbarItem onClick={editorSearch}>
              <IconSearch width={24} height={24} />
            </ToolbarItem>
            <ToolbarSeparator />
            {/* <ToolbarItem
              onClick={simulatorRunning ? undefined : switchBoard}
              disabled={simulatorRunning}
            >
              <ToolbarBoard
                boardType={boardType}
                simulatorRunning={simulatorRunning}
              />
            </ToolbarItem> */}
            <ToolbarSeparator />
            {simulatorRunning && (
              <ToolbarItem onClick={stopSketch}>
                <IconStop width={17} height={17} />
              </ToolbarItem>
            )}
            {!simulatorRunning && (
              <ToolbarItem onClick={startSketch}>
                <IconStart width={17} height={17} />
              </ToolbarItem>
            )}
            <ToolbarSeparator />
            <ToolbarFilename />
          </div>
        </div>
      </div>
      <input
        ref={refUploader}
        type="file"
        style={styles.uploader}
        onChange={openFileConfirmed}
      />
      {showLoading && <Loading />}
      {showConfirmMessage && (
        <ConfirmBox
          title={t("LOSECHANGES_TITLE")}
          message={t("LOSECHANGES_MESSAGE")}
          accept={t("LOSECHANGES_YES")}
          acceptCallback={showConfirmMessage === NEW_FILE ? cleanEditor : uploadFile}
          cancel={t("LOSECHANGES_NO")}
          cancelCallback={hideConfirmMessage}
        />
      )}
    </>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "40px",   
    overflowY: "hidden",
  },
  menu_scroll: {
    backgroundColor: "#181818",
    left: 0,
    right: 0,
    paddingTop: 0,
    paddingBottom: 0,
    height: "80px",
    overflowX: "scroll",
    overflowY: "hidden",
    outline: "none",
    textAlign: "center",
    fontFamily: "Arial",
    fontSize: "13px",
  },
  menu_wrapper: {
    float: "left",
    width: "550px",
  },
  uploader: {
    display: "none",
  },
}

export default Toolbar
