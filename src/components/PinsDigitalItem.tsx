import React from "react"

import { setDigitalPin } from "../utils/interpreter"
import { useSimulatorContext } from "../contexts/SimulatorContext"

import { Gpio } from "../utils/interfaces"

import './PinsDigitalItem.css'

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

  return <label className="form-control">
            <input  
              type="checkbox"
              checked={gpio.state}
              onChange={handler_onchange}
              disabled={gpio.isInput == false}
            />
            1
          </label>
}

export default PinsDigitalItem
