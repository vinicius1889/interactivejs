/**
 * Created by vinicius on 24/08/17.
 */

import {UserDomain} from "../model/Models"
import {CookieUtil,UserOnlineUtils}  from '../utils/Utils'
import {UserRepository} from "../repo/Repository"

export default class RoomService{

    constructor(){

    }

    static openRoom(data,client){
        console.log( client[UserOnlineUtils.key] )
        console.log("opening = "+data.room);
        return data;
    }

}