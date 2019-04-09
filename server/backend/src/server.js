import http             from "http";
import * as WebSocket   from "ws";

import app              from "./app";
import * as database    from "./database";
import logger           from "./logger";
import mqttClient       from "./mqttClient";
import mqttServer       from "./mqttServer";


// Initialise the database
database.initialise();

// Start the MQTT server and connect to it with a new client once it's ready
mqttServer.start(() => {
    mqttClient.start();
});

// Create the HTTP server instance
const httpServer = http.createServer(app);
httpServer.on("error", (err) => {
    if (err) throw err;
});

// Create the WebSocket server instance
const wsServer = new WebSocket.Server({ server: httpServer });
wsServer.on("connection", (ws, req) => {
    logger.info("WS client connected");

    const ip = req.headers["x-forwarded-for"]
        ? req.headers["x-forwarded-for"].split(/\s*,\s*/)[0]
        : req.connection.remoteAddress;

    ws.on("message", (message) => {
        logger.info("WS message received:", message);
        ws.send("Echo: " + message);
    });

    ws.send("Welcome! Your IP address is: " + ip);

    setInterval(() => ws.send("ping"), 5000);
});

// Start listening on the HTTP server
const port = 3010;
const host = "localhost";
httpServer.listen(port, host, (err) => {
    if (err) throw err;
    logger.info(`HTTP server listening at http://${host}:${port}`);
});
