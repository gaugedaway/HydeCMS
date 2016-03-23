import React from 'react'
import { connect } from 'react-redux'

import NavBar from './NavBar.jsx'
import Router from './Router.jsx'



export default function App({ navBarVisibility }) {
  if(!navBarVisibility) return <Router />
  
  return (
    <div>
      <NavBar />
      <Router />
    </div>
  )
}



function mapStateToProps(state) {
  return {
    navBarVisibility: state.navBarVisibility
  }
}

export default connect(mapStateToProps)(App)