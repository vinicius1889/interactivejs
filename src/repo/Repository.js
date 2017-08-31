var mongoose = require("mongoose");
import {IUser,IRooms} from "../model/Models"
import UserServices from "../services/UserServices"
import {Config} from "../config/Config"

var config = new Config().getConfig();

mongoose.connect(`mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.database}`);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("opened connnection!!!")
});

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

    static findRoomById(id){
        let model = RoomsRepository.getModel();
        return model.findById(id);
    }

    static remove(roomName, userAux){
        return RoomsRepository.findRoomByName(roomName).then( (room)=>{
            let auxUsers = room.users.filter( (u)=> !mongoose.Types.ObjectId(userAux._id).equals(u._id));
            auxUsers = auxUsers.filter( (u)=> u.key!=auxUsers.key);
            room.users=auxUsers;
            room.save();
        } )
    }




    static save(roomAux,user){

        return RoomsRepository.findRoomByName(roomAux.room).then( (roomName)=>{
            let model = RoomsRepository.getModel();
            let userAux = RoomsRepository.getUserPropsToRoomsCollections(user);
            if(roomName == null){
                let auxObj = {"name":roomAux.room, "key":roomAux.key, "users":new Array(userAux)};
                let aux = new model(auxObj);
                return aux.save();
            }else{
                roomName.users.push(userAux);
                return roomName.save();
            }
        });
    }

    static getUserPropsToRoomsCollections(userModel){
        return {
            key: userModel.key,
            _id: userModel._id
        }
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
