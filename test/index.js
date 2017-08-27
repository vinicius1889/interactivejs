import http from 'http';
import assert from 'assert';
import {UserRepository} from  "../src/repo/Repository"
import RoomService from  "../src/services/RoomService"
import UserServices from  "../src/services/UserServices"

import {CookieUtil,UserOnlineUtils} from "../src/utils/Utils"



describe('Testing room service', () => {


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
