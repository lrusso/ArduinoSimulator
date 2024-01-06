import React from "react"

interface SimulatorContextType {
  filename: null | string
  setFilename: React.Dispatch<string>
  boardType: null | string
  setBoardType: React.Dispatch<string>
  digitalPin0: null | boolean
  setDigitalPin0: React.Dispatch<boolean>
  digitalPin1: null | boolean
  setDigitalPin1: React.Dispatch<boolean>
  digitalPin2: null | boolean
  setDigitalPin2: React.Dispatch<boolean>
  digitalPin3: null | boolean
  setDigitalPin3: React.Dispatch<boolean>
  digitalPin4: null | boolean
  setDigitalPin4: React.Dispatch<boolean>
  digitalPin5: null | boolean
  setDigitalPin5: React.Dispatch<boolean>
  digitalPin6: null | boolean
  setDigitalPin6: React.Dispatch<boolean>
  digitalPin7: null | boolean
  setDigitalPin7: React.Dispatch<boolean>
  digitalPin8: null | boolean
  setDigitalPin8: React.Dispatch<boolean>
  digitalPin9: null | boolean
  setDigitalPin9: React.Dispatch<boolean>
  digitalPin10: null | boolean
  setDigitalPin10: React.Dispatch<boolean>
  digitalPin11: null | boolean
  setDigitalPin11: React.Dispatch<boolean>
  digitalPin12: null | boolean
  setDigitalPin12: React.Dispatch<boolean>
  digitalPin13: null | boolean
  setDigitalPin13: React.Dispatch<boolean>
  digitalPin14: null | boolean
  setDigitalPin14: React.Dispatch<boolean>
  digitalPin15: null | boolean
  setDigitalPin15: React.Dispatch<boolean>
  digitalPin16: null | boolean
  setDigitalPin16: React.Dispatch<boolean>
  digitalPin17: null | boolean
  setDigitalPin17: React.Dispatch<boolean>
  digitalPin18: null | boolean
  setDigitalPin18: React.Dispatch<boolean>
  digitalPin19: null | boolean
  setDigitalPin19: React.Dispatch<boolean>
  digitalPin20: null | boolean
  setDigitalPin20: React.Dispatch<boolean>
  digitalPin21: null | boolean
  setDigitalPin21: React.Dispatch<boolean>
  digitalPin22: null | boolean
  setDigitalPin22: React.Dispatch<boolean>
  digitalPin23: null | boolean
  setDigitalPin23: React.Dispatch<boolean>
  digitalPin24: null | boolean
  setDigitalPin24: React.Dispatch<boolean>
  digitalPin25: null | boolean
  setDigitalPin25: React.Dispatch<boolean>
  digitalPin26: null | boolean
  setDigitalPin26: React.Dispatch<boolean>
  digitalPin27: null | boolean
  setDigitalPin27: React.Dispatch<boolean>
  digitalPin28: null | boolean
  setDigitalPin28: React.Dispatch<boolean>
  digitalPin29: null | boolean
  setDigitalPin29: React.Dispatch<boolean>
  digitalPin30: null | boolean
  setDigitalPin30: React.Dispatch<boolean>
  digitalPin31: null | boolean
  setDigitalPin31: React.Dispatch<boolean>
  digitalPin32: null | boolean
  setDigitalPin32: React.Dispatch<boolean>
  digitalPin33: null | boolean
  setDigitalPin33: React.Dispatch<boolean>
  digitalPin34: null | boolean
  setDigitalPin34: React.Dispatch<boolean>
  digitalPin35: null | boolean
  setDigitalPin35: React.Dispatch<boolean>
  digitalPin36: null | boolean
  setDigitalPin36: React.Dispatch<boolean>
  digitalPin37: null | boolean
  setDigitalPin37: React.Dispatch<boolean>
  digitalPin38: null | boolean
  setDigitalPin38: React.Dispatch<boolean>
  digitalPin39: null | boolean
  setDigitalPin39: React.Dispatch<boolean>
  digitalPin40: null | boolean
  setDigitalPin40: React.Dispatch<boolean>
  digitalPin41: null | boolean
  setDigitalPin41: React.Dispatch<boolean>
  digitalPin42: null | boolean
  setDigitalPin42: React.Dispatch<boolean>
  digitalPin43: null | boolean
  setDigitalPin43: React.Dispatch<boolean>
  digitalPin44: null | boolean
  setDigitalPin44: React.Dispatch<boolean>
  digitalPin45: null | boolean
  setDigitalPin45: React.Dispatch<boolean>
  digitalPin46: null | boolean
  setDigitalPin46: React.Dispatch<boolean>
  digitalPin47: null | boolean
  setDigitalPin47: React.Dispatch<boolean>
  digitalPin48: null | boolean
  setDigitalPin48: React.Dispatch<boolean>
  digitalPin49: null | boolean
  setDigitalPin49: React.Dispatch<boolean>
  digitalPin50: null | boolean
  setDigitalPin50: React.Dispatch<boolean>
  digitalPin51: null | boolean
  setDigitalPin51: React.Dispatch<boolean>
  digitalPin52: null | boolean
  setDigitalPin52: React.Dispatch<boolean>
  digitalPin53: null | boolean
  setDigitalPin53: React.Dispatch<boolean>
  analogPin0: null | number
  setAnalogPin0: React.Dispatch<number>
  analogPin1: null | number
  setAnalogPin1: React.Dispatch<number>
  analogPin2: null | number
  setAnalogPin2: React.Dispatch<number>
  analogPin3: null | number
  setAnalogPin3: React.Dispatch<number>
  analogPin4: null | number
  setAnalogPin4: React.Dispatch<number>
  analogPin5: null | number
  setAnalogPin5: React.Dispatch<number>
  analogPin6: null | number
  setAnalogPin6: React.Dispatch<number>
  analogPin7: null | number
  setAnalogPin7: React.Dispatch<number>
  analogPin8: null | number
  setAnalogPin8: React.Dispatch<number>
  analogPin9: null | number
  setAnalogPin9: React.Dispatch<number>
  analogPin10: null | number
  setAnalogPin10: React.Dispatch<number>
  analogPin11: null | number
  setAnalogPin11: React.Dispatch<number>
  analogPin12: null | number
  setAnalogPin12: React.Dispatch<number>
  analogPin13: null | number
  setAnalogPin13: React.Dispatch<number>
  analogPin14: null | number
  setAnalogPin14: React.Dispatch<number>
  outputData: null | string
  setOutputData: React.Dispatch<string>
  simulatorRunning: boolean
  setSimulatorRunning: React.Dispatch<boolean>
}

