import React from 'react'
import { connect } from 'react-redux'

import NavBar from './NavBar.jsx'
import Content from './Content.jsx'


export default function App({ navBarVisibility, currentPage }) {
  let navbar = <div />
  if(navBarVisibility) navbar = <NavBar />
  
  return (
    <div>
      { navbar }
      <Content page={ currentPage } />
    </div>
  )
}