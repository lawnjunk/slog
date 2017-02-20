'use strict'

require('./_page-editor.scss')

require('angular').module('demoApp')
.component('pageEditor', {
  template: require('./page-editor.html'),
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
