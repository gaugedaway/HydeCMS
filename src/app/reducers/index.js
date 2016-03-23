import { combineReducers } from 'redux'

import pageReducer from './currentPage.js'
import navBarVisibilityReducer from './navBarVisibility.js'

const mainReducer = combineReducers({
  currentPage: pageReducer,
  navBarVisibility: navBarVisibilityReducer
})

export default mainReducer