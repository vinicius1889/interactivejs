import http from 'http';
import assert from 'assert';
import {UserRepository} from  "../src/repo/Repository"
import RoomService from  "../src/services/RoomService"
import UserServices from  "../src/services/UserServices"

import {CookieUtil,UserOnlineUtils} from "../src/utils/Utils"

describe.skip('Testing room service', () => {

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

    it.skip('should return array of online users', done => {
        UserRepository.findAll( (e,res)=>{assert.ok(res.length>0); done(); } )
    });

    it.skip('should return user by id', done => {
        UserRepository.findById("59a069aeac7efb664c32552a")
            .then(s=>{console.log(s); assert.ok(s!=null); done();} )
    });

    it('should delete user in room', done => {
        let user = {
                        _id: '59a069aeac7efb664c32552a',
                        key: '123456',
                        __v: 1,
                        rooms: [ "59a069afac7efb664c32552b" ],
                        anuncios: []
                    };

        UserServices
            .removeOnlineUser(user._id)
            .then( () => done() )
            ;

            // .then(s=>{console.log(s); done();} )
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
