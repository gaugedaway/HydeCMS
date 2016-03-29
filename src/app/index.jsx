import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware, replace } from 'react-router-redux'
import { createHashHistory } from 'history'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import { LOCAL_STORAGE_TOKEN_KEY } from './config.js'
import { requestTokenSuccess } from './actions/token.js'
import mainReducer from './reducers/index.js'
import App from './components/App.jsx'
import DashboardContainer from './containers/DashboardContainer.js'
import LoginContainer from './containers/LoginContainer.js'

const initialState = {
  token: {
    value: null,
    requested: false,
    error: null
  }
}

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
const logger = createLogger()
const store = createStore(mainReducer, initialState, applyMiddleware(logger, thunk, routerMiddleware(appHistory)))
const history = syncHistoryWithStore(appHistory, store)

let savedToken = JSON.parse(localStorage[LOCAL_STORAGE_TOKEN_KEY])
if(savedToken) {
  store.dispatch(requestTokenSuccess(savedToken))
}
else {
  store.dispatch(replace({ pathname: '/login' }))
}

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ App }>
        <IndexRoute component={ DashboardContainer } />
        <Route path="login" component={ LoginContainer } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
)