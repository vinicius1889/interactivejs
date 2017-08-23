import {UserDomain} from "../model/Models"
import {CookieUtil,UserOnlineUtils}  from '../utils/Utils'
import {UserRepository} from "../repo/Repository"

export default class UserServices{
    static key = "refIcarros";
    static time = 1000*5;

    static register(data,client) {
        let internautaId = CookieUtil.getInternautaId(data);
        UserRepository.save(internautaId)
                        .then( (item)=> {client[UserServices.key] = item; } )
                        .then( (s) => UserServices.notificationOnlineUsers(client,false) );

    }

    static unregister(client){
        setTimeout( () =>
                UserRepository.remove(client)
                    .then( (s) => console.log(s))
                    .then( (s) => UserServices.notificationOnlineUsers(client,false) )
                    .catch((a)=>console.log(a)) ,
            UserServices.time
        );
    }

    static notificationOnlineUsers(channel,inclusive=true){
        UserRepository.findAll((err,resp)=> {
            let docs = UserOnlineUtils.getUniqueUsersFromDocuments( resp );
            channel.emit("online-users",docs);
            channel.broadcast.emit("online-users",docs) });
    }

}