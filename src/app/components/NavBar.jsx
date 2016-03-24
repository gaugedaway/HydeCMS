import React from 'react'

import ChangePageNavButton from '../containers/ChangePageNavButton.js'


export default function NavBar() {
  return (
    <div>
      <ChangePageNavButton title="Page 1" page="main" />
      <ChangePageNavButton title="Page 2" page="second" />
      <ChangePageNavButton title="Page 3" page="third" />
    </div>
  )
}