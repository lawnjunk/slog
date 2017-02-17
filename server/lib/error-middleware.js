'use strict'

module.exports = (err, req, res, next) => {
  console.error(err.message)
  if(err.status)
    return res.sendStatus(err.status)
  res.sendStatus(500)
}
