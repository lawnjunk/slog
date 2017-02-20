'use strict'

console.log('hello world')

require('./style/main.scss')

const angular = require('angular')

const ngAnimate = require('angular-animate')
const clipboard = require('angular-clipboard')
const uiRouter = require('angular-ui-router')
const marked = require('angular-marked')

angular.module('demoApp', [uiRouter, marked, clipboard.name, 'ngAnimate'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProver){
  $urlRouterProver.when('', '/')

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
    {
      name: 'landing',
      url: '/',
      template: '<landing> </landing>',
    },
    {
      name: 'page',
      url: '/page/:id',
      template: '<landing> </landing>',
    },
  ]

  routes.forEach(route => $stateProvider.state(route))
}])

require('./service/auth-service.js')
require('./service/page-service.js')

require('./filter/nav-filter.js')

require('./container/admin');
require('./container/landing')
require('./container/dashboard')

require('./component/login')
require('./component/page-editor')
require('./component/page-select')
