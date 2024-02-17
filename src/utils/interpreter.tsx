import { editorEnable, editorDisable, editorGetValue } from "./editor"
import { Constants } from './constants';
import { convertSketch  } from "./arduinoCodeConverter";

import { useSimulatorContext } from "../contexts/SimulatorContext"

let myWorker: Worker = null
const myWorkerTimestamp = Date.now()

const startSimulator = (
  setShowLoading: (state: boolean) => void,
  setSimulatorRunning: (state: boolean) => void,
  handleSetPinMode: (index: number, mode: number) => void,
  handleSetDigitalPins: (index: number, state: boolean) => void,
  handleSetAnalogPins: (index: number, duty: number) => void,
  setDigitalPins : any,
  setAnalogPins : any,
  setOutputData: any
) => {

  const initializeDigitalPins = Array(54)
  .fill(null)
  .map((_, index) => ({
    pinNumber: index,
    isInput: true,
    state: false,
  }))

const initializeAnalogPins = Array(14)
  .fill(null)
  .map((_, index) => ({
    pinNumber: index,
    isInput: true,
    duty: 0,
  }))


  myWorker = new Worker("ArduinoSimulatorInterpreter.js?v=" + myWorkerTimestamp)
    
  myWorker.onmessage = (e: MessageEvent) => {
    try {
      const data = e.data || ""           

      if (data.action == Constants.EVENT_SIMULATION_STARTED) {     
        handle_start_simulation(setShowLoading, setSimulatorRunning, setOutputData); 
      } 
      else if (data.action == Constants.EVENT_SIMULATION_ERROR) {     
        setOutputData("Unable to run Sketch. Could be and error in check or a using funtionality not implemented in simulator\n" + data.value);        
        stopSimulator()
        editorEnable();
        setDigitalPins(initializeDigitalPins)
        setAnalogPins(initializeAnalogPins)
        setSimulatorRunning(false)
        setShowLoading(false);
      } 
      else if (data.action == Constants.EVENT_PIN_MODE) {             
        const pin = parseInt(data.target);
        const mode = parseInt(data.value);
        handleSetPinMode(pin, mode);        
      } 
      else if (data.action == Constants.EVENT_DIGITAL_PIN) {        
        const pin = parseInt(data.target);        
        const state = parseInt(data.value) > 0;
        handleSetDigitalPins(pin, state);        
      } 
      else if (data.action == Constants.EVENT_ANALOG_PIN) {        
        const pin = parseInt(data.target);
        const value = parseInt(data.value)
        handleSetAnalogPins(pin, value);        
      } 
      else if (data.action == Constants.EVENT_SERIAL) {
        setOutputData((prevState: string) => prevState + String(data.value))
      }
    } catch (err) {
      // do nothing
    }
    return true
  }

  handle_launch_simulator();
}

const stopSimulator = () => {
  try {
    myWorker.terminate()
  } catch (err) {
    // do nothing
  }
}

const setDigitalPin = ( pin: number, state: boolean) => {
  try {    
    myWorker.postMessage({
      action : Constants.COMMAND_SET_DIGITAL,
      target: pin,
      value: state,
    })
  } catch (error) {
    
  }
}

const setAnalogPin = ( pin: number, duty: boolean) => {
  try {
    myWorker.postMessage({
      action : Constants.COMMAND_SET_ANALOG,
      target: pin,
      value: duty,
    })
  } catch (error) {
    
  }
}

const sendSerialData = (serialDataValue: string) => {
  try {
    if (serialDataValue !== "") {   
      myWorker.postMessage({
        action : Constants.COMMAND_SEND_SERIAL,
        target: null,
        value: serialDataValue,
      })
    }
  } catch (err) {
    // do nothing
  }
}

function handle_launch_simulator() {
  const convertedSketch: string = convertSketch(editorGetValue());
  myWorker.postMessage(
    {
      action: Constants.START_SIMULATION,
      target: null,
      value: convertedSketch,
    });
}

function handle_start_simulation(setShowLoading: (state: boolean) => void, setSimulatorRunning: (state: boolean) => void, setOutputData: any) {
  setShowLoading(false);
  setSimulatorRunning(true);
  editorDisable();
  setOutputData("");
}

export { startSimulator, stopSimulator, sendSerialData, setDigitalPin, setAnalogPin, convertSketch }