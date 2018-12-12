#include <ESP8266WiFi.h>
#include "PubSubClient.h"

const unsigned int ledPin = 2;

const char *ssid = "BTHub4-29JK";
const char *password = "7dfcf635bf";

const char *mqttServerHost = "192.168.1.159";
const unsigned int mqttServerPort = 1883;

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);


void MqttCallback(char *topic, byte *payload, unsigned int length);


void setup()
{
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, HIGH);

  Serial.begin(115200);

  // Connect to WiFi network
  Serial.println("####################");
  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print('.');
  }
  Serial.print("\nConnected to WiFi network ");
  Serial.println(ssid);
  Serial.println("####################");

  // Configure the MQTT client
  mqttClient.setServer(mqttServerHost, mqttServerPort);
  mqttClient.setCallback(MqttCallback);

  // Connect to the MQTT server
  Serial.println("Connecting to MQTT server...");
  while (!mqttClient.connected())
  {
    Serial.print("  ");
    if (mqttClient.connect("esp8266_heating", NULL, NULL))
    {
      Serial.println("Connected");      
    }
    else
    {
      Serial.print("Failed with state ");
      Serial.println(mqttClient.state());
      delay(5000);
    }    
  }
  mqttClient.publish("heating", "Hello from the heating controller ESP8266");
  mqttClient.subscribe("test");
  Serial.println("Published a greeting to the server");
  Serial.println("####################");
}

void loop() {
  mqttClient.loop();
}


void MqttCallback(char *topic, byte *payload, unsigned int length)
{
  digitalWrite(ledPin, !digitalRead(ledPin));
  
  Serial.println("MQTT messaged received:");
  Serial.print("    topic: ");
  Serial.println(topic);
  Serial.print("  message: ");
  while (length--)
  {
    Serial.print((char)*payload++);
  }
  Serial.println("\n--------------------");
}
