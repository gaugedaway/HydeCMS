import React from 'react'
import { connect } from 'react-redux'

import NavBar from './NavBar.jsx'
import Content from './Content.jsx'



export default function App({ navBarVisibility }) {
  if(!navBarVisibility) return <Content />
  
  return (
    <div>
      <NavBar />
      <Content />
    </div>
  )
}



function mapStateToProps(state) {
  return {
    navBarVisibility: state.navBarVisibility
  }
}

export default connect(mapStateToProps)(App)