import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

import mainReducer from './reducers/index.js'

import App from './components/App.jsx'



let initialState = {
  currentPage: 'main',
  navBarVisibility: true
}

let logger = createLogger()
let store = createStore(mainReducer, initialState, applyMiddleware(logger))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
)