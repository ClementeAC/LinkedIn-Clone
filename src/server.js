const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const path = require('path');

//inicializaciones
const server = express();

//Middlewares
server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Static files
server.use(express.static(path.join(__dirname, 'public')));

//rutas
server.use('/api/users', require('./routes/users'));
server.use('/api', require('./routes/lists'));
server.use('/api/upload', require('./routes/img'));

module.exports = server;