import React from 'react'
import { connect } from 'react-redux'

import { OAUTH_URL, REDIRECT_URI, CLIENT_ID, SCOPE } from '../config.js'

class Login extends React.Component {
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
          this.props.requested
            ? <p>Wait...</p>
            : <span />
        }
      </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    requested: state.token.requested,
    error: state.token.error
  }
}

export default connect(mapStateToProps)(Login)