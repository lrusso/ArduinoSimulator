import React from "react"
import { useSimulatorContext } from "../contexts/SimulatorContext"

const SerialMonitorData = () => {
  const { outputData, simulatorRunning } = useSimulatorContext()
  const refData = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (refData.current) {
      refData.current.innerHTML = outputData
      refData.current.scrollIntoView(false)
    }
  }, [outputData])

  return (
    <div className="serialData">
      <div className={`serialData-inner ${!simulatorRunning && "disabled"}`}>
        <div className="serialData-data" ref={refData}></div>
      </div>
    </div>
  )
}

export default SerialMonitorData
