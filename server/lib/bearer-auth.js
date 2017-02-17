'use strict';

const error = require('http-errors');
const firebase = require('firebase');

module.exports = (req, res, next) => {
  if(!req.headers.authorization) 
    return next(error(401, 'no Authorization header'));

  let token = req.headers.authorization.split('Bearer ')[1];
  
  if(!encoded)
    return next(error(401, 'no Bearer Auth'));
  
  firebase.auth().verifyIdToken()
  .then((data) => {
    console.log('data adsflkjd salfkj', data);
    req.token = token;
    next();
  })
  .catch(err => next(error(401, err.message)));
}
