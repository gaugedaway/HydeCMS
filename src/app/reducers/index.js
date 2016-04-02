import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import account from './account.js'

const mainReducer = combineReducers({
  account,
  routing: routerReducer
})

export default mainReducer