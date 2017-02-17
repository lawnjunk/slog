'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const pageRouter = module.exports = new Router();
const bearerAuth = require('../lib/bearer-auth.js');
const firebase = require('firebase');

pageRouter.post('/api/page', bearerAuth, jsonParser, (req, res, next) => {

  firebase.database().ref('/page')
  .child(req.body.title).set(req.body.data)
  .then(data => {
    console.log('data', data);
    res.json(req.body);
    firebase.auth().signOut();
  })
  .catch(err => {
    console.error('err', err);
    firebase.auth().signOut();
    next(err);
  });
});
