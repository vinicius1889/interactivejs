import http from 'http';
import assert from 'assert';
import {UserRepository} from  "../src/repo/Repository"
import RoomService from  "../src/services/RoomService"
import UserServices from  "../src/services/UserServices"

import {CookieUtil,UserOnlineUtils} from "../src/utils/Utils"

import {Cipher , Config, ConfigEnum, CommandLineVariables} from "../src/config/Config";

var fs = require('fs');



describe.skip('Test config', () => {


    it('should get command line variables',done => {
        let cmd = CommandLineVariables.getVariables();
        console.log(cmd);
        done();
    });

});


describe('Testing file_to_cipher.txt', () => {

    it('should file_to_cipher.txt/decipher  a string',done => {
        let config = {
            "mongodb":{
                "host":"172.17.0.2",
                "port":"27017",
                "database":"interactive_user"
            }
        };

        let cipher = new Cipher();
        let frase = cipher.encrypt( JSON.stringify(config) );
        console.log(frase);
        assert.equal(cipher.decrypt(frase),JSON.stringify(config));
        done();
    });


});


describe.skip('Testing room service', () => {


    it('should remove a user in a room',done => {
        let data = {
            room:"sala-1"
        }

        let user = {
            "key" : null,
            "_id" : "59a21ff1359ed1257c7fb708"
        }

        RoomService.closeRoom(data,user);
    })


});


describe.skip('Testing Services', () => {

    it('should return 200 with health is ok', done => {
      http.get('http://localhost:8765/health', res => {
        assert.equal(200, res.statusCode);
        done();
      });
    });

});


describe.skip('Testing Utils', () => {

    it('Test internauta ID',done => {
        let cookie = "_ga=GA1.1.1928610343.1501018634; ckinternautaid=123456; dsadsa=ddas";
        let internauta = CookieUtil.getInternautaId(cookie);
        assert.equal(internauta,123456);
        done();
    })

});
