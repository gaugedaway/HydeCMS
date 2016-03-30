import { replace } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { LOCAL_STORAGE_TOKEN_KEY } from '../config.js'
import { requestTokenSuccess } from '../actions/token.js'
import App from '../components/App.jsx'

function mapStateToProps(state, ownProps) {
  return {
    children: ownProps.children
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    checkForSavedToken: () => {
      const savedToken = JSON.parse(localStorage[LOCAL_STORAGE_TOKEN_KEY])
      if(savedToken) {
        dispatch(requestTokenSuccess(savedToken))
      }
      else if(ownProps.route.path != '/login'){
        dispatch(replace({ pathname: '/login' }))
      }
    }
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer