import { connect } from 'react-redux'

import { fetchToken, requestTokenCancel } from '../actions/token.js'
import Login from '../components/Login.jsx'

function mapStateToProps(state, ownProps) {
  return {
    requested: state.token.requested,
    error: state.token.error
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchToken: (code) => dispatch(fetchToken(code)),
    fetchTokenCancel: () => dispatch(requestTokenCancel())
  }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginContainer