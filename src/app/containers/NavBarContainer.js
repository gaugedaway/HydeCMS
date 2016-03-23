import { connect } from 'react-redux'

import * as RouterActions from '../actions/router.js'
import NavBar from '../components/NavBar.jsx'

function mapStateToProps(state) {
  return {
    pages: state.pages
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: id => dispatch(RouterActions.changePage(id))
  }
}

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar)

export default NavBarContainer