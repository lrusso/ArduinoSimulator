import { editorEnable, editorGetValue } from "./editor"
import { Constants } from './constants';
import { convertSketch  } from "./arduinoCodeConverter";

let myWorker: Worker = null
const myWorkerTimestamp = Date.now()

const startSimulator = (
  setShowLoading: (state: boolean) => void,
  setSimulatorRunning: (state: boolean) => void,
  handleSetDigitalPins: (index: number, state: boolean) => void,
  handleSetAnalogPins: (index: number, duty: number) => void,
  setOutputData: any
) => {
  myWorker = new Worker("ArduinoSimulatorInterpreter.js?v=" + myWorkerTimestamp)
    
  myWorker.onmessage = (e: MessageEvent) => {
    try {
      const data = e.data || ""           

      if (data.action == Constants.EVENT_SIMULATION_STARTED) {     
        handle_start_simulation(setShowLoading, setSimulatorRunning, setOutputData); 
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
  editorEnable();
  setOutputData("");
}

export { startSimulator, stopSimulator, sendSerialData, convertSketch }