import React from "react"
import { Gpio_Analog } from "../utils/interfaces"

import './PinsDigitalItem.css'

interface PinsAnalogItemProps {
  gpioAnalog: Gpio_Analog
}

const PinsAnalogItem = ({ gpioAnalog }: PinsAnalogItemProps) => {
  const [age, setAge] = React.useState("");

  const handle_onchange = (e) => {   
    setAge(e.target.value);
    // gpioAnalog.duty = (e.target.value);    
  }

  return <input type="number" style={styles.input} value={age} onChange={handle_onchange}></input>
  // return <div style={styles.container}></div>
}

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
  }
}

export default PinsAnalogItem
