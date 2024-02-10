/* eslint-disable no-unused-vars */
import { editorEnable, editorGetValue } from "./editor"

let myWorker: Worker = null
const myWorkerTimestamp = Date.now()

const startSimulator = (
  setShowLoading: (state: boolean) => void,
  setSimulatorRunning: (state: boolean) => void,
  handleSetDigitalPins: (index: any, state: any) => void,
  handleSetAnalogPins: (index: any, duty: any) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setOutputData: any
) => {
  myWorker = new Worker("ArduinoSimulatorInterpreter.min.js?v=" + myWorkerTimestamp)

  myWorker.onmessage = (e: MessageEvent) => {
    try {
      const myReceivedData = e.data || ""

      const EVENT_SIMULATION_STARTED = myReceivedData.includes(
        "ENABLE_SERIAL_MONITOR_ARDUINO_SIMULATOR"
      )
      const EVENT_DIGITAL_PIN = myReceivedData.includes("_DIGITAL_PIN_STATUS_")
      const EVENT_DIGITAL_PIN_NUMBER = myReceivedData.replace(/[^0-9]/g, "")
      const EVENT_DIGITAL_PIN_TRUE = myReceivedData.includes("TRUE")
      const EVENT_ANALOG_PIN = myReceivedData.includes("_ANALOG_PIN_STATUS_")

      if (EVENT_SIMULATION_STARTED) {
        setShowLoading(false)
        setSimulatorRunning(true)
        editorEnable()
        setOutputData("")
      } else if (EVENT_DIGITAL_PIN) {
        handleSetDigitalPins(
          parseInt(EVENT_DIGITAL_PIN_NUMBER),
          EVENT_DIGITAL_PIN_TRUE
        )
      } else if (EVENT_ANALOG_PIN) {
        const analogPinNumber = myReceivedData
          .substring(0, myReceivedData.lastIndexOf("_"))
          .replace(/[^0-9]/g, "")

        const analogPinValue = myReceivedData.substring(
          myReceivedData.lastIndexOf("_") + 1,
          myReceivedData.length
        )
        handleSetAnalogPins(parseInt(analogPinNumber), analogPinValue)
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
    void pinMode(int selectedpin, int type) {
      if(selectedpin<=54) {
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
      if(digitalpin >= 0 && digitalpin <= 54) {
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
    void analogWrite(int analogpin, int duty) {
      if(analogpin >= 0 && analogpin <= 14) {
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
    char* _intToChar(int a) {
      const int BUFFERSIZE = 9;
      char answer[BUFFERSIZE];
      char answer2[BUFFERSIZE];
      int counter = 0;while (a > 0) {
        answer[counter] = (a % 10 + '0');
        counter = counter + 1;a = a / 10;
      }
      int x = 0;int y = BUFFERSIZE - 1;while(y>-1) {
        answer2[x] = answer[y];x = x + 1;y = y - 1;
      }
      return answer2;
    }

    // FRACTION TO CHAR IMPLEMENTATION
    char* _fractionToChar(double a) {
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
        
      while (b > 0) {
        answer[counter] = (b % 10 + '0');
        counter = counter + 1;b = b / 10;
      }
      int x = 0;int y = BUFFERSIZE - 1;

      while(y>-1) {
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
