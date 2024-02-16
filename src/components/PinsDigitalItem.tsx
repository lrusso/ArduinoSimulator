import React from "react"

import { setDigitalPin } from "../utils/interpreter"
import { useSimulatorContext } from "../contexts/SimulatorContext"

import { Gpio } from "../utils/interfaces"

interface PinsDigitalItemProps {
  gpio: Gpio,
  setDigital: (Number, Boolean) => {},
}

const PinsDigitalItem = ({ gpio }: PinsDigitalItemProps) => {  
  const {
    handleSetDigitalPins,
  } = useSimulatorContext()

  const handler_onchange = (e) => {    
    const newState = e.target.checked;
    setDigitalPin(gpio.pinNumber, newState); 
    handleSetDigitalPins(gpio.pinNumber, newState);   
  }


  return gpio.isInput ? (
    <input
      style={{ ...styles.checkbox }}
      type="checkbox"
      checked={gpio.state}
      onChange={handler_onchange}
    />
  ) : (
    <div style={{ backgroundColor: gpio.state ? "green" : "red", ...styles.led }} />
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  led: {
    display: "block",
    width: "18px",
    marginLeft: "3px",
    marginRight: "3px",
    height: "16px",
    cursor: "default",
    borderRadius: "50%",
  },

  checkbox: {   
    width: "16px",
    height: "16px",
    cursor: "default",
  },
}

export default PinsDigitalItem
