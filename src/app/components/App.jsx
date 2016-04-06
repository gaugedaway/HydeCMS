/* global localStorage location */

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'


class App extends React.Component {
  componentDidMount() {
    if(!this.props.token || !this.props.login) {
      this.props.replace({ pathname: '/login' })
    }
  }

  render() {
    return <div>{ this.props.children }</div>
  }
}


function mapStateToProps(state, ownProps) {
  return {
    token: state.account.token,
    login: state.account.login,
    children: ownProps.children,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({ replace }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)