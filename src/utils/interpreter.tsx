/* eslint-disable no-unused-vars */
import { editorEnable, editorGetValue } from "./editor"

let myWorker: Worker = null
const myWorkerTimestamp = Date.now()

const startSimulator = (
  setShowLoading: (state: boolean) => void,
  setSimulatorRunning: (state: boolean) => void,
  setDigitalPin0: (state: boolean) => void,
  setDigitalPin1: (state: boolean) => void,
  setDigitalPin2: (state: boolean) => void,
  setDigitalPin3: (state: boolean) => void,
  setDigitalPin4: (state: boolean) => void,
  setDigitalPin5: (state: boolean) => void,
  setDigitalPin6: (state: boolean) => void,
  setDigitalPin7: (state: boolean) => void,
  setDigitalPin8: (state: boolean) => void,
  setDigitalPin9: (state: boolean) => void,
  setDigitalPin10: (state: boolean) => void,
  setDigitalPin11: (state: boolean) => void,
  setDigitalPin12: (state: boolean) => void,
  setDigitalPin13: (state: boolean) => void,
  setDigitalPin14: (state: boolean) => void,
  setDigitalPin15: (state: boolean) => void,
  setDigitalPin16: (state: boolean) => void,
  setDigitalPin17: (state: boolean) => void,
  setDigitalPin18: (state: boolean) => void,
  setDigitalPin19: (state: boolean) => void,
  setDigitalPin20: (state: boolean) => void,
  setDigitalPin21: (state: boolean) => void,
  setDigitalPin22: (state: boolean) => void,
  setDigitalPin23: (state: boolean) => void,
  setDigitalPin24: (state: boolean) => void,
  setDigitalPin25: (state: boolean) => void,
  setDigitalPin26: (state: boolean) => void,
  setDigitalPin27: (state: boolean) => void,
  setDigitalPin28: (state: boolean) => void,
  setDigitalPin29: (state: boolean) => void,
  setDigitalPin30: (state: boolean) => void,
  setDigitalPin31: (state: boolean) => void,
  setDigitalPin32: (state: boolean) => void,
  setDigitalPin33: (state: boolean) => void,
  setDigitalPin34: (state: boolean) => void,
  setDigitalPin35: (state: boolean) => void,
  setDigitalPin36: (state: boolean) => void,
  setDigitalPin37: (state: boolean) => void,
  setDigitalPin38: (state: boolean) => void,
  setDigitalPin39: (state: boolean) => void,
  setDigitalPin40: (state: boolean) => void,
  setDigitalPin41: (state: boolean) => void,
  setDigitalPin42: (state: boolean) => void,
  setDigitalPin43: (state: boolean) => void,
  setDigitalPin44: (state: boolean) => void,
  setDigitalPin45: (state: boolean) => void,
  setDigitalPin46: (state: boolean) => void,
  setDigitalPin47: (state: boolean) => void,
  setDigitalPin48: (state: boolean) => void,
  setDigitalPin49: (state: boolean) => void,
  setDigitalPin50: (state: boolean) => void,
  setDigitalPin51: (state: boolean) => void,
  setDigitalPin52: (state: boolean) => void,
  setDigitalPin53: (state: boolean) => void,
  setAnalogPin0: (state: number) => void,
  setAnalogPin1: (state: number) => void,
  setAnalogPin2: (state: number) => void,
  setAnalogPin3: (state: number) => void,
  setAnalogPin4: (state: number) => void,
  setAnalogPin5: (state: number) => void,
  setAnalogPin6: (state: number) => void,
  setAnalogPin7: (state: number) => void,
  setAnalogPin8: (state: number) => void,
  setAnalogPin9: (state: number) => void,
  setAnalogPin10: (state: number) => void,
  setAnalogPin11: (state: number) => void,
  setAnalogPin12: (state: number) => void,
  setAnalogPin13: (state: number) => void,
  setAnalogPin14: (state: number) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setOutputData: any
) => {
  myWorker = new Worker("ArduinoSimulatorInterpreter.min.js?v=" + myWorkerTimestamp)

  myWorker.onmessage = (e: MessageEvent) => {
    try {
      const myReceivedData = e.data || ""

      const EVENT_SIMULATION_STARTED =
        myReceivedData.indexOf("ENABLE_SERIAL_MONITOR_ARDUINO_SIMULATOR") > -1
      const EVENT_DIGITAL_PIN = myReceivedData.indexOf("_DIGITAL_PIN_STATUS_") > -1
      const EVENT_DIGITAL_PIN_NUMBER = myReceivedData.replace(/[^0-9]/g, "")
      const EVENT_DIGITAL_PIN_TRUE = myReceivedData.indexOf("TRUE") > -1
      const EVENT_ANALOG_PIN = myReceivedData.indexOf("_ANALOG_PIN_STATUS_") > -1

      if (EVENT_SIMULATION_STARTED) {
        setShowLoading(false)
        setSimulatorRunning(true)
        editorEnable()
        setOutputData("")
      } else if (EVENT_DIGITAL_PIN) {
        if (EVENT_DIGITAL_PIN_TRUE) {
          if (EVENT_DIGITAL_PIN_NUMBER === "0") {
            setDigitalPin0(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "1") {
            setDigitalPin1(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "2") {
            setDigitalPin2(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "3") {
            setDigitalPin3(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "4") {
            setDigitalPin4(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "5") {
            setDigitalPin5(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "6") {
            setDigitalPin6(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "7") {
            setDigitalPin7(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "8") {
            setDigitalPin8(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "9") {
            setDigitalPin9(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "10") {
            setDigitalPin10(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "11") {
            setDigitalPin11(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "12") {
            setDigitalPin12(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "13") {
            setDigitalPin13(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "14") {
            setDigitalPin14(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "15") {
            setDigitalPin15(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "16") {
            setDigitalPin16(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "17") {
            setDigitalPin17(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "18") {
            setDigitalPin18(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "19") {
            setDigitalPin19(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "20") {
            setDigitalPin20(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "21") {
            setDigitalPin21(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "22") {
            setDigitalPin22(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "23") {
            setDigitalPin23(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "24") {
            setDigitalPin24(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "25") {
            setDigitalPin25(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "26") {
            setDigitalPin26(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "27") {
            setDigitalPin27(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "28") {
            setDigitalPin28(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "29") {
            setDigitalPin29(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "30") {
            setDigitalPin30(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "31") {
            setDigitalPin31(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "32") {
            setDigitalPin32(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "33") {
            setDigitalPin33(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "34") {
            setDigitalPin34(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "35") {
            setDigitalPin35(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "36") {
            setDigitalPin36(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "37") {
            setDigitalPin37(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "38") {
            setDigitalPin38(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "39") {
            setDigitalPin39(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "40") {
            setDigitalPin40(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "41") {
            setDigitalPin41(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "42") {
            setDigitalPin42(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "43") {
            setDigitalPin43(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "44") {
            setDigitalPin44(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "45") {
            setDigitalPin45(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "46") {
            setDigitalPin46(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "47") {
            setDigitalPin47(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "48") {
            setDigitalPin48(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "49") {
            setDigitalPin49(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "50") {
            setDigitalPin50(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "51") {
            setDigitalPin51(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "52") {
            setDigitalPin52(true)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "53") {
            setDigitalPin53(true)
          }
        } else {
          if (EVENT_DIGITAL_PIN_NUMBER === "0") {
            setDigitalPin0(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "1") {
            setDigitalPin1(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "2") {
            setDigitalPin2(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "3") {
            setDigitalPin3(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "4") {
            setDigitalPin4(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "5") {
            setDigitalPin5(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "6") {
            setDigitalPin6(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "7") {
            setDigitalPin7(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "8") {
            setDigitalPin8(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "9") {
            setDigitalPin9(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "10") {
            setDigitalPin10(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "11") {
            setDigitalPin11(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "12") {
            setDigitalPin12(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "13") {
            setDigitalPin13(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "14") {
            setDigitalPin14(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "15") {
            setDigitalPin15(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "16") {
            setDigitalPin16(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "17") {
            setDigitalPin17(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "18") {
            setDigitalPin18(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "19") {
            setDigitalPin19(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "20") {
            setDigitalPin20(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "21") {
            setDigitalPin21(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "22") {
            setDigitalPin22(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "23") {
            setDigitalPin23(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "24") {
            setDigitalPin24(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "25") {
            setDigitalPin25(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "26") {
            setDigitalPin26(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "27") {
            setDigitalPin27(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "28") {
            setDigitalPin28(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "29") {
            setDigitalPin29(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "30") {
            setDigitalPin30(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "31") {
            setDigitalPin31(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "32") {
            setDigitalPin32(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "33") {
            setDigitalPin33(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "34") {
            setDigitalPin34(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "35") {
            setDigitalPin35(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "36") {
            setDigitalPin36(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "37") {
            setDigitalPin37(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "38") {
            setDigitalPin38(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "39") {
            setDigitalPin39(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "40") {
            setDigitalPin40(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "41") {
            setDigitalPin41(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "42") {
            setDigitalPin42(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "43") {
            setDigitalPin43(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "44") {
            setDigitalPin44(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "45") {
            setDigitalPin45(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "46") {
            setDigitalPin46(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "47") {
            setDigitalPin47(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "48") {
            setDigitalPin48(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "49") {
            setDigitalPin49(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "50") {
            setDigitalPin50(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "51") {
            setDigitalPin51(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "52") {
            setDigitalPin52(false)
          } else if (EVENT_DIGITAL_PIN_NUMBER === "53") {
            setDigitalPin53(false)
          }
        }
      } else if (EVENT_ANALOG_PIN) {
        const analogPinNumber = myReceivedData
          .substring(0, myReceivedData.lastIndexOf("_"))
          .replace(/[^0-9]/g, "")

        const analogPinValue = myReceivedData.substring(
          myReceivedData.lastIndexOf("_") + 1,
          myReceivedData.length
        )

        if (analogPinNumber === "0") {
          setAnalogPin0(analogPinValue)
        } else if (analogPinNumber === "1") {
          setAnalogPin1(analogPinValue)
        } else if (analogPinNumber === "2") {
          setAnalogPin2(analogPinValue)
        } else if (analogPinNumber === "3") {
          setAnalogPin3(analogPinValue)
        } else if (analogPinNumber === "4") {
          setAnalogPin4(analogPinValue)
        } else if (analogPinNumber === "5") {
          setAnalogPin5(analogPinValue)
        } else if (analogPinNumber === "6") {
          setAnalogPin6(analogPinValue)
        } else if (analogPinNumber === "7") {
          setAnalogPin7(analogPinValue)
        } else if (analogPinNumber === "8") {
          setAnalogPin8(analogPinValue)
        } else if (analogPinNumber === "9") {
          setAnalogPin9(analogPinValue)
        } else if (analogPinNumber === "10") {
          setAnalogPin10(analogPinValue)
        } else if (analogPinNumber === "11") {
          setAnalogPin11(analogPinValue)
        } else if (analogPinNumber === "12") {
          setAnalogPin12(analogPinValue)
        } else if (analogPinNumber === "13") {
          setAnalogPin13(analogPinValue)
        } else if (analogPinNumber === "14") {
          setAnalogPin14(analogPinValue)
        }
      } else {
        setOutputData((prevState: string) => prevState + String(myReceivedData))
      }
    } catch (err) {
      //
    }

    return true
  }

  // COVERTING THE SKETCH IN A CODE THAT JSCPP CAN EXECUTE
  const convertedSketch: string = convertSketch(editorGetValue())

  // SENDING THE SKETCH TO THE WEB WORKER IN ORDER TO BE EXECUTED
  myWorker.postMessage(convertedSketch)
}

const convertSketch = (sketch: string) => {
  // ------------------------------------------------------
  // COVERTING THE SKETCH IN A CODE THAT JSCPP CAN EXECUTE
  // ------------------------------------------------------

  // FINDING AND REPLACING ALL THE CALLS TO THE SERIAL.BEGIN METHOD
  sketch = sketch.replace(
    /(?=(?:[^"]*"[^"]*")*[^"]*$)\bSerial\.begin\b/g,
    "_Serial_Begin"
  )

  // FINDING AND REPLACING ALL THE CALLS TO THE SERIAL.PRINT METHOD
  sketch = sketch.replace(
    /(?=(?:[^"]*"[^"]*")*[^"]*$)(\bSerial\.print\b)(.*?\);)/g,
    "cout <<$2"
  )

  // FINDING AND REPLACING ALL THE CALLS TO THE SERIAL.PRINTLN METHOD
  sketch = sketch.replace(
    /(?=(?:[^"]*"[^"]*")*[^"]*$)(\bSerial\.println\b)(.*?\);)/g,
    'cout <<$2cout << "<br />";'
  )

  // FINDING AND REPLACING ALL THE CALLS TO THE SERIAL.AVAILABLE METHOD
  sketch = sketch.replace(
    /(?=(?:[^"]*"[^"]*")*[^"]*$)\bSerial\.available\b/g,
    "_Serial_Available"
  )

  // FINDING AND REPLACING ALL THE CALLS TO THE SERIAL.READ METHOD
  sketch = sketch.replace(
    /(?=(?:[^"]*"[^"]*")*[^"]*$)\bSerial\.read\b/g,
    "_Serial_Read"
  )

  // REGEX FOR CHECKING IF THE EEPROM IS GOING TO BE INCLUDED
  const regexEEPROMLibrary = new RegExp(/^#include.*?<EEPROM.h>/gm)

  if (regexEEPROMLibrary.test(sketch)) {
    // FINDING AND REMOVING THE INCLUDE EEPROM
    sketch = sketch.replace(/^#include.*?<EEPROM.h>/gm, "")

    // FINDING AND REPLACING ALL THE CALLS TO THE EEPROM.GET METHOD
    sketch = sketch.replace(
      /(?=(?:[^"]*"[^"]*")*[^"]*$)\bEEPROM\.get\b/g,
      "_EEPROM_Read"
    )

    // FINDING AND REPLACING ALL THE CALLS TO THE EEPROM.READ METHOD
    sketch = sketch.replace(
      /(?=(?:[^"]*"[^"]*")*[^"]*$)\bEEPROM\.read\b/g,
      "_EEPROM_Read"
    )

    // FINDING AND REPLACING ALL THE CALLS TO THE EEPROM.UPDATE METHOD
    sketch = sketch.replace(
      /(?=(?:[^"]*"[^"]*")*[^"]*$)\bEEPROM\.update\b/g,
      "_EEPROM_Write"
    )

    // FINDING AND REPLACING ALL THE CALLS TO THE EEPROM.PUT METHOD
    sketch = sketch.replace(
      /(?=(?:[^"]*"[^"]*")*[^"]*$)\bEEPROM\.put\b/g,
      "_EEPROM_Write"
    )

    // FINDING AND REPLACING ALL THE CALLS TO THE EEPROM.WRITE METHOD
    sketch = sketch.replace(
      /(?=(?:[^"]*"[^"]*")*[^"]*$)\bEEPROM\.write\b/g,
      "_EEPROM_Write"
    )

    // CONVERTING ALL THE DOUBLE QUOTES TO SINGLE QUOTES IN THE EEPROM.WRITE METHOD
    sketch = sketch.replace(
      /(?=(?:[^"]*"[^"]*")*[^"]*$)(\b_EEPROM_Write.*?)(")(.*?)"(\);)/g,
      "$1'$3'$4"
    )
  }

  // FINDING AND REPLACING ALL THE CALLS TO THE PULSEIN FUNCTION
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bpulseIn\b/g, "_pulseIn")

  // FINDING AND REPLACING ALL THE REFERENCES TO THE BOOLEAN TYPE
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bboolean \b/g, "bool ")

  // FINDING AND REPLACING ALL THE REFERENCES TO THE BYTE TYPE
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bbyte \b/g, "unsigned char ")

  // FINDING AND REMOVING ALL THE REFERENCES TO THE STATIC VARIABLES (TEMP WORKAROUND)
  sketch = sketch.replace(
    /(?=(?:[^"]*"[^"]*")*[^"]*$)\bstatic unsigned char \b/g,
    "unsigned char "
  )
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bstatic int \b/g, "int ")
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bstatic long \b/g, "long ")
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bstatic bool \b/g, "bool ")
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bstatic float \b/g, "float ")
  sketch = sketch.replace(
    /(?=(?:[^"]*"[^"]*")*[^"]*$)\bstatic double \b/g,
    "double "
  )
  sketch = sketch.replace(
    /(?=(?:[^"]*"[^"]*")*[^"]*$)\bstatic String \b/g,
    "String "
  )
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bstatic char \b/g, "char ")
  sketch = sketch.replace(
    /(?=(?:[^"]*"[^"]*")*[^"]*$)\bstatic unsigned \b/g,
    "unsigned "
  )

  // FINDING AND REPLACING ALL THE REFERENCES TO THE STRING TYPE
  sketch = sketch.replace(
    /(?=(?:[^"]*"[^"]*")*[^"]*$)\b(String )([A-Za-z])/g,
    "char *$2"
  )

  // FINDING AND REPLACING ALL THE REFERENCES TO THE CONVERT TO STRING FUNCTION THAT HAS A STRING AS A PARAMETER
  sketch = sketch.replace(
    /(?=(?:[^"]*"[^"]*")*[^"]*$)\b(String\()("[A-Za-z].*")\)/g,
    "$2"
  )

  // FINDING AND REPLACING ALL THE REFERENCES TO THE CONVERT TO STRING FUNCTION THAT HAS A FRACTION AS A PARAMETER
  sketch = sketch.replace(
    /(?=(?:[^"]*"[^"]*")*[^"]*$)\b(String\()([0-9]...*)\)/g,
    "_fractionToChar($2)"
  )

  // FINDING AND REPLACING ALL THE REFERENCES TO THE CONVERT TO STRING FUNCTION THAT HAS AN INTEGER AS A PARAMETER
  sketch = sketch.replace(
    /(?=(?:[^"]*"[^"]*")*[^"]*$)\b(String\()([0-9].*)\)/g,
    "_intToChar($2)"
  )

  
  // CREATING THE ARDUINO CODE INITIALIZER FOR JSCPP
  const codeInitializer = `#include <iostream>
    #include <ctime>
    #include <stdlib.h>
    #include <cmath>
    #include <string.h>
    #include <iomanip>
    using namespace std;
     
    // MAIN IMPLEMENTATION THAT WILL EXECUTE SETUP AND LOOP
     int main(){int internalLoopSystem=0;cout << fixed << setprecision(10);setup();while(true){loop();internalLoopSystem=internalLoopSystem+1;}return 0;}
     
     // SETUP AND LOOP PROTOTYPES IMPLEMENTATION
     void setup();
     void loop();
     
     // DIGITAL PINS IMPLEMENTATION
     bool _digital_pins_active[54] = {false};
     bool _digital_pins_state[54] = {false};
     
     // ANALOG PINS IMPLEMENTATION
     int _analog_pins_state[14] = {0};
     
     // PINMODE IMPLEMENTATION
     int INPUT = 0;
     int INPUT_PULLPUP = 0;
     int OUTPUT = 0;

     void pinMode(int selectedpin, int type);
     void pinMode(int selectedpin, int type){
       if(selectedpin<=54){
          _digital_pins_active[selectedpin]=true;
       }
    }
     
     // SIGNAL IMPLEMENTATION FOR DIGITALWRITE AND ANALOGWRITE
     bool LOW = false;
     bool HIGH = true;
     
    int getLength(int num) {
        int length = 0;
        if (num == 0)
            return 1;
        while (num != 0) {
            num /= 10;
            length++;
        }
        return length;
    }

     void intToCharArray(int num, char* result) {
        if (num == 0) {
            result[0] = '0';
            result[1] = '\0'; // Null-terminator
            return;
        }
    
        int length = getLength(num);
        result[length] = '\0'; // Null-terminator
    
        while (num > 0) {
            result[--length] = '0' + num % 10;
            num /= 10;
        }
    }

     // DIGITALWRITE IMPLEMENTATION
     void digitalWrite(int digitalpin, bool signal);
     void digitalWrite(int digitalpin, bool signal) {
        if(digitalpin >= 0 && digitalpin < 54) {
            if (_digital_pins_active[digitalpin]) {
              char payload[30];   

              char pinStr[3];
              intToCharArray(digitalpin, pinStr);

              strcpy(payload, "_DIGITAL_PIN_STATUS_");         
              strcat(payload, pinStr);
              strcat(payload, "_");
              strcat(payload, signal ? "TRUE" : "FALSE");
          
              cout << payload;
              return;

              _digital_pins_state[digitalpin] = signal;
            } 
        }
    }
     
     // DIGITALREAD IMPLEMENTATION
     int digitalRead(int digitalpin);
     int digitalRead(int digitalpin){return _digital_pins_state[digitalpin];}
     
     // ANALOGWRITE IMPLEMENTATION
     void analogWrite(int analogpin, int duty);
     void analogWrite(int analogpin, int duty){      
        if(analogpin >= 0 && analogpin < 14) {
            if (_digital_pins_active[analogpin]) {
              char payload[30];   

              char pinStr[3];
              intToCharArray(analogpin, pinStr);

              char dutyString[4];
              intToCharArray(duty, dutyString);

              strcpy(payload, "_ANALOG_PIN_STATUS_");         
              strcat(payload, pinStr);
              strcat(payload, "_");        
              strcat(payload, dutyString);
          
              cout << payload;
              return;
            } 
        }
     }
     
     // ANALOGREAD IMPLEMENTATION
     int analogRead(int analogpin);
     int analogRead(int analogpin){return _analog_pins_state[analogpin];}
     
     // DELAY IMPLEMENTATION
     void delay(int milliseconds);
     void delay(int milliseconds){int endingDelay=time(0)+(milliseconds/1000);while(time(0)<=endingDelay){}}
     
     // DELAYMICROSECONDS IMPLEMENTATION
     void delayMicroseconds(int milliseconds);
     void delayMicroseconds(int milliseconds){delay(milliseconds);}
     
     // PULSEIN IMPLEMENTATION
     unsigned long pulseIn(int pin, int signal);
     unsigned long pulseIn(int pin, int signal){return 0;}
     
     // SERIAL IMPLEMENTATION
     int _SerialReceivedData = 0;
     int _Serial_Available();
     int _Serial_Available(){cin >> (_SerialReceivedData);return _SerialReceivedData;}
     char _Serial_Read();
     char _Serial_Read(){return (char)_SerialReceivedData;}
     void _Serial_Begin(int baudRate);
     void _Serial_Begin(int baudRate){}
     
     // EEPROM IMPLEMENTATION (WORK IN PROGRESS)
     char _EEPROM_Data[4096] = {0};
     char _EEPROM_Read(int address);
     char _EEPROM_Read(int address){return (char)_EEPROM_Data[address];}
     void _EEPROM_Write(int address, char value);
     void _EEPROM_Write(int address, char value){_EEPROM_Data[address] = value;}
     
     // INT TO CHAR IMPLEMENTATION
    char* _intToChar(int a)
    {
      const int BUFFERSIZE = 9;
      char answer[BUFFERSIZE];
      char answer2[BUFFERSIZE];
      int counter = 0;while (a > 0)
      {
        answer[counter] = (a % 10 + '0');
        counter = counter + 1;a = a / 10;
      }
      int x = 0;int y = BUFFERSIZE - 1;while(y>-1)
      {
        answer2[x] = answer[y];x = x + 1;y = y - 1;
      }
      return answer2;
    }
        
    // FRACTION TO CHAR IMPLEMENTATION
    char* _fractionToChar(double a)
    {
      int b = a;
      const int BUFFERSIZE = 9;
      char answer[BUFFERSIZE];
      char answer2[BUFFERSIZE];
      int counter = 0;
      cout << fixed << setprecision(2);
      int toAdd = (a - floor(a)) * 100;
      if (toAdd>0){while (toAdd > 0)
      {answer[counter] = (toAdd % 10 + '0');
      counter = counter + 1;toAdd = toAdd / 10;}
      answer[counter] = '.';
      counter = counter + 1;}
        
      while (b > 0){
        answer[counter] = (b % 10 + '0');
        counter = counter + 1;b = b / 10;
      }
      int x = 0;int y = BUFFERSIZE - 1;
        
      while(y>-1){
        answer2[x] = answer[y];x = x + 1;y = y - 1;
      }
        
      cout << fixed << setprecision(10);
      return answer2;
    } 
     
     // THE FOLLOWING BREAKLINES ARE NEED IN ORDER TO PREVENT JSCPP TO SHOW ANY OF THE PREVIOUS CODE IF THE USER CODE FAILS
     \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`
  return codeInitializer + sketch
}

const stopSimulator = () => {
  try {
    myWorker.terminate()
  } catch (err) {
    //
  }
}

const sendSerialData = (serialDataValue: string) => {
  try {
    if (serialDataValue !== "") {
      myWorker.postMessage("SEND_SERIAL_DATA_ARDUINO_SIMULATOR=" + serialDataValue)
    }
  } catch (err) {
    //
  }
}

export { startSimulator, stopSimulator, sendSerialData, convertSketch }
