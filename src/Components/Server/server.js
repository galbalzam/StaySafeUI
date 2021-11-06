//Express server on port 3000
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;
// Return the current time
app.get('/', (req, res) => {
    res.send(`Current time: ${new Date().toLocaleString()}`);
});