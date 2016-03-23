import { combineReducers } from 'redux'

import pagesReducer from './pages.js'
import pageReducer from './page.js'

const mainReducer = combineReducers({
  pages: pagesReducer,
  page: pageReducer
})

export default mainReducer