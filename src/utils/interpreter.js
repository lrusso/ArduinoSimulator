import { editorEnable, editorGetValue } from "./editor"

let myWorker = null
const myWorkerTimestamp = Date.now()

const startSimulator = (
  setShowLoading,
  setSimulatorRunning,
  setDigitalPin0,
  setDigitalPin1,
  setDigitalPin2,
  setDigitalPin3,
  setDigitalPin4,
  setDigitalPin5,
  setDigitalPin6,
  setDigitalPin7,
  setDigitalPin8,
  setDigitalPin9,
  setDigitalPin10,
  setDigitalPin11,
  setDigitalPin12,
  setDigitalPin13,
  setAnalogPin0,
  setAnalogPin1,
  setAnalogPin2,
  setAnalogPin3,
  setAnalogPin4,
  setAnalogPin5,
  setOutputData
) => {
  myWorker = new Worker("ArduinoSimulatorInterpreter.min.js?v=" + myWorkerTimestamp)

  myWorker.onmessage = (e) => {
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
        }
      } else {
        setOutputData((prevState) => prevState + String(myReceivedData))
      }
    } catch (err) {
      //
    }

    return true
  }

  // COVERTING THE SKETCH IN A CODE THAT JSCPP CAN EXECUTE
  const convertedSketch = convertSketch(editorGetValue())

  // SENDING THE SKETCH TO THE WEB WORKER IN ORDER TO BE EXECUTED
  myWorker.postMessage(convertedSketch)
}

