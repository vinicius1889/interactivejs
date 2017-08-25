/**
 * Created by vinicius on 24/08/17.
 */

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

}