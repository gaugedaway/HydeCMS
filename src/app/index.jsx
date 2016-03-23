import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

import mainReducer from './reducers/index.js'

import App from './components/App.jsx'



let initialState = {
  pages: [
    { name: 'Main Page', id: 'main' },
    { name: 'Second Page', id: 'second' },
    { name: 'Wrong page', id: 'third' }
  ],
  page: 'main'
}

let logger = createLogger()
let store = createStore(mainReducer, initialState, applyMiddleware(logger))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
)