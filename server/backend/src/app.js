// -- Node module imports --
import express  from "express";
import morgan   from "morgan";
// -- Application imports --
import { connectToDb }  from "./controllers/database";
import logger           from "./logger";
import router           from "./routes";


// Connect to the MySQl database
connectToDb(false, (err) => {
    if (err) logger.error(err.message);
});

// Create an Express application
const app = express();

// Add morgan and configure it to use the winston logger stream
app.use(morgan(
    ":remote-addr -> :method :url -> :status",
    { "stream": logger.stream }
));

// Add routes
app.use("/api", router);


export default app;
