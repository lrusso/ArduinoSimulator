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
     className="serial_send"
      value={t("SEND")}
      disabled={!simulatorRunning}
      onClick={sendSerialData}
    />
  )
}


export default SerialMonitorButton
