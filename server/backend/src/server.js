// -- Node module imports --
import http     from "http";
// -- Application imports --
import app              from "./app";
import logger           from "./logger";
import mqttClient       from "./mqttClient";
import mqttServer       from "./mqttServer";


// Start the MQTT server and connect to it with a new client once it's ready
mqttServer.start(() => {
    mqttClient.start();
});

// Create the HTTP server
const httpServer = http.createServer(app);
httpServer.on("error", (err) => {
    if (err) throw err;
});

// Start listening on the HTTP server
const port = 3010;
const host = "localhost";
httpServer.listen(port, host, (err) => {
    if (err) throw err;
    logger.info(`HTTP server listening at http://${host}:${port}`);
});
