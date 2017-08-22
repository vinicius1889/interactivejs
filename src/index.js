var app = require('express')();
var server = require('http').Server(app);
//socket connections
import SocketConnections from "./socket/SocketConn"
//rest  services
import IndexServices from "./rest/IndexServices"

//initializing sockets
SocketConnections.createSocketConnections(server).bindConnections();
//initializing services
IndexServices.createRest(app).bindRestServices();

/**
 * Running a server in a specific port
 *
 */
server.listen(8765)