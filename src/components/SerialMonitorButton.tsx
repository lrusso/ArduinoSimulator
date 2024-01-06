import React from "react"
import { t } from "../utils/languages"

interface SerialMonitorButtonProps {
  sendSerialData: () => void
  simulatorRunning: boolean
}

const SerialMonitorButton = ({
  sendSerialData,
  simulatorRunning,
}: SerialMonitorButtonProps) => {
  return (
    <input
      type="submit"
      style={{ ...styles.button, color: simulatorRunning ? "black" : "gray" }}
      value={t("SEND")}
      disabled={!simulatorRunning}
      onClick={sendSerialData}
    />
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  button: {
    borderRadius: 0,
    marginLeft: "2px",
    fontFamily: "Arial",
    fontSize: "13px",
    border: "1px solid silver",
    backgroundColor: "#D9D9D9",
    height: "28px",
    width: "99px",
    marginRight: "5px",
    WebkitAppearance: "none",
  },
}

export default SerialMonitorButton
