// Node module imports
import express  from "express";


// Create an Express application
const app = express();

// Add routes
app.get("/hi", (req, res) => res.send("Hello world!"));


export default app;
