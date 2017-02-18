'use strict'

require('angular').module('demoApp')
.component('admin', {
  template: require('./admin.html'),
  controller: ['$log', 'authService', function(){
  }],
})
