import http from 'http';
import assert from 'assert';
import {UserRepository} from  "../src/repo/Repository"
import RoomService from  "../src/services/RoomService"

import {CookieUtil,UserOnlineUtils} from "../src/utils/Utils"

describe('Testing room service', () => {

    it('should add a user in a room', done => {

        let user = {
            "_id" : "599f57aa0e07a9cd3d01c15b",
            "key" : "123456",
            "rooms" : [],
            "anuncios" : []
        };
        let room = {"room":"sala-teste-5858","key":"5858"};
        let aux = [];
        aux[UserOnlineUtils.key] = user;

        RoomService.openRoom(room, aux).then( ()=> done() )

    });



    it.skip('should find a user by id', done => {
        let user = {
            "_id" : "599f06909b2e0b704455894a",
            "key" : "123456",
            "anuncios" : [],
            "__v" : 0
        };
        UserRepository.findById(user._id)
                        .then( (s) => {
                                console.log("RR");
                                console.log(s);
                                done();
                        })

    });



});


describe.skip('Testing user repository', () => {

    it('should return array of online users', done => {
        UserRepository.findAll( (e,res)=>{console.log(res.length); done(); } )
    });

    it('should return user by id', done => {
        UserRepository.findById("599f06909b2e0b704455894a" )
            .then(s=>{ console.log("danzig"); console.log(s); done();} )
    });


    it('should return user by id', done => {
        UserRepository.updateUserRooms(null,null )
            .then(s=>{ console.log("teste"); console.log(s); done();} )
    });

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
