import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import account from './account.js'
import posts from './posts.js'

const mainReducer = combineReducers({
  account,
  posts,
  routing: routerReducer
})

export default mainReducer