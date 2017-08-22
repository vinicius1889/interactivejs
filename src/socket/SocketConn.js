var socketIO = require("socket.io");

export default class SocketConn{

    static createSocketConnections(server){
        return new SocketConn(server);
    }

    constructor(server){
        this.io = socketIO(server);
    }

    bindConnections(){
        this.io.on('connection',(client)=>{
            console.log("connected!!!!!!!!!!");

            client.on('event', function(data){

            });
            // client.on('disconnect', function(){});
        })
    }


}