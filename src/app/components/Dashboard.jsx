import React from 'react'

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>You have successfully logged in!</h1>
        <button onClick={ this.props.logout }>Logout</button>
      </div>
    )
  }
}