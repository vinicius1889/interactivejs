import http from 'http';
import assert from 'assert';

import {CookieUtil} from "../src/utils/Utils"

describe('Testing Services', () => {

    it('should return 200 with health is ok', done => {
      http.get('http://localhost:8765/health', res => {
        assert.equal(200, res.statusCode);
        done();
      });
    });

});


describe('Testing Utils', () => {

    it('Test internauta ID',done => {
        let cookie = "_ga=GA1.1.1928610343.1501018634; ckinternautaid=123456; dsadsa=ddas";
        let internauta = CookieUtil.getInternautaId(cookie);
        assert.equal(internauta,123456);
        done();
    })

});
