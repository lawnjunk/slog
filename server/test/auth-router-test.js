'use strict';
require('./mock-env.js');

let expect = require('expect');
let $ = require('superagent');
let URL = `http://localhost:${process.env.PORT}`;

let {serverStart, serverStop} = require('./server-control.js');

describe('testing auth router', () => {
  before(serverStart);
  after(serverStop);

  it('should return a token', (done) => {
    $.get(`${URL}/api/login`)
    .auth('slugbyte@slugbyte.com', 'helloworld')
    .then(res => {
      expect(res.status).toEqual(200);
      expect(res.text).toExist();
      done();
    })
    .catch(done)
  })

  it('should respond with a 401', (done) => {
    $.get(`${URL}/api/login`)
    .then(done)
    .catch(res => {
      expect(res.status).toEqual(401);
      done()
    })
    .catch(done)
  });

  it('should respond with a 401', (done) => {
    $.get(`${URL}/api/login`)
    .auth('wat@wat.wat', 'wrong-password')
    .then(done)
    .catch(res => {
      expect(res.status).toEqual(401);
      done()
    })
    .catch(done)
  });

});
