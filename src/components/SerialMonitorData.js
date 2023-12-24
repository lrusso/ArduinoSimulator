import React from "react"
import { useSimulatorContext } from "../contexts/SimulatorContext"

const SerialMonitorData = () => {
  const { outputData } = useSimulatorContext()
  const refData = React.useRef(null)

  React.useEffect(() => {
    if (refData.current) {
      refData.current.innerHTML = outputData
      refData.current.scrollIntoView(false)
    }
  }, [outputData])

  return (
    <div style={styles.container}>
      <div style={styles.data} ref={refData}></div>
    </div>
  )
}

const styles = {
  container: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    height: "137px",
    overflow: "scroll",
    backgroundColor: "white",
  },
  data: {
    padding: "10px",
    whiteSpace: "pre-line",
    fontFamily: "monospace,monospace",
    overflowWrap: "break-word",
    WebkitUserSelect: "text",
    MozUserSelect: "text",
    userSelect: "text",
  },
}

export default SerialMonitorData
