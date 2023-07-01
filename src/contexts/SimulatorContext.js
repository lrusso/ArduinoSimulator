import React from "react"

const SimulatorContext = React.createContext({
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
  const [filename, setFilename] = React.useState(null)
  const [boardType, setBoardType] = React.useState(null)
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
  const [digitalPin14, setDigitalPin14] = React.useState(false)
  const [digitalPin15, setDigitalPin15] = React.useState(false)
  const [digitalPin16, setDigitalPin16] = React.useState(false)
  const [digitalPin17, setDigitalPin17] = React.useState(false)
  const [digitalPin18, setDigitalPin18] = React.useState(false)
  const [digitalPin19, setDigitalPin19] = React.useState(false)
  const [digitalPin20, setDigitalPin20] = React.useState(false)
  const [digitalPin21, setDigitalPin21] = React.useState(false)
  const [digitalPin22, setDigitalPin22] = React.useState(false)
  const [digitalPin23, setDigitalPin23] = React.useState(false)
  const [digitalPin24, setDigitalPin24] = React.useState(false)
  const [digitalPin25, setDigitalPin25] = React.useState(false)
  const [digitalPin26, setDigitalPin26] = React.useState(false)
  const [digitalPin27, setDigitalPin27] = React.useState(false)
  const [digitalPin28, setDigitalPin28] = React.useState(false)
  const [digitalPin29, setDigitalPin29] = React.useState(false)
  const [digitalPin30, setDigitalPin30] = React.useState(false)
  const [digitalPin31, setDigitalPin31] = React.useState(false)
  const [digitalPin32, setDigitalPin32] = React.useState(false)
  const [digitalPin33, setDigitalPin33] = React.useState(false)
  const [digitalPin34, setDigitalPin34] = React.useState(false)
  const [digitalPin35, setDigitalPin35] = React.useState(false)
  const [digitalPin36, setDigitalPin36] = React.useState(false)
  const [digitalPin37, setDigitalPin37] = React.useState(false)
  const [digitalPin38, setDigitalPin38] = React.useState(false)
  const [digitalPin39, setDigitalPin39] = React.useState(false)
  const [digitalPin40, setDigitalPin40] = React.useState(false)
  const [digitalPin41, setDigitalPin41] = React.useState(false)
  const [digitalPin42, setDigitalPin42] = React.useState(false)
  const [digitalPin43, setDigitalPin43] = React.useState(false)
  const [digitalPin44, setDigitalPin44] = React.useState(false)
  const [digitalPin45, setDigitalPin45] = React.useState(false)
  const [digitalPin46, setDigitalPin46] = React.useState(false)
  const [digitalPin47, setDigitalPin47] = React.useState(false)
  const [digitalPin48, setDigitalPin48] = React.useState(false)
  const [digitalPin49, setDigitalPin49] = React.useState(false)
  const [digitalPin50, setDigitalPin50] = React.useState(false)
  const [digitalPin51, setDigitalPin51] = React.useState(false)
  const [digitalPin52, setDigitalPin52] = React.useState(false)
  const [digitalPin53, setDigitalPin53] = React.useState(false)

  const [analogPin0, setAnalogPin0] = React.useState(0)
  const [analogPin1, setAnalogPin1] = React.useState(0)
  const [analogPin2, setAnalogPin2] = React.useState(0)
  const [analogPin3, setAnalogPin3] = React.useState(0)
  const [analogPin4, setAnalogPin4] = React.useState(0)
  const [analogPin5, setAnalogPin5] = React.useState(0)
  const [analogPin6, setAnalogPin6] = React.useState(0)
  const [analogPin7, setAnalogPin7] = React.useState(0)
  const [analogPin8, setAnalogPin8] = React.useState(0)
  const [analogPin9, setAnalogPin9] = React.useState(0)
  const [analogPin10, setAnalogPin10] = React.useState(0)
  const [analogPin11, setAnalogPin11] = React.useState(0)
  const [analogPin12, setAnalogPin12] = React.useState(0)
  const [analogPin13, setAnalogPin13] = React.useState(0)
  const [analogPin14, setAnalogPin14] = React.useState(0)
  const [outputData, setOutputData] = React.useState("")
  const [simulatorRunning, setSimulatorRunning] = React.useState(false)

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
