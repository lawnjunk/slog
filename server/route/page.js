'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const pageRouter = module.exports = new Router();

pageRouter.post('/api/page', jsonParser, (req, res, next) => {
  res.json(req.body);
});