const SimulatorContext = React.createContext<SimulatorContextType>({
  filename: null,
  setFilename: () => {},
  boardType: null,
  setBoardType: () => {},
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
  digitalPin14: null,
  setDigitalPin14: () => {},
  digitalPin15: null,
  setDigitalPin15: () => {},
  digitalPin16: null,
  setDigitalPin16: () => {},
  digitalPin17: null,
  setDigitalPin17: () => {},
  digitalPin18: null,
  setDigitalPin18: () => {},
  digitalPin19: null,
  setDigitalPin19: () => {},
  digitalPin20: null,
  setDigitalPin20: () => {},
  digitalPin21: null,
  setDigitalPin21: () => {},
  digitalPin22: null,
  setDigitalPin22: () => {},
  digitalPin23: null,
  setDigitalPin23: () => {},
  digitalPin24: null,
  setDigitalPin24: () => {},
  digitalPin25: null,
  setDigitalPin25: () => {},
  digitalPin26: null,
  setDigitalPin26: () => {},
  digitalPin27: null,
  setDigitalPin27: () => {},
  digitalPin28: null,
  setDigitalPin28: () => {},
  digitalPin29: null,
  setDigitalPin29: () => {},
  digitalPin30: null,
  setDigitalPin30: () => {},
  digitalPin31: null,
  setDigitalPin31: () => {},
  digitalPin32: null,
  setDigitalPin32: () => {},
  digitalPin33: null,
  setDigitalPin33: () => {},
  digitalPin34: null,
  setDigitalPin34: () => {},
  digitalPin35: null,
  setDigitalPin35: () => {},
  digitalPin36: null,
  setDigitalPin36: () => {},
  digitalPin37: null,
  setDigitalPin37: () => {},
  digitalPin38: null,
  setDigitalPin38: () => {},
  digitalPin39: null,
  setDigitalPin39: () => {},
  digitalPin40: null,
  setDigitalPin40: () => {},
  digitalPin41: null,
  setDigitalPin41: () => {},
  digitalPin42: null,
  setDigitalPin42: () => {},
  digitalPin43: null,
  setDigitalPin43: () => {},
  digitalPin44: null,
  setDigitalPin44: () => {},
  digitalPin45: null,
  setDigitalPin45: () => {},
  digitalPin46: null,
  setDigitalPin46: () => {},
  digitalPin47: null,
  setDigitalPin47: () => {},
  digitalPin48: null,
  setDigitalPin48: () => {},
  digitalPin49: null,
  setDigitalPin49: () => {},
  digitalPin50: null,
  setDigitalPin50: () => {},
  digitalPin51: null,
  setDigitalPin51: () => {},
  digitalPin52: null,
  setDigitalPin52: () => {},
  digitalPin53: null,
  setDigitalPin53: () => {},
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
  analogPin6: null,
  setAnalogPin6: () => {},
  analogPin7: null,
  setAnalogPin7: () => {},
  analogPin8: null,
  setAnalogPin8: () => {},
  analogPin9: null,
  setAnalogPin9: () => {},
  analogPin10: null,
  setAnalogPin10: () => {},
  analogPin11: null,
  setAnalogPin11: () => {},
  analogPin12: null,
  setAnalogPin12: () => {},
  analogPin13: null,
  setAnalogPin13: () => {},
  analogPin14: null,
  setAnalogPin14: () => {},
  outputData: null,
  setOutputData: () => {},
  simulatorRunning: null,
  setSimulatorRunning: () => {},
})

