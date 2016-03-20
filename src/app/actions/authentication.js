import fetch from 'isomorphic-fetch'
import { authenticationUrl } from '../consts.js'

export function requestAuthentication() {
  return {
    type: 'REQUEST_AUTHENTICATION'
  }
}

export function authenticationSuccess(token) {
  return {
    type: 'AUTHENTICATE_SUCCESS',
    token
  }
}

export function authenticationError(error) {
  return {
    type: 'AUTHENTICATE_ERROR',
    error
  }
}

export function authenticate(code) {
  return dispatch => {
    dispatch(requestAuthentication())
    fetch(authenticationUrl(code))
      .then(data => data.json())
      .then(data => {
        if(data.error) throw new Error(data.error)
        if(!data.token) throw new Error('no_token_property')
        dispatch(authenticationSuccess(data.token))
      })
      .catch(error => dispatch(authenticationError(error)))
  }
}