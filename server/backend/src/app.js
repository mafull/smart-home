// -- Node module imports --
import express  from "express";
import morgan   from "morgan";
// -- Application imports --
import logger       from "./logger";
import mqttClient   from "./mqttClient";
import router       from "./routes";

// Create an Express application
const app = express();

// Add morgan and configure it to use the winston logger stream
app.use(morgan(
    ":remote-addr -> :method :url -> :status",
    { "stream": logger.stream }
));

// Add routes
app.use(router);


export default app;
