import React from "react";

import { setDigitalPin } from "../utils/interpreter";
import { useSimulatorContext } from "../contexts/SimulatorContext";

import { Gpio } from "../utils/interfaces";

interface PinsDigitalItemProps {
  gpio: Gpio;
  setDigital: (Number, Boolean) => {};
}

const PinsDigitalItem = ({ gpio }: PinsDigitalItemProps) => {
  const { handleSetDigitalPins, simulatorRunning } = useSimulatorContext();

  const handler_onchange = (e) => {
    const newState = e.target.checked;
    setDigitalPin(gpio.pinNumber, newState);
    handleSetDigitalPins(gpio.pinNumber, newState);
  };

  return (
    <div className="pindigitalitem-container">
      <label>
        <input         
          type="checkbox"
          checked={gpio.state}
          onChange={handler_onchange}
          disabled={simulatorRunning == false || !gpio.isInput}
        />
        {gpio.pinNumber}
      </label>
    </div>
  );
};

export default PinsDigitalItem;
