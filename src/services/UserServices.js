import {UserDomain} from "../model/Models"
import {CookieUtil,UserOnlineUtils}  from '../utils/Utils'
import {UserRepository} from "../repo/Repository"
import RoomService from "../services/RoomService"
var mongoose = require("mongoose");


export default class UserServices{
    static key = "refIcarros";
    static time = 1000*5;

    static register(data,client) {
        let internautaId = CookieUtil.getInternautaId(data);
        UserRepository.save(internautaId)
                        .then( (item)=> {client[UserServices.key] = item; } )
                        .then( (s) => UserServices.notificationOnlineUsers(client) );

    }

    static unregister(client){
        setTimeout( () =>
                    {
                        let userId = client[UserOnlineUtils.key]._id;
                        UserServices.removeOnlineUser(userId)
                                        .then( ()=> UserRepository.remove(client) )
                                            .then( ()=>UserServices.notificationOnlineUsers(client));
                    },UserServices.time
        );
    }

    static notificationOnlineUsers(channel){
        UserRepository.findAll((err,resp)=> {
            let docs = UserOnlineUtils.getUniqueUsersFromDocuments( resp );
            channel.emit("online-users",docs);
            channel.broadcast.emit("online-users",docs) });
    }

    static removeOnlineUser(user){
        return UserRepository.findById(user)
                        .then( (usuario) =>
                                    usuario.rooms.forEach( (r) => RoomService.deleteUserInRoom(usuario, r) ) )


    }

}