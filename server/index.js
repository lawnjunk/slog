'use strict';

let express = require('express');
let morgan = require('morgan');
let cors = require('cors');
let firebase = require('firebase');
let admin = require('firebase-admin');

let app = module.exports = express();

firebase.initializeApp({
  apiKey: process.env.FIREBASE_WEB_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
});

admin.initializeApp({
  credential: admin.credential.cert(`${__dirname}/../service-accounts.json`),
  databaseURL: `${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
});

app.use(cors());
app.use(morgan(process.env.LOG_FORMAT));
app.use(require('./route/page.js'));
app.use(require('./route/auth.js'));

app.use((err, req, res, next) => {
  console.error(res.message);
  if(err.status)
    return res.sendStatus(err.status)
  res.sendStatus(500);
})
