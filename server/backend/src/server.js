// -- Node module imports --
import express  from "express";
import http     from "http";
// -- Application imports --
import app      from "./app";


// Create an http server
const server = http.createServer(app);
server.on("error", (err) => {
    if (err) throw err;
});

// Start listening
const port = 3010;
const host = "localhost";
server.listen(port, host, (err) => {
    if (err) throw err;
    console.log(`Listening at http://${host}:${port}`);
});
