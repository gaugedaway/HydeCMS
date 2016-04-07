import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { createHashHistory } from 'history'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import mainReducer from './reducers/index.js'
import App from './components/App.jsx'
import Dashboard from './components/Dashboard.jsx'
import Login from './components/Login.jsx'
import EditPost from './components/EditPost.jsx'

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
const logger = createLogger()
const store = createStore(mainReducer, applyMiddleware(logger, thunk, routerMiddleware(appHistory)))
const history = syncHistoryWithStore(appHistory, store)

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Dashboard } />
        <Route path="login" component={ Login } />
        <Route path="posts">
          <Route path="edit/:sha" component={ EditPost } />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
)