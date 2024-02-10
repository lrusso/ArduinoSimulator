import React from "react"
import PinsAnalogLabel from "./PinsAnalogLabel"
import PinsAnalogItem from "./PinsAnalogItem"
import { useSimulatorContext } from "../contexts/SimulatorContext"
import { isMega, isNano } from "../../src/utils/service"

const PinsAnalogBar = () => {
  const { analogPins, boardType } = useSimulatorContext()

  const isMegaBoard = isMega(boardType)
  const isNanoBoard = isNano(boardType)

  return (
    <div style={styles.container}>
      <div style={styles.noScrollbar}>
        <div style={{ width: isMegaBoard ? "850px" : "550px", ...styles.wrapper }}>
          <PinsAnalogLabel />
          {analogPins.slice(0, 6).map((pin, index) => (
            <PinsAnalogItem key={index} gpioAnalog={pin} />
          ))}
          {(isMegaBoard || isNanoBoard) && (
            <>
              {analogPins.slice(6, 8).map((pin, index) => (
                <PinsAnalogItem key={index} gpioAnalog={pin} />
              ))}
            </>
          )}
          {isMegaBoard && (
            <>
              {analogPins.slice(8, 14).map((pin, index) => (
                <PinsAnalogItem key={index} gpioAnalog={pin} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
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
