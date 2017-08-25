/**
 * Created by vinicius on 24/08/17.
 */
var mongoose = require("mongoose");

import {UserDomain} from "../model/Models"
import {CookieUtil,UserOnlineUtils}  from '../utils/Utils'
import {RoomsRepository, UserRepository} from "../repo/Repository"

export default class RoomService{

    constructor(){

    }

    static totalUsersInRoom(name,client){
        RoomsRepository.findRoomByName(name)
                                .then( items => {
                                        let aux = new Map();
                                        items.users.forEach( (v) => aux.set(v.key,v) );
                                        client.emit(name,{"total":aux.size,"room":name});
                                        client.broadcast.emit(name,{"total":aux.size,"room":name})
                                    } );
    }

    static openRoom(data,userAux){

        RoomsRepository
                .save(data,userAux)
                .then( (room) => {
                        UserRepository.updateUserRooms(userAux,room);
                });

    }

    static deleteUserInRoom(usuario,roomId){


            RoomsRepository
                    .findRoomById(roomId)
                            .then( (room) => {
                                let aux = new Array();
                                room.users.forEach( r => {

                                    if( !mongoose.Types.ObjectId(r._id).equals(usuario._id) ){
                                        aux.push(r);
                                    }
                                })
                                room.users=aux;
                                room.save();
                            });
    }

}