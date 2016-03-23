import * as RouterActions from '../actions/router.js'

export default function currentPageReducer(currentPage = '', action) {
  switch (action.type) {
    case RouterActions.CHANGE_PAGE:
      return action.page
    
    default:
      return currentPage
  }
}