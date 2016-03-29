import fetch from 'isomorphic-fetch'

export function fetchJSON(url, options) {
  return fetch(url, options)
    .then(response => {
      if(response.status >= 200 && response.status < 300) {
        return response
      }
      else {
        let error = new Error(response.statusText)
        error.response = response
        throw error
      }
    })
    .then(response => response.json())
}

export function fetchGithub(url, method, token, data = null) {
  let options = { method, headers: { Authorization: 'token ' + token } }
  if(data) options.body = data
  return fetchJSON('https://api.github.com' + url, options)
}