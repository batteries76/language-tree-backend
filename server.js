// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors')

// Get our API routes
const api = require('./api/api');

const app = express();

app.use(cors())

// Set our api routes
app.use('/api', api);

// Get port from environment and store in Express.
const port = process.env.PORT || '3900';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`API running on localhost:${port}`));
