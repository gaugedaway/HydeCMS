/*
  This module is responsible for getting OAuth token for GitHub API operations.

  Author: Adam Bac
*/

angular.module('Hyde.Services.OAuth', ['Hyde.Config'])
  .service('oauthProvider', [
    '$http',
    '$location',
    '$window',
    '$rootScope',
    'githubApiUrl',
    'oauthClientId',
    'gatekeeperUrl',
    'githubScope',

    function($http, $location, $window, $rootScope, githubUrl, clientId, gatekeeperUrl, scope) {

    // Function used to redirect in case the code written in url
    // doesn't work, i.e. when user reloaded the page;
    // for example if the current url is
    // http://myapp.com/?code=fh438bnvcueb73#/login?abc=def,
    // redirect() will redirect it to
    // http://myapp.com/#/login?abc=def.
    function redirect() {
      $window.location.href = $location.protocol() + '://' + $location.host() + '/#' + $location.url();
    }


    function getTokenHelper(callback) {
      // Check if the code already is in url.
      var code = window.location.href.match(/\?code=(.*)/);

      // If not, redirect to github authentication page.
      if(!code){
        $window.location.href = githubUrl + '?client_id=' + clientId + '&redirect_uri=' + window  .encodeURIComponent($location.absUrl()) + '&scope=' + scope.join(',');
      }


      // If yes, get the code...
      if(code) {
        // The transformatin below is necessary, because GitHub API places
        // the code before # character, for example, if return url would be
        // http://abc.com/#/login, GitHub would redirect to somenthing like
        // http://abc.com/?code=ajffjuhgffjhfjaj#login, so we need to separate
        // the code from the path after #.
        code = code[1].split('#')[0];
        $http.get(gatekeeperUrl + code).then(function(response) {
          if(response.data && response.data.hasOwnProperty('token')) callback(response.data.token);
          // If the response is incorrect, try to redirect.
          else redirect();
        }, function(response) {
          // If there was an error, try to redirect.
          redirect();
        });
      }
    }
    

    this.getToken = function(callback) {
      if($rootScope.oauthToken) callback($rootScope.oauthToken);
      else getTokenHelper(function(token) {
        $rootScope.oauthToken = token;
        callback($rootScope.oauthToken);
      });
    };
  }]);