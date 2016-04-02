/* global localStorage */

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import * as AccountActions from '../actions/account.js'

class LogoutButton extends React.Component {
  logout() {
    this.props.logout()
    this.props.push({ pathname: '/login' })
  }
  
  render() {
    return <button onClick={ this.logout.bind(this) }>Logout</button>
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AccountActions, { push }), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton)