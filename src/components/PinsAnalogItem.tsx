import React from "react"

import { Gpio_analog } from "../utils/interfaces"

interface PinsAnalogItemProps {
  gpio_analog: Gpio_analog
}

const PinsAnalogItem = ({ gpio_analog }: PinsAnalogItemProps) => {
  return <div style={styles.container}>{gpio_analog.duty}</div>
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
}

export default PinsAnalogItem
