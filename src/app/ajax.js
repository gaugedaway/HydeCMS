import fetch from 'isomorphic-fetch'

import { GATEKEEPER_URL } from './config.js'

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

export function fetchToken(code) {
  return fetchJSON(GATEKEEPER_URL + code)
    .then((data) => {
      if(data.error) throw new Error(data.error)
      if(!data.token) throw new Error('No token in response from server')
      return data.token
    })
}

export function fetchLogin(token) {
  return fetchGithub('/user', 'GET', token)
    .then((data) => data.login)
}

export function fetchPosts(token, login, repo) {
  return fetchGithub(`/repos/${ login }/${ repo }/contents/`, 'GET', token)
}