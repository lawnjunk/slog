'use strict'

require('./_dashboard.scss')

require('angular').module('demoApp')
.component('dashboard', {
  template: require('./dashboard.html'),
  controller: ['$log', 'pageService', '$window', 'clipboard', function($log, pageService, $window, clipboard){
    this.$onInit = () => {
      this.pages = [];

      this.pageEditorPage= {title: '', content: ''}
      this.pageEditorHandleSubmit = (page) => {
        return pageService.create(page)
        .then(page => {
          $log.log('uploadHandleSubmit', page)
          this.pages.unshift(page)
          this.pageEditorPage= {title: '', content: ''}
        })
        .catch($log.error)
      }

      this.pageSelectShowAll = false;
      this.pageSelectSelected = null
      this.pageSelectHandleSelect = (page) => {
        this.pageSelectShowAll = !this.pageSelectShowAll
        this.pageSelectSelected = page
        this.pageEditorPage = page
      }

      this.handleNew = () => {
        this.pageEditorPage= {title: '', content: ''}
      }

      this.handleDelete = (page) => {
        pageService.delete(page)
        .then(() => {
          $log.log('success')
          this.pages = this.pages.filter(({id}) => id !== page.id)
          this.pageSelectSelected = this.pages[0]
        })
        .catch($log.error)
      }

      this.handleCopy = (page) => {
        clipboard.copyText(`/#!/page/${this.pageSelectSelected.id}`);
      }

      pageService.fetchAll()
      .then(pages => {
        this.pages = pages
        this.pageSelectSelected = this.pages[0]
      })
    }
  }],
})
