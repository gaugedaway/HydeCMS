import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import account from './account.js'
import posts from './posts.js'
import fullPost from './fullPost.js'

const mainReducer = combineReducers({
  account,
  posts,
  fullPost,
  routing: routerReducer
})

export default mainReducer