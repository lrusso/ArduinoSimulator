/* eslint-disable no-unused-vars */
import React from "react"

import { Gpio, Gpio_Analog } from "../utils/interfaces"
import { Constants } from "src/utils/constants"

interface SimulatorContextType {
  filename: null | string
  setFilename: React.Dispatch<string>
  boardType: null | string
  setBoardType: React.Dispatch<string>
  handleSetPinMode: (index: number, mode: number) => void
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
    isInput: true,
    state: false,
  }))

const initializeAnalogPins = Array(16)
  .fill(null)
  .map((_, index) => ({
    pinNumber: index,
    isInput: true,
    duty: 0,
  }))

const SimulatorContext = React.createContext<SimulatorContextType>({
  filename: null,
  setFilename: () => {},
  boardType: null,
  setBoardType: () => {},
  handleSetPinMode: () => {},
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
  const [analogPins, setAnalogPins] = React.useState<Gpio_Analog[]>(initializeAnalogPins)
  const [outputData, setOutputData] = React.useState<string>("")
  const [simulatorRunning, setSimulatorRunning] = React.useState<boolean>(false)

  const handleSetPinMode = (pinIndex: number, mode: number) => {       
    setDigitalPins((prevDigitalPins) => {
      const updatedPin = { ...prevDigitalPins[pinIndex] }
      updatedPin.isInput = mode === Constants.INPUT || mode === Constants.INPUT_PULLPUP
      const newDigitalPins = [...prevDigitalPins]
      newDigitalPins[pinIndex] = updatedPin
      return newDigitalPins
    })
  }

  const handleSetDigitalPins = (pinIndex: number, state: boolean) => {    
    setDigitalPins((prevDigitalPins) => {
      const updatedPin = { ...prevDigitalPins[pinIndex] }
      updatedPin.state = state
      const newDigitalPins = [...prevDigitalPins]
      newDigitalPins[pinIndex] = updatedPin
      return newDigitalPins
    })
  }

  const handleSetAnalogPins = (pinIndex: number, duty: number) => {
    setAnalogPins((prevAnalogsPins) => {
      const updatedPin = { ...prevAnalogsPins[pinIndex] }
      updatedPin.duty = duty
      const newDigitalPins = [...prevAnalogsPins]
      newDigitalPins[pinIndex] = updatedPin
      return newDigitalPins
    })
  }

  return (
    <SimulatorContext.Provider
      value={{
        filename: filename,
        setFilename: setFilename,
        boardType: boardType,
        setBoardType: setBoardType,
        handleSetPinMode,
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
