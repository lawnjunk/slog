'use strict';

const error = require('http-errors');
const firebase = require('firebase');

module.exports = (req, res, next) => {
  if(!req.headers.authorization)
    return next(error(401, 'no Authorization header'));

  let token = req.headers.authorization.split('Bearer ')[1];

  if(!token)
    return next(error(401, 'no token'));

  firebase.auth().signInWithCustomToken(token)
  .then((data) => {
    req.token = token;
    next();
  })
  .catch(err => {
    console.log('fusldfkjlksdjfsdjfklj')
    next(error(401, err.message))
  });
}
