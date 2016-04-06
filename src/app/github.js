import { fetchJSON } from './ajax.js'

import { GATEKEEPER_URL } from './config.js'

async function fetchAuthorized(url, method, token, data = null) {
  let options = { method, headers: { Authorization: 'token ' + token } }
  if(data) options.body = data
  return await fetchJSON(url, options)
}

async function fetchFromApi(path, method, token, data = null) {
  return await fetchAuthorized('https://api.github.com' + path, method, token, data)
}

export async function getToken(code) {
  let data = await fetchJSON(GATEKEEPER_URL + code)
  if(data.error) throw new Error(data.error)
  if(!data.token) throw new Error('No token in response from server')
  return data.token
}

export async function getLogin(token) {
  let data = await fetchFromApi('/user', 'GET', token)
  return data.login
}

export async function fetchContents(path, token, login, repo, method = 'GET') {
  return await fetchFromApi(`/repos/${ login }/${ repo }/contents${ path }`, method, token)
}

export async function getDir(path, token, login, repo) {
  let data = await fetchContents(path, token, login, repo)
  if(!Array.isArray(data)) throw new Error(`getDir: ${ path } is not a directory`)
  return data
}

export async function getFileByUrl(url, token) {
  let data = await fetchAuthorized(url, 'GET', token)
  if(!Array.isArray(data) && data.type && data.type === 'file') return data
  throw new Error(`getFileByUrl: ${ url } is not a file`)
}