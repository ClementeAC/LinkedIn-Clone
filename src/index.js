const server = require('./server');

PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('Server in port: ' + PORT);
});