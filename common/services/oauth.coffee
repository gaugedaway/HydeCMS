angular.module 'Hyde.Common.Services.OAuth', []

  .factory 'oauthProvider', ($http) ->
    getCode: (url) ->
      code = url.match /\?code=(.*)/
      if not code then null
      else code[1].split('#')[0]

    getToken: (gatekeeperServer, code) ->
      $http.get(gatekeeperServer + 'authenticate/' + code).then (data) ->
        if data.data.token? then data.data.token
        else null
