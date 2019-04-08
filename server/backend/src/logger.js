import dateformat   from "dateformat";
import fs           from "fs";
import path         from "path";
import winston      from "winston";
const { format } = winston;


// Create the log file directory if it does not exist
const currentDir = __dirname.split(/[\\/]/).pop();
const isProd = (currentDir == "build");
const logFileDir = isProd ? "../logs" : "./logs";
if (!fs.existsSync(logFileDir)) fs.mkdirSync(logFileDir);

// Generate the log file name based on the current date and time
const logFileName = dateformat(new Date(), "yyyy-mm-dd_HH-MM-ss");
const logFileFullName = path.join(logFileDir, logFileName + (isProd ? ".log" : "_dev.log"));

// Generate a combined format to be used for both file and console logging
const combinedFormat = format.combine(
    format.timestamp(),
    format.align(),
    format.splat(),
    // Add a custom format
    format.printf((info) => {
        const {
            timestamp,
            level,
            message
        } = info;

        const ts = timestamp.slice(0, -1).replace("T", " ");
        return `${ts} [${level}]: ${message}`;
    })
);

// Create a file transport
const fileTransport = new winston.transports.File({
    level: "debug",
    filename: logFileFullName,
    format: combinedFormat
});

// Create a console transport
const consoleTransport = new winston.transports.Console({
    level: "debug",
    format: format.combine(format.colorize(), combinedFormat)
});

// Create the winston logger instance and configure winston
winston.emitsErrs = true;
const logger = winston.createLogger({
    exitOnError: false
});

// Add a stream object to the logger for morgan to use
logger.stream = {
    write: (message) => logger.info(message.trim())
};

// Add the transports
logger.add(fileTransport);
if (process.env.NODE_ENV !== "production") logger.add(consoleTransport);
logger.info("Logging to %s", logFileFullName);


export default logger;
