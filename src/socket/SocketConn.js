import UserService from "../services/UserServices"
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

            client.emit('doRegistration',null);

            client.on('register',(data)=> {
                UserService.register(data,client)
            });

            client.on('disconnect', () => {
                UserService.unregister(client);
            });


        })
    }


}