'use strict'

require('angular').module('demoApp')
.component('landing', {
  template: `<div>
  <h2> landing </h2>
  <div marked="$ctrl.content"> # cool beans </div> 
  <login user="$ctrl.loginUser" handle-submit="$ctrl.loginHandleSubmit"> </login>
  </div>`,
  controller: ['$log', 'authService', function($log, authService){
    this.$onInit = () => {
      this.content = '# cool\n* wat\n* wart' 

    }
  }],
})
