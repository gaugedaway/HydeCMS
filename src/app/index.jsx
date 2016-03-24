import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

import mainReducer from './reducers/index.js'
import AppContainer from './containers/AppContainer.js'


let initialState = {
  currentPage: 'main',
  navBarVisibility: true
}

let logger = createLogger()
let store = createStore(mainReducer, initialState, applyMiddleware(logger))

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('content')
)