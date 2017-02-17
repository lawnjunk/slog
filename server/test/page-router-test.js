'use strict';

require('./mock-env.js');

let expect = require('expect');
let $ = require('superagent');

let URL = `http://localhost:${process.env.PORT}`;
let {serverStart, serverStop} = require('./server-control.js');

let TOKEN;
let TEMP_PAGE = {
  title: 'example',
  data: '# md text\n> blockquote\n* a good point',
};

describe('testing page router', () => {
  before(serverStart);
  after(serverStop);

  before(done => {
    $.get(`${URL}/api/login`)
    .auth('slugbyte@slugbyte.com', 'helloworld')
    .then(res => {
      TOKEN = res.text;
      done();
    })
    .catch(done);
  });

  it('res should contain a page', (done) => {
    $.post(`${URL}/api/page`)
    .set('Authorization', `Bearer ${TOKEN}`)
    .send(TEMP_PAGE)
    .then(res => {
      expect(res.status).toEqual(200);
      done();
    })
    .catch(done);
  });

  it('status should eq 401', (done) => {
    $.post(`${URL}/api/page`)
    .send(TEMP_PAGE)
    .then(done)
    .catch(res => {
      expect(res.status).toEqual(401);
      done();
    })
    .catch(done);
  });
});