const convertSketch = (sketch) => {
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

  // FINDING AND REPLACING ALL THE CALLS TO THE PULSEIN FUNCTION
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bpulseIn\b/g, "_pulseIn")

  // FINDING AND REPLACING ALL THE REFERENCES TO THE BOOLEAN TYPE
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bboolean \b/g, "bool ")

  // FINDING AND REMOVING ALL THE REFERENCES TO THE STATIC VARIABLES (TEMP WORKAROUND)
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bstatic byte \b/g, "byte ")
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
  const codeInitializer =
    "#include <iostream>\n#include <ctime>\n#include <stdlib.h>\n#include <cmath>\n#include <string.h>\n#include <iomanip>\nusing namespace std;\n" +
    // MAIN IMPLEMENTATION THAT WILL EXECUTE SETUP AND LOOP
    "int main(){int internalLoopSystem=0;cout << fixed << setprecision(10);setup();while(true){loop();internalLoopSystem=internalLoopSystem+1;}return 0;}" +
    // SETUP AND LOOP PROTOTYPES IMPLEMENTATION
    "void setup();" +
    "void loop();" +
    // DIGITAL PINS IMPLEMENTATION
    "bool _digital_pins_active[14] = {false,false,false,false,false,false,false,false,false,false,false,false,false,false};" +
    // PINMODE IMPLEMENTATION
    "int INPUT = 0;" +
    "int OUTPUT = 0;" +
    "void pinMode(int digitalpin, int type);" +
    "void pinMode(int digitalpin, int type){_digital_pins_active[digitalpin]=true;}" +
    // SIGNAL IMPLEMENTATION FOR DIGITALWRITE AND ANALOGWRITE
    "bool LOW = false;" +
    "bool HIGH = true;" +
    // DIGITALWRITE IMPLEMENTATION
    "void digitalWrite(int digitalpin, bool signal);" +
    'void digitalWrite(int digitalpin, bool signal){if(digitalpin==0 && _digital_pins_active[0]==true && signal==true){cout <<"_DIGITAL_PIN_STATUS_0_TRUE";}else if(digitalpin==0 && _digital_pins_active[0]==true && signal==false){cout <<"_DIGITAL_PIN_STATUS_0_FALSE";}else if(digitalpin==1 && _digital_pins_active[1]==true && signal==true){cout <<"_DIGITAL_PIN_STATUS_1_TRUE";}else if(digitalpin==1 && _digital_pins_active[1]==true && signal==false){cout <<"_DIGITAL_PIN_STATUS_1_FALSE";}else if(digitalpin==2 && _digital_pins_active[2]==true && signal==true){cout <<"_DIGITAL_PIN_STATUS_2_TRUE";}else if(digitalpin==2 && _digital_pins_active[2]==true && signal==false){cout <<"_DIGITAL_PIN_STATUS_2_FALSE";}else if(digitalpin==3 && _digital_pins_active[3]==true && signal==true){cout <<"_DIGITAL_PIN_STATUS_3_TRUE";}else if(digitalpin==3 && _digital_pins_active[3]==true && signal==false){cout <<"_DIGITAL_PIN_STATUS_3_FALSE";}else if(digitalpin==4 && _digital_pins_active[4]==true && signal==true){cout <<"_DIGITAL_PIN_STATUS_4_TRUE";}else if(digitalpin==4 && _digital_pins_active[4]==true && signal==false){cout <<"_DIGITAL_PIN_STATUS_4_FALSE";}else if(digitalpin==5 && _digital_pins_active[5]==true && signal==true){cout <<"_DIGITAL_PIN_STATUS_5_TRUE";}else if(digitalpin==5 && _digital_pins_active[5]==true && signal==false){cout <<"_DIGITAL_PIN_STATUS_5_FALSE";}else if(digitalpin==6 && _digital_pins_active[6]==true && signal==true){cout <<"_DIGITAL_PIN_STATUS_6_TRUE";}else if(digitalpin==6 && _digital_pins_active[6]==true && signal==false){cout <<"_DIGITAL_PIN_STATUS_6_FALSE";}else if(digitalpin==7 && _digital_pins_active[7]==true && signal==true){cout <<"_DIGITAL_PIN_STATUS_7_TRUE";}else if(digitalpin==7 && _digital_pins_active[7]==true && signal==false){cout <<"_DIGITAL_PIN_STATUS_7_FALSE";}else if(digitalpin==8 && _digital_pins_active[8]==true && signal==true){cout <<"_DIGITAL_PIN_STATUS_8_TRUE";}else if(digitalpin==8 && _digital_pins_active[8]==true && signal==false){cout <<"_DIGITAL_PIN_STATUS_8_FALSE";}else if(digitalpin==9 && _digital_pins_active[9]==true && signal==true){cout <<"_DIGITAL_PIN_STATUS_9_TRUE";}else if(digitalpin==9 && _digital_pins_active[9]==true && signal==false){cout <<"_DIGITAL_PIN_STATUS_9_FALSE";}else if(digitalpin==10 && _digital_pins_active[10]==true && signal==true){cout <<"_DIGITAL_PIN_STATUS_10_TRUE";}else if(digitalpin==10 && _digital_pins_active[10]==true && signal==false){cout <<"_DIGITAL_PIN_STATUS_10_FALSE";}else if(digitalpin==11 && _digital_pins_active[11]==true && signal==true){cout <<"_DIGITAL_PIN_STATUS_11_TRUE";}else if(digitalpin==11 && _digital_pins_active[11]==true && signal==false){cout <<"_DIGITAL_PIN_STATUS_11_FALSE";}else if(digitalpin==12 && _digital_pins_active[12]==true && signal==true){cout <<"_DIGITAL_PIN_STATUS_12_TRUE";}else if(digitalpin==12 && _digital_pins_active[12]==true && signal==false){cout <<"_DIGITAL_PIN_STATUS_12_FALSE";}else if(digitalpin==13 && _digital_pins_active[13]==true && signal==true){cout <<"_DIGITAL_PIN_STATUS_13_TRUE";}else if(digitalpin==13 && _digital_pins_active[13]==true && signal==false){cout <<"_DIGITAL_PIN_STATUS_13_FALSE";}}' +
    // DIGITALREAD IMPLEMENTATION
    "int digitalRead(int digitalpin);" +
    "int digitalRead(int digitalpin){return LOW;}" +
    // ANALOGWRITE IMPLEMENTATION
    "void analogWrite(int analogpin, int duty);" +
    'void analogWrite(int analogpin, int duty){if(analogpin==0){char analogPrefix[100] = "_ANALOG_PIN_STATUS_0_";analogWriteAppend(analogPrefix,duty);}else if(analogpin==1){char analogPrefix[100] = "_ANALOG_PIN_STATUS_1_";analogWriteAppend(analogPrefix,duty);}else if(analogpin==2){char analogPrefix[100] = "_ANALOG_PIN_STATUS_2_";analogWriteAppend(analogPrefix,duty);}else if(analogpin==3){char analogPrefix[100] = "_ANALOG_PIN_STATUS_3_";analogWriteAppend(analogPrefix,duty);}else if(analogpin==4){char analogPrefix[100] = "_ANALOG_PIN_STATUS_4_";analogWriteAppend(analogPrefix,duty);}else if(analogpin==5){char analogPrefix[100] = "_ANALOG_PIN_STATUS_5_";analogWriteAppend(analogPrefix,duty);}}' +
    "void analogWriteAppend(char *analogpin, unsigned int duty);" +
    'void analogWriteAppend(char *analogpin, unsigned int duty){if (duty==0){char dutyString[] = "0";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==1){char dutyString[] = "1";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==2){char dutyString[] = "2";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==3){char dutyString[] = "3";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==4){char dutyString[] = "4";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==5){char dutyString[] = "5";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==6){char dutyString[] = "6";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==7){char dutyString[] = "7";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==8){char dutyString[] = "8";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==9){char dutyString[] = "9";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==10){char dutyString[] = "10";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==11){char dutyString[] = "11";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==12){char dutyString[] = "12";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==13){char dutyString[] = "13";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==14){char dutyString[] = "14";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==15){char dutyString[] = "15";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==16){char dutyString[] = "16";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==17){char dutyString[] = "17";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==18){char dutyString[] = "18";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==19){char dutyString[] = "19";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==20){char dutyString[] = "20";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==21){char dutyString[] = "21";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==22){char dutyString[] = "22";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==23){char dutyString[] = "23";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==24){char dutyString[] = "24";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==25){char dutyString[] = "25";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==26){char dutyString[] = "26";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==27){char dutyString[] = "27";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==28){char dutyString[] = "28";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==29){char dutyString[] = "29";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==30){char dutyString[] = "30";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==31){char dutyString[] = "31";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==32){char dutyString[] = "32";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==33){char dutyString[] = "33";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==34){char dutyString[] = "34";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==35){char dutyString[] = "35";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==36){char dutyString[] = "36";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==37){char dutyString[] = "37";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==38){char dutyString[] = "38";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==39){char dutyString[] = "39";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==40){char dutyString[] = "40";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==41){char dutyString[] = "41";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==42){char dutyString[] = "42";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==43){char dutyString[] = "43";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==44){char dutyString[] = "44";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==45){char dutyString[] = "45";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==46){char dutyString[] = "46";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==47){char dutyString[] = "47";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==48){char dutyString[] = "48";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==49){char dutyString[] = "49";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==50){char dutyString[] = "50";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==51){char dutyString[] = "51";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==52){char dutyString[] = "52";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==53){char dutyString[] = "53";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==54){char dutyString[] = "54";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==55){char dutyString[] = "55";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==56){char dutyString[] = "56";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==57){char dutyString[] = "57";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==58){char dutyString[] = "58";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==59){char dutyString[] = "59";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==60){char dutyString[] = "60";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==61){char dutyString[] = "61";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==62){char dutyString[] = "62";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==63){char dutyString[] = "63";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==64){char dutyString[] = "64";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==65){char dutyString[] = "65";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==66){char dutyString[] = "66";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==67){char dutyString[] = "67";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==68){char dutyString[] = "68";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==69){char dutyString[] = "69";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==70){char dutyString[] = "70";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==71){char dutyString[] = "71";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==72){char dutyString[] = "72";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==73){char dutyString[] = "73";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==74){char dutyString[] = "74";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==75){char dutyString[] = "75";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==76){char dutyString[] = "76";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==77){char dutyString[] = "77";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==78){char dutyString[] = "78";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==79){char dutyString[] = "79";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==80){char dutyString[] = "80";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==81){char dutyString[] = "81";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==82){char dutyString[] = "82";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==83){char dutyString[] = "83";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==84){char dutyString[] = "84";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==85){char dutyString[] = "85";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==86){char dutyString[] = "86";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==87){char dutyString[] = "87";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==88){char dutyString[] = "88";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==89){char dutyString[] = "89";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==90){char dutyString[] = "90";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==91){char dutyString[] = "91";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==92){char dutyString[] = "92";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==93){char dutyString[] = "93";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==94){char dutyString[] = "94";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==95){char dutyString[] = "95";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==96){char dutyString[] = "96";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==97){char dutyString[] = "97";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==98){char dutyString[] = "98";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==99){char dutyString[] = "99";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==100){char dutyString[] = "100";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==101){char dutyString[] = "101";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==102){char dutyString[] = "102";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==103){char dutyString[] = "103";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==104){char dutyString[] = "104";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==105){char dutyString[] = "105";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==106){char dutyString[] = "106";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==107){char dutyString[] = "107";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==108){char dutyString[] = "108";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==109){char dutyString[] = "109";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==110){char dutyString[] = "110";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==111){char dutyString[] = "111";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==112){char dutyString[] = "112";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==113){char dutyString[] = "113";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==114){char dutyString[] = "114";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==115){char dutyString[] = "115";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==116){char dutyString[] = "116";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==117){char dutyString[] = "117";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==118){char dutyString[] = "118";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==119){char dutyString[] = "119";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==120){char dutyString[] = "120";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==121){char dutyString[] = "121";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==122){char dutyString[] = "122";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==123){char dutyString[] = "123";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==124){char dutyString[] = "124";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==125){char dutyString[] = "125";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==126){char dutyString[] = "126";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==127){char dutyString[] = "127";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==128){char dutyString[] = "128";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==129){char dutyString[] = "129";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==130){char dutyString[] = "130";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==131){char dutyString[] = "131";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==132){char dutyString[] = "132";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==133){char dutyString[] = "133";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==134){char dutyString[] = "134";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==135){char dutyString[] = "135";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==136){char dutyString[] = "136";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==137){char dutyString[] = "137";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==138){char dutyString[] = "138";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==139){char dutyString[] = "139";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==140){char dutyString[] = "140";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==141){char dutyString[] = "141";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==142){char dutyString[] = "142";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==143){char dutyString[] = "143";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==144){char dutyString[] = "144";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==145){char dutyString[] = "145";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==146){char dutyString[] = "146";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==147){char dutyString[] = "147";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==148){char dutyString[] = "148";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==149){char dutyString[] = "149";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==150){char dutyString[] = "150";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==151){char dutyString[] = "151";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==152){char dutyString[] = "152";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==153){char dutyString[] = "153";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==154){char dutyString[] = "154";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==155){char dutyString[] = "155";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==156){char dutyString[] = "156";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==157){char dutyString[] = "157";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==158){char dutyString[] = "158";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==159){char dutyString[] = "159";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==160){char dutyString[] = "160";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==161){char dutyString[] = "161";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==162){char dutyString[] = "162";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==163){char dutyString[] = "163";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==164){char dutyString[] = "164";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==165){char dutyString[] = "165";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==166){char dutyString[] = "166";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==167){char dutyString[] = "167";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==168){char dutyString[] = "168";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==169){char dutyString[] = "169";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==170){char dutyString[] = "170";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==171){char dutyString[] = "171";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==172){char dutyString[] = "172";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==173){char dutyString[] = "173";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==174){char dutyString[] = "174";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==175){char dutyString[] = "175";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==176){char dutyString[] = "176";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==177){char dutyString[] = "177";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==178){char dutyString[] = "178";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==179){char dutyString[] = "179";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==180){char dutyString[] = "180";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==181){char dutyString[] = "181";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==182){char dutyString[] = "182";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==183){char dutyString[] = "183";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==184){char dutyString[] = "184";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==185){char dutyString[] = "185";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==186){char dutyString[] = "186";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==187){char dutyString[] = "187";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==188){char dutyString[] = "188";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==189){char dutyString[] = "189";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==190){char dutyString[] = "190";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==191){char dutyString[] = "191";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==192){char dutyString[] = "192";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==193){char dutyString[] = "193";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==194){char dutyString[] = "194";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==195){char dutyString[] = "195";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==196){char dutyString[] = "196";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==197){char dutyString[] = "197";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==198){char dutyString[] = "198";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==199){char dutyString[] = "199";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==200){char dutyString[] = "200";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==201){char dutyString[] = "201";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==202){char dutyString[] = "202";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==203){char dutyString[] = "203";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==204){char dutyString[] = "204";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==205){char dutyString[] = "205";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==206){char dutyString[] = "206";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==207){char dutyString[] = "207";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==208){char dutyString[] = "208";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==209){char dutyString[] = "209";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==210){char dutyString[] = "210";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==211){char dutyString[] = "211";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==212){char dutyString[] = "212";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==213){char dutyString[] = "213";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==214){char dutyString[] = "214";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==215){char dutyString[] = "215";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==216){char dutyString[] = "216";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==217){char dutyString[] = "217";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==218){char dutyString[] = "218";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==219){char dutyString[] = "219";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==220){char dutyString[] = "220";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==221){char dutyString[] = "221";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==222){char dutyString[] = "222";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==223){char dutyString[] = "223";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==224){char dutyString[] = "224";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==225){char dutyString[] = "225";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==226){char dutyString[] = "226";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==227){char dutyString[] = "227";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==228){char dutyString[] = "228";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==229){char dutyString[] = "229";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==230){char dutyString[] = "230";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==231){char dutyString[] = "231";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==232){char dutyString[] = "232";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==233){char dutyString[] = "233";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==234){char dutyString[] = "234";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==235){char dutyString[] = "235";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==236){char dutyString[] = "236";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==237){char dutyString[] = "237";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==238){char dutyString[] = "238";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==239){char dutyString[] = "239";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==240){char dutyString[] = "240";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==241){char dutyString[] = "241";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==242){char dutyString[] = "242";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==243){char dutyString[] = "243";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==244){char dutyString[] = "244";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==245){char dutyString[] = "245";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==246){char dutyString[] = "246";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==247){char dutyString[] = "247";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==248){char dutyString[] = "248";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==249){char dutyString[] = "249";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==250){char dutyString[] = "250";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==251){char dutyString[] = "251";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==252){char dutyString[] = "252";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==253){char dutyString[] = "253";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==254){char dutyString[] = "254";strcat(analogpin,dutyString);cout <<(analogpin);}else if (duty==255){char dutyString[] = "255";strcat(analogpin,dutyString);cout <<(analogpin);}}' +
    // ANALOGREAD IMPLEMENTATION
    "int analogRead(int analogpin);" +
    "int analogRead(int analogpin){return 0;}" +
    // DELAY IMPLEMENTATION
    "void delay(int milliseconds);" +
    "void delay(int milliseconds){int endingDelay=time(0)+(milliseconds/1000);while(time(0)<=endingDelay){}}" +
    // DELAYMICROSECONDS IMPLEMENTATION
    "void delayMicroseconds(int milliseconds);" +
    "void delayMicroseconds(int milliseconds){delay(milliseconds);}" +
    // PULSEIN IMPLEMENTATION
    "unsigned long pulseIn(int pin, int signal);" +
    "unsigned long pulseIn(int pin, int signal){return 0;}" +
    // SERIAL IMPLEMENTATION
    "int _SerialReceivedData = 0;" +
    "int _Serial_Available();" +
    "int _Serial_Available(){cin >> (_SerialReceivedData);return _SerialReceivedData;}" +
    "char _Serial_Read();" +
    "char _Serial_Read(){return (char)_SerialReceivedData;}" +
    "void _Serial_Begin(int baudRate);" +
    "void _Serial_Begin(int baudRate){}" +
    // INT TO CHAR IMPLEMENTATION
    "char* _intToChar(int a){int BUFFERSIZE = 9;char answer[BUFFERSIZE];char answer2[BUFFERSIZE];int counter = 0;while (a > 0){answer[counter] = (a % 10 + '0');counter = counter + 1;a = a / 10;}int x = 0;int y = BUFFERSIZE - 1;while(y>-1){answer2[x] = answer[y];x = x + 1;y = y - 1;}return answer2;}" +
    // FRACTION TO CHAR IMPLEMENTATION
    "char* _fractionToChar(double a){int b = a;int BUFFERSIZE = 9;char answer[BUFFERSIZE];char answer2[BUFFERSIZE];int counter = 0;cout << fixed << setprecision(2);int toAdd = (a - floor(a)) * 100;if (toAdd>0){while (toAdd > 0){answer[counter] = (toAdd % 10 + '0');counter = counter + 1;toAdd = toAdd / 10;}answer[counter] = '.';counter = counter + 1;}while (b > 0){answer[counter] = (b % 10 + '0');counter = counter + 1;b = b / 10;}int x = 0;int y = BUFFERSIZE - 1;while(y>-1){answer2[x] = answer[y];x = x + 1;y = y - 1;}cout << fixed << setprecision(10);return answer2;}" +
    // THE FOLLOWING BREAKLINES ARE NEED IN ORDER TO PREVENT JSCPP TO SHOW ANY OF THE PREVIOUS CODE IF THE USER CODE FAILS
    "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"

  return codeInitializer + sketch
}

const stopSimulator = () => {
  try {
    myWorker.terminate()
  } catch (err) {
    //
  }
}

const sendSerialData = (serialDataValue) => {
  try {
    if (serialDataValue !== "") {
      myWorker.postMessage("SEND_SERIAL_DATA_ARDUINO_SIMULATOR=" + serialDataValue)
    }
  } catch (err) {
    //
  }
}

export { startSimulator, stopSimulator, sendSerialData, convertSketch }
