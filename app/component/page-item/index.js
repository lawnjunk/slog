'use strict'

require('angular').module('demoApp')
.component('pageItem', {
  template: require('./page-item.html'),
  bindings: {
    page: '<',
    handleSelect: '<',
    handleDelete: '<',
  },
})
