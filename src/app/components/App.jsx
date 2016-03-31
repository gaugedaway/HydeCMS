/* global localStorage location */

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'

import { LOCAL_STORAGE_TOKEN_KEY } from '../config.js'
import { fetchToken } from '../ajax.js'
import { requestToken, requestTokenSuccess, requestTokenError, requestTokenCancel } from '../actions/token.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.checkForTokenInLocalStorage = this.checkForTokenInLocalStorage.bind(this)
    this.getCode = this.getCode.bind(this)
  }
  
  getCode() {
    const code = window.location.href.match(/\?code=(.*)/)
    if(!code) return null
    return code[1].split('#')[0]
  }
  
  cleanUrl() {
    let clean_uri = location.protocol + "//" + location.host + location.pathname
    const hash_pos = location.href.indexOf("#")
    if (hash_pos > 0) {
        const hash = location.href.substring(hash_pos, location.href.length)
        clean_uri += hash
    }
    window.history.replaceState({}, document.title, clean_uri)
  }
  
  checkForTokenInLocalStorage() {
    console.log(this.props.location.pathname)
    if(localStorage.hasOwnProperty(LOCAL_STORAGE_TOKEN_KEY) && JSON.parse(localStorage[LOCAL_STORAGE_TOKEN_KEY])) {
      this.props.requestTokenSuccess(JSON.parse(localStorage[LOCAL_STORAGE_TOKEN_KEY]))
    }
    else if(this.props.location.pathname !== '/login'){
      this.props.replace({ pathname: '/login' })
    }
  }
  
  getToken(code) {
    this.props.requestToken()
      fetchToken(code)
        .then((token) => {
          this.props.requestTokenSuccess(token)
          localStorage[LOCAL_STORAGE_TOKEN_KEY] = JSON.stringify(token)
          this.props.push({ pathname: '/' })
        })
        .catch((error) => this.props.requestTokenError(error))
  }
  
  componentWillMount() {
    this.checkForTokenInLocalStorage()
    const code = this.getCode()
    if(code) {
      this.cleanUrl()
      if(!this.props.token.value && !this.props.token.requested) this.getToken(code)
    }
  }
  
  componentWillUnmount() {
    this.props.requestTokenCancel()
  }
  
  render() {
    return <div>{ this.props.children }</div>
  }
}


function mapStateToProps(state, ownProps) {
  return {
    token: state.token,
    children: ownProps.children,
    location: ownProps.location
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({
    requestToken,
    requestTokenSuccess,
    requestTokenError,
    requestTokenCancel,
    push,
    replace
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)