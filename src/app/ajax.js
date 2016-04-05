import fetch from 'isomorphic-fetch'

export async function fetchJSON(url, options) {
  let response = await fetch(url, options)
  if(response.status >= 200 && response.status < 300) {
    return response.json()
  }
  else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}