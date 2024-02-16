import React from "react";
import { Gpio_Analog } from "../utils/interfaces";

import { setAnalogPin } from "../utils/interpreter";
import { useSimulatorContext } from "../contexts/SimulatorContext";

interface PinsAnalogItemProps {
  gpioAnalog: Gpio_Analog;
}

const PinsAnalogItem = ({ gpioAnalog }: PinsAnalogItemProps) => {
  const { handleSetAnalogPins, simulatorRunning } = useSimulatorContext();

  const handler_onchange = (e) => {
    const newValue = e.target.value;
    gpioAnalog.duty = e.target.value;
    setAnalogPin(gpioAnalog.pinNumber, newValue);
    handleSetAnalogPins(gpioAnalog.pinNumber, newValue);
  };

  return (
    <div className="pinanalogitem-container">
    <label>
        <input
          type="number"
        
          value={gpioAnalog.duty}
          onChange={handler_onchange}
          disabled={simulatorRunning == false || !gpioAnalog.isInput}
        ></input>
        {gpioAnalog.pinNumber}
      </label>
    </div>
  );
};

export default PinsAnalogItem;
