const express = require('express');
const socket = require('socket.io');
const app = express();

app.use(express.static('./client'));
const io = socket(app.listen(3000));

/**
 * Check Seed Handler Function.
 * @param {WebSocket} ws 
 * @param {String|Object} message 
 */
const checkSeed = (ws, message) => {
    console.log(message)
    ws.emit('response', message);
}

/**
 * New Connection Handler Function.
 * @param {WebSocket} ws 
 */
const newConnection = (ws) => {
    console.log(`New Conection. ID: ${ws.id}`);
    ws.on('checkSeed', checkSeed.bind(null, ws)); 
}


io.sockets.on('connection', newConnection);