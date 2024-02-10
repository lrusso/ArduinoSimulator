import React from "react"
import PinsDigitalLabel from "./PinsDigitalLabel"
import PinsDigitalItem from "./PinsDigitalItem"
import { useSimulatorContext } from "../contexts/SimulatorContext"
import { isMega } from "../../src/utils/service"

const PinsDigitalBar = () => {
  const { digitalPins, boardType } = useSimulatorContext()
  const isMegaBoard = isMega(boardType)

  return (
    <div style={styles.container}>
      <div style={styles.noScrollbar}>
        <div
          style={{
            width: isMegaBoard ? "1250px" : "550px",
            ...styles.wrapper,
          }}
        >
          <PinsDigitalLabel />
          {digitalPins.slice(0, 14).map((pin, index) => (
            <PinsDigitalItem key={index} gpio={pin} />
          ))}
          {isMegaBoard && (
            <>
              {digitalPins.slice(14, 54).map((pin, index) => (
                <PinsDigitalItem key={index} gpio={pin} />
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

export default PinsDigitalBar
