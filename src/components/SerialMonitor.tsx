import React from "react"
import SerialMonitorLabel from "./SerialMonitorLabel"
import SerialMonitorInput from "./SerialMonitorInput"
import SerialMonitorButton from "./SerialMonitorButton"
import SerialMonitorData from "./SerialMonitorData"
import { sendSerialData } from "../utils/interpreter"
import { useSimulatorContext } from "../contexts/SimulatorContext"

const SerialMonitor = () => {
  const { simulatorRunning } = useSimulatorContext()
  const [inputValue, setInputValue] = React.useState("")

  const _sendSerialData = () => {
    sendSerialData(inputValue)
    setInputValue("")
  }

  React.useEffect(() => {
    if (!simulatorRunning) {
      setInputValue("")
    }
  }, [simulatorRunning])

  return (
    <div style={styles.container}>
      <SerialMonitorLabel />
      <div style={styles.input}>
        <SerialMonitorInput
          sendSerialData={_sendSerialData}
          value={inputValue}
          onChange={setInputValue}
          simulatorRunning={simulatorRunning}
        />
        <SerialMonitorButton
          sendSerialData={_sendSerialData}
          simulatorRunning={simulatorRunning}
        />
      </div>
      <SerialMonitorData />
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#F2F2F2",
    borderBottom: "1px solid #D3D3D3",
  },
  input: {
    width: "100%",
    display: "flex",
  },
}

export default SerialMonitor