export function SimulatorContextProvider({ children }) {
  const [filename, setFilename] = React.useState<string | null>(null)
  const [boardType, setBoardType] = React.useState<string | null>(null)
  const [digitalPin0, setDigitalPin0] = React.useState<boolean>(false)
  const [digitalPin1, setDigitalPin1] = React.useState<boolean>(false)
  const [digitalPin2, setDigitalPin2] = React.useState<boolean>(false)
  const [digitalPin3, setDigitalPin3] = React.useState<boolean>(false)
  const [digitalPin4, setDigitalPin4] = React.useState<boolean>(false)
  const [digitalPin5, setDigitalPin5] = React.useState<boolean>(false)
  const [digitalPin6, setDigitalPin6] = React.useState<boolean>(false)
  const [digitalPin7, setDigitalPin7] = React.useState<boolean>(false)
  const [digitalPin8, setDigitalPin8] = React.useState<boolean>(false)
  const [digitalPin9, setDigitalPin9] = React.useState<boolean>(false)
  const [digitalPin10, setDigitalPin10] = React.useState<boolean>(false)
  const [digitalPin11, setDigitalPin11] = React.useState<boolean>(false)
  const [digitalPin12, setDigitalPin12] = React.useState<boolean>(false)
  const [digitalPin13, setDigitalPin13] = React.useState<boolean>(false)
  const [digitalPin14, setDigitalPin14] = React.useState<boolean>(false)
  const [digitalPin15, setDigitalPin15] = React.useState<boolean>(false)
  const [digitalPin16, setDigitalPin16] = React.useState<boolean>(false)
  const [digitalPin17, setDigitalPin17] = React.useState<boolean>(false)
  const [digitalPin18, setDigitalPin18] = React.useState<boolean>(false)
  const [digitalPin19, setDigitalPin19] = React.useState<boolean>(false)
  const [digitalPin20, setDigitalPin20] = React.useState<boolean>(false)
  const [digitalPin21, setDigitalPin21] = React.useState<boolean>(false)
  const [digitalPin22, setDigitalPin22] = React.useState<boolean>(false)
  const [digitalPin23, setDigitalPin23] = React.useState<boolean>(false)
  const [digitalPin24, setDigitalPin24] = React.useState<boolean>(false)
  const [digitalPin25, setDigitalPin25] = React.useState<boolean>(false)
  const [digitalPin26, setDigitalPin26] = React.useState<boolean>(false)
  const [digitalPin27, setDigitalPin27] = React.useState<boolean>(false)
  const [digitalPin28, setDigitalPin28] = React.useState<boolean>(false)
  const [digitalPin29, setDigitalPin29] = React.useState<boolean>(false)
  const [digitalPin30, setDigitalPin30] = React.useState<boolean>(false)
  const [digitalPin31, setDigitalPin31] = React.useState<boolean>(false)
  const [digitalPin32, setDigitalPin32] = React.useState<boolean>(false)
  const [digitalPin33, setDigitalPin33] = React.useState<boolean>(false)
  const [digitalPin34, setDigitalPin34] = React.useState<boolean>(false)
  const [digitalPin35, setDigitalPin35] = React.useState<boolean>(false)
  const [digitalPin36, setDigitalPin36] = React.useState<boolean>(false)
  const [digitalPin37, setDigitalPin37] = React.useState<boolean>(false)
  const [digitalPin38, setDigitalPin38] = React.useState<boolean>(false)
  const [digitalPin39, setDigitalPin39] = React.useState<boolean>(false)
  const [digitalPin40, setDigitalPin40] = React.useState<boolean>(false)
  const [digitalPin41, setDigitalPin41] = React.useState<boolean>(false)
  const [digitalPin42, setDigitalPin42] = React.useState<boolean>(false)
  const [digitalPin43, setDigitalPin43] = React.useState<boolean>(false)
  const [digitalPin44, setDigitalPin44] = React.useState<boolean>(false)
  const [digitalPin45, setDigitalPin45] = React.useState<boolean>(false)
  const [digitalPin46, setDigitalPin46] = React.useState<boolean>(false)
  const [digitalPin47, setDigitalPin47] = React.useState<boolean>(false)
  const [digitalPin48, setDigitalPin48] = React.useState<boolean>(false)
  const [digitalPin49, setDigitalPin49] = React.useState<boolean>(false)
  const [digitalPin50, setDigitalPin50] = React.useState<boolean>(false)
  const [digitalPin51, setDigitalPin51] = React.useState<boolean>(false)
  const [digitalPin52, setDigitalPin52] = React.useState<boolean>(false)
  const [digitalPin53, setDigitalPin53] = React.useState<boolean>(false)
  const [analogPin0, setAnalogPin0] = React.useState<number>(0)
  const [analogPin1, setAnalogPin1] = React.useState<number>(0)
  const [analogPin2, setAnalogPin2] = React.useState<number>(0)
  const [analogPin3, setAnalogPin3] = React.useState<number>(0)
  const [analogPin4, setAnalogPin4] = React.useState<number>(0)
  const [analogPin5, setAnalogPin5] = React.useState<number>(0)
  const [analogPin6, setAnalogPin6] = React.useState<number>(0)
  const [analogPin7, setAnalogPin7] = React.useState<number>(0)
  const [analogPin8, setAnalogPin8] = React.useState<number>(0)
  const [analogPin9, setAnalogPin9] = React.useState<number>(0)
  const [analogPin10, setAnalogPin10] = React.useState<number>(0)
  const [analogPin11, setAnalogPin11] = React.useState<number>(0)
  const [analogPin12, setAnalogPin12] = React.useState<number>(0)
  const [analogPin13, setAnalogPin13] = React.useState<number>(0)
  const [analogPin14, setAnalogPin14] = React.useState<number>(0)
  const [outputData, setOutputData] = React.useState<string>("")
  const [simulatorRunning, setSimulatorRunning] = React.useState<boolean>(false)

  return (
    <SimulatorContext.Provider
      value={{
        filename: filename,
        setFilename: setFilename,
        boardType: boardType,
        setBoardType: setBoardType,
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
        digitalPin14: digitalPin14,
        setDigitalPin14: setDigitalPin14,
        digitalPin15: digitalPin15,
        setDigitalPin15: setDigitalPin15,
        digitalPin16: digitalPin16,
        setDigitalPin16: setDigitalPin16,
        digitalPin17: digitalPin17,
        setDigitalPin17: setDigitalPin17,
        digitalPin18: digitalPin18,
        setDigitalPin18: setDigitalPin18,
        digitalPin19: digitalPin19,
        setDigitalPin19: setDigitalPin19,
        digitalPin20: digitalPin20,
        setDigitalPin20: setDigitalPin20,
        digitalPin21: digitalPin21,
        setDigitalPin21: setDigitalPin21,
        digitalPin22: digitalPin22,
        setDigitalPin22: setDigitalPin22,
        digitalPin23: digitalPin23,
        setDigitalPin23: setDigitalPin23,
        digitalPin24: digitalPin24,
        setDigitalPin24: setDigitalPin24,
        digitalPin25: digitalPin25,
        setDigitalPin25: setDigitalPin25,
        digitalPin26: digitalPin26,
        setDigitalPin26: setDigitalPin26,
        digitalPin27: digitalPin27,
        setDigitalPin27: setDigitalPin27,
        digitalPin28: digitalPin28,
        setDigitalPin28: setDigitalPin28,
        digitalPin29: digitalPin29,
        setDigitalPin29: setDigitalPin29,
        digitalPin30: digitalPin30,
        setDigitalPin30: setDigitalPin30,
        digitalPin31: digitalPin31,
        setDigitalPin31: setDigitalPin31,
        digitalPin32: digitalPin32,
        setDigitalPin32: setDigitalPin32,
        digitalPin33: digitalPin33,
        setDigitalPin33: setDigitalPin33,
        digitalPin34: digitalPin34,
        setDigitalPin34: setDigitalPin34,
        digitalPin35: digitalPin35,
        setDigitalPin35: setDigitalPin35,
        digitalPin36: digitalPin36,
        setDigitalPin36: setDigitalPin36,
        digitalPin37: digitalPin37,
        setDigitalPin37: setDigitalPin37,
        digitalPin38: digitalPin38,
        setDigitalPin38: setDigitalPin38,
        digitalPin39: digitalPin39,
        setDigitalPin39: setDigitalPin39,
        digitalPin40: digitalPin40,
        setDigitalPin40: setDigitalPin40,
        digitalPin41: digitalPin41,
        setDigitalPin41: setDigitalPin41,
        digitalPin42: digitalPin42,
        setDigitalPin42: setDigitalPin42,
        digitalPin43: digitalPin43,
        setDigitalPin43: setDigitalPin43,
        digitalPin44: digitalPin44,
        setDigitalPin44: setDigitalPin44,
        digitalPin45: digitalPin45,
        setDigitalPin45: setDigitalPin45,
        digitalPin46: digitalPin46,
        setDigitalPin46: setDigitalPin46,
        digitalPin47: digitalPin47,
        setDigitalPin47: setDigitalPin47,
        digitalPin48: digitalPin48,
        setDigitalPin48: setDigitalPin48,
        digitalPin49: digitalPin49,
        setDigitalPin49: setDigitalPin49,
        digitalPin50: digitalPin50,
        setDigitalPin50: setDigitalPin50,
        digitalPin51: digitalPin51,
        setDigitalPin51: setDigitalPin51,
        digitalPin52: digitalPin52,
        setDigitalPin52: setDigitalPin52,
        digitalPin53: digitalPin53,
        setDigitalPin53: setDigitalPin53,
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
        analogPin6: analogPin6,
        setAnalogPin6: setAnalogPin6,
        analogPin7: analogPin7,
        setAnalogPin7: setAnalogPin7,
        analogPin8: analogPin8,
        setAnalogPin8: setAnalogPin8,
        analogPin9: analogPin9,
        setAnalogPin9: setAnalogPin9,
        analogPin10: analogPin10,
        setAnalogPin10: setAnalogPin10,
        analogPin11: analogPin11,
        setAnalogPin11: setAnalogPin11,
        analogPin12: analogPin12,
        setAnalogPin12: setAnalogPin12,
        analogPin13: analogPin13,
        setAnalogPin13: setAnalogPin13,
        analogPin14: analogPin14,
        setAnalogPin14: setAnalogPin14,
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
