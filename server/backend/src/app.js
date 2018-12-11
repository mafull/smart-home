// -- Node module imports --
import express  from "express";
import morgan   from "morgan";
// -- Application imports --
import logger   from "./logger";


// Create an Express application
const app = express();

// Add morgan and configure it to use the winston logger stream
app.use(morgan(
    ":remote-addr -> :method :url -> :status",
    { "stream": logger.stream }
));

// Add routes
app.get("/hi", (req, res) => res.send("Hello world!"));


export default app;
