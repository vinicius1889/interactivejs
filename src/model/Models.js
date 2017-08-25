var mongoose = require("mongoose");


export var IUser = {
    key:String,
    anuncios:Array,
    rooms:Array
};

export var IRooms = {
    name:String,
    key:String,
    users:Array
};



