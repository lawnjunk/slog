'use strict'

require('angular').module('demoApp')
.service('authService', [ '$log', '$q', '$http', '$window', function($log, $q, $http, $window){
  let authService = {}

  let tokenSave = (token) => {
    if (!token) return $q.reject('no token');
    try {
      $window.localStorage.token = JSON.stringify(token);
      authService.token = token;
      return $q.resolve(token);
    } catch (err) {
      return $q.reject(err);
    }
  }

  authService.tokenFetch = () => {
    if(authService.token)
      return $q.resolve(authService.token);

    try {
      let token = JSON.parse($window.localStorage.token);
      return $q.resolve(token);
    } catch (err) {
      return $q.reject(err);
    }
  };

  authService.login = (user) => {
    let url = `${__API_URL__}/api/login`
    let encoded = $window.btoa(user.email + ':' + user.password)
    let config = {
      headers: {
        Authorization: `Basic ${encoded}`,
      },
    }

    return $http.get(url, config)
    .then(res => {
      return tokenSave(res.data)
    })
  }

  return authService
}])
