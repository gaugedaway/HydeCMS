import React from 'react'
import { connect } from 'react-redux'

import * as RouterActions from '../actions/router.js'



export default function NavButton({ onClick, title, disabled }) {
  return <button onClick={ onClick } disabled={ disabled } >{ title }</button>
}



function mapStateToProps(state, ownProps) {
  return {
    title: ownProps.title,
    disabled: state.currentPage == ownProps.page
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onClick: e => dispatch(RouterActions.changePage(ownProps.page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavButton)