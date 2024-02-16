import React from "react"
import PinsDigitalLabel from "./PinsDigitalLabel"
import PinsDigitalItem from "./PinsDigitalItem"
import { useSimulatorContext } from "../contexts/SimulatorContext"
import { isMega } from "../../src/utils/service"

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
          <div className="flex-row">
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
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "36px",
    overflowY: "hidden",
    paddingTop: "6px",
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
  }
}

export default PinsDigitalBar
