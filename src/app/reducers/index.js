import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import tokenReducer from './tokenReducer.js'


const mainReducer = combineReducers({
  token: tokenReducer,
  routing: routerReducer
})

export default mainReducer