import React from "react"
import PinsDigitalLabel from "./PinsDigitalLabel"
import PinsDigitalItem from "./PinsDigitalItem"
import { useSimulatorContext } from "../contexts/SimulatorContext"
import { BOARD_MEGA1280, BOARD_MEGA2560 } from "../utils/service"

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
    digitalPin14,
    digitalPin15,
    digitalPin16,
    digitalPin17,
    digitalPin18,
    digitalPin19,
    digitalPin20,
    digitalPin21,
    digitalPin22,
    digitalPin23,
    digitalPin24,
    digitalPin25,
    digitalPin26,
    digitalPin27,
    digitalPin28,
    digitalPin29,
    digitalPin30,
    digitalPin31,
    digitalPin32,
    digitalPin33,
    digitalPin34,
    digitalPin35,
    digitalPin36,
    digitalPin37,
    digitalPin38,
    digitalPin39,
    digitalPin40,
    digitalPin41,
    digitalPin42,
    digitalPin43,
    digitalPin44,
    digitalPin45,
    digitalPin46,
    digitalPin47,
    digitalPin48,
    digitalPin49,
    digitalPin50,
    digitalPin51,
    digitalPin52,
    digitalPin53,
    boardType,
  } = useSimulatorContext()

  const isMega = boardType === BOARD_MEGA1280 || boardType === BOARD_MEGA2560

  return (
    <div style={styles.container}>
      <div style={styles.noScrollbar}>
        <div style={{ width: isMega ? "1250px" : "550px", ...styles.wrapper }}>
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
          {isMega && (
            <>
              <PinsDigitalItem pinNumber={14} isEnabled={digitalPin14} />
              <PinsDigitalItem pinNumber={15} isEnabled={digitalPin15} />
              <PinsDigitalItem pinNumber={16} isEnabled={digitalPin16} />
              <PinsDigitalItem pinNumber={17} isEnabled={digitalPin17} />
              <PinsDigitalItem pinNumber={18} isEnabled={digitalPin18} />
              <PinsDigitalItem pinNumber={19} isEnabled={digitalPin19} />
              <PinsDigitalItem pinNumber={20} isEnabled={digitalPin20} />
              <PinsDigitalItem pinNumber={21} isEnabled={digitalPin21} />
              <PinsDigitalItem pinNumber={22} isEnabled={digitalPin22} />
              <PinsDigitalItem pinNumber={23} isEnabled={digitalPin23} />
              <PinsDigitalItem pinNumber={24} isEnabled={digitalPin24} />
              <PinsDigitalItem pinNumber={25} isEnabled={digitalPin25} />
              <PinsDigitalItem pinNumber={26} isEnabled={digitalPin26} />
              <PinsDigitalItem pinNumber={27} isEnabled={digitalPin27} />
              <PinsDigitalItem pinNumber={28} isEnabled={digitalPin28} />
              <PinsDigitalItem pinNumber={29} isEnabled={digitalPin29} />
              <PinsDigitalItem pinNumber={30} isEnabled={digitalPin30} />
              <PinsDigitalItem pinNumber={31} isEnabled={digitalPin31} />
              <PinsDigitalItem pinNumber={32} isEnabled={digitalPin32} />
              <PinsDigitalItem pinNumber={33} isEnabled={digitalPin33} />
              <PinsDigitalItem pinNumber={34} isEnabled={digitalPin34} />
              <PinsDigitalItem pinNumber={35} isEnabled={digitalPin35} />
              <PinsDigitalItem pinNumber={36} isEnabled={digitalPin36} />
              <PinsDigitalItem pinNumber={37} isEnabled={digitalPin37} />
              <PinsDigitalItem pinNumber={38} isEnabled={digitalPin38} />
              <PinsDigitalItem pinNumber={39} isEnabled={digitalPin39} />
              <PinsDigitalItem pinNumber={40} isEnabled={digitalPin40} />
              <PinsDigitalItem pinNumber={41} isEnabled={digitalPin41} />
              <PinsDigitalItem pinNumber={42} isEnabled={digitalPin42} />
              <PinsDigitalItem pinNumber={43} isEnabled={digitalPin43} />
              <PinsDigitalItem pinNumber={44} isEnabled={digitalPin44} />
              <PinsDigitalItem pinNumber={45} isEnabled={digitalPin45} />
              <PinsDigitalItem pinNumber={46} isEnabled={digitalPin46} />
              <PinsDigitalItem pinNumber={47} isEnabled={digitalPin47} />
              <PinsDigitalItem pinNumber={48} isEnabled={digitalPin48} />
              <PinsDigitalItem pinNumber={49} isEnabled={digitalPin49} />
              <PinsDigitalItem pinNumber={50} isEnabled={digitalPin50} />
              <PinsDigitalItem pinNumber={51} isEnabled={digitalPin51} />
              <PinsDigitalItem pinNumber={52} isEnabled={digitalPin52} />
              <PinsDigitalItem pinNumber={53} isEnabled={digitalPin53} />
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
