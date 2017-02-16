'use strict';

let express = require('express');
let morgan = require('morgan');
let cors = require('cors');

let app = module.exports = express();
app.use(cors());
app.use(morgan(process.env.LOG_FORMAT));
app.use(require('./route/page.js'));
