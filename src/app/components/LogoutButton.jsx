/* global localStorage */

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { LOCAL_STORAGE_TOKEN_KEY } from '../config.js'
import { resetToken } from '../actions/token.js'

class LogoutButton extends React.Component {
  logout() {
    localStorage[LOCAL_STORAGE_TOKEN_KEY] = JSON.stringify(null)
    this.props.resetToken()
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
  return bindActionCreators({ resetToken, push }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton)