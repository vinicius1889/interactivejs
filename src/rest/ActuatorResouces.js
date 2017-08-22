import {RestUtils} from "../utils/Utils"

export class HealthService{

    constructor(server){
        this.server = server;
        this.health();
    }

    static createServices(server){
        return new HealthService(server);
    }

    health(){
        this.server.get('/health',(req,res)=>{
            RestUtils.writeJson(res,{status:"UP"});
        })
    }
}