import { connect } from 'react-redux'

import Dashboard from '../components/Dashboard.jsx'

function mapStateToProps(state, ownProps) {
  return {
    token: state.token.value
  }
}

const DashboardContainer = connect(mapStateToProps)(Dashboard)

export default DashboardContainer