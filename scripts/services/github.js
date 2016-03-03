angular.module('Github', [])
  .service('githubProvider', ['$http', function($http) {
    var apiUrl = 'https://api.github.com';
    var authUserUrl = apiUrl + '/user';
    var repoUrl = (owner, repo) => apiUrl + '/repos/' + owner + '/' + repo;
    var contentsUrl = (owner, repo, path) => repoUrl(owner, repo) + '/contents/' + path;


    function getObject(url, token, callback) {
      $http({
        'method': 'GET',
        'headers': {'Authorization': 'token ' + token},
        'url': url
      }).then(function(response) {
        callback(response.data);
      }, function(response) {
        callback(null);
      });
    }


    function postObject(url, token, data, callback) {
      $http({
        'method': 'POST',
        'headers': {'Authorization': 'token ' + token},
        'url': url,
        'data': JSON.stringify(data)
      }).then(function(response) {
        callback(response.data);
      }, function(response) {
        callback(null);
      });
    }


    function putObject(url, token, data, callback) {
      $http({
        'method': 'PUT',
        'headers': {'Authorization': 'token ' + token},
        'url': url,
        'data': JSON.stringify(data)
      }).then(function(response) {
        callback(response.data);
      }, function(response) {
        callback(null);
      });
    }


    function patchObject(url, token, data, callback) {
      $http({
        'method': 'PATCH',
        'headers': {'Authorization': 'token ' + token},
        'url': url,
        'data': JSON.stringify(data)
      }).then(function(response) {
        callback(response.data);
      }, function(response) {
        callback(null);
      });
    }


    function deleteObject(url, token, data, callback) {
      $http({
        'method': 'DELETE',
        'headers': {'Authorization': 'token ' + token},
        'url': url,
        'data': data
      }).then(function(response) {
        callback(response.data);
      }, function(response) {
        callback(null);
      });
    }


    function getFileSha(token, owner, repo, path, callback) {
      getObject(contentsUrl(owner, repo, path), token, function(response) {
         if(response && response.type == 'file') callback(response.sha);
         else callback(null);
      });
    };


    this.getFile = function(token, owner, repo, path, callback, encoding='utf-8') {
      getObject(contentsUrl(owner, repo, path), token, function(response) {
        if(response && response.type == 'file') {
          if(response.encoding == 'base64' && encoding == 'utf-8') callback(atob(response.content));
          else if(response.encoding == 'utf-8' && encoding == 'base64') callback(btoa(response.content));
          else callback(response.content);
        }
        else callback(null);
      });
    };


    this.fileExists = function(token, owner, repo, path, callback) {
      getObject(contentsUrl(owner, repo, path), token, function(response) {
         if(response && response.type == 'file') callback(true);
         else callback(false);
      });
    };


    this.listDir = function (token, owner, repo, path, callback) {
      getObject(contentsUrl(owner, repo, path), token, callback);
    };


    this.saveFile = function (token, owner, repo, path, content, message, encoding='utf-8') {
      if(encoding == 'utf-8') content = btoa(content);

      getFileSha(token, owner, repo, path, function(sha) {
        if(sha) {
          putObject(contentsUrl(owner, repo, path), token, {
            'message': message,
            'content': content,
            'sha': sha
          }, function(r) {});
        }
        else {
          putObject(contentsUrl(owner, repo, path), token, {
            'message': message,
            'content': content
          }, function(r) {});
        }
      });
    };


    this.deleteFile = function(token, owner, repo, path, message) {
      getFileSha(token, owner, repo, path, function(sha) {
         if(sha) {
           deleteObject(contentsUrl(owner, repo, path), token, {
             'message': message,
             'sha': sha
           }, function(r) {});
         }
      });
    };


    this.listRepos = function(token, callback) {
      getObject(apiUrl + '/user/repos', token, callback);
    };


    this.getRepo = function(token, owner, repo, callback) {
      getObject(repoUrl(owner, repo), token, callback);
    };


    this.createRepo = function(token, options) {
      postObject(apiUrl + '/user/repos', token, options, function(r) {});
    };


    this.editRepo = function(token, owner, repo, options) {
      patchObject(repoUrl(owner, repo), token, options, function(r) {});
    };


    this.deleteRepo = function(token, owner, repo) {
      deleteObject(repoUrl(owner, repo), token, {}, function(r) {});
    };


    this.getUser = function(token, callback) {
      getObject(authUserUrl, token, callback);
    };

  }]);