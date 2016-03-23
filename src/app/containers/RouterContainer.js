import { connect } from 'react-redux'

import Router from '../components/Router.jsx'

function mapStateToProps(state) {
  return {
    pageId: state.page
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

const RouterContainer = connect(mapStateToProps, mapDispatchToProps)(Router)

export default RouterContainer