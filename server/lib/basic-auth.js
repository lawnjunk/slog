'use strict';

const error = require('http-errors');
const firebase = require('firebase');
const admin = require('firebase-admin');

module.exports = function(req, res, next){
  if(!req.headers.authorization) 
    return next(error(401, 'no Authorization header'));

  let encoded = req.headers.authorization.split('Basic ')[1];
  
  if(!encoded)
    return next(error(401, 'no Basic Auth'));

  let decoded = new Buffer(encoded, 'base64').toString();
  if(!decoded)
    return next(error(401, 'no Base64 string'));
  
  let [email, password] = decoded.split(':');
  if(!email || !password)
    return next(error(401, 'no uname || passowrd'));
  
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(user => {
    req.user = user;
    return admin.auth().createCustomToken(user.uid)
  })
  .then(token => {
    req.token = token;
    return firebase.auth().signOut();
  })
  .then(() => next())
  .catch(err => next(error(401, err.message)));
}
