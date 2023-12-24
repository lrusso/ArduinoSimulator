import React from "react"

const PinsDigitalItem = ({ pinNumber, isEnabled }) => {
  return (
    <div
      style={{ backgroundColor: isEnabled ? "green" : "red", ...styles.container }}
    >
      {pinNumber}
    </div>
  )
}

const styles = {
  container: {
    float: "left",
    width: "16px",
    height: "16px",
    borderRadius: "16px",
    marginTop: "4px",
    marginLeft: "4px",
    fontSize: "11px",
    fontFamily: "Arial",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    cursor: "default",
  },
}

export default PinsDigitalItem
