'use strict'

require('angular').module('demoApp')
.component('pageUpload', {
  template: require('./page-upload.html'),
  bindings: {
    page: '<',
    handleSubmit: '<',
  },
  controller: function(){
    this.$onInit = () => {
      console.log('this page', this.page)
    }
  }
})
