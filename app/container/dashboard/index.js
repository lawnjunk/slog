'use strict'

require('angular').module('demoApp')
.component('dashboard', {
  template: require('./dashboard.html'),
  controller: ['$log', 'pageService', function($log, pageService){
    this.$onInit = () => {
      this.pages = [];

      pageService.fetchAll()
      .then(pages => {
        this.pages = pages
      })

      this.uploadPage = {title: '', content: ''}
      this.uploadHandleSubmit = () => {
        console.log('upload page', this.uploadPage)
        return pageService.create(this.uploadPage)
        .then(page => {
          $log.log('uploadHandleSubmit', page)
          this.pages.unshift(page)
        })
        .catch($log.error)
      }

      this.itemHandleSelect = (page) => {
        console.log('pageee', page)
        this.uploadPage = page
      }

      this.itemHandleDelete = (page) => {
        console.log('dell', page)
        pageService.delete(page)
        .then(() => {
          $log.log('success')
          this.pages = this.pages.filter(({id}) => id !== page.id)
        })
        .catch($log.error)

      }
    }
  }],
})
