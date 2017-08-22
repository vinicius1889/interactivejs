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
            res.writeHead(200,{'Content-Type': 'application/json'});
            res.end("{\"status\":\"UP\"}");
        })
    }
}