const jssCppCodeInitializer = `#include <iostream>
#include <ctime>
#include <stdlib.h>
#include <cmath>
#include <string.h>
#include <iomanip>
#include <arduinoSimulator.h>
using namespace std;

unsigned long _startTime = 0;

// PINMODE IMPLEMENTATION
const int INPUT = 0;
const int INPUT_PULLUP = 1;
const int OUTPUT = 2;
const bool LOW = false;
const bool HIGH = true;

#define PI 3.1415926535897932384626433832795
#define HALF_PI 1.5707963267948966192313216916398
#define TWO_PI 6.283185307179586476925286766559
#define DEG_TO_RAD 0.017453292519943295769236907684886
#define RAD_TO_DEG 57.295779513082320876798154814105
#define EULER 2.718281828459045235360287471352

#define min(a,b) ((a)<(b)?(a):(b))
#define max(a,b) ((a)>(b)?(a):(b))
#define abs(x) ((x)>0?(x):-(x))
#define constrain(amt,low,high) ((amt)<(low)?(low):((amt)>(high)?(high):(amt)))
#define round(x)     ((x)>=0?(long)((x)+0.5):(long)((x)-0.5))
#define radians(deg) ((deg)*DEG_TO_RAD)
#define degrees(rad) ((rad)*RAD_TO_DEG)
#define sq(x) ((x)*(x))


#define interrupts() ())
#define noInterrupts() ())

#define clockCyclesPerMicrosecond() ()
#define clockCyclesToMicroseconds(a) ()
#define microsecondsToClockCycles(a) ()

#define lowByte(w) ((uint8_t) ((w) & 0xff))
#define highByte(w) ((uint8_t) ((w) >> 8))

#define bitRead(value, bit) (((value) >> (bit)) & 0x01)
#define bitSet(value, bit) ((value) |= (1UL << (bit)))
#define bitClear(value, bit) ((value) &= ~(1UL << (bit)))
#define bitToggle(value, bit) ((value) ^= (1UL << (bit)))
#define bitWrite(value, bit, bitvalue) ((bitvalue) ? bitSet(value, bit) : bitClear(value, bit))

#define UNSET 0
#define CHANGE 1
#define FALLING 2
#define RISING 3

const int A0 = 0;
const int A1 = 1;
const int A2 = 2;
const int A3 = 3;
const int A4 = 4;
const int A5 = 5;
const int A6 = 6;
const int D0 = 0;
const int D1 = 1;
const int D2 = 2;
const int D3 = 3;
const int D4 = 4;
const int D5 = 5;
const int D6 = 6;
const int D7 = 7;
const int D8 = 8;
const int D9 = 9;
const int D10 = 10;
const int D11 = 11;
const int D12 = 12;
const int D13 = 13;
const int D14 = 14;

// SETUP AND LOOP PROTOTYPES IMPLEMENTATION
void setup();
void loop();

// DIGITAL PINS IMPLEMENTATION
int _digital_pins_mode[54] = {0};
bool _digital_pins_state_prev[54] = {false};
bool _digital_pins_state[54] = {false};

// ANALOG PINS IMPLEMENTATION
int _analog_pins_state[14] = {0};
bool _analog_pins_mode[15] = {false};

void pinMode(int pin, int mode) {
  if(pin >= 0 && pin <=53) {
    jscpp_pinMode(pin, mode);
    _digital_pins_mode[pin] = mode;
    if(pin <= 13) _analog_pins_mode[pin] = mode;
  }
}

// SIGNAL IMPLEMENTATION FOR DIGITALWRITE AND ANALOGWRITE
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
void digitalWrite(int pin, bool signal) {
  if(pin >= 0 && pin <= 53) {
    if (_digital_pins_mode[pin] == 2) {
      jscpp_digitalWrite(pin, signal);
      _digital_pins_state[pin] = signal;
    }
  }
}

// DIGITALREAD IMPLEMENTATION    
int digitalRead(int pin){
  return _digital_pins_state[pin];
}

// ANALOGWRITE IMPLEMENTATION   
void analogWrite(int pin, int duty) {
  if(pin >= 0 && pin <= 14) {
    jscpp_analogWrite(pin, duty);   
    _analog_pins_state[pin] = duty;            
  }
}

// ANALOGREAD IMPLEMENTATION
int analogRead(int pin){
  return _analog_pins_state[pin];
}

// PULSEIN IMPLEMENTATION
unsigned long pulseIn(int pin, int signal){return 0;}

// INTERRUPTIONS IMPLEMENTATION
typedef void (*voidFuncPtr)();
voidFuncPtr _ISR[14];
int _interrupts[14] = {0};

int digitalPinToInterrupt(int pin)
{
  return pin;
}

void attachInterrupt(int interruptNum, voidFuncPtr isr, int mode)
{
  _interrupts[interruptNum] = mode;
	_ISR[interruptNum] = isr;
}
void detachInterrupt(int interruptNum)
{
  _interrupts[interruptNum] = 0;
}

// SERIAL IMPLEMENTATION   
int _Serial_Available(){ return jscpp_bufferAvailable();}   
char _Serial_Read(){ return (char)jscpp_bufferReadChar();}    
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

  void _setDigital(int pin, int state) {
    _digital_pins_state_prev[pin] = _digital_pins_state[pin];
    _digital_pins_state[pin] = state; 

    if(_interrupts[pin] == CHANGE && (_digital_pins_state_prev[pin] != _digital_pins_state[pin])) { _ISR[pin]();}
    if(_interrupts[pin] == FALLING && (_digital_pins_state_prev[pin] == 1 && _digital_pins_state[pin] == 0)) { _ISR[pin]();}
    if(_interrupts[pin] == RISING && (_digital_pins_state_prev[pin] == 0 && _digital_pins_state[pin] == 1)) { _ISR[pin]();}
  }

  void _setAnalog(int pin, int value) {    
    _analog_pins_state[pin] = value;            
  }

  char _jscppInput[200];     
  int char_to_int(char caracter) { return caracter - '0'; }

  void _handle_jscppInput()
  {       
    _jscppInput = jscpp_handleInput();
    if(_jscppInput[0] == '_' && _jscppInput[1] == 'D' && _jscppInput[2] == '_') _setDigital(10 * char_to_int(_jscppInput[3]) + char_to_int(_jscppInput[4]), char_to_int(_jscppInput[6]));
    if(_jscppInput[0] == '_' && _jscppInput[1] == 'A' && _jscppInput[2] == '_') _setAnalog(10 * char_to_int(_jscppInput[3]) + char_to_int(_jscppInput[4]), 1000 * char_to_int(_jscppInput[6]) + 100 * char_to_int(_jscppInput[7]) + 10 * char_to_int(_jscppInput[8]) + char_to_int(_jscppInput[9]));
  }
 
// DELAY IMPLEMENTATION    
void delay(int milliseconds){
  int endingDelay = millis() + milliseconds;
  while(millis() <= endingDelay)
  {
     _handle_jscppInput();
  }
}

// DELAYMICROSECONDS IMPLEMENTATION
void delayMicroseconds(int microseconds){
  int endingDelay = millis() + microseconds / 1000;
  while(millis() <= endingDelay)
  {
     _handle_jscppInput();
  }
}

unsigned long millis() {
   unsigned long actual = jscpp_time();
   return actual - _startTime;
}

unsigned long micros() {  
  return millis() * 1000;
}

// MAIN IMPLEMENTATION THAT WILL EXECUTE SETUP AND LOOP
int main(){
  _startTime = jscpp_time();  
  cout << fixed << setprecision(10);

  setup();
  while(true) {          
    _handle_jscppInput();          
    loop();
  }
  return 0;
}
`

  // ------------------------------------------------------
  // COVERTING THE SKETCH IN A CODE THAT JSCPP CAN EXECUTE
  // ------------------------------------------------------
export const convertSketch = (sketch: string) => {
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
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bstatic unsigned \b/g, "unsigned ")
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bstatic int \b/g, "int ")
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bstatic long \b/g, "long ")
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bstatic bool \b/g, "bool ")
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bstatic float \b/g, "float ")
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bstatic double \b/g,"double ")
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bstatic String \b/g,"String ")
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bstatic char \b/g, "char ")

  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bvolatile unsigned char \b/g, "unsigned char ")
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bvolatile int \b/g, "int ")
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bvolatile long \b/g, "long ")
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bvolatile bool \b/g, "bool ")
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bvolatile float \b/g, "float ")
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bvolatile double \b/g,"double ")
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bvolatile String \b/g,"String ")
  sketch = sketch.replace(/(?=(?:[^"]*"[^"]*")*[^"]*$)\bvolatile char \b/g, "char ")
  
  sketch= sketch.replace(/attachInterrupt\(digitalPinToInterrupt\([^)]+\),\s*[ ]*/g, "$&&");

  

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

  return jssCppCodeInitializer + sketch
}