import React from "react"

const SimulatorContext = React.createContext({
  filename: null,
  setFilename: () => {},
  digitalPin0: null,
  setDigitalPin0: () => {},
  digitalPin1: null,
  setDigitalPin1: () => {},
  digitalPin2: null,
  setDigitalPin2: () => {},
  digitalPin3: null,
  setDigitalPin3: () => {},
  digitalPin4: null,
  setDigitalPin4: () => {},
  digitalPin5: null,
  setDigitalPin5: () => {},
  digitalPin6: null,
  setDigitalPin6: () => {},
  digitalPin7: null,
  setDigitalPin7: () => {},
  digitalPin8: null,
  setDigitalPin8: () => {},
  digitalPin9: null,
  setDigitalPin9: () => {},
  digitalPin10: null,
  setDigitalPin10: () => {},
  digitalPin11: null,
  setDigitalPin11: () => {},
  digitalPin12: null,
  setDigitalPin12: () => {},
  digitalPin13: null,
  setDigitalPin13: () => {},
  analogPin0: null,
  setAnalogPin0: () => {},
  analogPin1: null,
  setAnalogPin1: () => {},
  analogPin2: null,
  setAnalogPin2: () => {},
  analogPin3: null,
  setAnalogPin3: () => {},
  analogPin4: null,
  setAnalogPin4: () => {},
  analogPin5: null,
  setAnalogPin5: () => {},
  outputData: null,
  setOutputData: () => {},
  simulatorRunning: null,
  setSimulatorRunning: () => {},
})

export function SimulatorContextProvider({ children }) {
  const [filename, setFilename] = React.useState(null)
  const [digitalPin0, setDigitalPin0] = React.useState(false)
  const [digitalPin1, setDigitalPin1] = React.useState(false)
  const [digitalPin2, setDigitalPin2] = React.useState(false)
  const [digitalPin3, setDigitalPin3] = React.useState(false)
  const [digitalPin4, setDigitalPin4] = React.useState(false)
  const [digitalPin5, setDigitalPin5] = React.useState(false)
  const [digitalPin6, setDigitalPin6] = React.useState(false)
  const [digitalPin7, setDigitalPin7] = React.useState(false)
  const [digitalPin8, setDigitalPin8] = React.useState(false)
  const [digitalPin9, setDigitalPin9] = React.useState(false)
  const [digitalPin10, setDigitalPin10] = React.useState(false)
  const [digitalPin11, setDigitalPin11] = React.useState(false)
  const [digitalPin12, setDigitalPin12] = React.useState(false)
  const [digitalPin13, setDigitalPin13] = React.useState(false)
  const [analogPin0, setAnalogPin0] = React.useState(0)
  const [analogPin1, setAnalogPin1] = React.useState(0)
  const [analogPin2, setAnalogPin2] = React.useState(0)
  const [analogPin3, setAnalogPin3] = React.useState(0)
  const [analogPin4, setAnalogPin4] = React.useState(0)
  const [analogPin5, setAnalogPin5] = React.useState(0)
  const [outputData, setOutputData] = React.useState("")
  const [simulatorRunning, setSimulatorRunning] = React.useState(false)

  return (
    <SimulatorContext.Provider
      value={{
        filename: filename,
        setFilename: setFilename,
        digitalPin0: digitalPin0,
        setDigitalPin0: setDigitalPin0,
        digitalPin1: digitalPin1,
        setDigitalPin1: setDigitalPin1,
        digitalPin2: digitalPin2,
        setDigitalPin2: setDigitalPin2,
        digitalPin3: digitalPin3,
        setDigitalPin3: setDigitalPin3,
        digitalPin4: digitalPin4,
        setDigitalPin4: setDigitalPin4,
        digitalPin5: digitalPin5,
        setDigitalPin5: setDigitalPin5,
        digitalPin6: digitalPin6,
        setDigitalPin6: setDigitalPin6,
        digitalPin7: digitalPin7,
        setDigitalPin7: setDigitalPin7,
        digitalPin8: digitalPin8,
        setDigitalPin8: setDigitalPin8,
        digitalPin9: digitalPin9,
        setDigitalPin9: setDigitalPin9,
        digitalPin10: digitalPin10,
        setDigitalPin10: setDigitalPin10,
        digitalPin11: digitalPin11,
        setDigitalPin11: setDigitalPin11,
        digitalPin12: digitalPin12,
        setDigitalPin12: setDigitalPin12,
        digitalPin13: digitalPin13,
        setDigitalPin13: setDigitalPin13,
        analogPin0: analogPin0,
        setAnalogPin0: setAnalogPin0,
        analogPin1: analogPin1,
        setAnalogPin1: setAnalogPin1,
        analogPin2: analogPin2,
        setAnalogPin2: setAnalogPin2,
        analogPin3: analogPin3,
        setAnalogPin3: setAnalogPin3,
        analogPin4: analogPin4,
        setAnalogPin4: setAnalogPin4,
        analogPin5: analogPin5,
        setAnalogPin5: setAnalogPin5,
        outputData: outputData,
        setOutputData: setOutputData,
        simulatorRunning: simulatorRunning,
        setSimulatorRunning: setSimulatorRunning,
      }}
    >
      {children}
    </SimulatorContext.Provider>
  )
}

export function useSimulatorContext() {
  return React.useContext(SimulatorContext)
}
