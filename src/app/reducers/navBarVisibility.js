import * as NavBarActions from '../actions/navbar'

export default function navBarVisibilityReducer(visible = false, action) {
  switch(action.type) {
    case NavBarActions.SHOW_NAVBAR:
      return true
      
    case NavBarActions.HIDE_NAVBAR:
      return false
    
    default:
      return visible
  }
}