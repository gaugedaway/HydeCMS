import React from 'react'
import { connect } from 'react-redux'



function Router({ page }) {
  switch(page) {
    case 'main':
      return <h1>This is the main page's content</h1>
      
    case 'second':
      return <h1>This is the second page's content</h1>
      
    default:
      return <h1>Error: page not found!</h1>
  }
}



function mapStateToProps(state) {
  return {
    page: state.currentPage,
  }
}

export default connect(mapStateToProps)(Router)