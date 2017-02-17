'use strict'

const uuid = require('uuid')
const {Router} = require('express')
const jsonParser = require('body-parser').json()
const pageRouter = module.exports = new Router()
const bearerAuth = require('../lib/bearer-auth.js')
const firebase = require('firebase')

pageRouter.post('/api/pages', bearerAuth, jsonParser, (req, res, next) => {
  req.body.id = uuid.v1()
  console.log('req.body', req.body)

  firebase.database().ref('/pages')
  .child(req.body.id).set(req.body)
  .then(() => {
    return firebase.auth().signOut()
  })
  .then(() => res.json(req.body))
  .catch(err => {
    firebase.auth().signOut()
    next(err)
  })
})

pageRouter.get('/api/pages', (req, res, next) => {
  console.log('booyea')
  firebase.database().ref('/pages').once('value')
  .then(snapShot => {
    let data = snapShot.val();
    data = Object.keys(data).map(key => data[key])
    console.log('snapshot', data)
    res.json(data)
  })
  .catch(next);

})
