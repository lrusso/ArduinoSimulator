import React from "react"

interface PinsDigitalItemProps {
  pinNumber: number
  isEnabled: boolean
}

const PinsDigitalItem = ({ pinNumber, isEnabled }: PinsDigitalItemProps) => {
  return (
    <div
      style={{ backgroundColor: isEnabled ? "green" : "red", ...styles.container }}
    >
      {pinNumber}
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
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
