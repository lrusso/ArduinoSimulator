char charOne[] = "Char 1 example.";
String stringOne = "String 1 example.";
String stringTwo = String("String 2 example.");
String stringThree = String(15);
String stringFour = String(15.50);

void setup()
{
    Serial.begin(9600);
    Serial.println(charOne);
    Serial.println(stringOne);
    Serial.println(stringTwo);
    Serial.println(stringThree);
    Serial.println(stringFour);
    Serial.println("------------------");
    Serial.println("Write something in the textbox above to test that this sketch sends the serial data to the Arduino board and back to the Serial Monitor.");
}

void loop()
{
    while(Serial.available()>0)
    {
        char receivedChar = Serial.read();
        Serial.print(receivedChar);
    }
}