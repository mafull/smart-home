// -- Node module imports --
import mqtt     from "mqtt";
// -- Application imports --
import logger   from "./logger";


let mqttClient = null;


// Append an identifier to a normal log message
const log = (level, message, ...args) => logger.log(level, `MQTT Client > ${message}`, ...args);


// Create the MQTT client and connect to the server
const start = () => {
    mqttClient = mqtt.connect("mqtt://localhost", { clientId: "local" });
    mqttClient.on("connect", () => {
        log("info", "MQTT client connected")

        // Subscribe to the "test" topic
        mqttClient.subscribe("test");

        // Periodically send a message out on the "chat" topic
        setInterval(() => {
            mqttClient.publish("test", `Hello from ${mqttClient.clientId}!`);
        }, 5000);
    });

};


export default {
    start
};
