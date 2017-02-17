'use strict'

let {Router} = require('express');
let authRouter = module.exports = new Router();
let basicAuth = require('../lib/basic-auth.js');

authRouter.get('/api/login', basicAuth, (req, res, next) => {
  res.json(req.token); 
});
