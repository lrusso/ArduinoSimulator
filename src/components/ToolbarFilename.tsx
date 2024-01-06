import React from "react"
import { useSimulatorContext } from "../contexts/SimulatorContext"
import { t } from "../utils/languages"

const ToolbarFilename = () => {
  const { filename } = useSimulatorContext()
  return (
    <div style={styles.container}>
      <div style={styles.label}>{filename ? filename : t("FILENAME")}</div>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    float: "left",
    display: "flex",
    margin: 0,
    height: "40px",
    alignItems: "center",
  },
  label: {
    float: "left",
    fontFamily: "Arial",
    fontSize: "13px",
    lineHeight: 2.7,
    marginLeft: "6px",
    marginRight: "0px",
    cursor: "default",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    userSelect: "none",
  },
}

export default ToolbarFilename
