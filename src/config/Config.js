var fs = require('fs');

// import appDev from "./app_dev.txt"
// import appProd from "./app_prod.txt"

var crypto = require('crypto');

export var ConfigEnum = {
        "DEV":"DEV",
        "PROD":"PROD",
        "QA":"QA"
}

export class CommandLineVariables{

    static  isDev(){
        let variables = CommandLineVariables.getVariables();
        return !variables.hasOwnProperty('env') || variables.env.toUpperCase()==ConfigEnum.DEV;
    }


    static getVariables(){
        let json = {};
        process.argv.filter(s=>s.indexOf('=')>-1)
                                .forEach( s=> {
                                                let map = s.split('=');
                                                json[map[0]]=map[1];
                                              });
        return json;

    }
}

export class Config{

    constructor(){
        this.cipher = new Cipher();
        this.file = "./src/config/app";
        this.setFile();
    }

    setFile(){
        if(!CommandLineVariables.isDev())
          this.file +=  "_"+CommandLineVariables.getVariables().env.toLowerCase()
        this.file+=".txt"
    }

    getConfig(){
        let data = fs.readFileSync(this.file, 'utf8');
        if(CommandLineVariables.isDev())
            return JSON.parse(data)
        return JSON.parse(this.cipher.decrypt(data))
    }

}

export class Cipher{

    constructor(){
        this.algorithm = 'aes-256-ctr',
        this.password  = CommandLineVariables.getVariables().icarroskey;
        this.cipher     =  crypto.createCipher(this.algorithm,this.password);
        this.decipher   =  crypto.createDecipher(this.algorithm,this.password);
    }

    encrypt(text){
        let crypted = this.cipher.update(text,'utf8','hex')
        crypted += this.cipher.final('hex');
        return crypted;
    }

    decrypt(text){
        var dec = this.decipher.update(text,'hex','utf8')
        dec += this.decipher.final('utf8');
        return dec;
    }




}