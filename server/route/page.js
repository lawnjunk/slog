'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const pageRouter = module.exports = new Router();
const bearer = require('../lib/bearer-auth.js');
const firebase = require('firebase');

pageRouter.post('/api/page', jsonParser, (req, res, next) => {

  firebase.database().ref('/page')
  .child(req.body.title).set(req.body.data)
  .then(data => {
    console.log('data', data);
    res.json(req.body);
  })
  .catch(err => {
    console.error('err', err);
    next(err);
  });
});
