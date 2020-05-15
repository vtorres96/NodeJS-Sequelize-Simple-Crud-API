const express = require('express');

// importing dotenv with environment variables
require('dotenv').config();

// instantiating express
const app = express();

const http = require('http');

// instantiating http
const server = http.createServer(app);

// importing routes
const routes = require('./routes/routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// adding routes
app.use(routes);

// server listener
server.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});