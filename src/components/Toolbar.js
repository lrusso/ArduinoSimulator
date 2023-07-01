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
import {
  BOARD_MEGA1280,
  BOARD_MEGA2560,
  BOARD_NANO,
  BOARD_UNO,
  t,
} from "../utils/service"

const Toolbar = () => {
  const [showConfirmMessage, setShowConfirmMessage] = React.useState(null)
  const [showLoading, setShowLoading] = React.useState(false)
  const {
    simulatorRunning,
    setSimulatorRunning,
    filename,
    setFilename,
    boardType,
    setBoardType,
    setDigitalPin0,
    setDigitalPin1,
    setDigitalPin2,
    setDigitalPin3,
    setDigitalPin4,
    setDigitalPin5,
    setDigitalPin6,
    setDigitalPin7,
    setDigitalPin8,
    setDigitalPin9,
    setDigitalPin10,
    setDigitalPin11,
    setDigitalPin12,
    setDigitalPin13,
    setDigitalPin14,
    setDigitalPin15,
    setDigitalPin16,
    setDigitalPin17,
    setDigitalPin18,
    setDigitalPin19,
    setDigitalPin20,
    setDigitalPin21,
    setDigitalPin22,
    setDigitalPin23,
    setDigitalPin24,
    setDigitalPin25,
    setDigitalPin26,
    setDigitalPin27,
    setDigitalPin28,
    setDigitalPin29,
    setDigitalPin30,
    setDigitalPin31,
    setDigitalPin32,
    setDigitalPin33,
    setDigitalPin34,
    setDigitalPin35,
    setDigitalPin36,
    setDigitalPin37,
    setDigitalPin38,
    setDigitalPin39,
    setDigitalPin40,
    setDigitalPin41,
    setDigitalPin42,
    setDigitalPin43,
    setDigitalPin44,
    setDigitalPin45,
    setDigitalPin46,
    setDigitalPin47,
    setDigitalPin48,
    setDigitalPin49,
    setDigitalPin50,
    setDigitalPin51,
    setDigitalPin52,
    setDigitalPin53,
    setAnalogPin0,
    setAnalogPin1,
    setAnalogPin2,
    setAnalogPin3,
    setAnalogPin4,
    setAnalogPin5,
    setAnalogPin6,
    setAnalogPin7,
    setAnalogPin8,
    setAnalogPin9,
    setAnalogPin10,
    setAnalogPin11,
    setAnalogPin12,
    setAnalogPin13,
    setAnalogPin14,
    setOutputData,
  } = useSimulatorContext()
  const refUploader = React.useRef(null)
  const NEW_FILE = 1
  const OPEN_FILE = 2

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
    setDigitalPin0(false)
    setDigitalPin1(false)
    setDigitalPin2(false)
    setDigitalPin3(false)
    setDigitalPin4(false)
    setDigitalPin5(false)
    setDigitalPin6(false)
    setDigitalPin7(false)
    setDigitalPin8(false)
    setDigitalPin9(false)
    setDigitalPin10(false)
    setDigitalPin11(false)
    setDigitalPin12(false)
    setDigitalPin13(false)
    setDigitalPin14(false)
    setDigitalPin15(false)
    setDigitalPin16(false)
    setDigitalPin17(false)
    setDigitalPin18(false)
    setDigitalPin19(false)
    setDigitalPin20(false)
    setDigitalPin21(false)
    setDigitalPin22(false)
    setDigitalPin23(false)
    setDigitalPin24(false)
    setDigitalPin25(false)
    setDigitalPin26(false)
    setDigitalPin27(false)
    setDigitalPin28(false)
    setDigitalPin29(false)
    setDigitalPin30(false)
    setDigitalPin31(false)
    setDigitalPin32(false)
    setDigitalPin33(false)
    setDigitalPin34(false)
    setDigitalPin35(false)
    setDigitalPin36(false)
    setDigitalPin37(false)
    setDigitalPin38(false)
    setDigitalPin39(false)
    setDigitalPin40(false)
    setDigitalPin41(false)
    setDigitalPin42(false)
    setDigitalPin43(false)
    setDigitalPin44(false)
    setDigitalPin45(false)
    setDigitalPin46(false)
    setDigitalPin47(false)
    setDigitalPin48(false)
    setDigitalPin49(false)
    setDigitalPin50(false)
    setDigitalPin51(false)
    setDigitalPin52(false)
    setDigitalPin53(false)
    setAnalogPin0(0)
    setAnalogPin1(0)
    setAnalogPin2(0)
    setAnalogPin3(0)
    setAnalogPin4(0)
    setAnalogPin5(0)
    setAnalogPin6(0)
    setAnalogPin7(0)
    setAnalogPin8(0)
    setAnalogPin9(0)
    setAnalogPin10(0)
    setAnalogPin11(0)
    setAnalogPin12(0)
    setAnalogPin13(0)
    setAnalogPin14(0)
    setFilename(null)
    editorNew()
    setShowConfirmMessage(null)
  }

  const uploadFile = () => {
    stopSimulator()
    setDigitalPin0(false)
    setDigitalPin1(false)
    setDigitalPin2(false)
    setDigitalPin3(false)
    setDigitalPin4(false)
    setDigitalPin5(false)
    setDigitalPin6(false)
    setDigitalPin7(false)
    setDigitalPin8(false)
    setDigitalPin9(false)
    setDigitalPin10(false)
    setDigitalPin11(false)
    setDigitalPin12(false)
    setDigitalPin13(false)
    setDigitalPin14(false)
    setDigitalPin15(false)
    setDigitalPin16(false)
    setDigitalPin17(false)
    setDigitalPin18(false)
    setDigitalPin19(false)
    setDigitalPin20(false)
    setDigitalPin21(false)
    setDigitalPin22(false)
    setDigitalPin23(false)
    setDigitalPin24(false)
    setDigitalPin25(false)
    setDigitalPin26(false)
    setDigitalPin27(false)
    setDigitalPin28(false)
    setDigitalPin29(false)
    setDigitalPin30(false)
    setDigitalPin31(false)
    setDigitalPin32(false)
    setDigitalPin33(false)
    setDigitalPin34(false)
    setDigitalPin35(false)
    setDigitalPin36(false)
    setDigitalPin37(false)
    setDigitalPin38(false)
    setDigitalPin39(false)
    setDigitalPin40(false)
    setDigitalPin41(false)
    setDigitalPin42(false)
    setDigitalPin43(false)
    setDigitalPin44(false)
    setDigitalPin45(false)
    setDigitalPin46(false)
    setDigitalPin47(false)
    setDigitalPin48(false)
    setDigitalPin49(false)
    setDigitalPin50(false)
    setDigitalPin51(false)
    setDigitalPin52(false)
    setDigitalPin53(false)
    setAnalogPin0(0)
    setAnalogPin1(0)
    setAnalogPin2(0)
    setAnalogPin3(0)
    setAnalogPin4(0)
    setAnalogPin5(0)
    setAnalogPin6(0)
    setAnalogPin7(0)
    setAnalogPin8(0)
    setAnalogPin9(0)
    setAnalogPin10(0)
    setAnalogPin11(0)
    setAnalogPin12(0)
    setAnalogPin13(0)
    setAnalogPin14(0)
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
    switch (boardType) {
      case null:
        setBoardType(BOARD_MEGA1280)
        break

      case BOARD_UNO:
        setBoardType(BOARD_MEGA1280)
        break

      case BOARD_MEGA1280:
        setBoardType(BOARD_MEGA2560)
        break

      case BOARD_MEGA2560:
        setBoardType(BOARD_NANO)
        break

      case BOARD_NANO:
        setBoardType(BOARD_UNO)
        break

      default:
        break
    }
  }

  const startSketch = () => {
    setShowLoading(true)
    editorDisable()
    startSimulator(
      setShowLoading,
      setSimulatorRunning,
      setDigitalPin0,
      setDigitalPin1,
      setDigitalPin2,
      setDigitalPin3,
      setDigitalPin4,
      setDigitalPin5,
      setDigitalPin6,
      setDigitalPin7,
      setDigitalPin8,
      setDigitalPin9,
      setDigitalPin10,
      setDigitalPin11,
      setDigitalPin12,
      setDigitalPin13,
      setDigitalPin14,
      setDigitalPin15,
      setDigitalPin16,
      setDigitalPin17,
      setDigitalPin18,
      setDigitalPin19,
      setDigitalPin20,
      setDigitalPin21,
      setDigitalPin22,
      setDigitalPin23,
      setDigitalPin24,
      setDigitalPin25,
      setDigitalPin26,
      setDigitalPin27,
      setDigitalPin28,
      setDigitalPin29,
      setDigitalPin30,
      setDigitalPin31,
      setDigitalPin32,
      setDigitalPin33,
      setDigitalPin34,
      setDigitalPin35,
      setDigitalPin36,
      setDigitalPin37,
      setDigitalPin38,
      setDigitalPin39,
      setDigitalPin40,
      setDigitalPin41,
      setDigitalPin42,
      setDigitalPin43,
      setDigitalPin44,
      setDigitalPin45,
      setDigitalPin46,
      setDigitalPin47,
      setDigitalPin48,
      setDigitalPin49,
      setDigitalPin50,
      setDigitalPin51,
      setDigitalPin52,
      setDigitalPin53,
      setAnalogPin0,
      setAnalogPin1,
      setAnalogPin2,
      setAnalogPin3,
      setAnalogPin4,
      setAnalogPin5,
      setAnalogPin6,
      setAnalogPin7,
      setAnalogPin8,
      setAnalogPin9,
      setAnalogPin10,
      setAnalogPin11,
      setAnalogPin12,
      setAnalogPin13,
      setAnalogPin14,
      setOutputData
    )
  }

  const stopSketch = () => {
    stopSimulator()
    setDigitalPin0(false)
    setDigitalPin1(false)
    setDigitalPin2(false)
    setDigitalPin3(false)
    setDigitalPin4(false)
    setDigitalPin5(false)
    setDigitalPin6(false)
    setDigitalPin7(false)
    setDigitalPin8(false)
    setDigitalPin9(false)
    setDigitalPin10(false)
    setDigitalPin11(false)
    setDigitalPin12(false)
    setDigitalPin13(false)
    setDigitalPin14(false)
    setDigitalPin15(false)
    setDigitalPin16(false)
    setDigitalPin17(false)
    setDigitalPin18(false)
    setDigitalPin19(false)
    setDigitalPin20(false)
    setDigitalPin21(false)
    setDigitalPin22(false)
    setDigitalPin23(false)
    setDigitalPin24(false)
    setDigitalPin25(false)
    setDigitalPin26(false)
    setDigitalPin27(false)
    setDigitalPin28(false)
    setDigitalPin29(false)
    setDigitalPin30(false)
    setDigitalPin31(false)
    setDigitalPin32(false)
    setDigitalPin33(false)
    setDigitalPin34(false)
    setDigitalPin35(false)
    setDigitalPin36(false)
    setDigitalPin37(false)
    setDigitalPin38(false)
    setDigitalPin39(false)
    setDigitalPin40(false)
    setDigitalPin41(false)
    setDigitalPin42(false)
    setDigitalPin43(false)
    setDigitalPin44(false)
    setDigitalPin45(false)
    setDigitalPin46(false)
    setDigitalPin47(false)
    setDigitalPin48(false)
    setDigitalPin49(false)
    setDigitalPin50(false)
    setDigitalPin51(false)
    setDigitalPin52(false)
    setDigitalPin53(false)
    setAnalogPin0(0)
    setAnalogPin1(0)
    setAnalogPin2(0)
    setAnalogPin3(0)
    setAnalogPin4(0)
    setAnalogPin5(0)
    setAnalogPin6(0)
    setAnalogPin7(0)
    setAnalogPin8(0)
    setAnalogPin9(0)
    setAnalogPin10(0)
    setAnalogPin11(0)
    setAnalogPin12(0)
    setAnalogPin13(0)
    setAnalogPin14(0)
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
            <ToolbarItem
              onClick={simulatorRunning ? undefined : switchBoard}
              disabled={simulatorRunning}
            >
              <ToolbarBoard
                boardType={boardType}
                simulatorRunning={simulatorRunning}
              />
            </ToolbarItem>
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

const styles = {
  container: {
    height: "40px",
    borderBottom: "thin solid #D3D3D3",
    overflowY: "hidden",
  },
  menu_scroll: {
    backgroundColor: "#F2F2F2",
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
