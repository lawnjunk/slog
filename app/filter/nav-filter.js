'use strict'

require('angular').module('demoApp')
.filter('navFilter', function(){
  return function (pages){
    return pages.filter(page => {
      return page.showInNav
    })
  }
})
