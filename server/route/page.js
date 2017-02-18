'use strict'

const uuid = require('uuid')
const {Router} = require('express')
const jsonParser = require('body-parser').json()
const bearerAuth = require('../lib/bearer-auth.js')
let Page = require('../model/page.js')

const pageRouter = module.exports = new Router()

pageRouter.post('/api/pages', bearerAuth, jsonParser, (req, res, next) => {
  new Page(req.body).save()
  .then(page => res.json(page))
  .catch(next)
})

pageRouter.get('/api/pages', (req, res, next) => {
  Page.fetchAll()
  .then(pages => res.json(pages))
  .catch(next);
})

pageRouter.delete('/api/pages/:id', bearerAuth, (req, res, next) => {
  Page.findByIdAndDelete(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next)
})

pageRouter.put('/api/pages/:id', bearerAuth, jsonParser, (req, res, next) => {
  req.body.id = req.params.id
  new Page(req.body).save()
  .then(page => res.json(page))
  .catch(next)
})
