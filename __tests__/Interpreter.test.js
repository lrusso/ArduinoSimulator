import React from "react"
import renderer from "react-test-renderer"
import { convertSketch } from "../src/utils/interpreter"

describe("Interpreter", () => {
  test("Converting Arduino Sketch 1", () => {
    const sketch1 =
      "/*\n\nArduino Simulator developed by LRusso.com\n\n*/\n\nvoid setup()\n\t{\n\tSerial.begin(9600);\n\t}\n\nvoid loop()\n\t{\n\t}"
    const convertedSketch1 = convertSketch(sketch1)
    const tree = renderer.create(<>{convertedSketch1}</>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test("Converting Arduino Sketch 2", () => {
    const sketch2 =
      '/*\n\nArduino Simulator developed by LRusso.com\n\n*/\n\nint LED_PIN = 0;\nint DCMOTOR_PIN = 5;\nint counter = 0;\n\nvoid setup()\n\t{\n\tSerial.begin(9600);\n\tSerial.println("Hello world!");\n\n\tpinMode(LED_PIN, OUTPUT);\n\tpinMode(DCMOTOR_PIN, OUTPUT);\n\t}\n\nvoid loop()\n\t{\n\tdigitalWrite(LED_PIN, LOW);\n\tanalogWrite(DCMOTOR_PIN, 0);\n\tdelay(1000);\n\n\tcounter++;\n\tSerial.print(counter);\n\n\tdigitalWrite(LED_PIN, HIGH);\n\tanalogWrite(DCMOTOR_PIN, 255);\n\tdelay(1000);\n\n\tSerial.print(" and looping! ");\n\t}'
    const convertedSketch2 = convertSketch(sketch2)
    const tree = renderer.create(<>{convertedSketch2}</>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test("Converting Arduino Sketch 3", () => {
    const sketch3 =
      '/*\n\nArduino Simulator developed by LRusso.com\n\n*/\n\nchar charOne[] = "Char 1 example.";\nString stringOne = "String 1 example.";\nString stringTwo = String("String 2 example.");\nString stringThree = String(15);\nString stringFour = String(15.50);\n\nvoid setup()\n\t{\n\tSerial.begin(9600);\n\tSerial.println(charOne);\n\tSerial.println(stringOne);\n\tSerial.println(stringTwo);\n\tSerial.println(stringThree);\n\tSerial.println(stringFour);\n\tSerial.println("------------------");\n\tSerial.println("Write something in the textbox above to test that this sketch sends the serial data to the Arduino board and back to the Serial Monitor.");\n\t}\n\nvoid loop()\n\t{\n\twhile(Serial.available()>0)\n\t\t{\n\t\tchar receivedChar = Serial.read();\n\t\tSerial.print(receivedChar);\n\t\t}\n\t}'
    const convertedSketch3 = convertSketch(sketch3)
    const tree = renderer.create(<>{convertedSketch3}</>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test("Converting Arduino Sketch 4", () => {
    const sketch4 =
      "/*\n\nArduino Simulator developed by LRusso.com\n\n*/\n\n#include <EEPROM.h>\n\nint address = 0;\nbyte value;\n\nvoid setup()\n\t{\n\tEEPROM.write(address, 'a');\n\tvalue = EEPROM.read(address);\n\tSerial.begin(9600);\n\tSerial.println(\"Stored value:\");\n\tSerial.println(value);\n\n\tEEPROM.update(address, 'b');\n\tvalue = EEPROM.read(address);\n\tSerial.begin(9600);\n\tSerial.println(\"Updated value:\");\n\tSerial.println(value);\n\t}\n\nvoid loop()\n\t{\n\t}"
    const convertedSketch4 = convertSketch(sketch4)
    const tree = renderer.create(<>{convertedSketch4}</>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
