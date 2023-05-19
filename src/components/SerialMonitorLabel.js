import React from "react"
import { t } from "../utils/service"

const SerialMonitorLabel = () => {
  return <div style={styles.label}>{t("SERIAL_MONITOR")}</div>
}

const styles = {
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

export default SerialMonitorLabel
