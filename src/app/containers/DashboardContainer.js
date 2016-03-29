import { connect } from 'react-redux'

import { logout } from '../actions/token.js'
import Dashboard from '../components/Dashboard.jsx'

function mapStateToProps(state, ownProps) {
  return {
    token: state.token.value
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    logout: () => dispatch(logout())
  }
}

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export default DashboardContainer