import React from 'react'

import * as Config from '../config.js'


export default class Login extends React.Component {
  getCode() {
    let code = window.location.href.match(/\?code=(.*)/)
    if(!code) return null
    return code[1].split('#')[0]
  }
  
  componentDidMount() {
    let code = this.getCode()
    if(code) this.props.fetchToken(code)
  }
  
  componentWillUnmount() {
    this.props.fetchTokenCancel()
  }
   
  render() {
    const authUrl = `${ Config.OAUTH_URL }?client_id=${ Config.CLIENT_ID }&redirect_uri=${ Config.REDIRECT_URI }&scope=${ Config.SCOPE.join(',') }`
    return (
      <div>
        <h1>Login</h1>
        <a href={ authUrl }>Authorize</a>
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