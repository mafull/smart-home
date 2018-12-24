// -- Node module imports --
import bodyParser       from "body-parser";
import cookieParser     from "cookie-parser";
import cors             from "cors";
import dotenv           from "dotenv";
import express          from "express";
import morgan           from "morgan";
// -- Application imports --
import { connectToDb }  from "./controllers/database";
import logger           from "./logger";
import router           from "./routes";

// Configure dotenv
dotenv.config();

// Connect to the MySQl database
connectToDb(false, (err) => {
    if (err) logger.error(err.message);
});

// Create an Express application
const app = express();

// Configure third-party middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: process.env.NODE_ENV === "dev" ? "http://localhost:3000" : "http://fullersmarthome.ddns.net"
}));

// Enable cookie parsing
app.use(cookieParser());

// Add morgan and configure it to use the winston logger stream
app.use(morgan(
    ":remote-addr -> :method :url -> :status",
    { "stream": logger.stream }
));

// Add routes
app.use("/api", router);


export default app;
