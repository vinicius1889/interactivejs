import UserService from "./UserResources";
import {HealthService} from "./ActuatorResouces"


export default class IndexResources{

    static createRest(server){ return new IndexResources(server);  }
    constructor(server){  this.server = server;  }

    bindRestServices(){
        this.bindActuator();
        this.bindUserService();
    }

    bindActuator(){ HealthService.createServices(this.server);    }
    bindUserService(){ UserService.createServices(this.server);  }


}