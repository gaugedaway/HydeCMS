/* global localStorage location */

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'


class App extends React.Component {
  componentDidMount() {
    if(!this.props.account.token || !this.props.account.login) {
      this.props.replace({ pathname: '/login' })
    }
  }
  
  render() {
    return <div>{ this.props.children }</div>
  }
}


function mapStateToProps(state, ownProps) {
  return {
    account: state.account,
    children: ownProps.children,
    location: ownProps.location
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({ replace }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)