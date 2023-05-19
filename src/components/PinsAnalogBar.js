import React from "react"
import PinsAnalogLabel from "./PinsAnalogLabel"
import PinsAnalogItem from "./PinsAnalogItem"
import { useSimulatorContext } from "../contexts/SimulatorContext"

const PinsAnalogBar = () => {
  const { analogPin0, analogPin1, analogPin2, analogPin3, analogPin4, analogPin5 } =
    useSimulatorContext()

  return (
    <div style={styles.container}>
      <div style={styles.noScrollbar}>
        <div style={styles.wrapper}>
          <PinsAnalogLabel />
          <PinsAnalogItem value={analogPin0} />
          <PinsAnalogItem value={analogPin1} />
          <PinsAnalogItem value={analogPin2} />
          <PinsAnalogItem value={analogPin3} />
          <PinsAnalogItem value={analogPin4} />
          <PinsAnalogItem value={analogPin5} />
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
    width: "450px",
  },
}

export default PinsAnalogBar
