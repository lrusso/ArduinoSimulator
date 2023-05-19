import React from "react"
import PinsDigitalLabel from "./PinsDigitalLabel"
import PinsDigitalItem from "./PinsDigitalItem"
import { useSimulatorContext } from "../contexts/SimulatorContext"

const PinsDigitalBar = () => {
  const {
    digitalPin0,
    digitalPin1,
    digitalPin2,
    digitalPin3,
    digitalPin4,
    digitalPin5,
    digitalPin6,
    digitalPin7,
    digitalPin8,
    digitalPin9,
    digitalPin10,
    digitalPin11,
    digitalPin12,
    digitalPin13,
  } = useSimulatorContext()

  return (
    <div style={styles.container}>
      <div style={styles.noScrollbar}>
        <div style={styles.wrapper}>
          <PinsDigitalLabel />
          <PinsDigitalItem pinNumber={0} isEnabled={digitalPin0} />
          <PinsDigitalItem pinNumber={1} isEnabled={digitalPin1} />
          <PinsDigitalItem pinNumber={2} isEnabled={digitalPin2} />
          <PinsDigitalItem pinNumber={3} isEnabled={digitalPin3} />
          <PinsDigitalItem pinNumber={4} isEnabled={digitalPin4} />
          <PinsDigitalItem pinNumber={5} isEnabled={digitalPin5} />
          <PinsDigitalItem pinNumber={6} isEnabled={digitalPin6} />
          <PinsDigitalItem pinNumber={7} isEnabled={digitalPin7} />
          <PinsDigitalItem pinNumber={8} isEnabled={digitalPin8} />
          <PinsDigitalItem pinNumber={9} isEnabled={digitalPin9} />
          <PinsDigitalItem pinNumber={10} isEnabled={digitalPin10} />
          <PinsDigitalItem pinNumber={11} isEnabled={digitalPin11} />
          <PinsDigitalItem pinNumber={12} isEnabled={digitalPin12} />
          <PinsDigitalItem pinNumber={13} isEnabled={digitalPin13} />
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

export default PinsDigitalBar
