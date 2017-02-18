'use strict'

let uuid = require('uuid')
let firebase = require('firebase')
let error = require('http-errors')

const Page = module.exports = function(opts){
  // computed / optional props
  this.showInNav = opts.showInNav || false
  this.id = opts.id || uuid.v1()

  // required props
  this.title = opts.title
  this.content = opts.content
}

// Static Methods
Page.fetchAll = function(){
  return firebase.database().ref('/pages').once('value')
  .then(snapShot => {
    let data = snapShot.val();
    data = Object.keys(data).map(key => data[key])
    console.log('snapshot', data)
    return data;
  })
}

Page.findByIdAndDelete = function(id){
  return firebase.database().ref('/pages')
  .child(id).remove()
  .then(() => firebase.auth().signOut())
}

// Instance Methods
Page.prototype.validate = function(){
  if (!this.id || !this.title || !this.content)
    return Promise.reject(error(400, 'id title and content are required'))
  return Promise.resolve()
}

Page.prototype.save = function(){
  // check for required props
  return this.validate()
  .then(() => {
    return firebase.database().ref('/pages')
    .child(this.id).set(this)
  })
  .then(() => {
    return firebase.auth().signOut()
  })
  .then(() => this)
  .catch(err => {
    firebase.auth().signOut()
    throw err;
  })
}
