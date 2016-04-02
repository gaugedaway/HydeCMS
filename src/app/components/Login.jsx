import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import { OAUTH_URL, REDIRECT_URI, CLIENT_ID, SCOPE } from '../config.js'
import * as AccountActions from '../actions/account.js'

class Login extends React.Component {
  getCode() {
    const code = window.location.href.match(/\?code=(\w*)/)
    if(code) return code[1]
  }

  cleanUrl() {
    let clean_uri = window.location.href.replace(/\?code=\w*/, '')
    window.history.replaceState({}, document.title, clean_uri)
  }

  componentDidMount() {
    const code = this.getCode()
    if(code) {
      this.cleanUrl()
      this.props.fetchAccount(code, { pathname: '/' })
    }
  }

  componentWillUnmount() {
    this.props.fetchAccountCancel()
  }

  redirectToGithubAuth() {
    window.location.href = `${ OAUTH_URL }?redirect_uri=${ REDIRECT_URI }&client_id=${ CLIENT_ID }&scope=${ SCOPE.join(',') }`
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <button onClick={ this.redirectToGithubAuth }>Authorize</button>
        {
          this.props.error
            ? <p style={{ color: 'red' }}>An error occured while connencting to your GitHub account. Try logging in again.</p>
            : <span />
        }
        {
          this.props.authorizing
            ? <p>Wait...</p>
            : <span />
        }
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    error: state.account.error,
    authorizing: state.account.authorizing
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AccountActions, { push }), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
