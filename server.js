// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors')
const compression = require('compression')

const WebSocket = require('ws')

// Get our API routes
const api = require('./api/api');

const app = express();

app.use(compression())

app.use(cors())
// Point static path to dist
// app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

// Get port from environment and store in Express.
const port = process.env.PORT || '3900';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// WEBSOCKETS
// const wss = new WebSocket.Server({ server });

// wss.on('connection', (ws) => {

//     //connection is up, let's add a simple simple event
//     ws.on('message', (message) => {

//         //log the received message and send it back to the client
//         console.log('received: %s', message);
//         ws.send(`Hello, you sent -> ${message}`);
//     });

//     //send immediatly a feedback to the incoming connection    
//     ws.send('Hi there, I am a WebSocket server');
// });

// Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`API running on localhost:${port}`));
