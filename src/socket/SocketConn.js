import UserService from "../services/UserServices"
import RoomService from "../services/RoomService"
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


            client.on('new-room',(data)=>{
                let channel = RoomService.openRoom(data,client);
                client.emit('added-new-room',channel);
                setInterval(()=>{client.emit(channel.room,{value:new Date().getTime(), channel:channel})},5000);
            })



        })
    }


}