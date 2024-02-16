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
          <div className="flex-row">
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
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "36px",
    overflowY: "hidden",
    borderBottom: "1px solid #363636",
    marginBottom: "5px"
  },
  noScrollbar: {
    overflowX: "scroll",
    overflowY: "hidden",
    outline: "none",
    height: "80px",
  },
  wrapper: {
    display: "flex",
    flexBasis: "0",
    flexDirection: "row",
    alignItems: "baseline",
    gap: "2px",
    flexWrap: "nowrap",
  }
}

export default PinsAnalogBar
