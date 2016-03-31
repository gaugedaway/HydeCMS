export const REQUEST_TOKEN = 'REQUEST_TOKEN'
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS'
export const REQUEST_TOKEN_ERROR = 'REQUEST_TOKEN_ERROR'
export const REQUEST_TOKEN_CANCEL = 'REQUEST_TOKEN_CANCEL'
export const RESET_TOKEN = 'RESET_TOKEN'

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

export function resetToken() {
  return {
    type: RESET_TOKEN
  }
}