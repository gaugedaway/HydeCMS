# Configuration; some valued are ereased for security,
# if you want to experiment wit this code you must configure your
# own Gatekeeper server (https://github.com/prose/gatekeeper)
# and register your own GitHub app.

angular.module 'Hyde.Core.Config', []

  # GitHub client_id
  .value 'oauthClientId', ''

  # Gatekeeper address (not <host>, but <host>/authenticate/,
  # for example http://127.0.0.1/authenticate/
  # (ending slash is also important)).
  .value 'gatekeeperUrl', ''

  # GitHub API URL
  .value 'githubApiUrl', 'https://github.com/login/oauth/authorize'

  # Scope needed by the application
  .value 'githubScope', ['public_repo']