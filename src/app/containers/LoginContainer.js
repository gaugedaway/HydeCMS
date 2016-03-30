import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import { LOCAL_STORAGE_TOKEN_KEY } from '../config.js'
import { fetchToken, requestTokenCancel } from '../actions/token.js'
import Login from '../components/Login.jsx'

function getCode() {
  const code = window.location.href.match(/\?code=(.*)/)
  if(!code) return null
  return code[1].split('#')[0]
}

function cleanUrl() {
  let clean_uri = location.protocol + "//" + location.host + location.pathname
  const hash_pos = location.href.indexOf("#")
  if (hash_pos > 0) {
      const hash = location.href.substring(hash_pos, location.href.length)
      clean_uri += hash
  }
  window.history.replaceState({}, document.title, clean_uri)
}

function authorize() {
  return (dispatch) => {
    const code = getCode()
    if(code) {
      cleanUrl()
      dispatch(fetchToken(code))
        .then((token) =>  {
          localStorage[LOCAL_STORAGE_TOKEN_KEY] = JSON.stringify(token)
        })
      dispatch(push({ pathname: '/' }))
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    requested: state.token.requested,
    error: state.token.error
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({ authorize, authorizeCancel: requestTokenCancel }, dispatch)
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

console.log(LoginContainer)

export default LoginContainer