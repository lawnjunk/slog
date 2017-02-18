'use strict'

console.log('hello world')

const angular = require('angular')
const uiRouter = require('angular-ui-router')
const marked = require('angular-marked')

angular.module('demoApp', [uiRouter, marked])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProver){
  $urlRouterProver.when('', '/admin')

  let routes = [
    {
      name: 'admin',
      url: '/admin',
      template: '<admin> </admin>',
    },
    {
      name: 'dashboard',
      url: '/dashboard',
      template: '<dashboard> </dashboard>',
    },
  ]

  routes.forEach(route => $stateProvider.state(route))
}])

require('./service/auth-service.js')
require('./service/page-service.js')

require('./container/admin');
require('./container/landing')
require('./container/dashboard')

require('./component/login')
require('./component/page-upload')
require('./component/page-item')
