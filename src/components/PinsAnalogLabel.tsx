import React from "react"
import { t } from "../utils/languages"

const PinsAnalogLabel = () => {
  return <div style={styles.label}>{t("ANALOG_PINS")}</div>
}

const styles: { [key: string]: React.CSSProperties } = {
  label: {
    float: "left",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: "13px",
    lineHeight: 2,
    fontWeight: "bold",
    marginLeft: "7px",
    marginRight: "1rem",
    cursor: "default",
    color: "#AAA",
    whiteSpace: "nowrap",
  },
}

export default PinsAnalogLabel
