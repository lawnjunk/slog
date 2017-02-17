'use strict';

// require npm modules
let express = require('express');
let morgan = require('morgan');
let cors = require('cors');
let firebase = require('firebase');
let admin = require('firebase-admin');

// init firebase sdks
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

// init app
let app = module.exports = express();

// register app middleware
app.use(cors());
app.use(morgan(process.env.LOG_FORMAT));

// register app routers
app.use(require('./route/page.js'));
app.use(require('./route/auth.js'));

// register app error middleware
app.use(require('./lib/error-middleware.js'))
