'use strict'

require('./_landing.scss')

require('angular').module('demoApp')
.component('landing', {
  template: require('./landing.html'),
  controller: ['$log','$location', '$stateParams', 'pageService',  function($log, $location, $stateParams, pageService ){
    this.$onInit = () => {
      this.selected = null;
      this.pages = []

      this.handleSelect = (page) => {
        $location.path(`/page/${page.id}`)
      }

      pageService.fetchAll()
      .then(pages => {
        this.pages = pages
        let pageID = $stateParams.id
        if(!pageID)
          this.handleSelect(this.pages[0])
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
