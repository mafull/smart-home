// -- Node module imports --
import mysql    from "mysql";
// -- Application imports --
import config   from "../config";
import logger   from "../logger";


let dbConnection = null;


const connectToDb = (reconnect, callback) => {
    if (dbConnection && !reconnect) return callback(null);

    // End the existing connection if a reconnect is requested
    if (dbConnection && reconnect) {
        dbConnection.end();
    }

    // Attempt to connect to the database
    dbConnection = mysql.createConnection(config.db);
    return dbConnection.connect((err) => {
        if (err) return callback(err);
        logger.info(`Connected to MySQL database '${dbConnection.config.database}'.`);
        return callback(null);
    });
};


const getDbConnection = (req, res, next) => {
    // Connect to the database if not already connected
    connectToDb(false, (err) => {
        if (err) return next(err);
        res.locals.db = dbConnection;
        return next();
    });
};


export {
    connectToDb,
    getDbConnection
};
