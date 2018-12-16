// -- Node module imports --
import mosca    from "mosca";
// -- Application imports --
import logger   from "./logger";


let mqttServer = null;

const mqttSettings = {
    port: 1883
};


// Append an identifier to a normal log message @todo Make this centralised
const log = (level, message, ...args) => logger.log(level, `MQTT Server > ${message}`, ...args);


// Start the server and configure event callbacks
const start = (readyCb) => {
    mqttServer = new mosca.Server(mqttSettings);
    mqttServer.on("ready", () => {
        log("info", "Ready %d %s", 1, "hi");
        if (readyCb) readyCb();
    });

    // Configure event callbacks
    mqttServer.on("clientConnected", (client) => log("info", "Client '%s' connected", client.id));
    mqttServer.on("clientDisconnecting", (client) => log("info", "Client '%s' is disconnecting...", client.id));
    mqttServer.on("clientDisconnected", (client) => log("info", "Client '%s' disconnected", client.id));
    mqttServer.on("published", (packet, client) => {
        if (client) log(
            "info",
            "Client '%s' published message (%s): %s",
            client.id, packet.topic, packet.payload
        );
        else log(
            "debug",
            "%s: %s",
            packet.topic, packet.payload
        );
    });
    mqttServer.on("subscribed", (topic, client) => log(
        "info",
        "Client '%s' subscribed to topic '%s'",
        client.id, topic
    ));
    mqttServer.on("unsubscribed", (topic, client) => log(
        "info",
        "Client '%s' unsubscribed from topic '%s'",
        client.id, topic
    ));
};


export default {
    start
};
