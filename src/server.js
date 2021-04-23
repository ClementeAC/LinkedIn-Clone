const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require('path');

//inicializaciones
const server = express();

//Middlewares
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//Static files
server.use(express.static(path.join(__dirname, 'public')));

//rutas
server.use('/api/users', require('./routes/users'));
server.use('/api/publication', require('./routes/publication'));
server.use('/api/business', require('./routes/business'));
server.use('/api/profile', require('./routes/profile'));
server.use('/api/upload', require('./routes/img'));

module.exports = server;