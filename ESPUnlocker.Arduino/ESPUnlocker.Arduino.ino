#include <BlynkSimpleEsp8266.h>
#include <ESP8266WiFi.h>

char auth[] = "Imru33BG6GpoM-5kfv-64qjbLXLbKM5P";
char ssid[] = "EvilCorp";
char pass[] = "helloworld";

BLYNK_WRITE(V0) {
	if (param.asInt()) {
		Serial.println("Locked");
	} else {
		Serial.println("Un Locked");
	}
}

void setup() {
	Serial.begin(9600);
	Blynk.begin(auth, ssid, pass);
}

void loop() {
	Blynk.run();
}
