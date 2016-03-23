import React from 'react'

import NavButton from './NavButton.jsx'


export default function NavBar() {
  return (
    <div>
      <NavButton title="Page 1" page="main" />
      <NavButton title="Page 2" page="second" />
      <NavButton title="Page 3" page="third" />
    </div>
  )
}