import React from "react"
import { t } from "../utils/languages"

const PinsDigitalLabel = () => {
  return <div style={styles.label}>{t("DIGITAL_PINS")}</div>
}

const styles: { [key: string]: React.CSSProperties } = {
  label: {
    float: "left",
    fontFamily: "Arial",
    fontSize: "13px",
    lineHeight: 2,
    fontWeight: "bold",
    marginLeft: "7px",
    marginRight: "1px",
    cursor: "default",
  },
}

export default PinsDigitalLabel
