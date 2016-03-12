angular.module('Hyde.Common.Services.OAuth', [])

  .factory('oauthProvider', function($http) {
    var obj = {};

    obj.getCode = function(url) {
      var code = url.match(/\?code=(.*)/);
      if(!code) return null;

      // The transformatin below is necessary, because GitHub API places
      // the code before # character, for example, if return url would be
      // http://abc.com/#/login, GitHub would redirect to somenthing like
      // http://abc.com/?code=ajffjuhgffjhfjaj#login, so we need to separate
      // the code from the path after #.
      return code[1].split('#')[0];
    };

    obj.getToken = function(gatekeeperServer, code) {
      return $http.get(gatekeeperServer + 'authenticate/' + code).then(function(data) {
        return data.data.token;
      });
    };

    return obj;
  });