import React from "react"
import PinsAnalogLabel from "./PinsAnalogLabel"
import PinsAnalogItem from "./PinsAnalogItem"
import { useSimulatorContext } from "../contexts/SimulatorContext"
import { BOARD_MEGA1280, BOARD_MEGA2560, BOARD_NANO } from "../utils/service"

const PinsAnalogBar = () => {
  const {
    analogPin0,
    analogPin1,
    analogPin2,
    analogPin3,
    analogPin4,
    analogPin5,
    analogPin6,
    analogPin7,
    analogPin8,
    analogPin9,
    analogPin10,
    analogPin11,
    analogPin12,
    analogPin13,
    analogPin14,
    boardType,
  } = useSimulatorContext()

  const isMega = boardType === BOARD_MEGA1280 || boardType === BOARD_MEGA2560
  const showPin6And7 = boardType === BOARD_NANO || isMega

  return (
    <div style={styles.container}>
      <div style={styles.noScrollbar}>
        <div style={{ width: isMega ? "850px" : "550px", ...styles.wrapper }}>
          <PinsAnalogLabel />
          <PinsAnalogItem value={analogPin0} />
          <PinsAnalogItem value={analogPin1} />
          <PinsAnalogItem value={analogPin2} />
          <PinsAnalogItem value={analogPin3} />
          <PinsAnalogItem value={analogPin4} />
          <PinsAnalogItem value={analogPin5} />
          {showPin6And7 && (
            <>
              <PinsAnalogItem value={analogPin6} />
              <PinsAnalogItem value={analogPin7} />
            </>
          )}
          {isMega && (
            <>
              <PinsAnalogItem value={analogPin8} />
              <PinsAnalogItem value={analogPin9} />
              <PinsAnalogItem value={analogPin10} />
              <PinsAnalogItem value={analogPin11} />
              <PinsAnalogItem value={analogPin12} />
              <PinsAnalogItem value={analogPin13} />
              <PinsAnalogItem value={analogPin14} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    height: "26px",
    overflowY: "hidden",
  },
  noScrollbar: {
    overflowX: "scroll",
    overflowY: "hidden",
    outline: "none",
    height: "80px",
  },
  wrapper: {
    float: "left",
  },
}

export default PinsAnalogBar
