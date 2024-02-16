import React from "react"

interface SerialMonitorInputProps {
  sendSerialData: () => void
  value: string
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void
  simulatorRunning: boolean
}

const SerialMonitorInput = ({
  sendSerialData,
  value,
  onChange,
  simulatorRunning,
}: SerialMonitorInputProps) => {
  const refInput = React.useRef<HTMLInputElement>(null)

  const _onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendSerialData()
      refInput.current.focus()
    }
  }

  const _onChange = (event: { target: HTMLInputElement }) => {
    onChange(event.target.value)
  }

  return (
    <input
      ref={refInput}
      className="serialInput"
      type="text"
      value={value}
      onChange={_onChange}
      onKeyUp={_onKeyUp}
      readOnly={!simulatorRunning}
      disabled={!simulatorRunning}    
    />
  )
}

export default SerialMonitorInput
