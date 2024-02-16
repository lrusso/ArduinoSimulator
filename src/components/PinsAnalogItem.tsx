import React from "react";
import { Gpio_Analog } from "../utils/interfaces";

import { setAnalogPin } from "../utils/interpreter";
import { useSimulatorContext } from "../contexts/SimulatorContext";

interface PinsAnalogItemProps {
  gpioAnalog: Gpio_Analog;
}

const PinsAnalogItem = ({ gpioAnalog }: PinsAnalogItemProps) => {
  const { handleSetDigitalPins } = useSimulatorContext();

  const handler_onchange = (e) => {
    const newValue = e.target.value;
    gpioAnalog.duty = e.target.value;
    setAnalogPin(gpioAnalog.pinNumber, newValue);
    handleSetDigitalPins(gpioAnalog.pinNumber, newValue);
  };

  return (
    <input
      type="number"
      style={styles.input}
      value={gpioAnalog.duty}
      onChange={handler_onchange}
      disabled={!gpioAnalog.isInput}
    ></input>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    float: "left",
    width: "40px",
    height: "16px",
    borderRadius: "16px",
    marginTop: "4px",
    marginLeft: "4px",
    backgroundColor: "black",
    fontSize: "11px",
    fontFamily: "Arial",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    cursor: "default",
  },
  input: {
    display: "inline-block",
    background: "#333",
    margin: "2px",
    border: "none",
    width: "40px",
    color: "white",
  },
};

export default PinsAnalogItem;
