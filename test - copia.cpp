int LED_PIN = 0;
int DCMOTOR_PIN = 5;
int counter = 0;

void setup()
	{
	Serial.begin(9600);
	Serial.println("Hello world!");

	pinMode(LED_PIN, OUTPUT);
	pinMode(DCMOTOR_PIN, OUTPUT);
	}

void loop()
	{
	digitalWrite(LED_PIN, LOW);
	analogWrite(DCMOTOR_PIN, 0);
	delay(1000);

	counter++;
	Serial.print(counter);

	digitalWrite(LED_PIN, HIGH);
	analogWrite(DCMOTOR_PIN, 255);
	delay(1000);

	Serial.println(digitalRead(4) ? "SI" : "NO");
	Serial.print(" and looping! ");
	}