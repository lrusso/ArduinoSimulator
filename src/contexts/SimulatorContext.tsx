/* eslint-disable no-unused-vars */
import React from "react"

import { Gpio, Gpio_Analog } from "../utils/interfaces"

interface SimulatorContextType {
  filename: null | string
  setFilename: React.Dispatch<string>
  boardType: null | string
  setBoardType: React.Dispatch<string>
  digitalPins: null | Gpio[]
  setDigitalPins: React.Dispatch<React.SetStateAction<null | Gpio[]>>
  handleSetDigitalPins: (index: number, state: boolean) => void
  analogPins: null | Gpio_Analog[]
  setAnalogPins: React.Dispatch<React.SetStateAction<null | Gpio_Analog[]>>
  handleSetAnalogPins: (index: number, duty: number) => void
  outputData: null | string
  setOutputData: React.Dispatch<string>
  simulatorRunning: boolean
  setSimulatorRunning: React.Dispatch<boolean>
}

const initializeDigitalPins = Array(54)
  .fill(null)
  .map((_, index) => ({
    pinNumber: index,
    isInput: false,
    isEnabled: false,
  }))

const initializeAnalogPins = Array(16)
  .fill(null)
  .map((_, index) => ({
    pinNumber: index,
    isInput: false,
    duty: 0,
  }))

const SimulatorContext = React.createContext<SimulatorContextType>({
  filename: null,
  setFilename: () => {},
  boardType: null,
  setBoardType: () => {},
  digitalPins: initializeDigitalPins,
  setDigitalPins: () => {},
  analogPins: initializeAnalogPins,
  handleSetDigitalPins: (s, e) => {},
  setAnalogPins: () => {},
  handleSetAnalogPins: (s, e) => {},
  outputData: null,
  setOutputData: () => {},
  simulatorRunning: null,
  setSimulatorRunning: () => {},
})

export function SimulatorContextProvider({ children }) {
  const [filename, setFilename] = React.useState<string | null>(null)
  const [boardType, setBoardType] = React.useState<string | null>(null)
  const [digitalPins, setDigitalPins] = React.useState<Gpio[]>(initializeDigitalPins)
  const [analogPins, setAnalogPins] =
    React.useState<Gpio_Analog[]>(initializeAnalogPins)
  const [outputData, setOutputData] = React.useState<string>("")
  const [simulatorRunning, setSimulatorRunning] = React.useState<boolean>(false)

  const updateDigitalPin = (pinIndex: number, updatedPin: Gpio) => {
    setDigitalPins((prevDigitalPins) => {
      const newDigitalPins = [...prevDigitalPins]
      newDigitalPins[pinIndex] = updatedPin
      return newDigitalPins
    })
  }

  const handleSetDigitalPins = (pinIndex: number, state: boolean) => {
    const updatedPin = { ...digitalPins[pinIndex] }
    updatedPin.isEnabled = state
    updateDigitalPin(pinIndex, updatedPin)
  }

  const updateAnalogPin = (pinIndex: number, updatedPin: Gpio_Analog) => {
    setAnalogPins((prevAnalogPins) => {
      const newAnalogPins = [...prevAnalogPins]
      newAnalogPins[pinIndex] = updatedPin
      return newAnalogPins
    })
  }

  const handleSetAnalogPins = (pinIndex: number, duty: number) => {
    const updatedPin = { ...analogPins[pinIndex] }
    updatedPin.duty = duty
    updateAnalogPin(pinIndex, updatedPin)
  }

  return (
    <SimulatorContext.Provider
      value={{
        filename: filename,
        setFilename: setFilename,
        boardType: boardType,
        setBoardType: setBoardType,
        digitalPins,
        setDigitalPins,
        handleSetDigitalPins,
        analogPins,
        setAnalogPins,
        handleSetAnalogPins,
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
