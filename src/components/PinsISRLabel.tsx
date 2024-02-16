import React from "react"
import { t } from "../utils/languages"

const PinsDigitalLabel = () => {
  return <div style={styles.label}>{t("INTERRUPTS")}</div>
}

const styles: { [key: string]: React.CSSProperties } = {
  label: {
    float: "left",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: "13px",
    lineHeight: 2,
    fontWeight: "bold",
    marginLeft: "3rem",
    marginRight: "0rem",
    cursor: "default",
    color: "#AAA",
    whiteSpace: "nowrap",
  },
}

export default PinsDigitalLabel
