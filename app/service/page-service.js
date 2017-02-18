'use strict'

require('angular').module('demoApp')
.service('pageService', ['$log', '$http', 'authService', function($log, $http, authService){
  let pageService = {}

  pageService.create = (page) => {
    return authService.tokenFetch()
    .then( token => {
      let url = `${__API_URL__}/api/pages`
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      return $http.post(url, page, config)
      .then(res => {
        return res.data
      })
    })
  }

  pageService.fetchAll = () => {
    return authService.tokenFetch()
    .then( token => {
      let url = `${__API_URL__}/api/pages`
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      return $http.get(url, config)
      .then(res => {
        return res.data
      })
    })
    
  }

  pageService.delete = (page) => {
    return authService.tokenFetch()
    .then( token => {
      let url = `${__API_URL__}/api/pages/${page.id}`
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      return $http.delete(url, config)
      .then(res => {
        return res.data
      })
    })
  }
    

  return pageService
}])
