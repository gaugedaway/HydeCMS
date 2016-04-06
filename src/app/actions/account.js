import { push } from 'react-router-redux'

import { getToken, getLogin } from '../github.js'

export const FETCH_ACCOUNT_START = 'FETCH_ACCOUNT_START'
export const FETCH_ACCOUNT_SUCCESS = 'FETCH_ACCOUNT_SUCCESS'
export const FETCH_ACCOUNT_ERROR = 'FETCH_ACCOUNT_ERROR'
export const FETCH_ACCOUNT_CANCEL = 'FETCH_ACCOUNT_CANCEL'
export const LOGOUT = 'LOGOUT'

export function fetchAccountStart() {
  return {
    type: FETCH_ACCOUNT_START
  }
}

export function fetchAccountSuccess(token, login) {
  return {
    type: FETCH_ACCOUNT_SUCCESS,
    payload: { token, login }
  }
}

export function fetchAccountError(error) {
  return {
    type: FETCH_ACCOUNT_ERROR,
    payload: error
  }
}

export function fetchAccountCancel() {
  return {
    type: FETCH_ACCOUNT_CANCEL
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}

export function fetchAccount(code, redirect = null) {
  return async (dispatch, getState) => {
    dispatch(fetchAccountStart())
    try {
      let token = await getToken(code)
      let login = await getLogin(token)
      if (getState().account.authorizing) {
        dispatch(fetchAccountSuccess(token, login))
        dispatch(push(redirect))
      }
    }
    catch(error) {
      if(getState().account.authorizing) dispatch(fetchAccountError(error))
    }
  }
}