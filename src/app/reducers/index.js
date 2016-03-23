import { combineReducers } from 'redux'

import pagesReducer from './pages.js'
import pageReducer from './currentPage.js'

const mainReducer = combineReducers({
  pages: pagesReducer,
  currentPage: pageReducer
})

export default mainReducer