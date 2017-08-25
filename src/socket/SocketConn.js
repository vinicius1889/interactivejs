import UserService from "../services/UserServices"
import RoomService from "../services/RoomService"
import {UserOnlineUtils} from "../utils/Utils"

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
                RoomService.openRoom(data,client[UserOnlineUtils.key]);
                setTimeout( () =>{
                                client.emit('added-new-room',data);
                                RoomService.totalUsersInRoom(data.room,client)
                            },1000);
            })



        })
    }


}