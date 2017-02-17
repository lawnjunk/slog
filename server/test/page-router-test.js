'use strict'

require('./mock-env.js')

let $ = require('superagent')
let expect = require('expect')
let firebase = require('firebase')

let URL = `http://localhost:${process.env.PORT}`
  let {serverStart, serverStop} = require('./server-control.js')

let TOKEN
let TEMP_PAGE_RESPONSE
let TEMP_PAGE = {
  title: 'example',
  content: '# md text\n> blockquote\n* a good point',
}

describe('testing page router', () => {
  before(serverStart)
  after(serverStop)

  before(done => {
    $.get(`${URL}/api/login`)
    .auth('slugbyte@slugbyte.com', 'helloworld')
    .then(res => {
      TOKEN = res.text
      done()
    })
    .catch(done)
  })

  it('res should contain a page', (done) => {
    $.post(`${URL}/api/pages`)
    .set('Authorization', `Bearer ${TOKEN}`)
    .send(TEMP_PAGE)
    .then(res => {
      expect(res.status).toEqual(200)
      done()
    })
    .catch(done)
  })

  it('status should eq 401', (done) => {
    $.post(`${URL}/api/pages`)
    .send(TEMP_PAGE)
    .then(done)
    .catch(res => {
      expect(res.status).toEqual(401)
      done()
    })
    .catch(done)
  })

  it('status should eq 400', (done) => {
    $.post(`${URL}/api/pages`)
    .set('Authorization', `Bearer ${TOKEN}`)
    .send({})
    .then(done)
    .catch(res => {
      expect(res.status).toEqual(400);
      done();
    })
    .catch(done)
  })

  describe('GET /api/pages', () => {
    it('shoul return an array of page data', (done) => {
      $.get(`${URL}/api/pages`)
      .then( res => {
        expect(res.status).toEqual(200)
        expect(Array.isArray(res.body)).toBeTruthy();
        done();
      })
      .catch(done)
    })
  })

  describe('DELETE /api/pages/:id', () => {
    before(done => {
      $.post(`${URL}/api/pages`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(TEMP_PAGE)
      .then(res => {
        console.log('lulwat', res.body)
        TEMP_PAGE_RESPONSE = res.body
        done()
      })
      .catch(done)
    })

    it.only('expect status to eq 204', (done) => {
      $.delete(`${URL}/api/pages/${TEMP_PAGE_RESPONSE.id}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .then(res => {
        expect(res.status).toEqual(204)
        done()
      })
      .catch(done)
    })
  })
})
