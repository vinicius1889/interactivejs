// import {Cipher , Config, ConfigEnum, CommandLineVariables} from "./src/config/Config";
var fs = require('fs');
var crypto = require('crypto');
var prompt = require('prompt');

class CipherTool{

    constructor(){
        this.cipher     =   null;
        this.decipher   =   null;
        this.password   =   null;
        this.algorithm  =   'aes-256-ctr';

    }

    createCipher(){
        this.cipher     =  crypto.createCipher(this.algorithm,this.password);
        this.decipher   =  crypto.createDecipher(this.algorithm,this.password);
    }

    encrypt(text){
        this.createCipher();
        let crypted = this.cipher.update(text,'utf8','hex')
        crypted += this.cipher.final('hex');
        return crypted;
    }

    decrypt(text){
        this.createCipher();
        var dec = this.decipher.update(text,'hex','utf8')
        dec += this.decipher.final('utf8');
        return dec;
    }

    doCipherFile(){
        let data = fs.readFileSync("./to_cipher/file_to_cipher.txt", 'utf8');
        console.log("Cipher:")
        console.log(data);

        console.log("Please, type a password!");
        let self = this;
        prompt.get(['password'], function (err, result) {
            if(err!=null)
                console.log(err);

            else if(result!=null) {

                self.password = result.password;
                console.log(self.password)
                let encrypted = self.encrypt(data)
                console.log("Encrypted:")
                console.log(encrypted);
                let decrypted = self.decrypt(encrypted);
                console.log("Decripted:")
                console.log(decrypted);
            }
        });




    }

}

var cipher = new CipherTool();
cipher.doCipherFile();