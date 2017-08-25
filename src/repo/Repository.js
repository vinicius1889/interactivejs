var mongoose = require("mongoose");
import {IUser,IRooms} from "../model/Models"
import UserServices from "../services/UserServices"

mongoose.connect('mongodb://172.17.0.2:27017/interactive_user');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("opened connnection!!!")
})

export class RoomsRepository{
    static SCHEMA = null;
    static MODEL  = null;

    static getModel(){
        try{ RoomsRepository.SCHEMA =  mongoose.Schema(IRooms) }catch(e){ }
        try{ RoomsRepository.MODEL  =  mongoose.model('rooms',RoomsRepository.SCHEMA); }catch(e){ }
        return RoomsRepository.MODEL;
    }

    static findRoomByName(name){
        let model = RoomsRepository.getModel();
        return model.findOne({"name":name});
    }




    static save(roomAux,user){

        return RoomsRepository.findRoomByName(roomAux.room).then( (roomName)=>{
            let model = RoomsRepository.getModel();
            if(roomName == null){
                let auxObj = {"name":roomAux.room, "key":roomAux.key, "users":new Array(user)};
                let aux = new model(auxObj);
                return aux.save();
            }else{
                roomName.users.push(user);
                return roomName.save();
            }
        });
    }



}

export class UserRepository{

    static SCHEMA = null;
    static MODEL  = null;

    static getModel(){
        try{ UserRepository.SCHEMA =  mongoose.Schema(IUser) }catch(e){ }
        try{ UserRepository.MODEL  =  mongoose.model('online_user',UserRepository.SCHEMA); }catch(e){ }
        return UserRepository.MODEL;
    }

    static save(key){
        let model = UserRepository.getModel();
        let aux = new model({key:key});
        return aux.save();
    }

    static remove(client){
        let model = UserRepository.getModel();
        let aux = new model({_id: client[UserServices.key]._id});
       return  aux.remove();
    }

    static findAll(callback){
        let model = UserRepository.getModel();
        return model.find({},callback);
    }

    static findById(id){
        let model = UserRepository.getModel();
        return model.findById(id);
    }

    static updateUserRooms(user,room){
        return UserRepository.findById(user._id)
            .then( (s) =>{
                s.rooms.push(room._id);
                s.save();
            });
    }
}
