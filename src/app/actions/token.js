import { replace } from 'react-router-redux'

import { GATEKEEPER_URL, LOCAL_STORAGE_TOKEN_KEY } from '../config.js'
import { fetchJSON } from '../ajax.js'

export const REQUEST_TOKEN = 'REQUEST_TOKEN'
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS'
export const REQUEST_TOKEN_ERROR = 'REQUEST_TOKEN_ERROR'
export const REQUEST_TOKEN_CANCEL = 'REQUEST_TOKEN_CANCEL'

export function requestToken() {
  return {
    type: REQUEST_TOKEN
  }
}

export function requestTokenSuccess(token) {
  return {
    type: REQUEST_TOKEN_SUCCESS,
    payload: token
  }
}

export function requestTokenError(error) {
  return {
    type: REQUEST_TOKEN_ERROR,
    error: error
  }
}

export function requestTokenCancel() {
  return {
    type: REQUEST_TOKEN_CANCEL
  }
}

export function fetchToken(code) {
  return (dispatch, getState) => {
    dispatch(requestToken())
    
    fetchJSON(GATEKEEPER_URL + code)
      .then((data) => {
        if(data.error) throw new Error(data.error)
        if(!data.token) throw new Error('No token in response from server')
        return data.token
      })
      .then((token) => {
        if(getState().token.requested) {
          localStorage[LOCAL_STORAGE_TOKEN_KEY] = JSON.stringify(token)
          dispatch(requestTokenSuccess(token))
          dispatch(replace('/'))
        }
      })
      .catch((error) => {
        if(getState().token.requested) dispatch(requestTokenError(error))
      })
  }
}