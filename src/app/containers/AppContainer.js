import { connect } from 'react-redux'

import App from '../components/App.jsx'


function mapStateToProps(state) {
  return {
    navBarVisibility: state.navBarVisibility,
    currentPage: state.currentPage
  }
}

export default connect(mapStateToProps)(App)