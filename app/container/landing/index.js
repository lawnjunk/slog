'use strict'

require('./_landing.scss')

require('angular').module('demoApp')
.component('landing', {
  template: require('./landing.html'),
  controller: ['$log','$location', '$stateParams', 'pageService',  function($log, $location, $stateParams, pageService ){
    this.$onInit = () => {
      this.selected = null;
      this.pages = []

      pageService.fetchAll()
      .then(pages => {
        this.pages = pages
        this.selected = this.pages[0]

        let pageID = $stateParams.id
        if(pageID) {
          this.selected = this.pages.reduce((selected, page) => {
            if(page.id == pageID)
              return page;
            return selected;
          }, this.selected)
        }
      })
      .catch($log.error)
    }

  }],
})
