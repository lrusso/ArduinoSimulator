import React from "react"
import PinsDigitalLabel from "./PinsDigitalLabel"
import PinsDigitalItem from "./PinsDigitalItem"
import { useSimulatorContext } from "../contexts/SimulatorContext"
import { isMega } from "../../src/utils/service"

import './PinsDigitalItem.css'

const PinsDigitalBar = () => {
  const { digitalPins, setDigitalPins, boardType } = useSimulatorContext()
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
            <PinsDigitalItem key={index} gpio={pin} setDigital={setDigitalPins[index]} />
          ))}
          {isMegaBoard && (
            <>
              {digitalPins.slice(14, 54).map((pin, index) => (
                <PinsDigitalItem key={index} gpio={pin} setDigital={setDigitalPins[index]}/>
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
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    gap: "2px",
  }
}

export default PinsDigitalBar
