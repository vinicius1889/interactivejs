import UserService from "./UserService";
import {HealthService} from "./Actuator"


export default class IndexServices{

    static createRest(server){ return new IndexServices(server);  }
    constructor(server){  this.server = server;  }

    bindRestServices(){
        this.bindActuator();
        this.bindUserService();
    }

    bindActuator(){ HealthService.createServices(this.server);    }
    bindUserService(){ UserService.createServices(this.server);  }


}