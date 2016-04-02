import React from 'react'
import { connect } from 'react-redux'

import LogoutButton from './LogoutButton.jsx'

class Dashboard extends React.Component {
  
  render() {
    return (
      <div>
        <h1>Hello!</h1>
        <LogoutButton />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.account.token,
    login: state.account.login
  }
}

export default connect(mapStateToProps)(Dashboard)