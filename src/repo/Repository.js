var mongoose = require("mongoose");
import {IUser} from "../model/Models"
import UserServices from "../services/UserServices"

mongoose.connect('mongodb://172.17.0.2:27017/interactive_user');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("opened connnection!!!")
})


export class UserRepository{

    static SCHEMA = null;
    static MODEL  = null;

    static getModel(){
        if(UserRepository.SCHEMA==null){
            UserRepository.SCHEMA =  mongoose.Schema(IUser)
        }
        if(UserRepository.MODEL==null){
            UserRepository.MODEL = mongoose.model('online_user',UserRepository.SCHEMA);
        }
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
}
