import {EnumCode} from "../utils/Utils";

export default class UserResources{

    constructor(server){
        this.server  = server;
        this.getOnlineUsers();
    }

    static createServices(server){
        return new UserResources(server);
    }



    getOnlineUsers(){
        this.server.get('/user/online',(req, res) => {
            res.writeHead(EnumCode.OK.code, {'Content-Type': 'application/json'});
            res.end("[]");
        })
    }



}