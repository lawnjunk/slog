'use strict';
require('./mock-env.js');

let expect = require('expect');
let $ = require('superagent');
let URL = `http://localhost:${process.env.PORT}`;
let app = require('../index.js');

describe('testing auth router', function(){
  before((done) => {
    if(!app.isON)
      return app.listen(process.env.PORT, (...args) => {
        console.log('server up'); done(...args);
      });
  });

  it('should return a token', (done) => {
    $.get(`${URL}/api/login`)
    .auth('slugbyte@slugbyte.com', 'helloworld')
    .then(res => {
      console.log(res.text);
      expect(res.status).toEqual(200);
      expect(res.text).toExist();
      done();
    })
    .catch(done)
  });
});
