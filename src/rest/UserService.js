
export default class UserService{

    constructor(server){
        this.server  = server;
        this.getOnlineUsers();
    }

    static createServices(server){
        return new UserService(server);
    }



    getOnlineUsers(){
        this.server.get('/user/online',(req, res) => {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end("[]");
        })
    }



}