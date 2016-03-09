/*
  This module is responsible for getting OAuth token for GitHub API operations.

  Author: Adam Bac
*/

angular.module('OAuth', [])
  .service('oauthProvider', ['$http', '$location', '$window', '$rootScope', function($http, $location, $window, $rootScope) {

  // Configuration; some valued are ereased for security,
  // if you want to experiment wit this code you must configure your
  // own Gatekeeper server (https://github.com/prose/gatekeeper)
  // and register your own GitHub app.

  // Gatekeeper address (not <host>, but <host>/authenticate/,
  // for example http://127.0.0.1/authenticate/
  // (ending slash is also important)).
  var gate_url = '';

  // Client id of your app:
  var client_id = '';

  // github OAuth URL
  var github_url = 'https://github.com/login/oauth/authorize';

  // list of scopes
  var scopes = ['public_repo'];

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
      $window.location.href = github_url + '?client_id=' + client_id + '&redirect_uri=' + window.encodeURIComponent($location.absUrl()) + '&scope=' + scopes.join(',');
    }

    // If yes, get the code...
    if(code) {
      // The transformatin below is necessary, because GitHub API places
      // the code before # character, for example, if return url would be
      // http://abc.com/#/login, GitHub would redirect to somenthing like
      // http://abc.com/?code=ajffjuhgffjhfjaj#login, so we need to separate
      // the code from the path after #.
      code = code[1].split('#')[0];
      $http.get(gate_url + code).then(function(response) {
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