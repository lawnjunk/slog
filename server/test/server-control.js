

require('./mock-env.js')
let app = require('../index.js') 
let server
module.exports = exports = {}

exports.serverStart = (done) => {
  console.log('wat')
  if(!app.isOn)
    return server = app.listen(process.env.PORT, (...args) => {
      app.isOn = true
      console.log('serverStart') 
      done(...args)
    })
  done()
}

exports.serverStop = (done) => {
  if(app.isOn)
    return server.close((...args) => {
      console.log('serverStop')
      app.isOn = false
      done(...args)
    })
  done()
}
