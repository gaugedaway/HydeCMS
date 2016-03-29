import React from 'react'

import * as Config from '../config.js'


export default class Login extends React.Component {
  getCode() {
    let code = window.location.href.match(/\?code=(.*)/)
    if(!code) return null
    return code[1].split('#')[0]
  }
  
  redirect() {
    const authUrl = `${ Config.OAUTH_URL }?client_id=${ Config.CLIENT_ID }&redirect_uri=${ Config.REDIRECT_URI }&scope=${ Config.SCOPE.join(',') }`
    window.location.href = authUrl
  }
  
  cleanUrl() {
    var clean_url = location.protocol + "//" + location.host + location.pathname
    var hash_pos = location.href.indexOf("#")
    if (hash_pos > 0) {
      var hash = location.href.substring(hash_pos, location.href.length);
      clean_url += hash;
    }
    window.history.replaceState({}, document.title, clean_url);
  }
  
  componentDidMount() {
    let code = this.getCode()
    this.cleanUrl()
    if(code) this.props.fetchToken(code)
  }
  
  componentWillUnmount() {
    this.props.fetchTokenCancel()
  }
   
  render() {
    return (
      <div>
        <h1>Login</h1>
        <button onClick={ this.redirect }>Authorize</button>
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