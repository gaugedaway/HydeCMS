/* global localStorage */

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

import { LOCAL_STORAGE_TOKEN_KEY } from '../const.js'
import { requestTokenSuccess } from '../actions/token.js'

class App extends React.Component {
  componentWillMount() {
    if(localStorage.hasOwnProperty(LOCAL_STORAGE_TOKEN_KEY) && localStorage[LOCAL_STORAGE_TOKEN_KEY]) {
      requestTokenSuccess(JSON.parse(localStorage[LOCAL_STORAGE_TOKEN_KEY]))
    }
    else if(this.props.route.path !== '/login'){
      replace({ pathname: '/login' })
    }
  }
  
  render() {
    return <div>{ this.props.children }</div>
  }
}

function mapStateToProps(state, ownProps) {
  return {
    children: ownProps.children,
    route: ownProps.route
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({ requestTokenSuccess, replace }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)