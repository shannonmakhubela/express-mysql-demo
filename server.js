/*
* @author Shannon Makhubela
*/

const http = require('http');
const Express_Application = require('./application');

const port = process.env.PORT || 3000;

const server = http.createServer(Express_Application);

server.listen(port);