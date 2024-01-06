import React from "react"

interface PinsAnalogItemProps {
  value: number
}

const PinsAnalogItem = ({ value }: PinsAnalogItemProps) => {
  return <div style={styles.container}>{value}</div>
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
