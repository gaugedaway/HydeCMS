import * as PagesActions from '../actions/pages.js'

export default function currentPageReducer(currentPage = '', action) {
  switch (action.type) {
    case PagesActions.CHANGE_PAGE:
      return action.page
    
    default:
      return currentPage
  }
}