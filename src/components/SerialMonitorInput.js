import React from "react"

const SerialMonitorInput = ({
  sendSerialData,
  value,
  onChange,
  simulatorRunning,
}) => {
  const refInput = React.useRef(null)

  const _onKeyUp = (event) => {
    if (event.key === "Enter") {
      sendSerialData()
      refInput.current.focus()
    }
  }

  const _onChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <input
      ref={refInput}
      type="text"
      value={value}
      onChange={_onChange}
      onKeyUp={_onKeyUp}
      readOnly={!simulatorRunning}
      style={simulatorRunning ? styles.enabled : styles.disabled}
    />
  )
}

const styles = {
  enabled: {
    flex: 2,
    borderRadius: 0,
    marginLeft: "5px",
    marginBottom: "7px",
    marginRight: "3px",
    border: "1px solid silver",
    outline: "none",
    fontFamily: "Arial",
    fontSize: "13px",
    height: "18px",
    padding: "4px",
    WebkitAppearance: "none",
  },
  disabled: {
    flex: 2,
    borderRadius: 0,
    marginLeft: "5px",
    marginBottom: "7px",
    marginRight: "3px",
    border: "1px solid silver",
    outline: "none",
    fontFamily: "Arial",
    fontSize: "13px",
    height: "18px",
    padding: "4px",
    cursor: "default",
    WebkitAppearance: "none",
    backgroundColor: "#D9D9D9",
  },
}

export default SerialMonitorInput
