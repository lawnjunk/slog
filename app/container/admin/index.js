'use strict'

require('angular').module('demoApp')
.component('admin', {
  template: require('./admin.html'),
  controller: ['$log', '$location', 'authService', function($log, $location, authService){
    authService.tokenFetch()
    .then(() => this.showDashboard = true)
    this.$onInit = () => {
      this.loginUser = {email: '', password: ''}
      this.loginHandleSubmit = () => {
        authService.login(this.loginUser)
        .then(token => {
          $location.path('/dashboard');
        })
        .catch($log.error)
      }
    }
  }],
})
