import React from 'react'

import LogoutButton from './LogoutButton.jsx'

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>You have successfully logged in!</h1>
        <LogoutButton />
      </div>
    )
  }
}