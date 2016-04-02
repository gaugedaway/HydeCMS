import * as AccountActions from '../actions/account.js'

export default function account(state = { token: null, login: null, error: null, authorizing: false }, action) {
  switch (action.type) {
    case AccountActions.FETCH_ACCOUNT_START:
      return Object.assign({}, state, {
        authorizing: true
      })
      
    case AccountActions.FETCH_ACCOUNT_SUCCESS:
      return {
        token: action.payload.token,
        login: action.payload.login,
        error: null,
        authorizing: false
      }
      
    case AccountActions.FETCH_ACCOUNT_ERROR:
      return {
        token: null,
        login: null,
        error: action.payload,
        authorizing: false
      }
      
    case AccountActions.FETCH_ACCOUNT_CANCEL:
      return Object.assign({}, state, {
        authorizing: false
      })
    
    case AccountActions.LOGOUT:
      return {
        token: null,
        login: null,
        error: null,
        authorizing: false
      }
    
    
    default:
      return state
  }
}