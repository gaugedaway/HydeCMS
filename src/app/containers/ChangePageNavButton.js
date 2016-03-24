import { connect } from 'react-redux'

import * as PagesActions from '../actions/pages.js'
import NavButton from '../components/NavButton.jsx'


function mapStateToProps(state, ownProps) {
  return {
    title: ownProps.title,
    disabled: ownProps.page == state.currentPage
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onClick: () => dispatch(PagesActions.changePage(ownProps.page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavButton)