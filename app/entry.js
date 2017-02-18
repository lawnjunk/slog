'use strict'

console.log('hello world')

const angular = require('angular')
const uiRouter = require('angular-ui-router')
const marked = require('angular-marked')

angular.module('demoApp', [uiRouter, marked])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProver){
  $urlRouterProver.when('', '/')

  let routes = [
    {
      name: 'home',
      url: '/',
      template: '<landing> </landing>',
    },
  ]

  routes.forEach(route => $stateProvider.state(route))
}])

require('./service/auth-service.js')
require('./container/landing')
require('./component/login')
