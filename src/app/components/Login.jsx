import React from 'react'

import { OAUTH_URL, REDIRECT_URI, CLIENT_ID, SCOPE } from '../config.js'

export default class Login extends React.Component {
  componentDidMount() {
    this.props.authorize()
  }
  
  componentWillUnmount() {
    this.props.authorizeCancel()
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
          this.props.requested
            ? <p>Wait...</p>
            : <span />
        }
      </div>
    )
  }
}